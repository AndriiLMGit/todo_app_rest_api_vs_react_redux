from django.shortcuts import get_object_or_404
from .models import Task
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import TaskSerializer
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, permission_classes

# Create your views here.


@api_view(['GET', ])
@permission_classes([IsAuthenticated, ])
def get_user_tasks(request):
    tasks = Task.objects.filter(owner=request.user.id)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['POST', ])
@permission_classes([IsAuthenticated, ])
def create_task(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE', 'PUT'])
@permission_classes([IsAuthenticated, ])
def change_vs_delete_task(request, id):
    task = get_object_or_404(Task, id=id)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = TaskSerializer(task, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        task.delete()
        return Response({'message': 'Task has been deleted successfully!'}, status=204)
