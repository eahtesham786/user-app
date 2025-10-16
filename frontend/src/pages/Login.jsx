import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(localStorage.getItem("email" || ""));
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  //Load saved email from local Storage when componenst mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Save the jwt token inside the local Stoarage.
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email);
      console.log(res.data.message);
      navigate("/dashboard"); //redirect to the protected page
    } catch (err) {
      console.log(err);
      alert(err.response.data.message || "LogIn Failed!");
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <h2>LogIn</h2>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">LogIn</button>
      <br />
      <p>
        Don't have an account, click here to
        <Link to="/signup"> SignUp.</Link>
      </p>
    </form>
  );
}

export default Login;
