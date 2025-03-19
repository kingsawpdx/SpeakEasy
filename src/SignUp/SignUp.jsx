import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabaseClient";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { fullName } }
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <div className="signup-box">
        <h2>Sign up with</h2>
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
        <form onSubmit={handleSignUp}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-wrapper">
            <AiOutlineUser className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
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
          <div className="input-wrapper">
            <AiOutlineLock className="input-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="signup-button">Sign Up</button>
        </form>
        <p className="signup-text">
          Already have an account? <Link to="/login">Log in now</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
