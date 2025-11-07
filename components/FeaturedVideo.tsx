import React from 'react';

const FeaturedVideo: React.FC = () => {
  return (
    <section className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Watch our top-featured product in action and see why it's a customer favorite.
        </p>
        <div className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
          {/* Placeholder for a YouTube video. Replace with your video embed code. */}
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Example video
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideo;