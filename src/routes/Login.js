import { useState } from "react";
import { useNavigate } from "react-router-dom";


// Component Import
import LoginForm from "../components/LoginForm";
import LogoutForm from "../components/LogoutForm";

const API_URL = "http://sefdb02.qut.edu.au:3001";
const url = `${API_URL}/user/login`;

export default function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(email, password) {
    try {
      let res = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      let status = res.status;

      if (status !== 200) {
        if (status === 400) {
          throw new Error("Email and password fields must not be blank!");
        } else if (status === 401) {
          throw new Error("Incorrect email or password.");
        }
      } else {
        let data = await res.json();
        await props.setCookie("token", data.token, { path: "/", maxAge: data.expires_in });
        navigate("/"); // Navigate to home page
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function logout() {
    props.removeCookie("token", {path: "/"});
  }
  
  return !props.cookies.token ? (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      login={login}
      error={error}
    />
  ) : (
    <LogoutForm logout={logout} />
  );
}
