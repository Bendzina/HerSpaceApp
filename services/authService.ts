import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.100.4:8000"; 

export async function login(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Login failed");

  const data = await response.json();
  await AsyncStorage.setItem("access", data.access);
  await AsyncStorage.setItem("refresh", data.refresh);
  return data;
}

export async function register(username: string, email: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) throw new Error("Register failed");

  return await response.json();
}
