package types

type Auth struct {
	Flag bool     `json:"flag"`
	Auth AuthInfo `json:"auth"`
}

type AuthInfo struct {
	Key   string `json:"key"`
	State int64  `json:"state"`
	Limit int64  `json:"limit"`
	Day   int64  `json:"day"`
}

type Online struct {
	ServerAddress string `json:"serverAddress"`
	Secret        string `json:"secret"`
	BookId        int64  `json:"bookId"`
}

type OnlineData struct {
	Flows []Flow  `json:"flows"`
	Plans []Plan  `json:"plans"`
	Dicts []Typer `json:"dicts"`
}

type OnlineUpload struct {
	Key  string `json:"key"`
	Json string `json:"json"`
}
