import React, { useState } from 'react';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });

  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: '💬' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'recommendations', label: 'Recommendations', icon: '👍' },
    { id: 'events', label: 'Events', icon: '📅' }
  ];

  const categories = [
    { value: 'general', label: 'General Discussion' },
    { value: 'manga', label: 'Manga Talk' },
    { value: 'anime', label: 'Anime Discussion' },
    { value: 'figures', label: 'Figure Collection' },
    { value: 'news', label: 'News & Updates' }
  ];

  // Empty renderers for now, to be replaced with real data
  const renderDiscussions = () => (
    <div className="text-center text-gray-400 py-12">No discussions yet.</div>
  );
  const renderReviews = () => (
    <div className="text-center text-gray-400 py-12">No reviews yet.</div>
  );
  const renderEvents = () => (
    <div className="text-center text-gray-400 py-12">No events yet.</div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 to-anime-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            🌟 Otaku Community
          </h1>
          <p className="text-anime-purple-100 text-xl mb-8">
            Connect with fellow anime and manga enthusiasts
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-anime p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Community Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Be respectful to all members</li>
                <li>• No spoilers without warnings</li>
                <li>• Keep discussions on-topic</li>
                <li>• No spam or self-promotion</li>
                <li>• Use appropriate language</li>
              </ul>
              
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['#manga', '#anime', '#figures', '#reviews', '#recommendations'].map(tag => (
                    <span key={tag} className="px-2 py-1 bg-anime-purple-100 text-anime-purple-700 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="card-anime p-1 mb-6">
              <div className="flex space-x-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 text-white'
                        : 'text-gray-600 hover:text-anime-purple-600 hover:bg-anime-purple-50'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Create Post */}
            {activeTab === 'discussions' && (
              <div className="card-anime p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Start a Discussion</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anime-purple-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Share your thoughts..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anime-purple-500 focus:border-transparent"
                  />
                  <div className="flex items-center justify-between">
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anime-purple-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    <button className="btn-anime btn-primary">
                      Post Discussion
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Content based on active tab */}
            {activeTab === 'discussions' && renderDiscussions()}
            {activeTab === 'reviews' && renderReviews()}
            {activeTab === 'recommendations' && renderDiscussions()}
            {activeTab === 'events' && renderEvents()}
          </div>
        </div>
      </div>

      {/* Join Community CTA */}
      <section className="py-16 bg-gradient-to-r from-anime-purple-500 to-anime-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Growing Community! 🎌
          </h2>
          <p className="text-anime-purple-100 text-lg mb-8">
            Connect with thousands of anime and manga fans from Bangladesh and beyond
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-anime-purple-600 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Create Account
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-anime-purple-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;