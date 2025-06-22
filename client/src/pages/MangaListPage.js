import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MangaListPage = () => {
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [stats, setStats] = useState({
    mangaCount: 0,
    authorCount: 0,
    genreCount: 0,
    totalProducts: 0
  });

  const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'];
  const statuses = ['All', 'Available', 'Coming Soon', 'Out of Stock'];
  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest Releases' },
    { value: 'price', label: 'Price (Low to High)' }
  ];

  // Mock manga data - in real app, fetch from API
  const mockMangaData = [
    {
      id: 1,
      title: 'Attack on Titan',
      author: 'Hajime Isayama',
      genre: ['Action', 'Drama', 'Fantasy'],
      status: 'Available',
      volumes: 34,
      price: 450,
      rating: 4.9,
      description: 'Humanity fights for survival against giant humanoid Titans.',
      image: 'https://via.placeholder.com/300x400/3b82f6/ffffff?text=AOT',
      popularity: 95,
      isNew: false,
      discount: 15
    },
    {
      id: 2,
      title: 'Demon Slayer',
      author: 'Koyoharu Gotouge',
      genre: ['Action', 'Supernatural'],
      status: 'Available',
      volumes: 23,
      price: 420,
      rating: 4.8,
      description: 'A young boy becomes a demon slayer to save his sister.',
      image: 'https://via.placeholder.com/300x400/ef4444/ffffff?text=DS',
      popularity: 92,
      isNew: true,
      discount: null
    },
    {
      id: 3,
      title: 'One Piece',
      author: 'Eiichiro Oda',
      genre: ['Action', 'Adventure', 'Comedy'],
      status: 'Available',
      volumes: 105,
      price: 480,
      rating: 4.9,
      description: 'Follow Luffy\'s journey to become the Pirate King.',
      image: 'https://via.placeholder.com/300x400/10b981/ffffff?text=OP',
      popularity: 98,
      isNew: false,
      discount: null
    },
    {
      id: 4,
      title: 'My Hero Academia',
      author: 'Kohei Horikoshi',
      genre: ['Action', 'Adventure'],
      status: 'Available',
      volumes: 38,
      price: 440,
      rating: 4.7,
      description: 'In a world of superheroes, a quirkless boy dreams of becoming one.',
      image: 'https://via.placeholder.com/300x400/8b5cf6/ffffff?text=MHA',
      popularity: 89,
      isNew: false,
      discount: 20
    },
    {
      id: 5,
      title: 'Jujutsu Kaisen',
      author: 'Gege Akutami',
      genre: ['Action', 'Supernatural'],
      status: 'Available',
      volumes: 24,
      price: 460,
      rating: 4.8,
      description: 'Students fight cursed spirits in modern Japan.',
      image: 'https://via.placeholder.com/300x400/f59e0b/ffffff?text=JJK',
      popularity: 91,
      isNew: true,
      discount: null
    },
    {
      id: 6,
      title: 'Chainsaw Man',
      author: 'Tatsuki Fujimoto',
      genre: ['Action', 'Horror'],
      status: 'Coming Soon',
      volumes: 12,
      price: 500,
      rating: 4.6,
      description: 'A young man merges with his pet devil to become Chainsaw Man.',
      image: 'https://via.placeholder.com/300x400/dc2626/ffffff?text=CSM',
      popularity: 87,
      isNew: true,
      discount: null
    }
  ];

  useEffect(() => {
    fetchMangaData();
    fetchStats();
  }, []);

  const fetchMangaData = async () => {
    try {
      // Fetch real manga products from API
      const response = await axios.get('/api/products');
      const allProducts = response.data.products || response.data || [];
      
      // Filter for manga and light novels
      const mangaProducts = allProducts.filter(product => 
        product.category === 'Manga' || product.category === 'Light Novel'
      );
      
      // Transform API data to match our component structure
      const transformedManga = mangaProducts.map(product => ({
        id: product._id || product.id,
        title: product.name,
        author: product.author || 'Unknown Author',
        genre: [product.category], // You might want to add a genre field to your schema
        status: product.available && product.stock > 0 ? 'Available' : 
                product.stock === 0 ? 'Out of Stock' : 'Coming Soon',
        volumes: product.volume || 1,
        price: product.price,
        rating: 4.5 + Math.random() * 0.5, // Mock rating until you add reviews
        description: product.description || 'Amazing manga series!',
        image: product.image || 'https://via.placeholder.com/300x400/a855f7/ffffff?text=Manga',
        popularity: 80 + Math.random() * 20, // Mock popularity
        isNew: new Date(product.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : null
      }));
      
      // If no real data, use mock data
      const mangaData = transformedManga.length > 0 ? transformedManga : mockMangaData;
      setMangaList(mangaData);
    } catch (error) {
      console.error('Error fetching manga:', error);
      // Fallback to mock data
      setMangaList(mockMangaData);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/products/admin/stats');
      const adminStats = response.data;
      
      setStats({
        mangaCount: adminStats.mangaCount || 0,
        authorCount: adminStats.authorCount || 0,
        genreCount: adminStats.genreCount || 0,
        totalProducts: adminStats.totalProducts || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use fallback stats - start with 0 for new store
      setStats({
        mangaCount: 0,
        authorCount: 0,
        genreCount: 0,
        totalProducts: 0
      });
    }
  };

  const filteredAndSortedManga = mangaList
    .filter(manga => {
      const matchesSearch = manga.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           manga.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || manga.genre.includes(selectedGenre);
      const matchesStatus = selectedStatus === 'All' || manga.status === selectedStatus;
      return matchesSearch && matchesGenre && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'newest':
          return b.id - a.id; // Assuming higher ID means newer
        case 'price':
          return a.price - b.price;
        default:
          return a.title.localeCompare(b.title);
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-anime-purple-50 via-anime-pink-50 to-peach-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-anime-purple-200 border-t-anime-purple-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl animate-bounce">📚</span>
            </div>
          </div>
          <p className="mt-4 text-anime-purple-600 font-medium animate-pulse">Loading amazing manga collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-purple-50/30 via-anime-pink-50/30 to-peach-50/30 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed top-20 left-10 text-2xl animate-float opacity-20 pointer-events-none z-10">🌸</div>
      <div className="fixed top-40 right-20 text-3xl animate-float opacity-20 pointer-events-none z-10" style={{animationDelay: '1s'}}>⭐</div>
      <div className="fixed bottom-40 left-20 text-2xl animate-float opacity-20 pointer-events-none z-10" style={{animationDelay: '2s'}}>✨</div>
      <div className="fixed bottom-20 right-10 text-2xl animate-float opacity-20 pointer-events-none z-10" style={{animationDelay: '3s'}}>🎌</div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-anime-purple-500 via-anime-pink-500 to-anime-blue-500 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-white rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-kosugi">
            📚 Manga Collection
          </h1>
          <p className="text-anime-purple-100 text-xl mb-2">
            Explore our extensive collection of manga from popular series
          </p>
          <p className="text-anime-purple-200 text-sm mb-8">
            From classic shounen to modern masterpieces! ✨
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-3xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search manga titles, authors, or genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-8 py-5 pl-16 rounded-2xl text-lg border-0 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl bg-white/95 backdrop-blur-sm placeholder-gray-500"
              />
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="absolute right-3 top-3 bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-medium">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section - Now using real data */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-anime p-4 text-center">
            <div className="text-2xl font-bold text-gradient">{stats.mangaCount}</div>
            <div className="text-sm text-gray-600">Manga Titles</div>
          </div>
          <div className="card-anime p-4 text-center">
            <div className="text-2xl font-bold text-gradient">{filteredAndSortedManga.length}</div>
            <div className="text-sm text-gray-600">Filtered Results</div>
          </div>
          <div className="card-anime p-4 text-center">
            <div className="text-2xl font-bold text-gradient">{stats.authorCount}</div>
            <div className="text-sm text-gray-600">Authors</div>
          </div>
          <div className="card-anime p-4 text-center">
            <div className="text-2xl font-bold text-gradient">{stats.genreCount}</div>
            <div className="text-sm text-gray-600">Genres</div>
          </div>
        </div>

        {/* Filters */}
        <div className="card-anime p-8 mb-8 border-2 border-anime-purple-100">
          <h3 className="text-xl font-bold text-gradient mb-6 font-kosugi">Filter & Sort ✨</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                <span>🎭</span>
                <span>Genre</span>
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-3 border-2 border-anime-purple-200 rounded-xl focus:ring-2 focus:ring-anime-purple-500 focus:border-anime-purple-500 transition-all"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                <span>📊</span>
                <span>Status</span>
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border-2 border-anime-purple-200 rounded-xl focus:ring-2 focus:ring-anime-purple-500 focus:border-anime-purple-500 transition-all"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                <span>🔄</span>
                <span>Sort By</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-anime-purple-200 rounded-xl focus:ring-2 focus:ring-anime-purple-500 focus:border-anime-purple-500 transition-all"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedGenre('All');
                  setSelectedStatus('All');
                  setSortBy('name');
                  setSearchTerm('');
                }}
                className="w-full btn-anime btn-secondary py-3"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>🔄</span>
                  <span>Clear Filters</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gradient font-kosugi">
            {filteredAndSortedManga.length} Manga Series Found ✨
          </h2>
        </div>

        {/* Manga Grid */}
        {filteredAndSortedManga.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-9xl mb-8 animate-bounce">📚</div>
            <h3 className="text-3xl font-semibold text-gray-700 mb-4">No manga found</h3>
            <p className="text-gray-500 mb-8 text-lg">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSelectedGenre('All');
                setSelectedStatus('All');
                setSortBy('name');
                setSearchTerm('');
              }}
              className="btn-anime btn-primary text-lg px-8 py-4"
            >
              <span className="flex items-center space-x-2">
                <span>🔄</span>
                <span>Reset Filters</span>
              </span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedManga.map((manga, index) => (
              <div 
                key={manga.id} 
                className="card-anime overflow-hidden hover:scale-105 transition-all duration-300 transform hover:shadow-2xl group animate-fade-in"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="relative">
                  <img
                    src={manga.image}
                    alt={manga.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {manga.isNew && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                        New
                      </span>
                    )}
                    {manga.discount && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{manga.discount}%
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                      manga.status === 'Available' ? 'bg-green-100/90 text-green-800' :
                      manga.status === 'Coming Soon' ? 'bg-yellow-100/90 text-yellow-800' :
                      'bg-red-100/90 text-red-800'
                    }`}>
                      {manga.status}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-1 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      <span>⭐</span>
                      <span>{manga.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-anime-purple-600 transition-colors">{manga.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 flex items-center space-x-1">
                    <span>✍️</span>
                    <span>by {manga.author}</span>
                  </p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{manga.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {manga.genre.slice(0, 3).map((genre, index) => (
                      <span key={index} className="px-3 py-1 bg-anime-purple-100 text-anime-purple-700 rounded-full text-xs font-medium">
                        {genre}
                      </span>
                    ))}
                    {manga.genre.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{manga.genre.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-600 flex items-center space-x-1">
                      <span>📖</span>
                      <span>{manga.volumes} volumes</span>
                    </span>
                    <span className="text-xl font-bold text-anime-purple-600">৳{manga.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 btn-anime btn-primary text-sm py-3 group-hover:shadow-lg">
                      <span className="flex items-center justify-center space-x-2">
                        <span>🛒</span>
                        <span>Add to Cart</span>
                      </span>
                    </button>
                    <button className="px-4 py-3 border-2 border-anime-purple-500 text-anime-purple-600 rounded-xl hover:bg-anime-purple-50 transition-all duration-300 transform hover:scale-105">
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredAndSortedManga.length > 0 && (
          <div className="text-center mt-16">
            <button className="btn-anime btn-secondary text-lg px-8 py-4 group">
              <span className="flex items-center space-x-2">
                <span>Load More Manga</span>
                <span className="group-hover:translate-y-1 transition-transform">↓</span>
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Stats Section - Updated with real data and better fourth stat */}
      <section className="py-20 bg-gradient-to-r from-white/80 via-anime-purple-50/60 to-anime-pink-50/60 backdrop-blur-sm relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-anime-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-anime-pink-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-anime-mint-300 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-kosugi">Our Collection Stats ✨</h2>
            <p className="text-gray-600 text-xl">Building the ultimate manga library for otaku worldwide!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: `${stats.mangaCount}`, label: 'Manga Titles', icon: '📚' },
              { number: `${stats.authorCount}`, label: 'Authors', icon: '✍️' },
              { number: `${stats.genreCount}`, label: 'Genres', icon: '🎭' },
              { number: '24/7', label: 'Support', icon: '💬' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center card-anime p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="text-5xl mb-4 animate-bounce" style={{animationDelay: `${index * 300}ms`}}>{stat.icon}</div>
                <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50 group"
        title="Back to Top"
      >
        <span className="text-xl group-hover:animate-bounce">↑</span>
      </button>
    </div>
  );
};

export default MangaListPage;