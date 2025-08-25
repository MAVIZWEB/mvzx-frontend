 import React from "react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full bg-black text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Black Escrow</h1>
          <nav className="space-x-6">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#escrow" className="hover:underline">Escrow</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-16 text-center">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Secure & Reliable Escrow Platform
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Trade confidently with our blockchain-powered escrow services.
          </p>
          <a
            href="#escrow"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition"
          >
            Start an Escrow
          </a>
        </div>
      </section>

      {/* Escrow Form */}
      <section id="escrow" className="bg-white py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Escrow Form
          </h3>

          <form className="space-y-4 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buyer Name
              </label>
              <input
                type="text"
                placeholder="Enter buyer name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seller Name
              </label>
              <input
                type="text"
                placeholder="Enter seller name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition"
              >
                Submit Escrow
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                Direct Transfer Buy
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="w-full bg-black text-white text-center py-6 mt-auto"
      >
        <p className="text-sm">
          © {new Date().getFullYear()} Black Escrow. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
