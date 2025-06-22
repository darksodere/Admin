import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'otaku10') {
      setDiscount(0.1);
    } else if (promoCode.toLowerCase() === 'manga20') {
      setDiscount(0.2);
    } else {
      alert('Invalid promo code');
    }
  };

  // Update subtotal, discount, shipping, total to use cart from context
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 1000 ? 0 : 60;
  const total = subtotal - discountAmount + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-peach-50 to-anime-purple-50 flex items-center justify-center relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute top-20 left-20 text-4xl animate-float opacity-20">🌸</div>
        <div className="absolute top-40 right-20 text-3xl animate-float opacity-20" style={{animationDelay: '1s'}}>⭐</div>
        <div className="absolute bottom-40 left-20 text-3xl animate-float opacity-20" style={{animationDelay: '2s'}}>✨</div>
        <div className="absolute bottom-20 right-20 text-4xl animate-float opacity-20" style={{animationDelay: '3s'}}>🎌</div>
        
        <div className="text-center relative z-10">
          <div className="text-9xl mb-8 animate-bounce">🛒</div>
          <h2 className="text-4xl font-bold text-gradient mb-6 font-kosugi">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-xl max-w-md mx-auto">
            Looks like you haven't added any amazing anime items to your cart yet! Let's fix that! 🌟
          </p>
          <div className="space-y-4">
            <button className="btn-anime btn-primary text-lg px-8 py-4">
              <span className="flex items-center space-x-2">
                <span>🛍️</span>
                <span>Continue Shopping</span>
              </span>
            </button>
            <p className="text-sm text-gray-500">
              Discover thousands of anime products waiting for you!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 to-anime-purple-50 relative overflow-hidden">
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
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-kosugi">
            🛒 Shopping Cart
          </h1>
          <p className="text-anime-purple-100 text-xl mb-2">
            Review your amazing anime items before checkout
          </p>
          <p className="text-anime-purple-200 text-sm">
            You're one step closer to your otaku paradise! ✨
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card-anime p-8 relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gradient font-kosugi">
                  Cart Items ({cart.length})
                </h2>
                <div className="text-sm text-gray-500">
                  Total: {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </div>
              </div>
              
              <div className="space-y-6">
                {cart.map((item, index) => (
                  <div 
                    key={item.itemId || item.id} 
                    className="flex items-center space-x-6 p-6 bg-gradient-to-r from-white/80 to-anime-purple-50/50 rounded-2xl border border-anime-purple-100 hover:shadow-lg transition-all duration-300 animate-fade-in"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-28 object-cover rounded-xl shadow-md"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/96x112/a855f7/ffffff?text=${encodeURIComponent(item.name)}`;
                        }}
                      />
                      {/* Item badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-anime-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-anime-purple-600 mb-2 flex items-center space-x-1">
                        <span>📂</span>
                        <span>{item.category}</span>
                      </p>
                      <p className="text-xl font-bold text-anime-purple-600">
                        ৳{item.price.toLocaleString()}
                      </p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 bg-white/80 rounded-xl p-2">
                      <button
                        onClick={() => updateQuantity(item.itemId || item.id, item.quantity - 1)}
                        className="w-10 h-10 bg-anime-purple-100 hover:bg-anime-purple-200 rounded-full flex items-center justify-center transition-colors text-anime-purple-600 font-bold"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.itemId || item.id, item.quantity + 1)}
                        className="w-10 h-10 bg-anime-purple-100 hover:bg-anime-purple-200 rounded-full flex items-center justify-center transition-colors text-anime-purple-600 font-bold"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-gray-800 text-xl mb-2">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.itemId || item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium hover:bg-red-50 px-3 py-1 rounded-lg transition-all duration-200"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-8 pt-6 border-t border-anime-purple-200">
                <button className="btn-anime btn-secondary group">
                  <span className="flex items-center space-x-2">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span>Continue Shopping</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-anime p-8 sticky top-24 border-2 border-anime-purple-100">
              <h3 className="text-2xl font-bold text-gradient mb-6 font-kosugi">Order Summary ✨</h3>
              
              {/* Promo Code */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                  <span>🎫</span>
                  <span>Promo Code</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (try OTAKU10)"
                    className="flex-1 px-4 py-3 border-2 border-anime-purple-200 rounded-xl focus:ring-2 focus:ring-anime-purple-500 focus:border-anime-purple-500 transition-all"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-6 py-3 bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 text-white rounded-xl hover:from-anime-purple-600 hover:to-anime-pink-600 transition-all transform hover:scale-105 font-medium"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-700 text-sm font-medium">
                      ✅ {discount * 100}% discount applied! You saved ৳{discountAmount.toLocaleString()}
                    </p>
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  💡 Try: OTAKU10 (10% off) or MANGA20 (20% off)
                </div>
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-4 mb-8 bg-gradient-to-r from-anime-purple-50/50 to-anime-pink-50/50 p-6 rounded-xl">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700 flex items-center space-x-2">
                    <span>📦</span>
                    <span>Subtotal</span>
                  </span>
                  <span className="font-bold">৳{subtotal.toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 text-lg">
                    <span className="flex items-center space-x-2">
                      <span>🎉</span>
                      <span>Discount ({discount * 100}%)</span>
                    </span>
                    <span className="font-bold">-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700 flex items-center space-x-2">
                    <span>🚚</span>
                    <span>Shipping</span>
                  </span>
                  <span className="font-bold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free!</span>
                    ) : (
                      `৳${shipping}`
                    )}
                  </span>
                </div>
                
                {shipping === 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-700 text-sm font-medium">
                      🎉 Congratulations! You qualified for free shipping!
                    </p>
                  </div>
                )}
                
                <div className="border-t-2 border-anime-purple-200 pt-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span className="text-gray-800">Total</span>
                    <span className="text-gradient">৳{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Checkout Button */}
              <button className="w-full btn-anime btn-primary mb-6 text-lg py-4 shadow-xl hover:shadow-2xl">
                <span className="flex items-center justify-center space-x-2">
                  <span>🛒</span>
                  <span>Proceed to Checkout</span>
                  <span>→</span>
                </span>
              </button>
              
              {/* Payment Methods */}
              <div className="text-center mb-6">
                <p className="text-sm font-medium text-gray-700 mb-4 flex items-center justify-center space-x-2">
                  <span>💳</span>
                  <span>We accept:</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-center space-x-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <span className="text-xs text-blue-700">Visa</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 p-2 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      MC
                    </div>
                    <span className="text-xs text-red-700">Mastercard</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      bKash
                    </div>
                    <span className="text-xs text-green-700">bKash</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 p-2 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-8 h-5 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      Nagad
                    </div>
                    <span className="text-xs text-purple-700">Nagad</span>
                  </div>
                </div>
              </div>
              
              {/* Security Badge */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <span>🔒</span>
                  <span>SSL Secured Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <section className="py-20 bg-gradient-to-r from-white/80 via-anime-purple-50/60 to-anime-pink-50/60 backdrop-blur-sm relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-anime-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-anime-pink-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-anime-mint-300 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-kosugi">
              You might also like ✨
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Complete your otaku collection with these amazing items! 🌟
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: 'Demon Slayer Volume 2', 
                price: 450, 
                originalPrice: 550,
                image: 'https://via.placeholder.com/240x280/722f37/ffffff?text=Demon+Slayer+Vol+2',
                category: 'Manga',
                rating: 4.9,
                isNew: true
              },
              { 
                name: 'One Piece Luffy Figure', 
                price: 3200, 
                originalPrice: 3800,
                image: 'https://via.placeholder.com/240x280/dc143c/ffffff?text=Luffy+Figure',
                category: 'Figures',
                rating: 4.8,
                discount: 15
              },
              { 
                name: 'MHA Poster Set', 
                price: 850, 
                originalPrice: 1200,
                image: 'https://via.placeholder.com/240x280/228b22/ffffff?text=MHA+Poster+Set',
                category: 'Accessories',
                rating: 4.6,
                discount: 30
              },
              { 
                name: 'Kawaii Anime Keychain', 
                price: 320, 
                originalPrice: 450,
                image: 'https://via.placeholder.com/240x280/ff69b4/ffffff?text=Kawaii+Keychain',
                category: 'Accessories',
                rating: 4.7,
                isNew: true
              }
            ].map((product, index) => (
              <div 
                key={index} 
                className="card-anime p-6 text-center group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.isNew && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        New
                      </span>
                    )}
                    {product.discount && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-2 right-2">
                    <span className="bg-anime-purple-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-800 mb-2 text-lg group-hover:text-anime-purple-600 transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-xl font-bold text-anime-purple-600">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                
                <button className="w-full btn-anime btn-secondary text-sm py-3 group-hover:from-anime-purple-500 group-hover:to-anime-pink-500 group-hover:text-white transition-all duration-300">
                  <span className="flex items-center justify-center space-x-2">
                    <span>🛒</span>
                    <span>Add to Cart</span>
                  </span>
                </button>
              </div>
            ))}
          </div>
          
          {/* View More Button */}
          <div className="text-center mt-12">
            <button className="btn-anime btn-primary text-lg px-8 py-4 group">
              <span className="flex items-center space-x-2">
                <span>View More Products</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
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

export default CartPage;