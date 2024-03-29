from django.contrib import admin
from .models import HomeStats,Biography,TimeLine,TechStack,AreaInterest,TechLang,Contact,projectLanguage,ProjectsGenere,ProjectsMod

class ProjectsModClass(admin.ModelAdmin):
    list_display=['projectName']



admin.site.register(HomeStats)
admin.site.register(AreaInterest)
admin.site.register(Biography)
admin.site.register(TimeLine)
admin.site.register(TechStack)
admin.site.register(TechLang)
admin.site.register(Contact)
admin.site.register(projectLanguage)
admin.site.register(ProjectsGenere)
admin.site.register(ProjectsMod,ProjectsModClass)