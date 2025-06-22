import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from '../config/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      // If product not found, redirect to shop
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      await addToCart(product, quantity);
      // Show success message or redirect to cart
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-anime-purple-50 to-anime-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-anime-purple-500 mx-auto"></div>
          <p className="mt-4 text-anime-purple-600 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-anime-purple-50 to-anime-pink-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="btn-anime btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-purple-50/30 to-anime-pink-50/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-anime-purple-600 hover:text-anime-purple-700">Home</Link>
            <span className="text-gray-400">›</span>
            <Link to="/shop" className="text-anime-purple-600 hover:text-anime-purple-700">Shop</Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-600">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = 'https://via.placeholder.com/500x500/a855f7/ffffff?text=Product'; }}
              />
            </div>
            
            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index 
                        ? 'border-anime-purple-500 ring-2 ring-anime-purple-200' 
                        : 'border-gray-200 hover:border-anime-purple-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.src = 'https://via.placeholder.com/80x80/a855f7/ffffff?text=Img'; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Title & Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-anime-purple-600">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Rating & Reviews */}
            {product.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews || 0} reviews)
                </span>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`}></span>
              <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
                {product.stock && product.inStock && ` (${product.stock} available)`}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
              {product.category && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Category:</span>
                  <p className="text-gray-900">{product.category}</p>
                </div>
              )}
              {product.brand && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Brand:</span>
                  <p className="text-gray-900">{product.brand}</p>
                </div>
              )}
              {product.printType && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Type:</span>
                  <p className="text-gray-900">{product.printType}</p>
                </div>
              )}
              {product.volume && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Edition:</span>
                  <p className="text-gray-900">{product.volume}</p>
                </div>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800"
                      disabled={product.stock && quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="flex-1 btn-anime btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingToCart ? 'Adding...' : '🛒 Add to Cart'}
                  </button>
                  <button className="px-6 py-3 border-2 border-anime-purple-500 text-anime-purple-600 rounded-2xl font-medium hover:bg-anime-purple-50 transition-colors duration-200">
                    💖 Wishlist
                  </button>
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-anime-purple-500">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Back to Shop */}
        <div className="mt-12 text-center">
          <Link to="/shop" className="btn-anime btn-secondary">
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;