import React, { useState } from 'react';
import axios from '../../config/api';

const SampleDataGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const generateSampleOrders = async () => {
    setLoading(true);
    setMessage('');

    const sampleOrders = [
      {
        customerName: 'Naruto Uzumaki',
        phone: '01712345678',
        address: 'Hidden Leaf Village, Fire Country',
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        orderStatus: 'delivered',
        cartItems: [
          {
            productId: 'sample-prod-1',
            name: 'Attack on Titan Manga Set',
            volume: 'Standard',
            printType: 'yellow',
            price: 1500,
            quantity: 2,
            image: 'https://via.placeholder.com/150'
          }
        ],
        total: 3000,
        shippingCost: 100,
        discount: 0,
        notes: 'Sample order for testing analytics'
      },
      {
        customerName: 'Monkey D. Luffy',
        phone: '01787654321',
        address: 'Going Merry Ship, Grand Line',
        paymentMethod: 'bkash',
        paymentStatus: 'paid',
        orderStatus: 'shipped',
        cartItems: [
          {
            productId: 'sample-prod-2',
            name: 'One Piece Figure Collection',
            volume: 'Premium',
            printType: 'white',
            price: 2500,
            quantity: 1,
            image: 'https://via.placeholder.com/150'
          }
        ],
        total: 2500,
        shippingCost: 150,
        discount: 100,
        notes: 'Sample order for testing analytics'
      },
      {
        customerName: 'Edward Elric',
        phone: '01698765432',
        address: 'Central City, Amestris',
        paymentMethod: 'nagad',
        paymentStatus: 'paid',
        orderStatus: 'processing',
        cartItems: [
          {
            productId: 'sample-prod-3',
            name: 'Fullmetal Alchemist Poster',
            volume: 'Large',
            printType: 'regular',
            price: 800,
            quantity: 3,
            image: 'https://via.placeholder.com/150'
          }
        ],
        total: 2400,
        shippingCost: 80,
        discount: 50,
        notes: 'Sample order for testing analytics'
      },
      {
        customerName: 'Ichigo Kurosaki',
        phone: '01756789123',
        address: 'Karakura Town, Soul Society',
        paymentMethod: 'rocket',
        paymentStatus: 'paid',
        orderStatus: 'delivered',
        cartItems: [
          {
            productId: 'sample-prod-4',
            name: 'Bleach Sword Replica',
            volume: 'Premium',
            printType: 'yellow',
            price: 3500,
            quantity: 1,
            image: 'https://via.placeholder.com/150'
          },
          {
            productId: 'sample-prod-5',
            name: 'Soul Reaper Badge',
            volume: 'Standard',
            printType: 'white',
            price: 500,
            quantity: 2,
            image: 'https://via.placeholder.com/150'
          }
        ],
        total: 4500,
        shippingCost: 120,
        discount: 200,
        notes: 'Sample order for testing analytics'
      },
      {
        customerName: 'Goku Son',
        phone: '01634567890',
        address: 'Mount Paozu, Earth',
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        orderStatus: 'pending',
        cartItems: [
          {
            productId: 'sample-prod-6',
            name: 'Dragon Ball Z Action Figures',
            volume: 'Deluxe',
            printType: 'regular',
            price: 2000,
            quantity: 2,
            image: 'https://via.placeholder.com/150'
          }
        ],
        total: 4000,
        shippingCost: 100,
        discount: 0,
        notes: 'Sample order for testing analytics'
      }
    ];

    try {
      let successCount = 0;
      for (const order of sampleOrders) {
        try {
          await axios.post('/api/orders', order);
          successCount++;
        } catch (error) {
          console.error('Error creating order:', error);
        }
      }
      
      setMessage(`✅ Successfully created ${successCount} sample orders! You can now view analytics data.`);
    } catch (error) {
      console.error('Error generating sample data:', error);
      setMessage('❌ Error generating sample data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 border-2 border-dashed border-blue-300">
      <div className="text-center">
        <div className="text-4xl mb-3">🧪 📊 🎯</div>
        <h3 className="text-xl font-bold text-blue-800 mb-2">Sample Data Generator</h3>
        <p className="text-blue-600 mb-4">
          Generate sample orders to test the analytics dashboard with realistic data
        </p>
        
        <button
          onClick={generateSampleOrders}
          disabled={loading}
          className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
            loading
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Generating Sample Data...
            </>
          ) : (
            <>
              <span className="mr-2">🚀</span>
              Generate Sample Orders
            </>
          )}
        </button>

        {message && (
          <div className={`mt-4 p-3 rounded-lg ${
            message.includes('✅') 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          <p>This will create 5 sample orders with different:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <span className="px-2 py-1 bg-white rounded-full text-xs">Payment Methods</span>
            <span className="px-2 py-1 bg-white rounded-full text-xs">Print Types</span>
            <span className="px-2 py-1 bg-white rounded-full text-xs">Order Status</span>
            <span className="px-2 py-1 bg-white rounded-full text-xs">Products</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleDataGenerator;