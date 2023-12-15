package types

// Flow 流水信息表
type Flow struct {
	Id          int64   `json:"id"`
	BookId      int64   `json:"bookId"`
	Day         string  `json:"day"`
	Type        string  `json:"type"`
	Money       float64 `json:"money"`
	PayType     string  `json:"payType"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
}

type FlowParam struct {
	PageNum     int64  `json:"pageNum" uri:"pageNum" form:"pageNum"`
	PageSize    int64  `json:"pageSize" uri:"pageSize" form:"pageSize"`
	Id          int64  `json:"id" uri:"id" form:"id"`
	BookId      int64  `json:"bookId" uri:"bookId" form:"bookId"`
	StartDay    string `json:"startDay" uri:"startDay" form:"startDay"`
	EndDay      string `json:"endDay" uri:"endDay" form:"endDay"`
	Type        string `json:"type" uri:"type" form:"type"`
	PayType     string `json:"payType" uri:"payType" form:"payType"`
	Name        string `json:"name" uri:"name" form:"name"`
	Description string `json:"description" uri:"description" form:"description"`
	MoneySort   string `json:"moneySort" uri:"moneySort" form:"moneySort"`
}

type FlowQuery struct {
	PageNum     bool
	PageSize    bool
	Id          bool
	BookId      bool
	StartDay    bool
	EndDay      bool
	Type        bool
	PayType     bool
	Name        bool
	Description bool
	MoneySort   bool
}

type FlowCount struct {
	TotalCount int64   `json:"totalCount"`
	TotalMoney float64 `json:"totalMoney"`
}

type FlowsImport struct {
	Flows []Flow `json:"flows"`
}
