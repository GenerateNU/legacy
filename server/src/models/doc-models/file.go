package docmodels

type FileDTO struct {
	FileName  string   `json:"file_name"`
	ObjectKey string   `json:"object_key"`
	UserID    uint     `json:"user_id"`
	User      *UserDTO `json:"user"`
	Tags      []string `json:"tags"`
}
