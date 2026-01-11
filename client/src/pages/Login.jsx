import { useState } from "react";
import { loginUser } from "../services/authApi";
import { setToken, getRole } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const res = await loginUser({ email, password });
    setToken(res.data.token);

    const role = getRole();
    try {
      if (role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/courses";
      }
    } catch (err) {
      alert(err.response?.data.message || "Failed to login");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
