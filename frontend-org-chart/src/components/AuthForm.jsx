import { useState } from "react";

const AuthForm = ({ onSubmit, isSignup, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
      className="flex flex-col gap-4 w-full" 
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        id="email_form"
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
      <input
        type="password"
        placeholder="Password"
        id="pass_form"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading} 
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
      <button
        id="login_button"
        type="submit"
        disabled={loading} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" 
      >
        {loading ? "Loading..." : isSignup ? "Sign Up" : "Login"} {}
      </button>
    </form>
  );
};

export default AuthForm;
