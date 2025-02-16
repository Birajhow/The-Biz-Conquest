import { useState } from "react";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import './Login.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      await handleLogin(email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to login. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Background.jpg')",
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div id="textControl">
        <div className="relative z-10 flex flex-col items-center w-full max-w-md p-10 shadow-2xl rounded-xl">
          <h2 id="login_title" className="text-2xl font-semibold text-white-700 mb-6">
            Sign in to your account
          </h2>
          <AuthForm 
            onSubmit={handleSubmit} 
            isSignup={false} 
            loading={loading} 
          />
          {error && (
            <p id="error_message" className="text-red-500 text-center mt-4">
              {error}
            </p>
          )}
          <p id="bottom_text" className="text-sm text-gray-600 text-center mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
            <i id="forgot">
              <a href="/signup" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
