# project/api_urls.py

from django.urls import path
from . import api_views

urlpatterns = [
    path("projects/", api_views.ProjectListAPI.as_view(), name="api_project_list"),
    path("experience/", api_views.TimelineListAPI.as_view(), name="api_timeline_list"),
    path("skills/", api_views.SkillsListAPI.as_view(), name="api_skills_list"),
    path("about/", api_views.AboutMeAPI.as_view(), name="api_about_me"),
]