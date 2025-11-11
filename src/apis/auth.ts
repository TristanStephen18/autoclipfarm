import { backendPrefix } from "../confg";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

const API_BASE = import.meta.env.VITE_API_URL || `${backendPrefix}/api/auth`;

export async function loginUser(data: LoginData): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({email: data.email, password: data.password}),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Login failed");
  return json;
}

export async function loginUserWithGoogle(email: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/google-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({email: email}),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Login failed");
  return json;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  message: string;
}

export async function signupUser(data: SignupData): Promise<SignupResponse> {
  const API_BASE = import.meta.env.VITE_API_URL || `${backendPrefix}/api/auth`;

  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Signup failed");
  return json;
}

