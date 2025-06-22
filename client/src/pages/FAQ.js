import React, { useState } from 'react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      category: "🛒 Orders & Shopping",
      questions: [
        {
          question: "How do I place an order?",
          answer: "Simply browse our anime collection, add items to your cart, and proceed to checkout! You can create an account for faster future orders, or checkout as a guest. We accept major credit cards and digital payments."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "You can modify or cancel your order within 2 hours of placing it. After that, your order enters our fulfillment process. Contact us immediately at orders@otakughor.com if you need changes!"
        },
        {
          question: "Do you offer pre-orders for upcoming releases?",
          answer: "Yes! We offer pre-orders for highly anticipated anime figures, manga volumes, and collectibles. Pre-order items require full payment upfront and will ship when they arrive from Japan."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept Visa, MasterCard, American Express, bKash, Nagad, Rocket, and bank transfers. All payments are processed securely through our encrypted payment system."
        }
      ]
    },
    {
      category: "🚚 Shipping & Delivery",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Dhaka: 1-2 business days | Other major cities: 2-3 business days | Remote areas: 3-5 business days. We ship Monday-Saturday and provide tracking information for all orders."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we only ship within Bangladesh. However, we're working on international shipping options for our fellow otakus worldwide! Stay tuned for updates."
        },
        {
          question: "What are the shipping costs?",
          answer: "Shipping costs vary by location and order size: Dhaka (60-120 BDT), Outside Dhaka (100-200 BDT). Free shipping on orders over 2000 BDT within Bangladesh!"
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely! Once your order ships, you'll receive a tracking number via email and SMS. You can track your package in real-time through our website or the courier's tracking system."
        }
      ]
    },
    {
      category: "📦 Products & Quality",
      questions: [
        {
          question: "Are your products authentic?",
          answer: "Yes! We source all our anime merchandise from official distributors and licensed manufacturers. Every figure, manga, and collectible is 100% authentic with proper licensing."
        },
        {
          question: "Do you sell bootleg or counterfeit items?",
          answer: "Never! We're committed to supporting official anime creators and publishers. All our products are genuine, and we actively avoid counterfeit merchandise to protect both customers and the anime industry."
        },
        {
          question: "What if I receive a damaged item?",
          answer: "We carefully package all items, but if something arrives damaged, contact us within 48 hours with photos. We'll immediately send a replacement or provide a full refund - no questions asked!"
        },
        {
          question: "Do you have a physical store?",
          answer: "We're primarily online, but we're planning to open a physical otaku paradise in Dhaka soon! Follow our social media for updates on our grand opening."
        }
      ]
    },
    {
      category: "👤 Account & Membership",
      questions: [
        {
          question: "Do I need an account to shop?",
          answer: "You can shop as a guest, but creating an account gives you benefits like order tracking, wishlist, faster checkout, exclusive member discounts, and early access to limited releases!"
        },
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page, enter your email, and we'll send you a reset link. If you don't receive it within 10 minutes, check your spam folder or contact support."
        },
        {
          question: "Can I change my shipping address?",
          answer: "You can update your default shipping address in your account settings. For specific orders, you can change the address during checkout or contact us within 2 hours of ordering."
        },
        {
          question: "How do I delete my account?",
          answer: "We're sad to see you go! Email us at support@otakughor.com with your account deletion request. We'll process it within 48 hours and confirm via email."
        }
      ]
    },
    {
      category: "💰 Pricing & Promotions",
      questions: [
        {
          question: "Do you offer student discounts?",
          answer: "Yes! Students get 10% off with valid student ID verification. We believe every student should be able to afford their favorite anime merchandise!"
        },
        {
          question: "How often do you have sales?",
          answer: "We have seasonal sales, special anime event promotions, and flash sales throughout the year. Subscribe to our newsletter and follow our social media for exclusive deals!"
        },
        {
          question: "Do you price match?",
          answer: "We strive to offer competitive prices. If you find a lower price for the same authentic item from another authorized retailer in Bangladesh, contact us and we'll consider price matching."
        },
        {
          question: "Are there loyalty rewards?",
          answer: "Our OtakuGhor Loyalty Program gives you points for every purchase, reviews, and referrals. Points can be redeemed for discounts on future orders. More purchases = more rewards!"
        }
      ]
    },
    {
      category: "🔄 Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer: "30-day return window for unopened items in original condition. Defective items get free return shipping. Change-of-mind returns require customer to pay return shipping. See our Return Policy page for full details."
        },
        {
          question: "Can I exchange items?",
          answer: "Yes! Same-item exchanges (different size/color) have free shipping both ways. Different-item exchanges may have price differences. Contact us at returns@otakughor.com to start the process."
        },
        {
          question: "How long do refunds take?",
          answer: "Once we receive your return, refunds are processed within 3-5 business days. The money appears in your account within 5-12 business days depending on your bank/payment method."
        },
        {
          question: "Can I return opened figures?",
          answer: "Opened figures can only be returned if they're defective or damaged. For quality issues, we'll provide full refunds or replacements. Change-of-mind returns require items to be unopened."
        }
      ]
    },
    {
      category: "🎌 Anime & Culture",
      questions: [
        {
          question: "Do you organize anime events?",
          answer: "Yes! We sponsor and organize anime conventions, cosplay contests, and community meetups in Dhaka. Follow our social media for event announcements and free tickets!"
        },
        {
          question: "Can you recommend anime based on my interests?",
          answer: "Absolutely! Our team are huge anime fans. Contact us with your favorite genres or series, and we'll recommend similar anime and related merchandise you might love!"
        },
        {
          question: "Do you support local anime creators?",
          answer: "We're proud supporters of Bangladesh's growing anime and manga community! We feature local artists' work and plan to sell original Bangladeshi anime merchandise soon."
        },
        {
          question: "Do you have anime viewing parties?",
          answer: "We host monthly anime viewing parties and discussion sessions for our community! It's a great way to meet fellow otakus and discover new series. Check our events page!"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Anime-themed Header */}
      <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="text-6xl">❓</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-yellow-100">
            Got questions? We've got answers! Like a wise sensei! 🧙‍♂️✨
          </p>
          <div className="flex justify-center space-x-4 mt-6 text-3xl">
            <span className="animate-bounce">💡</span>
            <span className="animate-pulse">❓</span>
            <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>💡</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-yellow-200 p-8">
          
          {/* Introduction */}
          <div className="mb-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border-2 border-dashed border-yellow-300">
            <div className="text-center">
              <div className="text-4xl mb-3">❓ 🎌 ❓</div>
              <h2 className="text-2xl font-bold text-yellow-800 mb-2">Welcome to the FAQ Dojo!</h2>
              <p className="text-yellow-600">
                Find answers to all your questions about OtakuGhor! If you can't find what you're looking for, 
                our support ninjas are always ready to help! 🥷
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers... (e.g., 'shipping', 'returns', 'anime')"
                className="w-full px-6 py-4 rounded-full border-2 border-yellow-300 focus:border-orange-500 focus:outline-none text-gray-700 bg-white/90"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <span className="text-2xl">🔍</span>
              </div>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-6">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white/70 rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4">
                  <h3 className="text-xl font-bold">{category.category}</h3>
                </div>
                <div className="p-4 space-y-2">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    return (
                      <div key={faqIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full text-left p-4 hover:bg-yellow-50 transition-colors flex items-center justify-between"
                        >
                          <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
                          <span className={`text-2xl transition-transform duration-300 ${
                            openFAQ === globalIndex ? 'rotate-180' : ''
                          }`}>
                            ⬇️
                          </span>
                        </button>
                        {openFAQ === globalIndex && (
                          <div className="px-4 pb-4 bg-yellow-50/50 border-t border-gray-200">
                            <div className="pt-4 text-gray-700 leading-relaxed">
                              {faq.answer}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Help Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-bold text-blue-800 mb-2">Live Chat</h3>
              <p className="text-blue-600 text-sm mb-4">Get instant help from our support team</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors">
                Start Chat
              </button>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-bold text-green-800 mb-2">Email Support</h3>
              <p className="text-green-600 text-sm mb-4">Send us detailed questions anytime</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition-colors">
                Send Email
              </button>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-bold text-purple-800 mb-2">Phone Support</h3>
              <p className="text-purple-600 text-sm mb-4">Call us for urgent assistance</p>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-600 transition-colors">
                Call Now
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 border-2 border-dashed border-yellow-300">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4 text-center flex items-center justify-center">
              <span className="mr-3">📞</span>
              Still Need Help?
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-semibold">Email Support</p>
                    <p className="text-sm">support@otakughor.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold">Phone Support</p>
                    <p className="text-sm">+880 1234-567890</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-semibold">Live Chat</p>
                    <p className="text-sm">Available on our website</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🕒</span>
                  <div>
                    <p className="font-semibold">Support Hours</p>
                    <p className="text-sm">Mon-Sat: 10AM-8PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-sm">Dhanmondi, Dhaka, Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p className="text-sm">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <div className="mt-12 text-center p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl">
            <div className="text-4xl mb-4">🎌 ❓ ⛩️</div>
            <p className="text-yellow-800 font-medium">
              We're here to help make your anime shopping experience amazing! 
              Don't hesitate to reach out - we love talking to fellow otakus! ✨
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;