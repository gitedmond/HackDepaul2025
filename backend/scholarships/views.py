from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from backend.scholarships import ScholarshipManager

# Create your views here.
@csrf_exempt
def scholarship_list(request):
    if request.method == 'GET':
        # Logic to retrieve and return the list of scholarships
        # probably make a scholarship manager to handle the logic
        # should filter out scholarships for recs for the student
        scholarshipManager = ScholarshipManager()
        scholarships = scholarshipManager.get_scholarships()
        scholarships.smartSort()  # Assuming smartSort is a method to sort scholarships
        return render(request, 'scholarships/scholarship_list.html')
    elif request.method == 'POST':
        # Logic to create a new scholarship
        return render(request, 'scholarships/scholarship_create.html')
    else:
        return render(request, 'scholarships/error.html', status=405)