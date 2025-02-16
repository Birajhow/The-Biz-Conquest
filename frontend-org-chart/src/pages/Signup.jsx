import { useState } from "react";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const { handleSignup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      await handleSignup(email, password);
      navigate("/");
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Background.jpg')", width: '100vw', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div id="textControl">
        <div className="relative z-10 flex flex-col items-center w-full max-w-md p-10 shadow-2xl rounded-xl">
          <h2 className="text-2xl font-semibold text-white-700 mb-6">
            Create an account
          </h2>
          <AuthForm onSubmit={handleSubmit} isSignup={true} loading={loading} />
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
