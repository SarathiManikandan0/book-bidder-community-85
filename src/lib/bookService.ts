
import { Book } from './data';
import { useAuth } from '@/contexts/AuthContext';

// Define the allowed book conditions
export type BookCondition = "New" | "Like New" | "Very Good" | "Good" | "Fair" | "Poor";

// Extend the Book interface to include a seller ID
export interface BookWithSeller extends Book {
  sellerId: string;
  condition: BookCondition;
}

export class BookService {
  private static STORAGE_KEY = 'sharebook_books';

  // Get all books
  static getAllBooks(): BookWithSeller[] {
    const books = localStorage.getItem(this.STORAGE_KEY);
    return books ? JSON.parse(books) : [];
  }

  // Get books by seller ID
  static getBooksBySeller(sellerId: string): BookWithSeller[] {
    const allBooks = this.getAllBooks();
    return allBooks.filter(book => book.sellerId === sellerId);
  }

  // Add a new book
  static addBook(book: Partial<BookWithSeller>): BookWithSeller {
    const allBooks = this.getAllBooks();
    
    // Create a new book object
    const newBook: BookWithSeller = {
      id: `book-${Date.now()}`,
      title: book.title || '',
      author: book.author || '',
      coverImage: book.coverImage || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop',
      description: book.description || '',
      price: book.price ? parseFloat(book.price.toString()) : 0,
      condition: book.condition || 'Good',
      genre: book.genre as string[] || ['Academic'],
      language: book.language || 'English',
      isAuction: book.isAuction || false,
      listedDate: new Date().toISOString(),
      sellerId: book.sellerId || '',
      seller: book.seller || {
        id: '',
        name: '',
        rating: 0,
        avatar: ''
      },
      publishedDate: book.publishedDate || new Date().toISOString(),
      isbn: book.isbn || '',
      pageCount: book.pageCount || 0,
      views: 0
    };
    
    // Save to localStorage
    allBooks.push(newBook);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allBooks));
    
    return newBook;
  }

  // Update a book
  static updateBook(id: string, updates: Partial<BookWithSeller>): BookWithSeller | null {
    const allBooks = this.getAllBooks();
    const bookIndex = allBooks.findIndex(book => book.id === id);
    
    if (bookIndex === -1) return null;
    
    // Update the book
    const updatedBook = { ...allBooks[bookIndex], ...updates };
    allBooks[bookIndex] = updatedBook;
    
    // Save to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allBooks));
    
    return updatedBook;
  }

  // Delete a book
  static deleteBook(id: string): boolean {
    const allBooks = this.getAllBooks();
    const filteredBooks = allBooks.filter(book => book.id !== id);
    
    if (filteredBooks.length === allBooks.length) return false;
    
    // Save to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredBooks));
    
    return true;
  }

  // Format price to display in Indian Rupees (₹)
  static formatPrice(price: number): string {
    return `₹${price.toFixed(2)}`;
  }

  // Initialize with sample books if empty
  static initializeWithSampleBooks(): void {
    const existingBooks = this.getAllBooks();
    
    if (existingBooks.length === 0) {
      // Import sample books from data.ts
      import('./data').then(({ books }) => {
        const booksWithSeller = books.map(book => ({
          ...book,
          sellerId: book.seller.id,
        })) as BookWithSeller[];
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(booksWithSeller));
      });
    }
  }
}

// Initialize sample books when the module is imported
BookService.initializeWithSampleBooks();
