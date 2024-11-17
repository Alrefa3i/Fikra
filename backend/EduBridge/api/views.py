from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import Teacher, Student , Availability, TeacherTermsAgreement , Session
from django.core import serializers
from django.http import JsonResponse
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view
import random
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import  StudentSerializer , TeacherRegistrationSerializer
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core import serializers
from .models import Teacher, Student , Availability, TeacherTermsAgreement 
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated

import json





@api_view(["GET"])
def getTeacher(request, id):
    try:
        teacher = Teacher.objects.get(id=id)
    except Teacher.DoesNotExist:
        return JsonResponse({"error": "Teacher not found"}, status=404)
    serialized_teacher = serializers.serialize(
        "json",
        [
            teacher,
        ],
    )
    serialized_teacher = json.loads(serialized_teacher)[0]["fields"]
    return Response(serialized_teacher)


class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserInfo(GenericAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]  # Explicitly specify JWTAuthentication


    def get(self, request, *args, **kwargs):
        user = request.user  # Get the user from the request object
        user_data = None
        if hasattr(user, "teacher"):
            teacher = Teacher.objects.get(user=user)
            serialized_teacher = serializers.serialize(
                "json",
                [teacher],
            )
            serialized_teacher = json.loads(serialized_teacher)[0]["fields"]
        
            user_data = {
                "user": user.username,
                "email": user.email,
                "is_teacher": True,
                "teacher": serialized_teacher,
            }
            

        # Check if the user has a related student profile
        elif hasattr(user, "student"):
            student = Student.objects.get(user=user)
            serialized_student = serializers.serialize(
                "json",
                [student],
            )
            serialized_student = json.loads(serialized_student)[0]["fields"]
            user_data = {
                "user": user.username,
                "email": user.email,
                "is_teacher": False,
                "student": serialized_student,
            }
      
        else:
            return Response(data={"message": "User not found"}, status=404)
        return Response(user_data, status=200)
    


# class CompleteTeacherRegistration(APIView):
#     """
#     Handle the submission of all teacher registration data in one request.
#     Create a user and then register the teacher data.
#     """
#     permission_classes = [AllowAny]
#     authentication_classes = []

#     def post(self, request, *args, **kwargs):
#         # Extract user data from the request (this would typically come from a registration form)
#         user_data = {
#             'username': request.data.get('user[username]'),
#             'password': request.data.get('user[passsword]'),
#             'email': request.data.get('user[email]'),
#         }
#         if not user_data:
#             return Response({"error": "User data is required."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
          
#             # Step 1: Create the User instance
#             user = User.objects.create_user(
#                 username=user_data['username'],
#                 email=user_data['email'],
#                 password=user_data['password']
#             )
           
#             # Step 2: Validate and process the teacher's information (using TeacherRegistrationSerializer)
#             teacher_serializer = TeacherRegistrationSerializer(data=request.data)
#             # print(teacher_serializer.initial_data['availability'])

           

#             if teacher_serializer.is_valid():
#                 print("valid - "*100)
#                 teacher_data = teacher_serializer.validated_data

#                 # Step 3: Create Teacher instance and link the created User
#                 teacher = Teacher.objects.create(
#                     user=user,  # Associate the created User
#                     phone_number=teacher_data['phone_number'],
#                     specialty=teacher_data['specialty'],
#                     experience_years=teacher_data['experience_years'],
#                     profile_picture=teacher_data['profile_picture'],
#                     video_introduction=teacher_data.get('video_introduction'),
#                     terms_accepted=True,
#                 )

#                 # # Step 4: Create Availability instances
#                 # availability_data = teacher_data.get('availability', [])
#                 # for slot in availability_data:
#                 #     Availability.objects.create(
#                 #         teacher=teacher,
#                 #         day_of_week=slot["day_of_week"],
#                 #         start_time=slot["start_time"],
#                 #         end_time=slot["end_time"],
#                 #     )

#                 # Step 5: Create Terms Agreement
#                 TeacherTermsAgreement.objects.create(teacher=teacher)

#                 return Response({"message": "Teacher registration completed successfully."}, status=status.HTTP_201_CREATED)

#             return Response(teacher_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         except KeyError as e:
#             return Response({"error": f"Missing field: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
#         except ValidationError as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class CompleteTeacherRegistration(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        serializer = TeacherRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Teacher registration completed successfully."}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Token obtain and refresh views
class ObtainTokenPairView(TokenObtainPairView):
    pass


class TokenRefreshCustomView(TokenRefreshView):
    pass


class TestToken(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(data={"message": "Token is valid" }, status=200)
    

