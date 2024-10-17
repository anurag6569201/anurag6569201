from django.db import models

class AreaInterest(models.Model):
    """Model representing an area of interest."""
    content = models.CharField(max_length=100)

    def __str__(self):
        return self.content

class HomeStats(models.Model):
    """Model for tracking home statistics."""
    projects = models.CharField(default="10", max_length=200)
    clients = models.CharField(default="10", max_length=200)
    experience = models.CharField(default="1", max_length=200)
    field = models.CharField(default="Web Developer", max_length=200)

    def __str__(self):
        return f"{self.field} - {self.projects} projects, {self.clients} clients"

class Biography(models.Model):
    """Model for storing a biography/resume."""
    resume = models.FileField(upload_to='resumes/')

    def __str__(self):
        return f'Resume {self.id}'

class TimeLine(models.Model):
    """Model for a timeline entry."""
    dateAndTime = models.DateTimeField()
    contentStart = models.CharField(max_length=200)
    contentMid = models.CharField(max_length=200)
    contentEnd = models.CharField(max_length=200)
    readContentURL = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.dateAndTime}: {self.contentStart} - {self.contentEnd}"

class TechStack(models.Model):
    """Model for a technology stack."""
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.description

class TechLang(models.Model):
    """Model for a technology language related to a tech stack."""
    language = models.CharField(max_length=100)
    techstack = models.ForeignKey(TechStack, on_delete=models.CASCADE, related_name='techlang')

    def __str__(self):
        return f"{self.language} (TechStack: {self.techstack})"

class Contact(models.Model):
    """Model for contact information."""
    contact_href = models.CharField(max_length=100)
    contactIcon_class = models.CharField(max_length=100)
    target = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.contact_href} - {self.target}"

class ProjectsMod(models.Model):
    """Model for a project."""
    webLink = models.CharField(max_length=100)
    webblogLink = models.CharField(max_length=100, blank=True)
    orderId = models.IntegerField(default=0)
    projectLogo = models.ImageField(upload_to='ProjectsLogo/', null=True, blank=True, default="projectsLogo/default_project_Logo.jpg")
    projectName = models.CharField(max_length=100)
    projectGit = models.CharField(max_length=100)
    projectAbout = models.CharField(max_length=200)

class ProjectImage(models.Model):
    """Model for storing multiple images for a project."""
    project = models.ForeignKey(ProjectsMod, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='Projects/', null=True, blank=True, default="projects/default_project.jpg")


class projectLanguage(models.Model):
    """Model for languages associated with a project."""
    language = models.CharField(max_length=100)
    projectTech = models.ManyToManyField(ProjectsMod, related_name='projectlang')

    def __str__(self):
        return self.language

class ProjectsGenere(models.Model):
    """Model for project genres."""
    genereOnclick = models.CharField(max_length=100)
    genereId = models.CharField(max_length=100)
    genereName = models.CharField(max_length=100)
    prjGen = models.ManyToManyField(ProjectsMod, related_name='prjGen', blank=True)

    def __str__(self):
        return self.genereName
