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

// New function to fetch book content
export const getBookContent = async (id) => {
  try {
    // First, get the book details from Google Books API
    const response = await api.get(`/volumes/${id}`);
    const book = response.data;
    
    // Check if this is a public domain book
    const isPublicDomain = book.accessInfo?.publicDomain === true;
    
    if (isPublicDomain) {
      // For public domain books, try to fetch from Project Gutenberg
      try {
        // Extract potential Gutenberg ID from industry identifiers
        const gutenbergId = book.volumeInfo?.industryIdentifiers?.find(
          id => id.type === 'OTHER' && id.identifier.includes('gutenberg')
        )?.identifier.match(/\d+/)?.[0];
        
        if (gutenbergId) {
          // Fetch from Project Gutenberg API
          const gutenbergResponse = await axios.get(
            `https://gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.txt`
          );
          
          // Process the raw text content
          const content = gutenbergResponse.data;
          
          // Basic formatting for the content
          const formattedContent = `# ${book.volumeInfo.title || 'Untitled'}\n\n` +
            `## By ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}\n\n` +
            processGutenbergContent(content);
          
          return formattedContent;
        }
      } catch (error) {
        console.error('Error fetching from Project Gutenberg:', error);
        // Continue to fallback options
      }
    }
    
    // Check if we have access to preview content
    if (book.accessInfo?.viewability === 'PARTIAL' && book.volumeInfo?.description) {
      return `# ${book.volumeInfo.title || 'Untitled'}\n\n` +
        `## By ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}\n\n` +
        `### Preview\n\n` +
        `${book.volumeInfo.description}\n\n` +
        `---\n\n` +
        `This is a preview of the book. To read the full content, please purchase the book.`;
    }
    
    // If this is a paid book
    if (book.saleInfo?.saleability === 'FOR_SALE') {
      return `# ${book.volumeInfo.title || 'Untitled'}\n\n` +
        `## By ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}\n\n` +
        `### Purchase Required\n\n` +
        `This book is available for purchase. Please buy the book to access its full content.\n\n` +
        `Price: ${book.saleInfo.listPrice?.amount || 'N/A'} ${book.saleInfo.listPrice?.currencyCode || 'USD'}\n\n` +
        `Preview:\n${book.volumeInfo.description || 'No preview available.'}`;
    }
    
    // If no content is available
    return `# ${book.volumeInfo.title || 'Untitled'}\n\n` +
      `## By ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}\n\n` +
      `### Content Not Available\n\n` +
      `We apologize, but the content of this book is not currently available in our system. ` +
      `This might be due to licensing restrictions or technical limitations.\n\n` +
      `Please try one of the following:\n` +
      `* Purchase the book from a supported retailer\n` +
      `* Check if a physical copy is available in your local library\n` +
      `* Contact our support team for assistance`;
  } catch (error) {
    console.error('Error fetching book content:', error);
    throw new Error('Failed to load book content. Please try again later.');
  }
};

// Helper function to process Gutenberg content
const processGutenbergContent = (content) => {
  // Remove Project Gutenberg header and footer
  let processed = content
    .replace(/^.*?\*\*\* START OF.*?\*\*\*/s, '') // Remove header
    .replace(/\*\*\* END OF.*$/s, ''); // Remove footer
    
  // Split into lines and remove empty lines at start and end
  let lines = processed.split('\n').map(line => line.trim());
  while (lines[0] === '') lines.shift();
  while (lines[lines.length - 1] === '') lines.pop();
  
  // Basic markdown formatting
  let chapters = [];
  let currentChapter = [];
  let inChapter = false;
  
  lines.forEach(line => {
    // Detect chapter headings
    if (line.match(/^(CHAPTER|Chapter|BOOK|Book)\s+[IVXLC\d]+/i)) {
      if (inChapter) {
        chapters.push(currentChapter.join('\n\n'));
        currentChapter = [];
      }
      inChapter = true;
      currentChapter.push(`## ${line}`);
    } else if (line.length > 0) {
      if (!inChapter) {
        inChapter = true;
      }
      currentChapter.push(line);
    }
  });
  
  // Add the last chapter
  if (currentChapter.length > 0) {
    chapters.push(currentChapter.join('\n\n'));
  }
  
  return chapters.join('\n\n---\n\n');
}; 