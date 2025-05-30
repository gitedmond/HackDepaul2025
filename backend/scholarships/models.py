from django.db import models

# Create your models here.
class Scholarship(models.Model):
    scholarshipID = models.AutoField(primary_key=True)
    scholarshipTitle = models.CharField(max_length=255)
    scholarshipMoney = models.DecimalField(max_digits=12, decimal_places=2)
    startDate = models.DateField()
    endDate = models.DateField()
    isValid = models.BooleanField(default=True)
    GPA = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    race_background = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.scholarshipTitle