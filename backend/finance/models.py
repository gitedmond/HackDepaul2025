from django.db import models
from django.conf import settings

class Loan(models.Model):
    loanID = models.AutoField(primary_key=True)
    loanProvider = models.CharField(max_length=100)  # e.g., "Navient"
    loanSite = models.URLField(max_length=200, blank=True, null=True)  # e.g., "https://navient.com"

    def __str__(self):
        return f"{self.loanProvider} (ID: {self.loanID})"


class UserLoan(models.Model):
    userID = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    loanID = models.ForeignKey(Loan, on_delete=models.SET_NULL, null=True)
    loanAmount = models.DecimalField(max_digits=10, decimal_places=2)
    loanInterestRate = models.DecimalField(max_digits=4, decimal_places=2)
    loanStartDate = models.DateField()

    def __str__(self):
        return f"{self.userID.school_email} - {self.loanID.loanProvider if self.loanID else 'No Loan'}"
