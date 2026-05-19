import { useState } from "react";

export default function Login({
  setIsLoggedIn,
  setPage,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      setIsLoggedIn(true);
      setPage("dashboard");
    } else {
      alert("Enter Email & Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🏥</h1>

        <h2>Hospital Login</h2>

         <p>Welcome Back Doctor</p> 

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Login 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
