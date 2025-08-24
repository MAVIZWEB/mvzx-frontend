import { ethers } from 'ethers';

export const generateRealWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase
  };
};

export const encryptPrivateKey = async (privateKey: string, pin: string): Promise<string> => {
  const encoder = new TextEncoder();
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(pin),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('mvzx-salt-v1'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(privateKey)
  );

  return JSON.stringify({
    iv: Array.from(iv),
    encrypted: Array.from(new Uint8Array(encrypted)),
    version: '1.0'
  });
};

export const decryptPrivateKey = async (encryptedData: string, pin: string): Promise<string> => {
  try {
    const data = JSON.parse(encryptedData);
    const encoder = new TextEncoder();
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(pin),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('mvzx-salt-v1'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(data.iv) },
      key,
      new Uint8Array(data.encrypted)
    );

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    throw new Error("Failed to decrypt wallet. Wrong PIN?");
  }
};
