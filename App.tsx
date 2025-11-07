import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import ProductGrid from './components/ProductGrid';
import Testimonials from './components/Testimonials';
import TrustElements from './components/TrustElements';
import Footer from './components/Footer';

const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fullname, email, message } = formData;
    const recipientEmail = 'ayoubsa459@gmail.com';
    const subject = encodeURIComponent(`New Message from ${fullname} via Tradify`);
    const body = encodeURIComponent(
      `You have received a new message from your website contact form.\n\n` +
      `Here are the details:\n\n` +
      `Full Name: ${fullname}\n` +
      `Email Address: ${email}\n\n` +
      `Message:\n${message}`
    );

    // This will open the user's default email client
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Contact Us</h2>
          <p className="text-lg font-medium text-gray-700 mt-3">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {submitted ? (
            <div className="text-center py-8 animate-fade-in">
              <p className="text-2xl text-green-600 font-semibold">✅ Thank you for your message!</p>
              <p className="text-gray-700 mt-2">We’ll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="full-name"
                    autoComplete="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};


const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const handleFilterTopRated = () => {
    setRatingFilter(5);
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Header setSearchQuery={setSearchQuery} />
      <main>
        <Hero onDiscoverTopPicks={handleFilterTopRated} />
        <Benefits />
        <ProductGrid
          searchQuery={searchQuery}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
        />
        <Testimonials />
        <TrustElements />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;