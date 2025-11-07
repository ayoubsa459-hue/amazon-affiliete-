
import React from 'react';
import { TESTIMONIALS } from '../constants';
import type { Testimonial } from '../types';
import { StarIcon } from './icons';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex text-yellow-400 mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
      </div>
      <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
      <p className="font-semibold text-gray-800">{testimonial.author}</p>
      <p className="text-sm text-gray-500">{testimonial.location}</p>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Shoppers Say</h2>
          <p className="text-gray-600 mt-2">Real reviews from happy customers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
