from django.urls import path
from .views import test_api, upload_pdf

urlpatterns = [
    path('test/', test_api),
    path('upload/', upload_pdf),
]