import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="text-gray-800">
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">About ClutchBids</h1>
          <p className="mt-2 text-lg">
            Modernizing car auctions for dealers and individuals alike.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
          <p className="text-lg leading-relaxed">
            ClutchBids is an innovative platform for car ads and auctions
            designed to replace outdated systems with peer-to-peer and
            dealer-specific functionalities. With features like real-time
            bidding, flash auctions, and AI-optimized ads, ClutchBids empowers
            users to buy and sell vehicles more efficiently.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Features</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>User authentication with secure sessions and OAuth support.</li>
            <li>Peer-to-peer auctions with custom time and price settings.</li>
            <li>Dealer-only auctions for professional car sellers.</li>
            <li>AI-optimized ad suggestions for better visibility.</li>
            <li>Real-time price monitoring and notifications.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Technology Stack</h2>
          <p className="text-lg leading-relaxed">
            We utilize modern cloud-native tools like Kubernetes, Supabase, and
            Node.js microservices to deliver scalable and secure applications.
            Our frontend leverages Next.js for dynamic rendering and React for a
            smooth user experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Team</h2>
          <p className="text-lg leading-relaxed">
            Created by Group 10
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
