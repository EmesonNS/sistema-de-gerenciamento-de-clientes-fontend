import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import "./CardCliente.css";

const formatarData = (dataString) => {
  if (!dataString) return "";
  const [ano, mes, dia] = dataString.split('-');
  return `${dia}/${mes}/${ano}`;
};

export default function CardCliente({ cliente, onDelete, onUpdate }) {
  const navigate = useNavigate();
  const [fotoUrl, setFotoUrl] = useState(null);

  useEffect(() => {
    let mounted = true;
    let objectUrl = null;
    (async () => {
      try {
        const blob = await apiRequest(`/clientes/${cliente.id}/foto`, "GET");
        if (!blob) return;
        objectUrl = URL.createObjectURL(blob);
        if (mounted) setFotoUrl(objectUrl);
      } catch (e) {
        
      }
    })();
    return () => {
      mounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [cliente.id]);

  return (
    <div className="cardCliente">
      <img src={fotoUrl || cliente.foto || "/assets/default.jpeg"} alt={cliente.nome} className="foto" />
      <h3>{cliente.nome}</h3>
      {cliente.status && (
        <span className={`status ${cliente.status.toLowerCase()}`}>
          {cliente.status}
        </span>
      )}

      <p><b>Telefone:</b> {cliente.telefone}</p>
      <p><b>CPF:</b> {cliente.cpf}</p>
      <p><b>Endereço:</b> {cliente.endereco}</p>
      <p><b>Valor:</b> R$ {cliente.valor}</p>
      <p><b>Data Inicial:</b> {formatarData(cliente.dataInicial)}</p>
      <p><b>Data Final:</b> {formatarData(cliente.dataFinal)}</p>

      <div className="acoes">
        <button className="editar" onClick={() => navigate(`/editar/${cliente.id}`)}>Editar</button>
        <button className="excluir" onClick={onDelete}>Excluir</button>
        {cliente.status !== "PAGO" && (
          <button className="pagar" onClick={async () =>{
          try{
            await apiRequest(`/clientes/${cliente.id}/pagar`, "PUT")
            onUpdate();
          }catch(erro){
            alert("Erro ao marcar como pago")
          }
        }}>
          Marcar como Pago
        </button>
        )}
      </div>
    </div>
  );
}
