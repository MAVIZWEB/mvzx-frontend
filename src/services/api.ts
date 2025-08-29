 const API_URL = "https://your-backend.onrender.com"; // change to your backend URL

export async function signup(data: { email?: string; pinHash: string; wallet: string }) {
  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function purchase(data: { userId: number; amountNGN: number; method: string }) {
  try {
    const res = await fetch(`${API_URL}/purchase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function stake(data: { userId: number; amount: number }) {
  try {
    const res = await fetch(`${API_URL}/stake`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function withdraw(data: { userId: number; amountMVZX: number; method: string }) {
  try {
    const res = await fetch(`${API_URL}/withdraw`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}
