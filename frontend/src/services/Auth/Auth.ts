import { json } from "stream/consumers";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALE_BACKEND_API_AUTH_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    return response.json()
  }

  const data = await response.json();
  return data;
};

export const register = async (email: string, password: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALE_BACKEND_API_AUTH_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    return response.json()
  }

  const data = await response.json();
  return data;
};


export const verifyToken = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALE_BACKEND_API_AUTH_URL}/verify-token/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return response.json()
  }

  const data = await response.json();
  return data;
};

const logout = async () => {
  const response = await fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return response.json()
  }

  const data = await response.json();
  return data;
};

export const verifyOtp = async (email: string, otp: string, password: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALE_BACKEND_API_AUTH_URL}/verify-otp/`, {
    method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, password }),
    
  });


  return response.json();
};