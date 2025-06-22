import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { order, customerName } = location.state || {};

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const getPaymentMethodDisplay = (method) => {
    switch (method) {
      case 'bkash': return '📱 bKash';
      case 'nagad': return '📱 Nagad';
      case 'rocket': return '📱 Rocket';
      default: return '💵 Cash on Delivery';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you, <span className="font-semibold text-purple-600">{customerName}</span>! 
            Your anime treasures are on their way! 🎌
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-green-200 p-8 mb-8">
          
          {/* Order Info */}
          <div className="text-center mb-8">
            <div className="inline-block p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl border-2 border-dashed border-green-300">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Order Confirmation</h2>
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">Tracking Number:</span>
                  <span className="ml-2 px-3 py-1 bg-green-500 text-white rounded-full font-mono">
                    {order.trackingNumber}
                  </span>
                </p>
                <p className="text-gray-600">Keep this number for tracking your order</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Order Details */}
            <div>
              <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Order Details
              </h3>
              <div className="space-y-3 bg-purple-50 rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{getPaymentMethodDisplay(order.paymentMethod)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Status:</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    {order.orderStatus}
                  </span>
                </div>
                <div className="flex justify-between border-t border-purple-200 pt-3">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">৳{order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">
                    {order.shippingCost === 0 ? 'Free' : `৳${order.shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-purple-800 border-t border-purple-200 pt-3">
                  <span>Total:</span>
                  <span>৳{order.finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                <span className="mr-2">🚀</span>
                What's Next?
              </h3>
              <div className="space-y-4">
                
                {order.paymentMethod !== 'cod' && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">💳 Payment Required</h4>
                    <p className="text-blue-700 text-sm">
                      Please complete your {getPaymentMethodDisplay(order.paymentMethod)} payment 
                      and keep the transaction ID for reference.
                    </p>
                  </div>
                )}

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">📦 Order Processing</h4>
                  <p className="text-green-700 text-sm">
                    We'll start processing your order within 24 hours and send you updates via SMS.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">🚚 Delivery</h4>
                  <p className="text-purple-700 text-sm">
                    Your order will be delivered within 1-5 business days depending on your location.
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">📞 Support</h4>
                  <p className="text-orange-700 text-sm">
                    Need help? Contact us at +880 1234-567890 or info@otakughor.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/shop')}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
          >
            🛍️ Continue Shopping
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-white text-purple-600 border-2 border-purple-500 rounded-lg hover:bg-purple-50 transition-all transform hover:scale-105"
          >
            🏠 Back to Home
          </button>
        </div>

        {/* Anime Footer */}
        <div className="text-center mt-12">
          <div className="flex justify-center space-x-4 text-4xl mb-4">
            <span className="animate-bounce">🎌</span>
            <span className="animate-pulse">⛩️</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🌸</span>
            <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>🗾</span>
            <span className="animate-bounce" style={{ animationDelay: '0.9s' }}>🎋</span>
          </div>
          <p className="text-gray-600 font-medium">
            Arigatou gozaimasu! Thank you for choosing OtakuGhor! 🙏
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;