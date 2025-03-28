export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  price: number;
  condition: 'New' | 'Like New' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  genre: string[];
  language: string;
  isAuction: boolean;
  listedDate?: string;
  auctionData?: {
    currentBid: number;
    startingBid: number;
    bidsCount: number;
    endsAt: string;
    highDemand: boolean;
  };
  seller: {
    id: string;
    name: string;
    rating: number;
    avatar: string;
  };
  publishedDate: string;
  isbn: string;
  pageCount: number;
  views: number;
}

export const books: Book[] = [
  {
    id: "1",
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    description: "A special 25th anniversary edition of the extraordinary international bestseller, including a new Foreword by Paulo Coelho. Combining magic, mysticism, wisdom and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.",
    price: 24.99,
    condition: "Like New",
    genre: ["Fiction", "Philosophy", "Adventure"],
    language: "English",
    isAuction: true,
    listedDate: "2024-03-20T14:56:29.000Z",
    auctionData: {
      currentBid: 52.00,
      startingBid: 19.99,
      bidsCount: 14,
      endsAt: "2024-08-30T23:59:59Z",
      highDemand: true
    },
    seller: {
      id: "seller1",
      name: "Jane Austen",
      rating: 4.8,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&h=250&auto=format&fit=crop"
    },
    publishedDate: "1988-01-01",
    isbn: "9780062315007",
    pageCount: 208,
    views: 2453
  },
  {
    id: "2",
    title: "Dune",
    author: "Frank Herbert",
    coverImage: "https://images.unsplash.com/photo-1598618589929-b58a4a4e3a8d?w=620&auto=format&fit=crop",
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for...',
    price: 35.50,
    condition: "New",
    genre: ["Science Fiction", "Fantasy", "Classic"],
    language: "English",
    isAuction: false,
    seller: {
      id: "seller2",
      name: "Isaac Asimov",
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=250&auto=format&fit=crop"
    },
    publishedDate: "1965-08-01",
    isbn: "9780441172719",
    pageCount: 412,
    views: 1876
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=620&auto=format&fit=crop",
    description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. 'To Kill A Mockingbird' became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film.",
    price: 19.95,
    condition: "Very Good",
    genre: ["Fiction", "Classic", "Historical"],
    language: "English",
    isAuction: true,
    auctionData: {
      currentBid: 45.00,
      startingBid: 15.00,
      bidsCount: 8,
      endsAt: "2024-09-15T23:59:59Z",
      highDemand: true
    },
    seller: {
      id: "seller3",
      name: "Ernest Hemingway",
      rating: 4.7,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&h=250&auto=format&fit=crop"
    },
    publishedDate: "1960-07-11",
    isbn: "9780061120084",
    pageCount: 336,
    views: 2134
  },
  {
    id: "4",
    title: "1984",
    author: "George Orwell",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=620&auto=format&fit=crop",
    description: 'Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell\'s nightmarish vision of a totalitarian, bureaucratic world and one poor stiff\'s attempt to find individuality.',
    price: 22.99,
    condition: "Good",
    genre: ["Fiction", "Dystopian", "Classic"],
    language: "English",
    isAuction: false,
    seller: {
      id: "seller4",
      name: "Virginia Woolf",
      rating: 4.6,
      avatar: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=250&h=250&auto=format&fit=crop"
    },
    publishedDate: "1949-06-08",
    isbn: "9780451524935",
    pageCount: 328,
    views: 1543
  },
  {
    id: "5",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=620&auto=format&fit=crop",
    description: 'Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work \'her own darling child\' and its vivacious heroine, Elizabeth Bennet, \'as delightful a creature as ever appeared in print.\'',
    price: 18.50,
    condition: "Good",
    genre: ["Fiction", "Romance", "Classic"],
    language: "English",
    isAuction: true,
    auctionData: {
      currentBid: 32.50,
      startingBid: 12.00,
      bidsCount: 6,
      endsAt: "2024-09-05T23:59:59Z",
      highDemand: false
    },
    seller: {
      id: "seller5",
      name: "Charles Dickens",
      rating: 4.5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=250&h=250&auto=format&fit=crop"
    },
    publishedDate: "1813-01-28",
    isbn: "9780141439518",
    pageCount: 480,
    views: 1287
  },
  {
    id: "6",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=620&auto=format&fit=crop",
    description: "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    price: 21.00,
    condition: "Very Good",
    genre: ["Fiction", "Classic", "Literary"],
    language: "English",
    isAuction: false,
    seller: {
      id: "seller6",
      name: "Emily Brontë",
      rating: 4.8,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=250&h=250&auto=format&fit=crop"
    },
    publishedDate: "1925-04-10",
    isbn: "9780743273565",
    pageCount: 180,
    views: 1654
  }
];

books.forEach(book => {
  if (!book.listedDate) {
    const randomDays = Math.floor(Math.random() * 30) + 1;
    const date = new Date();
    date.setDate(date.getDate() - randomDays);
    book.listedDate = date.toISOString();
  }
});

export const featuredBooks = books.filter(book => book.isAuction && book.auctionData?.highDemand).slice(0, 2);

export interface Filter {
  title: string;
  author: string;
  minPrice: number;
  maxPrice: number;
  condition: string[];
  genre: string[];
  isAuction: boolean | null;
}

export const initialFilter: Filter = {
  title: "",
  author: "",
  minPrice: 0,
  maxPrice: 100,
  condition: [],
  genre: [],
  isAuction: null
};

export const genres = [...new Set(books.flatMap(book => book.genre))];
export const conditions = ["New", "Like New", "Very Good", "Good", "Fair", "Poor"];

export const filterBooks = (books: Book[], filter: Filter): Book[] => {
  return books.filter(book => {
    const matchesTitle = filter.title ? book.title.toLowerCase().includes(filter.title.toLowerCase()) : true;
    const matchesAuthor = filter.author ? book.author.toLowerCase().includes(filter.author.toLowerCase()) : true;
    const matchesPrice = book.price >= filter.minPrice && book.price <= filter.maxPrice;
    const matchesCondition = filter.condition.length === 0 || filter.condition.includes(book.condition);
    const matchesGenre = filter.genre.length === 0 || book.genre.some(g => filter.genre.includes(g));
    const matchesAuction = filter.isAuction === null || book.isAuction === filter.isAuction;
    
    return matchesTitle && matchesAuthor && matchesPrice && matchesCondition && matchesGenre && matchesAuction;
  });
};
