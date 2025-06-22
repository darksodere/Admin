import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Anime-themed Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="text-6xl">📜</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-blue-100">
            The sacred scroll of our otaku community rules! 🎌
          </p>
          <div className="flex justify-center space-x-4 mt-6 text-3xl">
            <span className="animate-bounce">⚖️</span>
            <span className="animate-pulse">📋</span>
            <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>⚖️</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200 p-8">
          
          {/* Introduction */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl border-2 border-dashed border-blue-300">
            <div className="text-center">
              <div className="text-4xl mb-3">📜 ⚖️ 📜</div>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Welcome to the OtakuGhor Code!</h2>
              <p className="text-blue-600">
                By using our services, you agree to follow these terms - think of them as the guild rules 
                for our anime merchandise adventure! 🗾
              </p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              <strong>Effective Date:</strong> December 2024 🗓️
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            
            {/* Acceptance of Terms */}
            <section className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <span className="mr-3">✅</span>
                Acceptance of Terms
              </h3>
              <div className="text-gray-700 space-y-3">
                <p>
                  By accessing and using OtakuGhor, you accept and agree to be bound by these Terms of Service. 
                  If you don't agree with any part of these terms, please don't use our services.
                </p>
                <div className="bg-green-100 p-4 rounded-lg">
                  <p className="font-medium text-green-800">
                    🎯 <strong>Think of it like this:</strong> By entering our anime store, you're agreeing to respect 
                    our community and follow our guidelines - just like joining any awesome anime guild!
                  </p>
                </div>
              </div>
            </section>

            {/* Use of Service */}
            <section className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-3">🎮</span>
                Use of Service
              </h3>
              <div className="text-gray-700">
                <h4 className="font-semibold text-blue-700 mb-3">✨ You May:</h4>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>Browse and purchase anime merchandise</li>
                  <li>Create an account and manage your profile</li>
                  <li>Leave reviews and ratings for products</li>
                  <li>Subscribe to our newsletter for updates</li>
                  <li>Contact our support team for assistance</li>
                </ul>
                
                <h4 className="font-semibold text-red-700 mb-3">❌ You May NOT:</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the service for any illegal activities</li>
                  <li>Attempt to hack or disrupt our systems</li>
                  <li>Post inappropriate or offensive content</li>
                  <li>Resell our products without permission</li>
                  <li>Create fake accounts or impersonate others</li>
                </ul>
              </div>
            </section>

            {/* Account Responsibilities */}
            <section className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                <span className="mr-3">👤</span>
                Account Responsibilities
              </h3>
              <div className="text-gray-700 space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">🔐 Account Security:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Keep your password secure and confidential</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>You're responsible for all activities under your account</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">📝 Account Information:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Provide accurate and up-to-date information</li>
                    <li>Update your details when necessary</li>
                    <li>Don't share your account with others</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Orders and Payments */}
            <section className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
              <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                <span className="mr-3">💳</span>
                Orders & Payments
              </h3>
              <div className="text-gray-700 space-y-4">
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">🛒 Order Process:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>All orders are subject to acceptance and availability</li>
                    <li>We reserve the right to refuse or cancel orders</li>
                    <li>Prices are subject to change without notice</li>
                    <li>Order confirmation doesn't guarantee product availability</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">💰 Payment Terms:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Payment is required at the time of purchase</li>
                    <li>We accept major credit cards and digital payments</li>
                    <li>All prices are in Bangladeshi Taka (BDT)</li>
                    <li>Additional charges may apply for international orders</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Shipping and Delivery */}
            <section className="bg-pink-50 rounded-xl p-6 border-l-4 border-pink-500">
              <h3 className="text-2xl font-bold text-pink-800 mb-4 flex items-center">
                <span className="mr-3">📦</span>
                Shipping & Delivery
              </h3>
              <div className="text-gray-700 space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-pink-600 mt-1">🚚</span>
                  <p><strong>Delivery Times:</strong> Estimated delivery times are provided but not guaranteed</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-pink-600 mt-1">📍</span>
                  <p><strong>Shipping Address:</strong> Ensure your address is accurate - we're not ninjas who can find you anywhere!</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-pink-600 mt-1">💸</span>
                  <p><strong>Shipping Costs:</strong> Calculated based on location and order size</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-pink-600 mt-1">📋</span>
                  <p><strong>Risk of Loss:</strong> Risk passes to you upon delivery</p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="bg-indigo-50 rounded-xl p-6 border-l-4 border-indigo-500">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center">
                <span className="mr-3">©️</span>
                Intellectual Property
              </h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  All content on OtakuGhor, including text, graphics, logos, and images, is our property or 
                  used with permission. This includes:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎨</span>
                    <span>Website design and layout</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📸</span>
                    <span>Product images and descriptions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏷️</span>
                    <span>OtakuGhor brand and logo</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💻</span>
                    <span>Software and code</span>
                  </div>
                </div>
                <div className="bg-indigo-100 p-4 rounded-lg">
                  <p className="font-medium text-indigo-800">
                    ⚠️ <strong>Important:</strong> You may not copy, reproduce, or distribute our content 
                    without written permission. Respect intellectual property like you respect your favorite manga artist!
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
              <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                <span className="mr-3">⚠️</span>
                Limitation of Liability
              </h3>
              <div className="text-gray-700 space-y-3">
                <p>
                  While we strive to provide the best service possible, we cannot be held liable for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Service interruptions or technical issues</li>
                  <li>Third-party actions or content</li>
                  <li>Force majeure events (natural disasters, etc.)</li>
                </ul>
                <div className="bg-red-100 p-4 rounded-lg">
                  <p className="font-medium text-red-800">
                    🛡️ <strong>Our Promise:</strong> We'll always do our best to resolve any issues, 
                    but sometimes even the strongest anime heroes have limits!
                  </p>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section className="bg-gray-50 rounded-xl p-6 border-l-4 border-gray-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-3">🚪</span>
                Termination
              </h3>
              <div className="text-gray-700 space-y-3">
                <p>
                  We reserve the right to terminate or suspend your account if you violate these terms. 
                  You may also close your account at any time.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-medium text-gray-800">
                    💔 <strong>We don't want to say goodbye:</strong> But if someone breaks the community rules, 
                    we have to protect our otaku family. Let's keep things friendly and fun for everyone!
                  </p>
                </div>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
              <h3 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
                <span className="mr-3">🔄</span>
                Changes to Terms
              </h3>
              <div className="text-gray-700 space-y-3">
                <p>
                  We may update these terms from time to time. When we do, we'll notify you by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posting the updated terms on our website</li>
                  <li>Sending an email notification to registered users</li>
                  <li>Displaying a notice on our homepage</li>
                </ul>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <p className="font-medium text-yellow-800">
                    📢 <strong>Stay Updated:</strong> Like your favorite anime getting new seasons, 
                    our terms might get updates too. We'll always let you know!
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 border-2 border-dashed border-blue-300">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-3">📞</span>
                Contact Us
              </h3>
              <div className="text-gray-700">
                <p className="mb-4">
                  Questions about these terms? Our support team is here to help!
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> legal@otakughor.com 📧</p>
                  <p><strong>Address:</strong> Dhanmondi, Dhaka, Bangladesh 📍</p>
                  <p><strong>Phone:</strong> +880 1234-567890 📞</p>
                </div>
              </div>
            </section>

          </div>

          {/* Footer Message */}
          <div className="mt-12 text-center p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
            <div className="text-4xl mb-4">🎌 📜 ⛩️</div>
            <p className="text-blue-800 font-medium">
              Thank you for being part of the OtakuGhor family! 
              Together, we'll build the ultimate anime community in Bangladesh! ✨
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;