
import React from 'react';
import { ShieldCheckIcon, TruckIcon, CreditCardIcon } from './icons';

const trustItems = [
    {
        icon: <ShieldCheckIcon />,
        title: 'Amazon Verified',
        description: 'All products are sourced directly from trusted sellers on Amazon.'
    },
    {
        icon: <TruckIcon />,
        title: 'Secure Shipping',
        description: 'Leverage Amazon\'s world-class logistics for safe and timely delivery.'
    },
    {
        icon: <CreditCardIcon />,
        title: 'Safe Payments',
        description: 'Your transactions are processed securely through Amazon\'s payment system.'
    }
]

const TrustElements: React.FC = () => {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {trustItems.map((item, index) => (
                        <div key={index} className="p-6">
                            {item.icon}
                            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustElements;
