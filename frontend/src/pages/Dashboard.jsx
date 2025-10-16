import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/dashboard",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert("Access denied! Please login again.");
        localStorage.removeItem("token"); //clear token if invalid
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); //remove token
    navigate("/login"); ///redirect to login
  };
  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          padding: "10px 20px",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#e63946",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </nav>

      <div style={{ padding: "20px" }}>
        <h2>Profile Dashboard:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <>
            <p>{data.message}</p>
            <h3>User Info:</h3>
            <ul>
              <li>
                <strong>Name:</strong> {data.user.name}
              </li>
              <li>
                <strong>Email:</strong> {data.user.email}
              </li>
              <li>
                <strong>ID:</strong> {data.user.id}
              </li>
            </ul>
          </>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}
export default Dashboard;
