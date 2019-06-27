from django.contrib.auth.models import User
from rest_framework import serializers
from .models import LoginDetials


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """docstring for UserSerializer"""
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'last_name', 'first_name', 'date_joined', 'last_login','id')


class LoginDetialsSerializer(serializers.ModelSerializer):
    """docstring for LoginDetialsSerializer"""
    class Meta:
        model = LoginDetials
        fields = "__all__"
