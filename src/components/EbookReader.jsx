import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  Bookmark, 
  Copy, 
  Moon, 
  Sun, 
  ZoomIn, 
  ZoomOut, 
  Type,
  X,
  Share,
  Loader2,
  Clock,
  Layout,
  AlignLeft,
  AlignCenter,
  Highlighter,
  BookOpen,
  ChevronDown
} from 'lucide-react';

export default function EbookReader({ 
  content, 
  title, 
  author, 
  onClose,
  coverImage 
}) {
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState('Georgia, serif');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bookmarks, setBookmarks] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [progress, setProgress] = useState(0);
  const [contentSections, setContentSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textAlign, setTextAlign] = useState('left');
  const [lineSpacing, setLineSpacing] = useState(1.8);
  const [showChapterList, setShowChapterList] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState('');
  const [estimatedReadingTime, setEstimatedReadingTime] = useState(0);

  // Text selection and highlighting
  const [selectedText, setSelectedText] = useState('');
  const [highlights, setHighlights] = useState([]);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem(`bookmarks_${title}`);
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (err) {
      console.error('Error loading bookmarks:', err);
    }
  }, [title]);

  // Split content into pages/sections for navigation
  useEffect(() => {
    if (content) {
      setLoading(true);
      
      // More sophisticated content parsing
      // Look for chapter markers, headings or natural breaks
      let sections = [];
      
      // Check if content has markdown headings
      if (content.includes('# ') || content.includes('## ')) {
        // Split by heading markers (chapters)
        const rawSections = content.split(/(?=# )|(?=## )/);
        
        // Process each section, preventing them from being too long
        rawSections.forEach(section => {
          // For very long sections, split them further into smaller chunks
          if (section.length > 3000) {
            // Split long sections by paragraphs
            const paragraphs = section.split('\n\n');
            
            // Group paragraphs into reasonable sized chunks
            let currentChunk = [];
            let currentLength = 0;
            
            paragraphs.forEach(paragraph => {
              currentChunk.push(paragraph);
              currentLength += paragraph.length;
              
              // If chunk is big enough, add it as a section
              if (currentLength > 1500) {
                sections.push(currentChunk.join('\n\n'));
                currentChunk = [];
                currentLength = 0;
              }
            });
            
            // Add any remaining paragraphs
            if (currentChunk.length > 0) {
              sections.push(currentChunk.join('\n\n'));
            }
          } else {
            // Add shorter sections as they are
            sections.push(section);
          }
        });
      } else {
        // If no headings, split by paragraphs
        const paragraphs = content.split('\n\n').filter(s => s.trim().length > 0);
        
        // Group paragraphs into pages (about 1500-2000 chars per page)
        let currentPage = [];
        let currentLength = 0;
        
        paragraphs.forEach(paragraph => {
          currentPage.push(paragraph);
          currentLength += paragraph.length;
          
          if (currentLength > 1500) {
            sections.push(currentPage.join('\n\n'));
            currentPage = [];
            currentLength = 0;
          }
        });
        
        // Add any remaining paragraphs
        if (currentPage.length > 0) {
          sections.push(currentPage.join('\n\n'));
        }
      }
      
      setContentSections(sections);
      setTotalPages(Math.max(1, sections.length));
      setLoading(false);
    }
  }, [content]);

  // Update progress when page changes
  useEffect(() => {
    setProgress(Math.round((currentPage / totalPages) * 100));
  }, [currentPage, totalPages]);

  // Text selection handler
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setSelectedText(selection.toString());
    }
  };

  // Add bookmark at current position
  const addBookmark = () => {
    if (!bookmarks.includes(currentPage)) {
      const newBookmarks = [...bookmarks, currentPage];
      setBookmarks(newBookmarks);
      
      // Save to localStorage
      try {
        localStorage.setItem(`bookmarks_${title}`, JSON.stringify(newBookmarks));
      } catch (err) {
        console.error('Error saving bookmark:', err);
      }
    }
  };

  // Remove bookmark
  const removeBookmark = (page) => {
    const newBookmarks = bookmarks.filter(b => b !== page);
    setBookmarks(newBookmarks);
    
    // Update localStorage
    try {
      localStorage.setItem(`bookmarks_${title}`, JSON.stringify(newBookmarks));
    } catch (err) {
      console.error('Error removing bookmark:', err);
    }
  };

  // Handle page navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Copy selected text
  const copySelectedText = () => {
    if (selectedText) {
      navigator.clipboard.writeText(selectedText);
      alert('Text copied!');
      setSelectedText('');
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle closing the reader, passing current page back
  const handleClose = () => {
    if (onClose && typeof onClose === 'function') {
      onClose(currentPage);
    }
  };

  // Format markdown to HTML for display
  const formatContent = (text) => {
    if (!text) return '';
    
    // Basic markdown parsing
    let formatted = text
      // Headers
      .replace(/# (.*?)$/gm, '<h1>$1</h1>')
      .replace(/## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/### (.*?)$/gm, '<h3>$1</h3>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Lists
      .replace(/^\* (.*?)$/gm, '<li>$1</li>')
      // Add paragraphs
      .replace(/^(?!<h|<li)(.*?)$/gm, '<p>$1</p>');
    
    return { __html: formatted };
  };

  // Hide controls after inactivity
  useEffect(() => {
    let timer;
    
    const handleActivity = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!showSettings && !showBookmarks && !selectedText) {
          setShowControls(false);
        }
      }, 3000);
    };

    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('click', handleActivity);
    document.addEventListener('keydown', handleActivity);
    
    return () => {
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('click', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      clearTimeout(timer);
    };
  }, [showSettings, showBookmarks, selectedText]);

  // Calculate reading time
  useEffect(() => {
    if (content) {
      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      setEstimatedReadingTime(Math.ceil(wordCount / wordsPerMinute));
    }
  }, [content]);

  // Extract chapters
  useEffect(() => {
    if (content) {
      const chapterMatches = content.match(/^# (.*?)$/gm) || [];
      const extractedChapters = chapterMatches.map(match => match.replace('# ', ''));
      setChapters(extractedChapters);
      
      if (extractedChapters.length > 0) {
        setCurrentChapter(extractedChapters[0]);
      }
    }
  }, [content]);

  // Update current chapter based on page content
  useEffect(() => {
    if (contentSections[currentPage - 1]) {
      const pageContent = contentSections[currentPage - 1];
      const chapterMatch = pageContent.match(/^# (.*?)$/m);
      if (chapterMatch) {
        setCurrentChapter(chapterMatch[1]);
      }
    }
  }, [currentPage, contentSections]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
      onMouseUp={handleTextSelection}
    >
      {/* Enhanced Reader header */}
      <header 
        className={`py-4 px-6 flex items-center justify-between border-b transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        } backdrop-blur-sm bg-background/80`}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={handleClose}
            className="btn btn-circle btn-sm btn-ghost hover:bg-primary/10"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">{title}</h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{author}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{estimatedReadingTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Chapter dropdown */}
          {chapters.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowChapterList(!showChapterList)}
                className="btn btn-sm btn-ghost gap-2"
              >
                <BookOpen className="h-4 w-4" />
                <span className="max-w-[150px] truncate">{currentChapter}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showChapterList && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-card shadow-xl rounded-lg overflow-hidden z-30">
                  <div className="max-h-64 overflow-y-auto">
                    {chapters.map((chapter, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const pageIndex = contentSections.findIndex(section => section.includes(`# ${chapter}`));
                          if (pageIndex !== -1) {
                            goToPage(pageIndex + 1);
                            setShowChapterList(false);
                          }
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-accent transition-colors ${
                          currentChapter === chapter ? 'bg-accent/50 font-medium' : ''
                        }`}
                      >
                        {chapter}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowSettings(!showSettings)} 
              className={`btn btn-circle btn-sm btn-ghost hover:bg-primary/10 ${
                showSettings ? 'text-primary' : ''
              }`}
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setShowBookmarks(!showBookmarks)} 
              className={`btn btn-circle btn-sm btn-ghost hover:bg-primary/10 ${
                showBookmarks ? 'text-primary' : ''
              }`}
              title="Bookmarks"
            >
              <Bookmark className="h-4 w-4" />
            </button>
            <button 
              onClick={toggleTheme} 
              className="btn btn-circle btn-sm btn-ghost hover:bg-primary/10"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main content container */}
      <div 
        className="flex-1 overflow-auto relative scroll-smooth"
        onClick={() => setShowControls(true)}
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary/30" />
                </div>
              </div>
              <p className="text-lg animate-pulse">Loading book content...</p>
            </div>
          </div>
        ) : (
          <>
            {/* First page may show cover */}
            {currentPage === 1 && coverImage && (
              <div className="max-w-md mx-auto my-8 transition-transform duration-500 hover:scale-105">
                <img 
                  src={coverImage} 
                  alt={title} 
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            )}

            {/* Content */}
            <div 
              className={`max-w-3xl mx-auto p-8 transition-all duration-300 prose prose-${
                isDarkMode ? 'invert' : 'stone'
              } dark:prose-invert`}
              style={{ 
                fontSize: `${fontSize}px`, 
                fontFamily: fontFamily,
                lineHeight: lineSpacing,
                textAlign: textAlign
              }}
            >
              {contentSections.length > 0 && (
                <>
                  <div 
                    dangerouslySetInnerHTML={formatContent(contentSections[currentPage - 1])}
                    className="reader-content"
                  />
                  
                  {/* Page number */}
                  <div className="text-center mt-12 text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                </>
              )}
            </div>

            {/* Enhanced text selection popup */}
            {selectedText && (
              <div 
                className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-card shadow-xl rounded-full px-4 py-2 flex items-center gap-3 z-20 animate-in fade-in slide-in-from-bottom-4`}
              >
                <button 
                  onClick={copySelectedText}
                  className="btn btn-ghost btn-sm gap-2"
                  title="Copy text"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
                <button 
                  onClick={() => {
                    setHighlights([...highlights, selectedText]);
                    setSelectedText('');
                  }}
                  className="btn btn-ghost btn-sm gap-2"
                  title="Highlight"
                >
                  <Highlighter className="h-4 w-4" />
                  Highlight
                </button>
                <button 
                  onClick={() => setSelectedText('')}
                  className="btn btn-ghost btn-sm"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Enhanced Settings panel */}
            {showSettings && (
              <div className="fixed right-8 top-20 bg-card shadow-2xl rounded-lg p-6 w-80 z-20 animate-in slide-in-from-right-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Reading Settings</h3>
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="btn btn-ghost btn-sm btn-circle"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Font size controls */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Font Size</label>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                        className="btn btn-sm btn-ghost"
                        disabled={fontSize <= 12}
                      >
                        <ZoomOut className="h-4 w-4" />
                      </button>
                      <input 
                        type="range" 
                        min="12" 
                        max="32" 
                        value={fontSize} 
                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                        className="range range-sm range-primary flex-1"
                      />
                      <button 
                        onClick={() => setFontSize(Math.min(32, fontSize + 2))}
                        className="btn btn-sm btn-ghost"
                        disabled={fontSize >= 32}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Line spacing */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Line Spacing</label>
                    <input 
                      type="range" 
                      min="1.2" 
                      max="2.4" 
                      step="0.2"
                      value={lineSpacing} 
                      onChange={(e) => setLineSpacing(parseFloat(e.target.value))}
                      className="range range-sm range-primary w-full"
                    />
                  </div>

                  {/* Text alignment */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Text Alignment</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTextAlign('left')}
                        className={`btn btn-sm flex-1 gap-2 ${textAlign === 'left' ? 'btn-primary' : 'btn-ghost'}`}
                      >
                        <AlignLeft className="h-4 w-4" />
                        Left
                      </button>
                      <button
                        onClick={() => setTextAlign('center')}
                        className={`btn btn-sm flex-1 gap-2 ${textAlign === 'center' ? 'btn-primary' : 'btn-ghost'}`}
                      >
                        <AlignCenter className="h-4 w-4" />
                        Center
                      </button>
                    </div>
                  </div>
                  
                  {/* Font family selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Font Family</label>
                    <select 
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="select select-bordered w-full"
                    >
                      <option value="Georgia, serif">Georgia</option>
                      <option value="'Merriweather', serif">Merriweather</option>
                      <option value="'Segoe UI', sans-serif">Segoe UI</option>
                      <option value="'Inter', sans-serif">Inter</option>
                      <option value="'Roboto Mono', monospace">Roboto Mono</option>
                    </select>
                  </div>

                  {/* Layout */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Layout</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setIsDarkMode(false)}
                        className={`btn btn-sm gap-2 ${!isDarkMode ? 'btn-primary' : 'btn-ghost'}`}
                      >
                        <Sun className="h-4 w-4" />
                        Light
                      </button>
                      <button
                        onClick={() => setIsDarkMode(true)}
                        className={`btn btn-sm gap-2 ${isDarkMode ? 'btn-primary' : 'btn-ghost'}`}
                      >
                        <Moon className="h-4 w-4" />
                        Dark
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Bookmarks panel */}
            {showBookmarks && (
              <div className="fixed right-8 top-20 bg-card shadow-2xl rounded-lg p-6 w-80 z-20 animate-in slide-in-from-right-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Bookmarks</h3>
                  <button 
                    onClick={() => setShowBookmarks(false)}
                    className="btn btn-ghost btn-sm btn-circle"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                {bookmarks.length === 0 ? (
                  <div className="text-center py-8">
                    <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">No bookmarks yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Add bookmarks to quickly return to your favorite passages
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="max-h-64 overflow-y-auto">
                      {bookmarks.sort((a, b) => a - b).map(page => (
                        <div 
                          key={page} 
                          className={`p-3 rounded-lg transition-colors ${
                            page === currentPage ? 'bg-primary/10' : 'hover:bg-accent'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Page {page}</span>
                            <button 
                              onClick={() => removeBookmark(page)}
                              className="btn btn-ghost btn-xs text-destructive"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {contentSections[page - 1]?.substring(0, 100)}...
                          </p>
                          <button 
                            onClick={() => {
                              goToPage(page);
                              setShowBookmarks(false);
                            }}
                            className="btn btn-ghost btn-xs mt-2"
                          >
                            Go to page
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={addBookmark}
                      className="btn btn-primary w-full gap-2"
                      disabled={bookmarks.includes(currentPage)}
                    >
                      <Bookmark className="h-4 w-4" />
                      {bookmarks.includes(currentPage) ? 'Page Bookmarked' : 'Bookmark Current Page'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Enhanced Reader footer */}
      <footer 
        className={`py-4 px-6 border-t flex items-center justify-between transition-all duration-300 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
        } backdrop-blur-sm bg-background/80`}
      >
        <button 
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
          className="btn btn-ghost btn-sm gap-2 min-w-[100px]"
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </button>
        
        <div className="w-1/2">
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium">{progress}%</div>
            <div className="flex-1">
              <div className="h-2 bg-accent rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="text-sm font-medium">{currentPage}/{totalPages}</div>
          </div>
        </div>
        
        <button 
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
          className="btn btn-ghost btn-sm gap-2 min-w-[100px]"
        >
          Next
          <ChevronRight className="h-5 w-5" />
        </button>
      </footer>

      {/* Add some additional styles for the markdown content */}
      <style jsx>{`
        .reader-content {
          transition: all 0.3s ease;
        }
        
        .reader-content h1 {
          font-size: 2em;
          margin-top: 1.5em;
          margin-bottom: 0.8em;
          font-weight: 700;
          color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
        }
        
        .reader-content h2 {
          font-size: 1.7em;
          margin-top: 1.3em;
          margin-bottom: 0.7em;
          font-weight: 600;
          color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
        }
        
        .reader-content h3 {
          font-size: 1.4em;
          margin-top: 1.2em;
          margin-bottom: 0.6em;
          font-weight: 600;
          color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
        }
        
        .reader-content p {
          margin-bottom: 1.2em;
          line-height: ${lineSpacing};
        }
        
        .reader-content strong {
          font-weight: 600;
          color: ${isDarkMode ? '#e2e8f0' : '#1e293b'};
        }
        
        .reader-content em {
          font-style: italic;
        }
        
        .reader-content li {
          margin-left: 1.2em;
          margin-bottom: 0.6em;
          list-style-type: disc;
        }
        
        .reader-content blockquote {
          border-left: 4px solid ${isDarkMode ? '#4b5563' : '#e2e8f0'};
          padding-left: 1em;
          margin: 1.5em 0;
          font-style: italic;
          color: ${isDarkMode ? '#9ca3af' : '#4b5563'};
        }
        
        /* Smooth page transitions */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .reader-content {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
} 