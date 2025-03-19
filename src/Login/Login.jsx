// Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//import { supabase } from "../../api/supabaseClient";
import "./Login.css";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="auth-container">
      <div className="login-box">
        <h2>Log in with</h2>
        <div className="social-login">
          <button className="social-button">
            <img src="google.svg" alt="Google" className="social-icon" />
            Google
          </button>
          <button className="social-button">
            <img src="apple.svg" alt="Apple" className="social-icon" />
            Apple
          </button>
        </div>
        <p className="separator"><span>or</span></p>
        <form onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-wrapper">
            <AiOutlineMail className="input-icon" />
            <input 
              type="email" 
              placeholder="Email address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-wrapper">
            <AiOutlineLock className="input-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <Link to="#" className="forgot-pass-link">Forgot Password?</Link>
          <button className="login-button">Log In</button>
        </form>
        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;