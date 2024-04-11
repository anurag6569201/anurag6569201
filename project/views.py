from django.shortcuts import render
from project.models import TimeLine
# Create your views here.
def timeline(request):
    timeline = TimeLine.objects.all().order_by('-dateAndTime')
    context={
        'timeline':timeline,
    }
    return render(request,"core/timeline.html",context)