import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = 'http://192.168.100.4:8000/api';

export async function login(username: string, password: string) {
  try {
    console.log('authService: Login attempt...', { username });
    const response = await fetch(`${BASE_URL}/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }), // ✅ username
    });

    const data = await response.json();
    console.log('authService: Login response:', response.status);

    if (!response.ok) {
      const errorMessage = data.detail || data.message || "Login failed";
      throw new Error(errorMessage);
    }

    // ✅ Consistent token storage
    await AsyncStorage.setItem("access_token", data.access);
    await AsyncStorage.setItem("refresh_token", data.refresh);
    return data;
  } catch (error) {
    console.error('authService: Login error:', error);
    throw error;
  }
}

export async function register(username: string, email: string, password: string) {
  try {
    console.log('authService: Registration attempt...', { username, email });
    const response = await fetch(`${BASE_URL}/users/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    console.log('authService: Registration response:', response.status);

    if (!response.ok) {
      // ✅ Better error handling
      let errorMessage = 'Registration failed';
      if (data.username) {
        errorMessage = `Username: ${data.username[0]}`;
      } else if (data.email) {
        errorMessage = `Email: ${data.email[0]}`;
      } else if (data.password) {
        errorMessage = `Password: ${data.password[0]}`;
      } else if (data.detail) {
        errorMessage = data.detail;
      }
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('authService: Registration error:', error);
    throw error;
  }
}

export async function getUserInfo(token: string) {
  try {
    const response = await fetch(`${BASE_URL}/users/me/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('authService: Get user info error:', error);
    throw error;
  }
}

// ✅ ახალი updateProfile ფუნქცია
export async function updateProfile(updates: any, token: string) {
  try {
    console.log('authService: Updating profile...', updates);
    
    const response = await fetch(`${BASE_URL}/users/me/`, {
      method: 'PATCH', // ან PUT შენი Django API-ის მიხედვით
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    const data = await response.json();
    console.log('authService: Profile update response:', response.status);

    if (!response.ok) {
      const errorMessage = data.detail || data.message || "Profile update failed";
      throw new Error(errorMessage);
    }

    return data; // განახლებული user data
  } catch (error) {
    console.error('authService: Profile update error:', error);
    throw error;
  }
}