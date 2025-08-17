 import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-6">
      {/* Logo */}
      <img
        src="https://i.imgur.com/VbxvCK6.jpeg"
        alt="MAVIZ Logo"
        className="w-40 h-40 mb-6 rounded-full shadow-lg"
      />

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-4">
        MAVIZ (MVZx) <br /> LIQUIDITY & REVENUE SHARING SYSTEM
      </h1>

      {/* Content */}
      <div className="max-w-2xl text-gray-700 space-y-4 text-lg leading-relaxed text-center">
        <p>
          ✅ <strong>EARN:</strong> You can Earn up to{" "}
          <span className="font-bold text-green-600">N2M</span> in Days Just
          Buying. That&apos;s it.
        </p>

        <p>
          ✅ <strong>NOTE:</strong> This is a{" "}
          <span className="font-semibold">Community Reward System</span> for
          Buyers &amp; Not A Right. The{" "}
          <span className="text-indigo-600 font-semibold">MVZx Tokens</span> you
          Buy is your Right but the Revenue Sharing is Benevolence for Community
          Building.
        </p>

        <p>
          ✅ <strong>HOW:</strong> Earn Bonuses as others Buy MAVIZ (MVZx) Tokens
          because Purchases after yours, using your affiliate link or not, pays
          you worldwide. First Earning is{" "}
          <span className="font-bold">N10K (7.5 USDT)</span>, the 2nd, 3rd,
          4th... earnings get louder while your{" "}
          <span className="text-indigo-600 font-semibold">MVZx Tokens</span>{" "}
          price value will also rise at Token Launch.
          <span className="block mt-2 font-bold text-green-700">
            Early to Buy, Early to Earn. Start!
          </span>
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <a
          href="#buy" // Replace with your Buy Page link
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-2xl shadow-md hover:bg-indigo-700 transition"
        >
          Buy MVZx Now
        </a>
        <a
          href="https://t.me/MAVIZq"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-2xl shadow-md hover:bg-green-700 transition"
        >
          Join the Community
        </a>
      </div>
    </div>
  );
}
