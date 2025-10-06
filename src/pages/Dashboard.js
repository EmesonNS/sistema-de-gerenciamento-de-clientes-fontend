import React, { useCallback, useEffect, useState } from "react";
import CardCliente from "../components/CardCliente";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

export default function Dashboard(){
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filtros, setFiltros] = useState([]);
  const [termo, setTermo] = useState("");
  const [resumo, setResumo] = useState({
    totalClientes: 0,
    valorTotal: 0,
    pendentes: 0,
    emAtraso: 0,
    quitados: 0,
  });
  const [loading, setLoading] = useState(true);
  const [dadosVisiveis, setDadosVisiveis] = useState(false);

  const carregarClientes = useCallback(async (pagina = 0 , status = filtros) => {
    setLoading(true);
    setTermo("");
    try {
      let query = `?page=${pagina}&size=8`;
      if(status.length > 0){
        query += "&" + status.map(s => `status=${s}`).join("&");
      }

      const data = await apiRequest(`/clientes/filtro${query}`);
      setClientes(data.content);
      setTotalPages(data.page.totalPages);
      setPage(data.page.number);
    } catch (erro) {
      console.error("Erro ao carregar clientes: " + erro);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  async function carregarResumo() {
    try{
      const data = await apiRequest("/clientes/resumo", "GET");
      setResumo(data);
    }catch(erro){
      console.error("Erro ao carregar resumo:" + erro);
    }
  }

  useEffect(() => {
    carregarClientes(0, filtros);
    carregarResumo();
  }, [filtros, carregarClientes]);

  useEffect(() =>{
    if(termo.trim() === ''){
      carregarClientes(0, filtros);
      return;
    }

    const timer = setTimeout(async () =>{
      try{
        setLoading(true);
        const data = await apiRequest(`/clientes/search?q=${termo}`);
        setClientes(data);
        setTotalPages(1);
        setPage(0);
      }catch(erro){
        console.error("Erro ao pesquisar clientes:", erro);
      }finally{
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [termo, filtros, carregarClientes]);

  const handleFiltroChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFiltros([...filtros, value]);
    } else {
      setFiltros(filtros.filter((f) => f !== value));
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir este cliente?")) return;
    try {
      await apiRequest(`/clientes/${id}`, "DELETE");
      setClientes((prev) => prev.filter((c) => c.id !== id));
      carregarResumo();
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir cliente");
    }
  };

  const handleActionComplete = () => {
    carregarClientes(page, filtros);
    carregarResumo();
  }

  const handlePesquisaChange = (e) =>{
    setTermo(e.target.value);
  }

  const toggleVisibilidade = () =>{
    setDadosVisiveis(prevState => !prevState);
  }

  return(
    <div className="dashboard">
        <h1>Sistema de Gestão de Clientes</h1>
        <p>Gerencie seus clientes e empréstimos de forma simples e eficiente</p>

        {/* Cards de resumo */}
        <div className="resumo-header">
            <h2>Resumo Geral</h2>
            <button onClick={toggleVisibilidade} className="btn-olho" title="Alternar visibilidade dos valores">
                {dadosVisiveis ? (
                  <img src="/assets/olho-fechado.png" alt="Ocultar valores"/>
                ) : (
                  <img src="/assets/olho-aberto.png" alt="Mostrar valores"/>
                )}
            </button>
        </div>

        <div className="resumo">
            <div className="cardResumo">
                <h3>Total de Clientes</h3>
                <p className="azul">{dadosVisiveis ? resumo.totalClientes : '*'}</p>
            </div>

            <div className="cardResumo">
                <h3>Valor Total</h3>
                <p className="verde">{dadosVisiveis ? `R$ ${resumo.valorTotal.toFixed(2)}` : 'R$ ****'}</p>
            </div>

            <div className="cardResumo">
                <h3>Pendentes</h3>
                <p className="amarelo">{dadosVisiveis ? resumo.pendentes : '*'}</p>
            </div>

            <div className="cardResumo">
                <h3>Em Atraso</h3>
                <p className="vermelho">{dadosVisiveis ? resumo.emAtraso : '*'}</p>
            </div>
            
            <div className="cardResumo">
                <h3>Quitados</h3>
                <p className="verde">{dadosVisiveis ? resumo.quitados : '*'}</p>
            </div>
        </div>

        {/* Barra de busca */}
        <div className="dashboard-header">
          <input type="text" placeholder="Burcar Cliente" value={termo} onChange={handlePesquisaChange} className="busca"/>
          <button className="btnNovo" onClick={() => navigate("/novo")}>Novo Cliente</button>
        </div>
        
        <div className="filtros">
            <span className="filtro-label">Filtrar por:</span>
            <div className="filtro-opcoes">
                <div className="filtro-opcao">
                    <input type="checkbox" id="filtro-pendente" name="status" value="PENDENTE" checked={filtros.includes("PENDENTE")} onChange={handleFiltroChange} />
                    <label htmlFor="filtro-pendente">Pendentes</label>
                </div>
                <div className="filtro-opcao">
                    <input type="checkbox" id="filtro-atraso" name="status" value="ATRASADO" checked={filtros.includes("ATRASADO")} onChange={handleFiltroChange} />
                    <label htmlFor="filtro-atraso">Em Atraso</label>
                </div>
                <div className="filtro-opcao">
                    <input type="checkbox" id="filtro-pago" name="status" value="PAGO" checked={filtros.includes("PAGO")} onChange={handleFiltroChange} />
                    <label htmlFor="filtro-pago">Pagos</label>
                </div>
            </div>
        </div>

        {loading ? (
          <p style={{textAlign: 'center', margin: '40px'}}>Carregando Clientes...</p>
        ) : (
          <>
            <div className="clientes">
                {clientes.map(cliente => (
                    <CardCliente 
                        key={cliente.id} 
                        cliente={cliente} 
                        onDelete={() => handleDelete(cliente.id)}
                        onUpdate={handleActionComplete}
                    />
                ))}
            </div>

            {termo.trim() === '' && totalPages > 1 && (
              <div className="paginacao">
                <button onClick={() => carregarClientes(page - 1)} disabled={page === 0}>
                  Anterior
                </button>

                <span>Página {page + 1} de {totalPages}</span>

                <button onClick={() => carregarClientes(page + 1)} disabled={page >= totalPages - 1}>
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
    </div>
  );
}