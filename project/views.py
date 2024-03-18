from django.shortcuts import render, redirect
from .forms import ContactForm
from django.core.mail import send_mail
from django.template.loader import render_to_string
from project.models import HomeStats,Biography,TimeLine,TechStack,AreaInterest,Contact,projectLanguage,ProjectsGenere,ProjectsMod


def index(request):
    homestat=HomeStats.objects.all()
    biography = Biography.objects.all()
    techstack = TechStack.objects.all()
    intrest=AreaInterest.objects.all()
    contcat=Contact.objects.all()
    prj_gen=ProjectsGenere.objects.all().order_by("-id")
    prj_mod=ProjectsMod.objects.all().order_by("-orderId")

    context = {
        'homestat':homestat,
        'biography': biography,
        'intrest':intrest,
        'techstack': techstack,
        'contact': contcat,
        'projectgenre':prj_gen,
        'prj_mod':prj_mod,
    }
    return render(request, 'core/index.html',context)

def timeline(request):
    timeline = TimeLine.objects.all().order_by('-dateAndTime')
    context={
        'timeline': timeline,
    }
    return render(request, 'core/timeline.html',context)

def contact(request):
    contcat=Contact.objects.all()
    if request.method == "POST":
        form = ContactForm(request.POST)
        
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            content = form.cleaned_data['content']

            html = render_to_string('core/email.html', {
                'name': name,
                'email': email,
                'content': content,
            })

            send_mail("The contact form subject", 'this is the message', email, ['anurag6569201@gmail.com'], html_message=html)
            return redirect("index")
    else:
        form = ContactForm()

    context={
        'contact': contcat,
        'form': form,
    }
    return render(request,"core/contact.html",context)