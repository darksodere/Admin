import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Anime-themed Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="text-6xl">🔄</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Return Policy
          </h1>
          <p className="text-xl text-green-100">
            Easy returns, just like a time-travel jutsu! ⏰✨
          </p>
          <div className="flex justify-center space-x-4 mt-6 text-3xl">
            <span className="animate-bounce">📦</span>
            <span className="animate-pulse">↩️</span>
            <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>📦</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-green-200 p-8">
          
          {/* Introduction */}
          <div className="mb-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl border-2 border-dashed border-green-300">
            <div className="text-center">
              <div className="text-4xl mb-3">🔄 📦 🔄</div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Return & Exchange Dojo!</h2>
              <p className="text-green-600">
                Not happy with your anime treasure? No worries! We've got your back like a loyal nakama! 
                Here's everything you need to know about returns and exchanges. 🤝
              </p>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="mb-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">⚡ Quick Summary</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl mb-2">📅</div>
                <div className="font-bold text-blue-700">30 Days</div>
                <div className="text-sm text-gray-600">Return Window</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl mb-2">💯</div>
                <div className="font-bold text-green-700">Free Returns</div>
                <div className="text-sm text-gray-600">On Defective Items</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl mb-2">🚀</div>
                <div className="font-bold text-purple-700">Fast Process</div>
                <div className="text-sm text-gray-600">3-5 Business Days</div>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            
            {/* Return Window */}
            <section className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <span className="mr-3">⏰</span>
                Return Time Limit
              </h3>
              <div className="text-gray-700 space-y-4">
                <div className="bg-green-100 p-4 rounded-lg">
                  <p className="font-bold text-green-800 text-lg mb-2">
                    📅 30-Day Return Window
                  </p>
                  <p>
                    You have <strong>30 days</strong> from the delivery date to initiate a return. 
                    This gives you plenty of time to unbox your anime goodies and make sure everything is perfect!
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 mt-1">✅</span>
                  <p><strong>Delivery Date:</strong> The countdown starts when you receive your package</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 mt-1">📧</span>
                  <p><strong>Email Confirmation:</strong> You'll receive a delivery confirmation email</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 mt-1">🎯</span>
                  <p><strong>Pro Tip:</strong> Don't wait until the last minute - start the process early!</p>
                </div>
              </div>
            </section>

            {/* Eligible Items */}
            <section className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-3">✅</span>
                What Can Be Returned
              </h3>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                      <span className="mr-2">👍</span>
                      Returnable Items
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Unopened figures and collectibles</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Manga and books in original condition</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Clothing with tags attached</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Accessories in original packaging</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Defective or damaged items</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                      <span className="mr-2">👎</span>
                      Non-Returnable Items
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Opened/used figures and collectibles</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Personalized or custom items</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Digital downloads or codes</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Worn clothing or accessories</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Items damaged by misuse</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Return Process */}
            <section className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                <span className="mr-3">🔄</span>
                How to Return Items
              </h3>
              <div className="text-gray-700">
                <p className="mb-6 text-center font-medium text-purple-700">
                  Follow these simple steps to return your items:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 bg-white p-4 rounded-lg border border-purple-200">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-purple-700 mb-1">Contact Us</h4>
                      <p>Email us at <strong>returns@otakughor.com</strong> or call <strong>+880 1234-567890</strong></p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 bg-white p-4 rounded-lg border border-purple-200">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-purple-700 mb-1">Get Return Authorization</h4>
                      <p>We'll provide you with a Return Authorization Number (RAN) and instructions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 bg-white p-4 rounded-lg border border-purple-200">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-purple-700 mb-1">Pack Your Items</h4>
                      <p>Use original packaging if possible, include all accessories and documentation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 bg-white p-4 rounded-lg border border-purple-200">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                    <div>
                      <h4 className="font-semibold text-purple-700 mb-1">Ship It Back</h4>
                      <p>Use the prepaid shipping label we provide (for eligible returns)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 bg-white p-4 rounded-lg border border-purple-200">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                    <div>
                      <h4 className="font-semibold text-purple-700 mb-1">Get Your Refund</h4>
                      <p>Once we receive and inspect your return, we'll process your refund within 3-5 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Information */}
            <section className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
              <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                <span className="mr-3">💰</span>
                Refund Information
              </h3>
              <div className="text-gray-700 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-700 mb-3 flex items-center">
                      <span className="mr-2">⚡</span>
                      Processing Time
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Inspection:</strong> 1-2 business days</li>
                      <li><strong>Refund Processing:</strong> 2-3 business days</li>
                      <li><strong>Bank Processing:</strong> 3-7 business days</li>
                      <li><strong>Total Time:</strong> 5-12 business days</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-700 mb-3 flex items-center">
                      <span className="mr-2">💳</span>
                      Refund Method
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Credit Card:</strong> Back to original card</li>
                      <li><strong>Digital Wallet:</strong> Back to original wallet</li>
                      <li><strong>Bank Transfer:</strong> Direct to your account</li>
                      <li><strong>Store Credit:</strong> Available upon request</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg">
                  <p className="font-medium text-orange-800">
                    💡 <strong>Pro Tip:</strong> Refunds are processed to the original payment method. 
                    If you paid with a credit card, the refund will appear on your card statement!
                  </p>
                </div>
              </div>
            </section>

            {/* Exchanges */}
            <section className="bg-pink-50 rounded-xl p-6 border-l-4 border-pink-500">
              <h3 className="text-2xl font-bold text-pink-800 mb-4 flex items-center">
                <span className="mr-3">🔄</span>
                Exchanges
              </h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  Want to exchange for a different size, color, or item? We've got you covered!
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-pink-200">
                    <h4 className="font-semibold text-pink-700 mb-2">✨ Same Item Exchange</h4>
                    <p className="text-sm">Different size or color of the same product</p>
                    <p className="text-xs text-pink-600 mt-1">Free shipping both ways!</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-pink-200">
                    <h4 className="font-semibold text-pink-700 mb-2">🎯 Different Item Exchange</h4>
                    <p className="text-sm">Exchange for a completely different product</p>
                    <p className="text-xs text-pink-600 mt-1">Price difference may apply</p>
                  </div>
                </div>
                <div className="bg-pink-100 p-4 rounded-lg">
                  <p className="font-medium text-pink-800">
                    🎁 <strong>Exchange Process:</strong> Same as returns, but mention "EXCHANGE" 
                    in your request and tell us what you'd like instead!
                  </p>
                </div>
              </div>
            </section>

            {/* Shipping Costs */}
            <section className="bg-indigo-50 rounded-xl p-6 border-l-4 border-indigo-500">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center">
                <span className="mr-3">🚚</span>
                Return Shipping
              </h3>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-100 p-4 rounded-lg border border-green-300">
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                      <span className="mr-2">🆓</span>
                      Free Return Shipping
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Defective or damaged items</li>
                      <li>• Wrong item sent by us</li>
                      <li>• Quality issues</li>
                      <li>• Same-item exchanges</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
                    <h4 className="font-semibold text-yellow-700 mb-3 flex items-center">
                      <span className="mr-2">💸</span>
                      Customer Pays Shipping
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Change of mind returns</li>
                      <li>• Wrong size ordered</li>
                      <li>• Different item exchanges</li>
                      <li>• Personal preference changes</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-indigo-100 p-4 rounded-lg">
                  <p className="font-medium text-indigo-800">
                    📦 <strong>Shipping Cost:</strong> Typically 200-500 BDT depending on item size and location. 
                    We'll let you know the exact cost before you ship!
                  </p>
                </div>
              </div>
            </section>

            {/* Special Cases */}
            <section className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
              <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                <span className="mr-3">⚠️</span>
                Special Situations
              </h3>
              <div className="text-gray-700 space-y-4">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-700 mb-2">📦 Damaged Package</h4>
                  <p className="text-sm">
                    If your package arrives damaged, take photos immediately and contact us within 48 hours. 
                    We'll arrange a free replacement or full refund.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-700 mb-2">❌ Wrong Item</h4>
                  <p className="text-sm">
                    Received the wrong anime figure? Our mistake! We'll send the correct item immediately 
                    and provide a prepaid return label for the wrong item.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-700 mb-2">🎁 Gift Returns</h4>
                  <p className="text-sm">
                    Gift recipients can return items for store credit without the original receipt. 
                    Just provide the order number or contact us for assistance.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 border-2 border-dashed border-green-300">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <span className="mr-3">📞</span>
                Need Help with Returns?
              </h3>
              <div className="text-gray-700">
                <p className="mb-4">
                  Our return specialists are here to help make the process as smooth as possible!
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p><strong>📧 Email:</strong> returns@otakughor.com</p>
                    <p><strong>📞 Phone:</strong> +880 1234-567890</p>
                    <p><strong>💬 Live Chat:</strong> Available on our website</p>
                  </div>
                  <div className="space-y-2">
                    <p><strong>🕒 Hours:</strong> Mon-Sat, 10AM-8PM</p>
                    <p><strong>📍 Address:</strong> Dhanmondi, Dhaka</p>
                    <p><strong>⚡ Response Time:</strong> Within 24 hours</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Footer Message */}
          <div className="mt-12 text-center p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
            <div className="text-4xl mb-4">🎌 🔄 ⛩️</div>
            <p className="text-green-800 font-medium">
              We want you to be 100% happy with your anime treasures! 
              If something's not right, we'll make it right - that's the OtakuGhor promise! ✨
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;