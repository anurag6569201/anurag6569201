from django.core.management.base import BaseCommand
from django.conf import settings
import os
from PIL import Image

class Command(BaseCommand):
    help = "Convert all media images to WebP format"

    def handle(self, *args, **kwargs):
        media_root = settings.MEDIA_ROOT  # Get the media root
        converted_count = 0

        # Walk through all files in the media directory
        for subdir, dirs, files in os.walk(media_root):
            for file in files:
                file_path = os.path.join(subdir, file)
                if file.endswith(('.jpg', '.jpeg', '.png')):  # Convert only specific formats
                    self.convert_to_webp(file_path)
                    converted_count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully converted {converted_count} images to WebP'))

    def convert_to_webp(self, file_path):
        """Converts an image to WebP format and saves it"""
        try:
            img = Image.open(file_path)
            webp_path = os.path.splitext(file_path)[0] + '.webp'
            img.save(webp_path, 'webp')
            print(f'Converted {file_path} to {webp_path}')
        except Exception as e:
            print(f"Failed to convert {file_path}: {e}")
