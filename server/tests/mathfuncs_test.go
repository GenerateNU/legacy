package tests

import (
	"server/src/models"
	"testing"
)

func TestAdd(t *testing.T) {
	got := models.Add(3, 5)
	want := 8

	if got != want {
		t.Errorf("Add(3, 5) = %d; want %d", got, want)
	}
}

func TestMultiply(t *testing.T) {
	got := models.Multiply(3, 5)
	want := 15

	if got != want {
		t.Errorf("Multiply(3, 5) = %d; want %d", got, want)
	}
}
