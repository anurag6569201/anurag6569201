# project/serializers.py

from rest_framework import serializers
from .models import (
    ProjectsMod, 
    ProjectImage, 
    projectLanguage, 
    ProjectsGenere,
    TimeLine,
    TechStack,
    TechLang,
    Biography,
    AreaInterest
)

# A simple serializer for project images
class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['image']

# A simple serializer for project languages
class ProjectLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = projectLanguage
        fields = ['language']

# --- Main Project Serializer ---
# This serializer combines project details with its related images and languages
class ProjectSerializer(serializers.ModelSerializer):
    # 'images' and 'projectlang' match the 'related_name' in your models
    images = ProjectImageSerializer(many=True, read_only=True)
    languages = ProjectLanguageSerializer(source='projectlang', many=True, read_only=True)
    genres = serializers.StringRelatedField(source='prjGen', many=True)

    class Meta:
        model = ProjectsMod
        fields = [
            'projectName', 
            'projectAbout', 
            'webLink',
            'projectGit', 
            'images',
            'languages',
            'genres'
        ]

# --- Timeline/Experience Serializer ---
class TimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeLine
        fields = ['dateAndTime', 'contentStart', 'contentMid', 'contentEnd']

# --- Skills/Tech Stack Serializers ---
class TechLangSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechLang
        fields = ['language']

class TechStackSerializer(serializers.ModelSerializer):
    # Nest the languages within each tech stack category
    languages = TechLangSerializer(source='techlang', many=True, read_only=True)

    class Meta:
        model = TechStack
        fields = ['description', 'languages']

# --- General "About Me" Serializer ---
# This combines data from multiple models for a single response
class AboutMeSerializer(serializers.Serializer):
    # Define the fields we want in our final JSON
    resume_url = serializers.URLField()
    interests = serializers.ListField(child=serializers.CharField())
    
    # Example of how you can add more fields if needed
    # field = serializers.CharField() 
    # experience_years = serializers.CharField()