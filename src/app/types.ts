export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  categoryId: string;
  publisherId: string;
  publishYear: number;
  pageCount: number;
  stock: number;
  available: number;
  coverImage?: string;
  description?: string;
  language: string;
  shelfLocation: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  membershipDate: string;
  membershipType: 'student' | 'teacher' | 'public';
  status: 'active' | 'suspended' | 'expired';
  borrowedBooks: number;
  overdueBooks: number;
  avatar?: string;
}

export interface Borrowing {
  id: string;
  bookId: string;
  memberId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'borrowed' | 'returned' | 'overdue';
  renewCount: number;
  fineAmount: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  bookCount: number;
}

export interface Author {
  id: string;
  name: string;
  biography?: string;
  birthYear?: number;
  nationality?: string;
  bookCount: number;
}

export interface Publisher {
  id: string;
  name: string;
  country: string;
  website?: string;
  bookCount: number;
}

export interface Stats {
  totalBooks: number;
  totalMembers: number;
  activeBorrowings: number;
  overdueBooks: number;
  todayBorrowings: number;
  todayReturns: number;
  availableBooks: number;
  totalFines: number;
}
