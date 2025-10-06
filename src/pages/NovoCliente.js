import React from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import ClienteForm from "../components/ClienteForm";

export default function NovoCliente() {
  const navigate = useNavigate();

  const handleCreateSubmit = async (formData, file) => {
    try {
      const payload = {
        ...formData,
        valor: parseFloat(formData.valor),
      };

      const clienteCriado = await apiRequest("/clientes", "POST", payload);

      if (file && clienteCriado && clienteCriado.id) {
        const fd = new FormData();
        fd.append("file", file);
        await apiRequest(`/clientes/${clienteCriado.id}/foto`, "POST", fd, true);
      }

      navigate("/");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar cliente");
    }
  };

  return (
    <ClienteForm 
      onSubmit={handleCreateSubmit} 
      isEditing={false} 
    />
  );
}