# project/api_views.py

from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import ProjectsMod, TimeLine, TechStack, Biography, AreaInterest
from .serializers import ProjectSerializer, TimelineSerializer, TechStackSerializer, AboutMeSerializer

# API View to get a list of all projects
class ProjectListAPI(ListAPIView):
    queryset = ProjectsMod.objects.all().order_by("-orderId")
    serializer_class = ProjectSerializer

# API View to get the timeline/experience
class TimelineListAPI(ListAPIView):
    queryset = TimeLine.objects.all().order_by('-dateAndTime')
    serializer_class = TimelineSerializer

# API View to get the tech skills, grouped by stack
class SkillsListAPI(ListAPIView):
    queryset = TechStack.objects.all()
    serializer_class = TechStackSerializer

# A custom API view to combine "About Me" information
class AboutMeAPI(APIView):
    def get(self, request, format=None):
        # Fetch data from different models
        bio = Biography.objects.first()
        interests_qs = AreaInterest.objects.all()

        # Prepare the data for the serializer
        data = {
            'resume_url': request.build_absolute_uri(bio.resume.url) if bio else 'Not available',
            'interests': [interest.content for interest in interests_qs]
        }
        
        serializer = AboutMeSerializer(data)
        return Response(serializer.data)