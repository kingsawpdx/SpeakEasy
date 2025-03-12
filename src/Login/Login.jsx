
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";

 
console.log("Login component is rendering!");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (email === "test@example.com" && password === "password123") {
      navigate("/"); 
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="auth-container">
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className = "input-wrapper">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <AiOutlineMail className="icon" />
        </div>

        <div className = "input-wrapper">
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <AiOutlineLock className="icon" />
        </div>

        <a href="#" className ="forgot-pass-link">Forgot Password</a>
        <button className="login-button">Login</button>
        <p className="signup-text">Don&apos;t have an account? <Link to="/signup">Sign Up Now</Link>
</p>

      </form>
      </div>
  );
};
export default Login;
