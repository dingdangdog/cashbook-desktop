package controller

import (
	"cashbook-server/service/user"
	"cashbook-server/types"
	"cashbook-server/util"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Register(c *gin.Context) {
	var u types.User
	if err := c.ShouldBindJSON(&u); err != nil {
		util.CheckErr(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"success":      false,
			"errorMessage": err.Error(),
		})
		return
	}

	id := user.Register(u)
	if id == 0 {
		c.JSON(500, util.Error("注册失败", id))
		return
	}
	c.JSON(200, util.Success(id))
}

// Login 登录
func Login(c *gin.Context) {

	var u types.User
	if err := c.ShouldBindJSON(&u); err != nil {
		util.CheckErr(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"success":      false,
			"errorMessage": err.Error(),
		})
		return
	}

	data, err := user.Login(u)
	if err != nil {
		c.JSON(500, util.Error(err.Error(), data))
		return
	}
	c.JSON(200, util.Success(data))
}
