// client/src/pages/AboutUsPage.jsx
import React from 'react';
import { CalendarCheck, Utensils, Award, ScanText, Gift, Star } from 'lucide-react';

// Main App component for the About Us page
function AboutUsPage() { // Renamed from 'App' to 'AboutUsPage' to avoid conflict
  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800 flex flex-col">
      {/* Hero Section with Background Image */}
      <header
        className="relative h-96 md:h-[500px] bg-cover bg-center flex items-center justify-center p-4 rounded-b-xl shadow-lg"
        style={{
          backgroundImage: `url('https://placehold.co/1920x1080/F0F0F0/000000?text=Delicious+Food+Background')`,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-b-xl"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Developer Restaurant
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl italic font-medium drop-shadow-md">
            "Where Code Meets Cuisine"
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* About Us Section */}
        <section className="bg-white p-8 rounded-lg shadow-xl mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-orange-600 mb-6">
            Our Story
          </h2>
          <p className="text-lg leading-relaxed text-center text-gray-700">
            Welcome to Developer Restaurant, a unique culinary experience where the precision of code harmonizes with the artistry of fine dining. Born from a passion for innovation and exceptional food, we strive to create a memorable atmosphere where every dish is crafted with meticulous care and every guest feels at home. Our journey began with a simple idea: to blend modern technology with traditional hospitality to enhance your dining pleasure.
          </p>
        </section>

        {/* Restaurant Booking App Features Section */}
        <section className="bg-white p-8 rounded-lg shadow-xl max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-orange-600 mb-8">
            Experience Seamless Dining with Our App
          </h2>
          <p className="text-lg leading-relaxed text-center text-gray-700 mb-10">
            Our upcoming restaurant booking application is designed to make your dining experience effortless and enjoyable. Discover a range of features tailored to your convenience:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Online Reservations */}
            <div className="flex flex-col items-center text-center p-6 bg-orange-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <CalendarCheck className="text-orange-500 mb-4" size={48} strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Effortless Online Reservations</h3>
              <p className="text-gray-600">Book your table anytime, anywhere with just a few taps. Real-time availability ensures you get the perfect spot.</p>
            </div>

            {/* Feature 2: Personalized Menu Customization */}
            <div className="flex flex-col items-center text-center p-6 bg-orange-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Utensils className="text-orange-500 mb-4" size={48} strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Menu Customization</h3>
              <p className="text-gray-600">Browse our full menu, view detailed descriptions, and customize your order with dietary preferences and special requests.</p>
            </div>

            {/* Feature 3: Loyalty & Rewards Program */}
            <div className="flex flex-col items-center text-center p-6 bg-orange-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Award className="text-orange-500 mb-4" size={48} strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exclusive Loyalty & Rewards</h3>
              <p className="text-gray-600">Earn points with every visit and redeem them for exciting discounts, complimentary dishes, and special experiences.</p>
            </div>

            {/* Feature 4: Seamless Digital Payments */}
            <div className="flex flex-col items-center text-center p-6 bg-orange-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <ScanText className="text-orange-500 mb-4" size={48} strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Seamless Digital Payments</h3>
              <p className="text-gray-600">Enjoy quick and secure in-app payments, splitting bills, and viewing your transaction history effortlessly.</p>
            </div>

            {/* Feature 5: Special Offers & Events */}
            <div className="flex flex-col items-center text-center p-6 bg-orange-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Gift className="text-orange-500 mb-4" size={48} strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Special Offers & Event Updates</h3>
              <p className="text-gray-600">Stay informed about our latest promotions, seasonal menus, and exclusive culinary events directly through the app.</p>
            </div>

            {/* Feature 6: Feedback & Reviews */}
            <div className="flex flex-col items-center text-center p-6 bg-orange-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Star className="text-orange-500 mb-4" size={48} strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Feedback & Reviews</h3>
              <p className="text-gray-600">Share your dining experience and help us improve. Your feedback is valuable and helps us serve you better.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-6 mt-12 rounded-t-xl shadow-inner">
        <p className="text-sm">&copy; {new Date().getFullYear()} Developer Restaurant. All rights reserved.</p>
        <p className="text-xs mt-2">Crafted with passion and code.</p>
      </footer>
    </div>
  );
}

export default AboutUsPage; // Export as AboutUsPage