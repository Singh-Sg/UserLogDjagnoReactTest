import json
from django.db.models import Q
from django.db.models import Count
from django.core import serializers
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.db.models.functions import TruncMonth
from django.core.serializers.json import DjangoJSONEncoder

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.decorators import detail_route
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .models import LoginDetials
from dashboard.serializers import UserSerializer, LoginDetialsSerializer


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        LoginDetials.objects.create(user_id=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })


class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @detail_route(methods=['get'], url_path='logins')
    def get_full_profile(self, request, pk=None):
        """
        Return the full logins for a user.
        """
        user = User.objects.get(pk=pk)
        obj = LoginDetials.objects.filter(user_id=user.id).annotate(month=TruncMonth('login_time')).values('month').annotate(count=Count('id')).values('month', 'count')
        qs_json = json.dumps(list(obj), cls = DjangoJSONEncoder)
        return HttpResponse(qs_json, content_type='application/json')


class LoginDetialsViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing LoginDetails instances.
    """
    serializer_class = LoginDetialsSerializer
    queryset = LoginDetials.objects.all()


class UserList(generics.ListAPIView):
    """
    A ListApiView to search users.
    """
    serializer_class = UserSerializer

    def get_queryset(self):
        search = self.kwargs['search']
        return User.objects.filter(
                Q(username__icontains=search) |
                Q(last_name__icontains=search) |
                Q(first_name__icontains=search))
