import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/NovoCliente.css";

export default function ClienteForm({ initialData, onSubmit, isEditing = false }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "", telefone: "", cpf:"", endereco: "", valor: "", dataInicial: "", dataFinal: "",
  });
  const [file, setFile] = useState(null);
  const [fotoUrl, setFotoUrl] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && initialData) {
      setForm({
        nome: initialData.nome || "",
        telefone: initialData.telefone || "",
        cpf: initialData.cpf || "",
        endereco: initialData.endereco || "",
        valor: initialData.valor || "",
        dataInicial: initialData.dataInicial || "",
        dataFinal: initialData.dataFinal || "",
      });
      setFotoUrl(initialData.fotoUrl || null);
    }
  }, [isEditing, initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFotoUrl(URL.createObjectURL(selectedFile));
    }
  };

  const isValidCPF = (cpf) =>{
    cpf = cpf.replace(/[^\d]+/g, "");
    if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for(let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    if(resto === 10 || resto === 11) resto = 0;
    if(resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.charAt(10));
  };
  
  const validate = () => {
    const newErrors = {};
    if (!form.nome) newErrors.nome = "Nome é obrigatório";
    if (!form.telefone) newErrors.telefone = "Telefone é obrigatório";
    if (!form.endereco) newErrors.endereco = "Endereço é obrigatório";
    if (!form.valor) newErrors.valor = "Valor é obrigatório";
    if (!form.dataInicial) newErrors.dataInicial = "Data inicial é obrigatória";
    if (!form.dataFinal) newErrors.dataFinal = "Data final é obrigatória";

    if(!form.cpf){
      newErrors.cpf = "CPF é obrigatório";
    }else if(!isValidCPF(form.cpf)){
      newErrors.cpf = "CPF inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form, file);
    }
  };

  return (
    <div className="novoCliente">
      <h2>{isEditing ? "Editar Cliente" : "Novo Cliente"}</h2>
      <form onSubmit={handleSubmit}>
        {/* NOME */}
        <div className="form-group">
          <label>Nome Completo</label>
          <input type="text" name="nome" value={form.nome} onChange={handleChange} />
          {errors.nome && <span className="erro">{errors.nome}</span>}
        </div>
        
        {/* TELEFONE */}
        <div className="form-group">
          <label>Telefone</label>
          <input type="text" name="telefone" value={form.telefone} onChange={handleChange} />
          {errors.telefone && <span className="erro">{errors.telefone}</span>}
        </div>

        {/* ENDEREÇO */}
        <div className="form-group">
          <label>Endereço</label>
          <input type="text" name="endereco" value={form.endereco} onChange={handleChange} />
          {errors.endereco && <span className="erro">{errors.endereco}</span>}
        </div>
        
        {/* CPF */}
        <div className="form-group">
          <label>CPF</label>
          <input type="text" name="cpf" value={form.cpf} onChange={handleChange} />
          {errors.cpf && <span className="erro">{errors.cpf}</span>}
        </div>
        
        {/* DATA INICIAL */}
        <div className="form-group">
          <label>Data Inicial</label>
          <input type="date" name="dataInicial" value={form.dataInicial} onChange={handleChange} />
          {errors.dataInicial && <span className="erro">{errors.dataInicial}</span>}
        </div>
        
        {/* DATA FINAL */}
        <div className="form-group">
          <label>Data Final</label>
          <input type="date" name="dataFinal" value={form.dataFinal} onChange={handleChange} />
          {errors.dataFinal && <span className="erro">{errors.dataFinal}</span>}
        </div>
        
        {/* VALOR */}
        <div className="form-group">
          <label>Valor</label>
          <input type="number" name="valor" value={form.valor} onChange={handleChange} />
          {errors.valor && <span className="erro">{errors.valor}</span>}
        </div>

        {/* FOTO */}
        <label>Foto</label>
        {fotoUrl && (
          <div style={{ marginBottom: "10px" }}>
            <img src={fotoUrl} alt="Preview" width={120} />
          </div>
        )}
        <input type="file" onChange={handleFileChange} />

        {/* BOTÕES */}
        <div className="botoesForm">
          <button type="submit" className="btnSalvar">
            {isEditing ? "Salvar Alterações" : "Adicionar Cliente"}
          </button>
          <button type="button" className="btnCancelar" onClick={() => navigate("/")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}