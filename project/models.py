from django.db import models

class AreaInterest(models.Model):
    content=models.CharField(max_length=100)

class HomeStats(models.Model):
    projects=models.CharField(default="10",max_length=200)
    clients=models.CharField(default="10",max_length=200)
    experience=models.CharField(default="1",max_length=200)
    field=models.CharField(default="Web Developer",max_length=200)

class Biography(models.Model):
    resume = models.FileField(upload_to='resumes/')

    def __str__(self):
        return f'Resume {self.id}'
    
class TimeLine(models.Model):
    dateAndTime = models.DateTimeField()
    contentStart=models.CharField(max_length=200)
    contentMid=models.CharField(max_length=200)
    contentEnd=models.CharField(max_length=200)
    readContentURL=models.CharField(max_length=200)


class TechStack(models.Model):
    description = models.CharField(max_length=200)

class TechLang(models.Model): 
    language = models.CharField(max_length=100)
    techstack = models.ForeignKey(TechStack, on_delete=models.CASCADE, related_name='techlang')

class Contact(models.Model):
    contact_href=models.CharField(max_length=100)
    contactIcon_class=models.CharField(max_length=100)
    target=models.CharField(max_length=100)

class ProjectsMod(models.Model):
    webLink=models.CharField(max_length=100)
    webblogLink=models.CharField(max_length=100,blank=True)
    orderId=models.IntegerField(default="0")
    projectImage = models.ImageField(upload_to='Projects/',null=True, blank=True,default="projects/default_project.jpg")
    projectLogo= models.ImageField(upload_to='ProjectsLogo/',null=True, blank=True,default="projectsLogo/default_project_Logo.jpg")
    projectName=models.CharField(max_length=100)
    projectGit=models.CharField(max_length=100)
    projectAbout=models.CharField(max_length=200)

class projectLanguage(models.Model):
    language=models.CharField(max_length=100)
    projectTech=models.ManyToManyField(ProjectsMod, related_name='projectlang')

class ProjectsGenere(models.Model):
    genereOnclick=models.CharField(max_length=100)
    genereId=models.CharField(max_length=100)
    genereName=models.CharField(max_length=100)
    prjGen=models.ManyToManyField(ProjectsMod, related_name='prjGen',blank=True)
