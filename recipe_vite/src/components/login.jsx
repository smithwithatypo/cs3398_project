import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint
      const response = await axios.post("/api/login", formData);
      
      if (response.data.success) {
        // Store user data or token in localStorage
        // localStorage.setItem("user", JSON.stringify(response.data.user));
        // localStorage.setItem("token", response.data.token);
        
        // Redirect to home page
        navigate("/");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message ||
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#1e2d3d]">
          Recipe Generator
        </h2>
        <h3 className="text-xl font-semibold mb-6 text-center text-[#1e2d3d]">
          Login to Your Account
        </h3>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="block text-[#1e2d3d] text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d9b75e]"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="block text-[#1e2d3d] text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d9b75e]"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className={`w-full bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        {/* <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-[#d9b75e] hover:underline">
            Forgot password?
          </Link>
        </div>
        
        <div className="mt-6 border-t border-gray-300 pt-4 text-center">
          <p className="text-[#1e2d3d]">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#d9b75e] hover:underline font-semibold">
              Register
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
