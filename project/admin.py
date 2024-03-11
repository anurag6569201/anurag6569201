from django.contrib import admin
from .models import HomeStats,Biography,TimeLine,TechStacks,AreaInterest

admin.site.register(HomeStats)
admin.site.register(AreaInterest)
admin.site.register(Biography)
admin.site.register(TimeLine)
admin.site.register(TechStacks)