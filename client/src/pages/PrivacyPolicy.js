import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Anime-themed Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="text-6xl">🛡️</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-purple-100">
            Protecting your data like we protect our favorite anime characters! ✨
          </p>
          <div className="flex justify-center space-x-4 mt-6 text-3xl">
            <span className="animate-bounce">🌸</span>
            <span className="animate-pulse">🔒</span>
            <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>🌸</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-purple-200 p-8">
          
          {/* Introduction */}
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-2 border-dashed border-purple-300">
            <div className="text-center">
              <div className="text-4xl mb-3">🎌 🛡️ 🎌</div>
              <h2 className="text-2xl font-bold text-purple-800 mb-2">Welcome to Our Privacy Dojo!</h2>
              <p className="text-purple-600">
                At OtakuGhor, we take your privacy as seriously as protecting the Hidden Leaf Village! 
                This policy explains how we collect, use, and safeguard your information.
              </p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              <strong>Last Updated:</strong> December 2024 🗓️
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            
            {/* Information We Collect */}
            <section className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-3">📊</span>
                Information We Collect
              </h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">🔍 Personal Information:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name, email address, and contact information</li>
                    <li>Shipping and billing addresses</li>
                    <li>Payment information (securely processed)</li>
                    <li>Account preferences and anime interests</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">📱 Usage Information:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Browsing behavior and product preferences</li>
                    <li>Device information and IP address</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <span className="mr-3">⚡</span>
                How We Use Your Information
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 mt-1">🛒</span>
                  <p><strong>Order Processing:</strong> To fulfill your anime merchandise orders and provide customer support</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 mt-1">📧</span>
                  <p><strong>Communication:</strong> To send order updates, newsletters, and exclusive anime deals</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 mt-1">🎯</span>
                  <p><strong>Personalization:</strong> To recommend anime products based on your interests</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 mt-1">🔧</span>
                  <p><strong>Improvement:</strong> To enhance our website and services</p>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
              <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                <span className="mr-3">🤝</span>
                Information Sharing
              </h3>
              <div className="text-gray-700">
                <p className="mb-4">
                  We don't sell your personal information to third parties. We may share information only in these cases:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> Trusted partners who help us operate our store (payment processors, shipping companies)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In case of merger or acquisition (with continued privacy protection)</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                <span className="mr-3">🛡️</span>
                Data Security
              </h3>
              <div className="text-gray-700">
                <p className="mb-4">
                  Your data is protected with ninja-level security measures:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🔐</span>
                    <span>SSL encryption for all transactions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏰</span>
                    <span>Secure server infrastructure</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">👁️</span>
                    <span>Regular security monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🔑</span>
                    <span>Limited access controls</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="bg-pink-50 rounded-xl p-6 border-l-4 border-pink-500">
              <h3 className="text-2xl font-bold text-pink-800 mb-4 flex items-center">
                <span className="mr-3">⚖️</span>
                Your Rights
              </h3>
              <div className="text-gray-700">
                <p className="mb-4">You have the power to control your data:</p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-pink-600 mt-1">👁️</span>
                    <p><strong>Access:</strong> Request a copy of your personal data</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-pink-600 mt-1">✏️</span>
                    <p><strong>Correction:</strong> Update or correct your information</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-pink-600 mt-1">🗑️</span>
                    <p><strong>Deletion:</strong> Request deletion of your data</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-pink-600 mt-1">📧</span>
                    <p><strong>Opt-out:</strong> Unsubscribe from marketing emails</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
              <h3 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
                <span className="mr-3">🍪</span>
                Cookies & Tracking
              </h3>
              <div className="text-gray-700">
                <p className="mb-4">
                  We use cookies (not the edible kind, though we love those too!) to enhance your experience:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how you use our site</li>
                  <li><strong>Marketing Cookies:</strong> Show you relevant anime product ads</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-dashed border-purple-300">
              <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                <span className="mr-3">📞</span>
                Contact Us
              </h3>
              <div className="text-gray-700">
                <p className="mb-4">
                  Have questions about our privacy practices? We're here to help!
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@otakughor.com 📧</p>
                  <p><strong>Address:</strong> Dhanmondi, Dhaka, Bangladesh 📍</p>
                  <p><strong>Phone:</strong> +880 1234-567890 📞</p>
                </div>
              </div>
            </section>

          </div>

          {/* Footer Message */}
          <div className="mt-12 text-center p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
            <div className="text-4xl mb-4">🎌 ⛩️ 🌸</div>
            <p className="text-purple-800 font-medium">
              Thank you for trusting OtakuGhor with your information! 
              Together, we'll continue building the best anime community in Bangladesh! ✨
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;