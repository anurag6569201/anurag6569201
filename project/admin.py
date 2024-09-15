from django.contrib import admin
from .models import HomeStats,Biography,TimeLine,TechStack,AreaInterest,TechLang,Contact,projectLanguage,ProjectsGenere,ProjectsMod
from import_export.admin import ImportExportModelAdmin

class ProjectsModClass(ImportExportModelAdmin):
    list_display=['projectName']

class ProjectsLanguageClass(ImportExportModelAdmin):
    list_display=['language']

class ProjectsGenereClass(ImportExportModelAdmin):
    list_display=['genereId','genereName']

class ProjectsTimelineClass(ImportExportModelAdmin):
    list_display=['contentStart','contentMid','contentEnd']

class ProjectsTechstackClass(ImportExportModelAdmin):
    list_display=['description']

class ProjectsTechlangClass(ImportExportModelAdmin):
    list_display=['language','techstack']

class ProjectsContactClass(ImportExportModelAdmin):
    list_display=['contact_href']

class ProjectsHomeStats(ImportExportModelAdmin):
    list_display=['projects','clients','field']
    
class ProjectsAreaInterest(ImportExportModelAdmin):
    list_display=['content']

class ProjectsBiography(ImportExportModelAdmin):
    list_display=['resume']

admin.site.register(HomeStats,ProjectsHomeStats)
admin.site.register(AreaInterest,ProjectsAreaInterest)
admin.site.register(Biography,ProjectsBiography)
admin.site.register(TimeLine,ProjectsTimelineClass)
admin.site.register(TechStack,ProjectsTechstackClass)
admin.site.register(TechLang,ProjectsTechlangClass)
admin.site.register(Contact,ProjectsContactClass)
admin.site.register(projectLanguage,ProjectsLanguageClass)
admin.site.register(ProjectsGenere,ProjectsGenereClass)
admin.site.register(ProjectsMod,ProjectsModClass)