from django.shortcuts import render

# Create your views here.
def blogs(request):
    context={}
    return render(request,"core/blog.html",context)