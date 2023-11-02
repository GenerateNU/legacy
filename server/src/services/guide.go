package services

import (
	"server/src/models"
	"strings"

	"gorm.io/gorm"
)

type GuideServiceInterface interface {
	GetAllGuides() ([]models.Guide, error)
	GetGuide(id string) (models.Guide, error)

	CreateGuide(guide models.Guide) (models.Guide, error)
	UpdateGuide(id string, guide models.Guide) (models.Guide, error)
	DeleteGuide(id string) error
}

type GuideService struct {
	DB *gorm.DB
}

func (g *GuideService) GetAllGuides() ([]models.Guide, error) {
	var guide []models.Guide

	if err := g.DB.Find(&guide).Error; err != nil {
		return nil, err
	}

	return guide, nil
}

func (g *GuideService) GetGuide(id string) (models.Guide, error) {
	var guide models.Guide

	if err := g.DB.First(&guide, id).Error; err != nil {
		return models.Guide{}, err
	}

	return guide, nil
}

func (g *GuideService) CreateGuide(guide models.Guide) (models.Guide, error) {
	guide.MinsRead = uint(len(strings.Fields(guide.FullText)) / 200)

	if err := g.DB.Create(&guide).Error; err != nil {
		return models.Guide{}, err
	}

	return guide, nil
}

func (g *GuideService) UpdateGuide(id string, guide models.Guide) (models.Guide, error) {
	var existingGuide models.Guide

	if err := g.DB.First(&existingGuide, id).Error; err != nil {
		return models.Guide{}, err
	}

	if err := g.DB.Model(&existingGuide).Updates(guide).Error; err != nil {
		return models.Guide{}, err
	}

	return existingGuide, nil
}

func (g *GuideService) DeleteGuide(id string) error {
	var guide models.Guide

	if err := g.DB.First(&guide, id).Error; err != nil {
		return err
	}

	if err := g.DB.Delete(&guide).Error; err != nil {
		return err
	}

	return nil
}
