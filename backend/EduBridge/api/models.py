from django.db import models
from django.contrib.auth.models import User



class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="teacher_profile")
    phone_number = models.CharField(max_length=15, blank=False, null=False)
    specialty = models.CharField(max_length=200, blank=False)
    experience_years = models.PositiveIntegerField(default=0)
    profile_picture = models.ImageField(upload_to="media/teacher_profiles/", blank=True, null=True)
    video_introduction = models.FileField(upload_to="media/teacher_videos/", blank=True, null=True)
    terms_accepted = models.BooleanField(default=False)



    def __str__(self):
        return f"Teacher: {self.user.username}"


class Availability(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="availability")
    day_of_week = models.CharField(
        max_length=9,
        choices=[
            ("Monday", "Monday"),
            ("Tuesday", "Tuesday"),
            ("Wednesday", "Wednesday"),
            ("Thursday", "Thursday"),
            ("Friday", "Friday"),
            ("Saturday", "Saturday"),
            ("Sunday", "Sunday"),
        ],
    )
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.teacher.user.username} - {self.day_of_week}: {self.start_time} to {self.end_time}"


class TeacherTermsAgreement(models.Model):
    teacher = models.OneToOneField(Teacher, on_delete=models.CASCADE, related_name="terms_agreement")
    agreed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Terms Agreement for {self.teacher.user.username} at {self.agreed_at}"

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    picture = models.ImageField(upload_to="media/students", blank=True)
    bio = models.TextField(blank=True)

    sessions = models.ManyToManyField("Session", blank=True)

    def __str__(self):
        return self.user.username


class Session(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    datetime = models.DateTimeField()
    duration = models.PositiveIntegerField(default=60)
    meeting_link = models.URLField(blank=True)
    students = models.ManyToManyField(Student, blank=True ) 
    price = models.DecimalField(max_digits=6, decimal_places=2)


    def __str__(self):
        return f"{self.teacher.user.username} - {self.datetime}"