import React, { useEffect, useState } from "react";

interface DepositRequest {
  id: string;
  name: string;
  phone: string;
  date: string;
  receiptUrl: string;
  amountMVZx: number; // MVZx to send upon approval
  status: "pending" | "approved" | "rejected";
}

export default function AdminManualDeposits() {
  const [deposits, setDeposits] = useState<DepositRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchDeposits = async () => {
    setLoading(true);
    try {
      // Replace with your backend endpoint
      const res = await fetch("https://your-backend.com/admin/manual-deposits");
      const data = await res.json();
      setDeposits(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load deposits.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    try {
      const res = await fetch(
        `https://your-backend.com/admin/manual-deposits/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setMessage(`Deposit ${action}d successfully.`);
        fetchDeposits(); // refresh list
      } else {
        setMessage(data.error || `Failed to ${action} deposit.`);
      }
    } catch (err) {
      console.error(err);
      setMessage(`Error: Could not ${action} deposit.`);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Admin Manual Deposit Approvals</h1>

      {message && (
        <p className="mb-4 text-center text-gray-700 font-medium">{message}</p>
      )}

      {loading ? (
        <p>Loading deposits...</p>
      ) : deposits.length === 0 ? (
        <p>No pending deposits.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Receipt Date/Time</th>
                <th className="py-2 px-4">Receipt</th>
                <th className="py-2 px-4">MVZx Amount</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit) => (
                <tr key={deposit.id} className="text-center border-b">
                  <td className="py-2 px-4">{deposit.name}</td>
                  <td className="py-2 px-4">{deposit.phone}</td>
                  <td className="py-2 px-4">{new Date(deposit.date).toLocaleString()}</td>
                  <td className="py-2 px-4">
                    <a
                      href={deposit.receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Receipt
                    </a>
                  </td>
                  <td className="py-2 px-4">{deposit.amountMVZx}</td>
                  <td className="py-2 px-4 capitalize">{deposit.status}</td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    {deposit.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAction(deposit.id, "approve")}
                          className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(deposit.id, "reject")}
                          className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
