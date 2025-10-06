import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [form, setForm] = useState({
    usernameOrEmail: "",
    senha: ""
  });
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);
      navigate("/");
    } catch (error) {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="loginContainer">
      <h2>Sistema de Empréstimo</h2>
      <form onSubmit={handleSubmit} className="loginForm">
        <label>Email</label>
        <input type="text" name="usernameOrEmail" value={form.usernameOrEmail} onChange={handleChange} />

        <label>Senha</label>
        <input type="password" name="senha" value={form.senha} onChange={handleChange} />

        {erro && <p className="erro">{erro}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
