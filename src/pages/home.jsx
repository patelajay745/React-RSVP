import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-16">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Create any event in minutes.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Automate event management, from invite to check-in.
          </p>
          <a
            href="/register"
            className="mt-8 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Get started for free
          </a>
        </section>

        <section id="features" className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Features</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold text-gray-900">Customize</h3>
              <p className="mt-2 text-gray-600">
                Take complete control of invites, registration, check-in, and
                more with RSVPify. Tailor to your brand or style.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold text-gray-900">Control</h3>
              <p className="mt-2 text-gray-600">
                Quickly create a custom event registration experience with
                RSVPify with features like multi-part events, custom tags,
                custom questions, and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold text-gray-900">Automate</h3>
              <p className="mt-2 text-gray-600">
                Streamline event planning and guest communications. Track and
                report in real-time. Scale your events.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
