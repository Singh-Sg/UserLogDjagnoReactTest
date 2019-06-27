from django.db import models
from django.contrib.auth.models import User


class LoginDetials(models.Model):
    """
    """
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="userID")
    login_time = models.DateTimeField(auto_now_add=True, blank=False)
