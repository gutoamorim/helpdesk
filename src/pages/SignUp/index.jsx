// import "./signin.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (name !== "" && email !== "" && password !== "") {
      alert("Fazer cadastro");
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistyema de chamados" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Nova Conta</h1>
          <input
            type="text"
            placeholder="Seu Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Acessar</button>
        </form>
        <Link to="/">Ja possui uma conta? Faça login.</Link>
      </div>
    </div>
  );
};
