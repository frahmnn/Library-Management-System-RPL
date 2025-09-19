// Simple in-memory storage for BookRequirement entities
// In a real app, this would connect to a database or API

let requirements = JSON.parse(localStorage.getItem('book_requirements') || '[]');
let nextId = Math.max(...requirements.map(r => r.id || 0), 0) + 1;

export const BookRequirement = {
  // Create a new book requirement
  async create(requirementData) {
    const requirement = {
      id: nextId++,
      ...requirementData,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    };
    requirements.push(requirement);
    this.save();
    return requirement;
  },

  // List all requirements with optional sorting
  async list(sortBy = '-created_date') {
    let sortedRequirements = [...requirements];
    
    // Handle sorting
    if (sortBy.startsWith('-')) {
      const field = sortBy.substring(1);
      sortedRequirements.sort((a, b) => {
        if (a[field] < b[field]) return 1;
        if (a[field] > b[field]) return -1;
        return 0;
      });
    } else {
      sortedRequirements.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    }
    
    return sortedRequirements;
  },

  // Get a requirement by ID
  async get(id) {
    return requirements.find(req => req.id === id);
  },

  // Update a requirement
  async update(id, requirementData) {
    const index = requirements.findIndex(req => req.id === id);
    if (index === -1) {
      throw new Error('Requirement not found');
    }
    
    requirements[index] = {
      ...requirements[index],
      ...requirementData,
      id: id, // Ensure ID doesn't change
      updated_date: new Date().toISOString()
    };
    this.save();
    return requirements[index];
  },

  // Delete a requirement
  async delete(id) {
    const index = requirements.findIndex(req => req.id === id);
    if (index === -1) {
      throw new Error('Requirement not found');
    }
    
    const deletedRequirement = requirements.splice(index, 1)[0];
    this.save();
    return deletedRequirement;
  },

  // Save to localStorage
  save() {
    localStorage.setItem('book_requirements', JSON.stringify(requirements));
  },

  // Clear all requirements (for testing)
  clear() {
    requirements = [];
    localStorage.removeItem('book_requirements');
  }
};