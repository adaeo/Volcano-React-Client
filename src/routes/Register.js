import { useState } from "react";

// Component Import
import RegisterForm from "../components/RegisterForm";
import RegisterComplete from "../components/RegisterComplete";

const API_URL = "http://sefdb02.qut.edu.au:3001";
const url = `${API_URL}/user/register`;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  async function register(email, password, confirmPwd) {
    try {
      if (String(password) !== String(confirmPwd)) {
        console.log(password);
        console.log(confirmPwd);
        throw new Error("Password and Confirm Password must match!");
      }

      let res = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      let status = res.status;

      if (status !== 201) {
        if (status === 400) {
          throw new Error("Email and password fields must not be blank!");
        } else if (status === 409) {
          throw new Error("This user already exists!");
        }
      } else {
        let data = await res.json();
        console.log(data);
        setRegistered(true);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return registered === false ? (
    <RegisterForm
      email={email}
      setEmail={setEmail}
      password={password}
      confirmPwd={confirmPwd}
      setConfirmPwd={setConfirmPwd}
      setPassword={setPassword}
      register={register}
      error={error}
    />
  ) : (
    <RegisterComplete />
  );
}
