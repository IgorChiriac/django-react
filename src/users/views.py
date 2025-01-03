from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import Permission

from src.users.models import User
from src.users.permissions import ListAdminOnly, AnonCreateAndUpdateOwnerOnly
from src.users.serializers import CreateUserSerializer, UserSerializer


class UserViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet, mixins.DestroyModelMixin):
    """
    Creates, Updates and Retrieves - User Accounts
    """

    queryset = User.objects.all()
    serializers = {'default': UserSerializer, 'create': CreateUserSerializer}
    permissions = {'default': (ListAdminOnly, AnonCreateAndUpdateOwnerOnly,)}

    def perform_update(self, serializer):
        instance = self.get_object()
        permission = Permission.objects.get(name='Can manage users and restaurants.')
        if "is_admin" in self.request.data:
            if self.request.data.get("is_admin") == True or self.request.data.get("is_admin") == 'true': 
                instance.user_permissions.add(permission)
            else:
                instance.user_permissions.remove(permission)
        serializer.save()

    def get_serializer_class(self):
        return self.serializers.get(self.action, self.serializers['default'])

    def get_permissions(self):
        self.permission_classes = self.permissions.get(self.action, self.permissions['default'])
        return super().get_permissions()

    @action(detail=False, methods=['get'], url_path='me', url_name='me')
    def get_user_data(self, instance):
        try:
            return Response(UserSerializer(self.request.user, context={'request': self.request}).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Wrong auth token' + e}, status=status.HTTP_400_BAD_REQUEST)