from django import template
import os
from django.conf import settings

register = template.Library()

@register.filter(name='webp_image')
def webp_image(image_url):
    """Return the .webp version of the image if it exists, otherwise return the original."""
    # Construct the path to the .webp image
    webp_url = image_url.rsplit('.', 1)[0] + '.webp'
    webp_path = os.path.join(settings.MEDIA_ROOT, webp_url.replace(settings.MEDIA_URL, ''))

    # Check if the .webp file exists
    if os.path.exists(webp_path):
        return webp_url
    return image_url
