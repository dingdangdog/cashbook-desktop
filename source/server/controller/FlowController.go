package controller

import (
	"cashbook-server/service/flow"
	"cashbook-server/service/plan"
	"cashbook-server/types"
	"cashbook-server/util"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// AddFlow 新增流水
func AddFlow(c *gin.Context) {
	var data types.Flow
	if err := c.ShouldBindJSON(&data); err != nil {
		util.CheckErr(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"success":      false,
			"errorMessage": err.Error(),
		})
		return
	}

	id := flow.AddFlow(data)
	data.Id = id
	c.JSON(200, util.Success(data))

	go plan.UpdatePlanUsed(data.BookId)
}

// UpdateFlow 更新流水
func UpdateFlow(c *gin.Context) {
	var data types.Flow

	if err := c.ShouldBindJSON(&data); err != nil {
		util.CheckErr(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"success":      false,
			"errorMessage": err.Error(),
		})
		return
	}

	id := c.Param("id")
	num, err := strconv.ParseInt(id, 10, 64)
	util.CheckErr(err)
	data.Id = num
	flow.UpdateFlow(data)

	c.JSON(200, util.Success(data))

	go plan.UpdatePlanUsed(data.BookId)
}

// DeleteFlow 删除流水
func DeleteFlow(c *gin.Context) {
	id := c.Param("id")
	idNum, err := strconv.ParseInt(id, 10, 64)
	util.CheckErr(err)
	bookId := util.GetBookId(c)
	flow.DeleteFlow(idNum, bookId)
	// 更新计划中本月已用金额
	go plan.UpdatePlanUsed(bookId)
	c.JSON(200, util.Success("删除成功："+id))
}

// DeleteFlows 删除流水
func DeleteFlows(c *gin.Context) {
	var data map[string][]int64
	if err := c.ShouldBindJSON(&data); err != nil {
		util.CheckErr(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"success":      false,
			"errorMessage": err.Error(),
		})
		return
	}
	bookId := util.GetBookId(c)
	flow.DeleteFlows(data["ids"], bookId)
	// 更新计划中本月已用金额
	go plan.UpdatePlanUsed(bookId)
	c.JSON(200, util.Success("删除成功："+strconv.Itoa(len(data["ids"]))))
}

// GetFlowsPage 分页获取流水数据
func GetFlowsPage(c *gin.Context) {
	var query types.FlowParam
	if err := c.BindQuery(&query); err != nil {
		util.CheckErr(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"success":      false,
			"errorMessage": err.Error(),
		})
		return
	}

	query.BookId = util.GetBookId(c)

	page := flow.GetFlowsPage(query)

	c.JSON(200, util.Success(page))
}

func GetBookAll(c *gin.Context) {
	bookId := util.GetBookId(c)
	data := flow.GetBookAll(bookId)

	c.JSON(200, util.Success(data))
}

// ImportFlows 导入流水（json文件）
func ImportFlows(c *gin.Context) {
	var data types.FlowsImport

	if err := c.ShouldBindJSON(&data); err != nil {
		util.CheckErr(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"success":      false,
			"errorMessage": err.Error(),
		})
		return
	}

	// flag = overwrite || add
	flag := c.Query("flag")

	if len(flag) == 0 {
		c.JSON(500, util.Error("导入失败，数据异常", nil))
		return
	}
	if len(data.Flows) == 0 {
		c.JSON(500, util.Error("导入失败，导入数据为空", nil))
		return
	}

	bookId := util.GetBookId(c)
	nums := flow.ImportFlows(flag, data.Flows, bookId)

	if nums == 0 {
		c.JSON(500, util.Error("导入失败，请重试", nil))
		return
	}
	c.JSON(200, util.Success(nums))

	go plan.UpdatePlanUsed(bookId)
}
