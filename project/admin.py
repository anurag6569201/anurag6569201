from django.contrib import admin
from .models import HomeStats,Biography,TimeLine,TechStack,AreaInterest,TechLang

admin.site.register(HomeStats)
admin.site.register(AreaInterest)
admin.site.register(Biography)
admin.site.register(TimeLine)
admin.site.register(TechStack)
admin.site.register(TechLang)