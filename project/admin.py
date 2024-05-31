from django.contrib import admin
from .models import HomeStats,Biography,TimeLine,TechStack,AreaInterest,TechLang,Contact,projectLanguage,ProjectsGenere,ProjectsMod

class ProjectsModClass(admin.ModelAdmin):
    list_display=['projectName']

class ProjectsLanguageClass(admin.ModelAdmin):
    list_display=['language']

class ProjectsGenereClass(admin.ModelAdmin):
    list_display=['genereId','genereName']

class ProjectsTimelineClass(admin.ModelAdmin):
    list_display=['contentStart','contentMid','contentEnd']

class ProjectsTechstackClass(admin.ModelAdmin):
    list_display=['description']

class ProjectsTechlangClass(admin.ModelAdmin):
    list_display=['language','techstack']

class ProjectsContactClass(admin.ModelAdmin):
    list_display=['contact_href']

admin.site.register(HomeStats)
admin.site.register(AreaInterest)
admin.site.register(Biography)
admin.site.register(TimeLine,ProjectsTimelineClass)
admin.site.register(TechStack,ProjectsTechstackClass)
admin.site.register(TechLang,ProjectsTechlangClass)
admin.site.register(Contact,ProjectsContactClass)
admin.site.register(projectLanguage,ProjectsLanguageClass)
admin.site.register(ProjectsGenere,ProjectsGenereClass)
admin.site.register(ProjectsMod,ProjectsModClass)