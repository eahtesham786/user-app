import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  //Validate Form

  const validateForm = () => {
    //Name validation
    if (!name.trim()) {
      alert("Name is required.");
      return false;
    } else if (!/^[A-za-z\s]+$/.test(name)) {
      alert("Name can contain only letter and spaces");
      return false;
    }

    //Email validation

    if (!email.trim()) {
      alert("Email is required.");
      return false;
    } else if (!/^\S+@\S+\.\S{2,}$/.test(email)) {
      alert("Invalid email format");
      return false;
    }

    //Password Validation

    if (!password.trim()) {
      alert("Password is required");
      return false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
    ) {
      alert(
        "Password must be at least 8 characters,include uppercase, lowercase, number and special character"
      );
      return false;
    }

    //Phone validation

    if (phone && !/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; //Stop if validation fails
    }
    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", {
        name,
        email,
        password,
      });
      console.log(res.data.message);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response.data.message || "Error");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Phone no."
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <button type="submit">Signup</button>
      <br />
      <p>
        Already have an account, click here to
        <Link to="/login"> Login.</Link>
      </p>
    </form>
  );
}
export default Signup;
