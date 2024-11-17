from django.urls import path
from .views import *
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version="v1",
        description="Test description",
        contact=openapi.Contact(email="alrefa3ee.abd@gmail.com"),
    ),
    public=False,
    permission_classes=(permissions.BasePermission,),
)

urlpatterns = [
    path(
        "swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("token/", ObtainTokenPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshCustomView.as_view(), name="token_refresh"),
    path("testToken/", TestToken.as_view(), name="test_token"),

    path("teachers/<int:id>", getTeacher, name="get_teacher"),
    path("students/create/", StudentCreateView.as_view(), name="student-create"),
   
   path("userInfo/", UserInfo.as_view(), name="user_info"),

   path("teacher/register/", CompleteTeacherRegistration.as_view(), name="teacher_register"),
]
   
#  "user": {
#     "username": "newteacher",
#     "email": "teacher@example.com",
#     "password": "securepassword123"
#   },
#   "phone_number": "1234567890",
#   "specialty": "Mathematics",
#   "experience_years": 5,
#   "profile_picture": "file_here",
#   "video_introduction": "file_here",
#   "availability": [
#     {
#       "day_of_week": "Monday",
#       "start_time": "09:00",
#       "end_time": "12:00"
#     },
#     {
#       "day_of_week": "Wednesday",
#       "start_time": "14:00",
#       "end_time": "17:00"
#     }
#   ]