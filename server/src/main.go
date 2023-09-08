package main

import (
	"fmt"
	"server/src/models"
)

func main() {
    result := models.Add(3, 5)
    fmt.Println("3 + 5 =", result)
}
