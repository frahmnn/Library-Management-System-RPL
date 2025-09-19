// Simple in-memory storage for Book entities
// In a real app, this would connect to a database or API

let books = JSON.parse(localStorage.getItem('books') || '[]');
let nextId = Math.max(...books.map(b => b.id || 0), 0) + 1;

export const Book = {
  // Create a new book
  async create(bookData) {
    const book = {
      id: nextId++,
      ...bookData,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    };
    books.push(book);
    this.save();
    return book;
  },

  // List all books with optional sorting
  async list(sortBy = '-created_date') {
    let sortedBooks = [...books];
    
    // Handle sorting
    if (sortBy.startsWith('-')) {
      const field = sortBy.substring(1);
      sortedBooks.sort((a, b) => {
        if (a[field] < b[field]) return 1;
        if (a[field] > b[field]) return -1;
        return 0;
      });
    } else {
      sortedBooks.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    }
    
    return sortedBooks;
  },

  // Get a book by ID
  async get(id) {
    return books.find(book => book.id === id);
  },

  // Update a book
  async update(id, bookData) {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) {
      throw new Error('Book not found');
    }
    
    books[index] = {
      ...books[index],
      ...bookData,
      id: id, // Ensure ID doesn't change
      updated_date: new Date().toISOString()
    };
    this.save();
    return books[index];
  },

  // Delete a book
  async delete(id) {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) {
      throw new Error('Book not found');
    }
    
    const deletedBook = books.splice(index, 1)[0];
    this.save();
    return deletedBook;
  },

  // Save to localStorage
  save() {
    localStorage.setItem('books', JSON.stringify(books));
  },

  // Clear all books (for testing)
  clear() {
    books = [];
    localStorage.removeItem('books');
  }
};