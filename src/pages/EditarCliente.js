import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../services/api";
import ClienteForm from "../components/ClienteForm";

export default function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiRequest(`/clientes/${id}`, "GET");
        
        try {
          const blob = await apiRequest(`/clientes/${id}/foto`, "GET");
          if (blob && blob.size > 0) {
            data.fotoUrl = URL.createObjectURL(blob);
          }
        } catch {}
        
        setCliente(data);
      } catch (err) {
        console.error("Erro ao carregar cliente:", err);
        alert("Cliente não encontrado");
        navigate("/");
      }
    })();
  }, [id, navigate]);

  const handleUpdateSubmit = async (formData, file) => {
    try {
      const payload = {
        ...formData,
        valor: parseFloat(formData.valor),
      };

      await apiRequest(`/clientes/${id}`, "PUT", payload);

      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        await apiRequest(`/clientes/${id}/foto`, "POST", fd, true);
      }

      navigate("/");
    } catch (err) {
      console.error("Erro ao atualizar cliente:", err);
      alert("Erro ao atualizar cliente");
    }
  };

  if (!cliente) {
    return <p>Carregando...</p>;
  }

  return (
    <ClienteForm
      initialData={cliente}
      onSubmit={handleUpdateSubmit}
      isEditing={true}
    />
  );
}