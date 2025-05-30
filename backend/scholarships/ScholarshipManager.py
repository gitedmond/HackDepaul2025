class ScholarshipManager():
    """
    ScholarshipManager is a singleton class that manages the scholarships.
    It provides methods to add, remove, and retrieve scholarships.
    """

    def __init__(self):
        self.scholarships = []

    def add_scholarship(self, scholarship):
        """Adds a scholarship to the list."""
        self.scholarships.append(scholarship)

    def remove_scholarship(self, scholarship):
        """Removes a scholarship from the list."""
        if scholarship in self.scholarships:
            self.scholarships.remove(scholarship)

    def get_scholarships(self):
        """Returns the list of scholarships."""
        return self.scholarships