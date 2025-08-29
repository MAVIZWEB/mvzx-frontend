 import React, { useState } from 'react';
import API from '../services/api';
export default function Purchase(){
  const [amount, setAmount] = useState(2000);
  async function payFlutter(){
    // call backend to create payment - backend webhook will credit tokens
    alert('Flutterwave inline integration: backend will provide charge link or flutterwave SDK step.');
  }
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">Buy MVZx</h2>
      <label className="block mb-1">Amount (NGN)</label>
      <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} className="w-full p-2 border mb-4" />
      <button onClick={payFlutter} className="w-full p-2 bg-green-600 text-white">Pay with Flutterwave</button>
    </div>
  )
}
