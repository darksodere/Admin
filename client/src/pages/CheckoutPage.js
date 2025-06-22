import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from '../config/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    paymentMethod: 'cod',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate totals
  const subtotal = getCartTotal();
  const shippingCost = subtotal < 1000 ? 60 : subtotal < 2000 ? 40 : 0;
  const total = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+88)?01[3-9]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Bangladeshi phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        paymentMethod: formData.paymentMethod,
        notes: formData.notes.trim(),
        cartItems: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          volume: item.volume,
          printType: item.printType,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))
      };

      const response = await axios.post('/api/orders', orderData);

      if (response.data.success) {
        // Clear cart
        clearCart();
        
        // Navigate to success page with order details
        navigate('/order-success', {
          state: {
            order: response.data.order,
            customerName: formData.customerName
          }
        });
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPaymentInfo = () => {
    switch (formData.paymentMethod) {
      case 'bkash':
        return {
          title: 'bKash Payment',
          info: 'Send money to: 01712-345678',
          instructions: 'After payment, keep the transaction ID for reference.'
        };
      case 'nagad':
        return {
          title: 'Nagad Payment',
          info: 'Send money to: 01812-345678',
          instructions: 'After payment, keep the transaction ID for reference.'
        };
      case 'rocket':
        return {
          title: 'Rocket Payment',
          info: 'Send money to: 01912-345678',
          instructions: 'After payment, keep the transaction ID for reference.'
        };
      default:
        return {
          title: 'Cash on Delivery',
          info: 'Pay when you receive your order',
          instructions: 'Our delivery person will collect the payment.'
        };
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty!</h2>
          <p className="text-gray-600 mb-6">Add some amazing anime products to your cart first.</p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const paymentInfo = getPaymentInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🛒 Checkout
          </h1>
          <p className="text-gray-600">Complete your order and get your anime treasures!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Order Form */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-purple-200 p-6">
            <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
              <span className="mr-3">📝</span>
              Order Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <span className="mr-2">👤</span>
                    Full Name *
                  </span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.customerName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  required
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <span className="mr-2">📞</span>
                    Mobile Number *
                  </span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="01712345678"
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <span className="mr-2">📍</span>
                    Delivery Address *
                  </span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your complete delivery address"
                  required
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <span className="mr-2">💳</span>
                    Payment Method *
                  </span>
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="cod">💵 Cash on Delivery</option>
                  <option value="bkash">📱 bKash</option>
                  <option value="nagad">📱 Nagad</option>
                  <option value="rocket">📱 Rocket</option>
                </select>
              </div>

              {/* Payment Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">{paymentInfo.title}</h3>
                <p className="text-blue-700 font-medium">{paymentInfo.info}</p>
                <p className="text-blue-600 text-sm mt-1">{paymentInfo.instructions}</p>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center">
                    <span className="mr-2">📝</span>
                    Order Notes (Optional)
                  </span>
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Any special instructions for delivery..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Placing Order...
                  </span>
                ) : (
                  `🎌 Place Order - ৳${total}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-purple-200 p-6">
            <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
              <span className="mr-3">📋</span>
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.itemId} className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                  <img
                    src={item.image || '/api/placeholder/60/60'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.volume} • {item.printType}
                    </p>
                    <p className="text-sm text-purple-600">
                      ৳{item.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-purple-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">
                  {shippingCost === 0 ? 'Free' : `৳${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-purple-800 border-t border-purple-200 pt-2">
                <span>Total:</span>
                <span>৳{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">🚚 Shipping Information</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Free shipping on orders above ৳2000</li>
                <li>• Dhaka delivery: 1-2 business days</li>
                <li>• Outside Dhaka: 3-5 business days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;