const API_URL = "http://localhost:8000/auth";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.detail || "Failed to log in.";
      throw new Error(errorMessage); 
    }

    return response.json();
  } catch (error) {
    throw error; 
  }
};

export const signup = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.detail || "Signup failed. Please try again.";
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    throw error; 
  }
};
