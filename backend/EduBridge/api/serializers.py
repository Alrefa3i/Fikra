from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Teacher, Student , Availability, TeacherTermsAgreement , Session
import json

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password", "email")



class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = ("id", "user")

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create_user(**user_data)
        student = Student.objects.create(user=user, **validated_data)
        return student


class TokenPairSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

    def create(self, validated_data):
        return RefreshToken(validated_data["refresh"])

    def update(self, instance, validated_data):
        pass




# class AvailabilitySerializer(serializers.ModelSerializer):



#     class Meta:
#         model = Availability
#         fields = ['day_of_week', 'start_time', 'end_time']



# class TeacherRegistrationSerializer(serializers.ModelSerializer):
#     """
#     Serializer for handling teacher registration with nested availability and user creation.
#     """
#     profile_picture = serializers.ImageField(required=True)  # Ensure profile picture is provided
#     video_introduction = serializers.FileField(required=False)  # Optional field for video
#     # User data (username, email, and password)
#     user = serializers.DictField(child=serializers.CharField(), required=True)
#     # Availability data
#     availability = AvailabilitySerializer(many=True, required=True)

#     class Meta:
#         model = Teacher
#         fields = [
#             "user",
#             "phone_number",
#             "specialty",
#             "experience_years",
#             "profile_picture",
#             "video_introduction",
#             "availability",
#     ]

#     def validate(self, data):
#         print(data)
#         print("validate")
#         print(data)
#         print("validate")
    
    
#         if not data:
#             raise serializers.ValidationError({"user": "User data (username, email, password) is required."})
        
#         return data

#     def create(self, validated_data):
#         """
#         Create the user, then the Teacher instance and associated Availability data.
#         """

#         print("validated_data")
#         print(validated_data)
#         print("validated_data")
#         # Extract the user data
#         username = validated_data.pop("user['username']")
#         password = validated_data.pop("user['password']")
#         email = validated_data.pop("user['email']")

#         # Create the User instance
#         user = User.objects.create_user(
#             username=username,
#             email=email,
#             password=password
#         )

#         # Create the Teacher instance
#         teacher = Teacher.objects.create(
#             user=user,
#             phone_number=validated_data["phone_number"],
#             specialty=validated_data["specialty"],
#             experience_years=validated_data["experience_years"],
#             profile_picture=validated_data["profile_picture"],
#             video_introduction=validated_data.get("video_introduction"),
#             terms_accepted=True,
#         )


#         return teacher


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['day_of_week', 'start_time', 'end_time']

import random
class TeacherRegistrationSerializer(serializers.ModelSerializer):
    user = serializers.JSONField()
    availability = serializers.JSONField() 
    profile_picture = serializers.ImageField(required=True)
    video_introduction = serializers.FileField(required=False)

    class Meta:
        model = Teacher
        fields = [
            'user', 'phone_number', 'specialty', 'experience_years',
            'profile_picture', 'video_introduction', 'availability'
        ]

    def create(self, validated_data):


        print("validated_data")
        print(validated_data)
        # Extract nested data
        user_data = validated_data.pop('user')
        availability_data = validated_data.pop('availability')
    
        print("user_data")
        print(user_data)
        # Create the User instance
        user = User.objects.create_user(
            username=user_data['username'],
            email=user_data['email'],
            password=user_data['password']
        )
        # generate random username
       
        # Create the Teacher instance
        teacher = Teacher.objects.create(
            user=user,
            phone_number=validated_data['phone_number'],
            specialty=validated_data['specialty'],
            experience_years=validated_data['experience_years'],
            profile_picture=validated_data['profile_picture'],
            video_introduction=validated_data.get('video_introduction'),
        )

        # Create Availability instances
        for slot in availability_data:
            Availability.objects.create(
                teacher=teacher,
                day_of_week=slot['day_of_week'],
                start_time=slot['start_time'],
                end_time=slot['end_time']
            )

        return teacher

    def validate_availability(self, value):
        if isinstance(value, str):
            # Parse JSON string if necessary
            try:
                value = json.loads(value)
                print(value)
            except json.JSONDecodeError:
                raise serializers.ValidationError("Invalid JSON format for availability.")
        if not isinstance(value, list):
            raise serializers.ValidationError("Availability must be a list of slots.")
        for slot in value:

            if not isinstance(slot, dict):
                raise serializers.ValidationError("Each availability slot must be a dictionary.")
            if not all(k in slot for k in ['day_of_week', 'start_time', 'end_time']):
                raise serializers.ValidationError("Each availability slot must include 'day_of_week', 'start_time', and 'end_time'.")
        return value