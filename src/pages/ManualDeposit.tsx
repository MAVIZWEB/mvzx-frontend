 import React, { useState } from "react";

export default function ManualDeposit() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !date || !receipt) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("date", date);
      formData.append("receipt", receipt);

      // Replace this URL with your backend endpoint
      const res = await fetch("https://your-backend.com/manual-deposit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          "Deposit request submitted. Admin will review and tokens will be sent upon approval."
        );
        setName("");
        setPhone("");
        setDate("");
        setReceipt(null);
      } else {
        setMessage(data.error || "Submission failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Manual Deposit</h1>

      <div className="mb-6 p-4 border rounded-lg bg-gray-100 w-full max-w-md text-gray-800">
        <h2 className="font-semibold mb-2">Company Bank Details</h2>
        <p>
          Bank: UBA<br />
          Account Name: MASSES<br />
          Account Number: 1026664654
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="tel"
          placeholder="Nigeria Mobile Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="datetime-local"
          placeholder="Date & Time on Receipt"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) =>
            e.target.files ? setReceipt(e.target.files[0]) : null
          }
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Deposit"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}
