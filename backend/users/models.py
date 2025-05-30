from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, school_email, password=None, **extra_fields):
        if not school_email:
            raise ValueError('The School Email is required')
        school_email = self.normalize_email(school_email)
        user = self.model(school_email=school_email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, school_email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(school_email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    DEGREE_LEVELS = [
        ('BA', 'Bachelor'),
        ('MA', 'Master'),
        ('PhD', 'PhD'),
    ]

    SCHOOL_YEARS = [
        ('FR', 'Freshman'),
        ('JR', 'Junior'),
        ('SR', 'Senior'),
    ]

    userID = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    school_email = models.EmailField(unique=True)
    user_gpa = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    major = models.CharField(max_length=100)
    user_resume = models.FileField(upload_to='resumes/')
    school_year = models.CharField(max_length=2, choices=SCHOOL_YEARS)
    expected_end_date = models.DateField(null=True, blank=True)
    degree_level = models.CharField(max_length=3, choices=DEGREE_LEVELS)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'school_email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.school_email
