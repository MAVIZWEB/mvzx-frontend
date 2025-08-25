 import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = {
  signup: (data: { email: string; pin: string; wallet?: string }) =>
    axios.post(`${BASE_URL}/users/signup`, data).then(res => res.data),
  login: (data: { email: string; pin: string }) =>
    axios.post(`${BASE_URL}/users/login`, data).then(res => res.data),
  getBalance: () =>
    axios.get(`${BASE_URL}/users/balance`).then(res => res.data),
  spinWheel: () =>
    axios.post(`${BASE_URL}/games/spin`).then(res => res.data),
  buyMVZX: (amount: number) =>
    axios.post(`${BASE_URL}/payments/buy`, { amount }).then(res => res.data),
  directTransfer: (amount: number) =>
    axios.post(`${BASE_URL}/payments/direct`, { amount }).then(res => res.data),
  miningClaim: () =>
    axios.post(`${BASE_URL}/mining/claim`).then(res => res.data),
  airdropClaim: () =>
    axios.post(`${BASE_URL}/airdrop/claim`).then(res => res.data),
  listOffers: () =>
    axios.get(`${BASE_URL}/escrow/offers`).then(res => res.data),
  createOffer: (offer: any) =>
    axios.post(`${BASE_URL}/escrow/create`, offer).then(res => res.data),
  castVote: (choice: "UP"|"FLAT"|"DOWN") =>
    axios.post(`${BASE_URL}/voting/cast`, { choice }).then(res => res.data),
  getBallot: () =>
    axios.get(`${BASE_URL}/voting/ballot`).then(res => res.data)
};
