// Simulated Authentication Service
// Replace with real API calls when backend is ready

export const loginRequest = async ({ phone, password, role }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Validate inputs
  if (!phone || !password) {
    throw new Error("Email and password are required");
  }

  // Mock token and user data
  const mockToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const mockUser = {
    id: "user_123",
    email: "oluwatimileyinadeosun@gmail.com",
    name: "Oluwatimileyin",
    phone: phone,
    role: role || "customer",
    avatar: null,
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    token: mockToken,
    user: mockUser,
    message: "Login successful",
  };
};

export const signupRequest = async ({
  name,
  email,
  password,
  role,
  phone,
}) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Validate inputs
  if (!name || !email || !password || !phone) {
    throw new Error("All fields are required");
  }

  // Mock token and user data
  const mockToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const mockUser = {
    id: `user_${Math.random().toString(36).substr(2, 9)}`,
    email: email,
    name: name,
    phone: phone,
    role: role || "customer",
    avatar: null,
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    token: mockToken,
    user: mockUser,
    message: "Account created successfully",
  };
};

/* Original commented API logic:
const BASE_URL = "https://your-api-url.com";

const response = await fetch(`${BASE_URL}/auth/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
    role,
  }),
});

const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || "Login failed");
}

return data; // expected: { token, user }
*/
