import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4">
          <p className="text-sm">
            <strong>Affiliate Disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases. 
            This means that if you click on a link and make a purchase, we may receive a small commission at no extra cost to you.
          </p>
        </div>
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Tradify. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;