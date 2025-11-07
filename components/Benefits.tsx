
import React from 'react';
import { QualityIcon, TagIcon, TruckIcon } from './icons';

const benefits = [
  {
    icon: <QualityIcon />,
    title: 'Handpicked Quality',
    description: 'We only feature products with top ratings and proven quality, so you can shop with confidence.',
  },
  {
    icon: <TagIcon />,
    title: 'Best Deals & Prices',
    description: 'Get access to the most competitive prices and exclusive deals available on Amazon.',
  },
  {
    icon: <TruckIcon />,
    title: 'Fast Amazon Shipping',
    description: 'Enjoy the speed and reliability of Amazon\'s delivery network, including Prime shipping.',
  },
];

const Benefits: React.FC = () => {
  return (
    <section id="about" className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Shop With Us?</h2>
            <p className="text-gray-600 mt-2">We simplify your shopping experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              {benefit.icon}
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
