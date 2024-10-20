from django.core.management.base import BaseCommand
from django.conf import settings
import os

class Command(BaseCommand):
    help = "Delete all .jpg, .jpeg, and .png images if their .webp versions exist"

    def handle(self, *args, **kwargs):
        media_root = settings.MEDIA_ROOT  # Get the media root
        deleted_count = 0
        skipped_count = 0

        # Walk through all files in the media directory
        for subdir, dirs, files in os.walk(media_root):
            for file in files:
                file_path = os.path.join(subdir, file)
                # Check for jpg, jpeg, png files
                if file.endswith(('.jpg', '.jpeg', '.png')):
                    # Check if the corresponding .webp file exists
                    webp_path = os.path.splitext(file_path)[0] + '.webp'
                    if os.path.exists(webp_path):
                        os.remove(file_path)
                        print(f"Deleted {file_path}")
                        deleted_count += 1
                    else:
                        print(f"Skipped {file_path} (No corresponding .webp found)")
                        skipped_count += 1

        self.stdout.write(self.style.SUCCESS(f"Deleted {deleted_count} images. Skipped {skipped_count} images without .webp versions."))
