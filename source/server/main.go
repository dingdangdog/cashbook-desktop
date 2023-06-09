package main

import (
	"cashbook-server/controller"
	"cashbook-server/dao"
	"cashbook-server/util"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {

	dao.InitDb()

	router := gin.Default()
	api := router.Group("/api")

	api.GET("/book/:key", controller.GetBook)
	api.POST("/book", controller.CreateBook)
	api.GET("/server", controller.GetServerInfo)

	adminApi := api.Group("/admin")
	adminApi.Use(openBook())
	{
		adminApi.POST("/book/changeKey", controller.ChangeKey)
		// 字典相关
		adminApi.GET("/dist/:type", controller.GetDistList)
		adminApi.GET("/dist", controller.GetDistPage)
		adminApi.POST("/dist", controller.AddDist)
		adminApi.PUT("/dist/:id", controller.UpdateDist)
		adminApi.DELETE("/dist/:id", controller.DeleteDist)
		// 分析图表相关
		adminApi.POST("/analysis/dailyLine", controller.GetDailyLine)
		adminApi.POST("/analysis/typePie", controller.GetTypePie)
		adminApi.POST("/analysis/payTypeBar", controller.GetPayTypeBar)
		adminApi.POST("/analysis/monthBar", controller.MonthBar)
		// 流水相关
		adminApi.GET("/flow/getAll", controller.GetAll)
		adminApi.POST("/flow/importFlows", controller.ImportFlows)
		adminApi.GET("/flow", controller.GetFlowsPage)
		adminApi.POST("/flow", controller.AddFlow)
		adminApi.PUT("/flow/:id", controller.UpdateFlow)
		adminApi.DELETE("/flow/:id", controller.DeleteFlow)
		// 计划相关
		adminApi.GET("/plans/:month", controller.GetPlan)
		adminApi.POST("/plans/:overwrite", controller.SetPlan)
		// 在线同步相关
		adminApi.POST("/online/upload", controller.Upload)
		adminApi.POST("/online/download", controller.Download)
	}
	fmt.Println("-------- 服务启动成功：http://localhost:13303 --------")
	err := router.Run(":13303")
	util.CheckErr(err)
}

func openBook() gin.HandlerFunc {
	return func(c *gin.Context) {
		bookKey := c.Request.Header.Get("bookKey")
		if 0 == len(bookKey) {
			c.JSON(http.StatusUnauthorized, gin.H{
				"success":      false,
				"errorMessage": "请输入账本密钥！",
			})
			c.Abort()
			return
		}

		if dao.GetBook(bookKey).Id == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{
				"success":      false,
				"errorMessage": "账本不存在！",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}
