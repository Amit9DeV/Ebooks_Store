import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1', // Using Google Books API as an example
});

export const searchBooks = async (query) => {
  try {
    const response = await api.get(`/volumes?q=${encodeURIComponent(query)}&maxResults=40`);
    
    // Check if we have items in the response
    if (!response.data.items) {
      return []; // Return empty array if no books found
    }

    return response.data.items.map(book => ({
      id: book.id,
      name: book.volumeInfo.title || 'Untitled',
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
      description: book.volumeInfo.description || 'No description available',
      price: book.saleInfo?.listPrice?.amount || 299, // Default price if not available
      image: book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
      isNew: book.volumeInfo.publishedDate ? 
        new Date(book.volumeInfo.publishedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
        : false,
      categories: book.volumeInfo.categories || [],
      rating: book.volumeInfo.averageRating || 0,
      ratingCount: book.volumeInfo.ratingsCount || 0,
    }));
  } catch (error) {
    console.error('Error searching books:', error);
    return []; // Return empty array on error
  }
};

export const getBookById = async (id) => {
  try {
    const response = await api.get(`/volumes/${id}`);
    const book = response.data;
    
    return {
      id: book.id,
      name: book.volumeInfo.title || 'Untitled',
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
      description: book.volumeInfo.description || 'No description available',
      price: book.saleInfo?.listPrice?.amount || 299,
      image: book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
      isNew: book.volumeInfo.publishedDate ? 
        new Date(book.volumeInfo.publishedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
        : false,
      categories: book.volumeInfo.categories || [],
      rating: book.volumeInfo.averageRating || 0,
      ratingCount: book.volumeInfo.ratingsCount || 0,
      pageCount: book.volumeInfo.pageCount || 0,
      publisher: book.volumeInfo.publisher || 'Unknown Publisher',
      publishedDate: book.volumeInfo.publishedDate || 'Unknown Date',
      language: book.volumeInfo.language || 'unknown',
      isbn: book.volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A',
    };
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

export const getBooksByCategory = async (category) => {
  try {
    const response = await api.get(`/volumes?q=subject:${encodeURIComponent(category)}&maxResults=40`);
    
    if (!response.data.items) {
      return [];
    }

    return response.data.items.map(book => ({
      id: book.id,
      name: book.volumeInfo.title || 'Untitled',
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
      description: book.volumeInfo.description || 'No description available',
      price: book.saleInfo?.listPrice?.amount || 299,
      image: book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
      isNew: book.volumeInfo.publishedDate ? 
        new Date(book.volumeInfo.publishedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
        : false,
      categories: book.volumeInfo.categories || [],
      rating: book.volumeInfo.averageRating || 0,
      ratingCount: book.volumeInfo.ratingsCount || 0,
    }));
  } catch (error) {
    console.error('Error fetching books by category:', error);
    return [];
  }
}; 