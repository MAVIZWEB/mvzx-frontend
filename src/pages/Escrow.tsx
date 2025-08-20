 import React, { useEffect, useState } from "react";
import { api } from "../services/api";

type Offer = { id: number; type: "BUY"|"SELL"; price: number; min: number; max: number };

const Escrow: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [type, setType] = useState<"BUY"|"SELL">("BUY");
  const [price, setPrice] = useState<number>(200); // NGN per MVZx as placeholder
  const [min, setMin] = useState<number>(50);
  const [max, setMax] = useState<number>(1000);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await api.listOffers();
      setOffers(res || []);
    } catch { /* ignore list errors for now */ }
  };

  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      await api.createOffer({ type, price, min, max });
      setMsg("✅ Offer created.");
      await load();
    } catch (err: any) { setMsg(`❌ ${err.message}`); }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-3">🤝 Escrow P2P Offers</h2>
          <ul className="divide-y">
            {offers.map(o => (
              <li key={o.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{o.type} MVZx</div>
                  <div className="text-sm text-gray-600">₦{o.price} / MVZx • {o.min}-{o.max} MVZx</div>
                </div>
                <button className="px-3 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700">
                  Trade
                </button>
              </li>
            ))}
            {offers.length === 0 && <li className="py-6 text-gray-500 text-sm">No offers yet.</li>}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-3">Create Offer</h2>
          <form onSubmit={create} className="grid gap-3">
            <select className="border rounded-xl p-3" value={type} onChange={e=>setType(e.target.value as any)}>
              <option value="BUY">BUY MVZx</option>
              <option value="SELL">SELL MVZx</option>
            </select>
            <input className="border rounded-xl p-3" type="number" min={1} value={price}
                   onChange={e=>setPrice(Number(e.target.value))} placeholder="Price (NGN per MVZx)" />
            <input className="border rounded-xl p-3" type="number" min={1} value={min}
                   onChange={e=>setMin(Number(e.target.value))} placeholder="Min MVZx" />
            <input className="border rounded-xl p-3" type="number" min={1} value={max}
                   onChange={e=>setMax(Number(e.target.value))} placeholder="Max MVZx" />
            <button className="w-full py-3 rounded-xl text-white bg-indigo-700 hover:bg-indigo-800">Post Offer</button>
          </form>
          {msg && <p className="mt-3">{msg}</p>}
        </div>
      </div>
    </div>
  );
};

export default Escrow;
