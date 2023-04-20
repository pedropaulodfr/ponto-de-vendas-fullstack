import React, { useEffect, useState } from "react";
import './TabelaPontosVendas.css'
import ModalConfirmacao from '../ModalConfirmacao/ModalConfirmacao';
import ModalEdicao from "../ModalEdicao/ModalEdicao";
import Alertas from "../Alertas/Alertas";
import api from '../../api';

const TabelaPontosVendas = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showModalEdicao, setShowModalEdicao] = useState(false);
    const [pontoVendas, setPontoVendas] = useState([]);
    const [pontoVendasPesquisa, setPontoVendasPesquisa] = useState([]);
    const [pontoVendaSelecionadoId, setPontoVendaSelecionadoId] = useState(null);
    const [exclusaoSucesso, setExclusaoSucesso] = useState(false);
    const [edicaoSucesso, setEdicaoSucesso] = useState(false)

    useEffect(() => {
        api
        .get("/PontoVendas")
        .then((response) => {setPontoVendas(response.data); setPontoVendasPesquisa(response.data); console.log(response.data);})
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }, []);

    useEffect(() => {
        const handlePesquisaPontoVenda = () => {
            let resultadoPesquisa = pontoVendas.filter(pontoVenda => pontoVenda.nome.toLowerCase().startsWith(props.pesquisa.toLowerCase()));
            setPontoVendas(resultadoPesquisa)

            if (props.pesquisa == "") {
                setPontoVendas(pontoVendasPesquisa)
            }
        }
    
        if (props.statusPesquisa) {
            handlePesquisaPontoVenda();
        }
    }, [props.pesquisa])

    useEffect(() => {
        if (exclusaoSucesso || edicaoSucesso) {
          const timer = setTimeout(() => {
            setExclusaoSucesso(false);
            setEdicaoSucesso(false);
          }, 5000);
    
          return () => clearTimeout(timer);
        }
      }, [exclusaoSucesso, edicaoSucesso]);

    const handleExcluirPontoVenda = (pontoVendaId) => {
        api
        .delete(`/PontoVendas/${pontoVendaId}`)
        .then(() => {
            setPontoVendas(pontoVendas.filter((pontoVenda) => pontoVenda.id !== pontoVendaId));
        })
        .catch(error => {console.log(error)})
    }

    return (
        <div className="tabela-pontos-vendas">
            {showModalEdicao && (
                <ModalEdicao 
                    statusModal={setShowModalEdicao} 
                    pontoVendaId={pontoVendaSelecionadoId} 
                    listaPontoVendas={setPontoVendas}
                    setStatus={setEdicaoSucesso}
                />
            )}
            {exclusaoSucesso && (
                <Alertas 
                    mensagem="Ponto de Venda removido com sucesso!" 
                    corMensagem="#ffffff" corFundo="#219653" 
                    corBarraProgresso="white" 
                    setStatus={setExclusaoSucesso}
                />
            )}
            {edicaoSucesso && (
                <Alertas 
                    mensagem="Ponto de Venda atualizado com sucesso!" 
                    corMensagem="#ffffff" corFundo="#219653" 
                    corBarraProgresso="white" 
                    setStatus={setEdicaoSucesso}
                />
            )}
            {pontoVendas.length === 0 ? (<p>Nenhum cliente cadastrado</p>) :
            (<table>
                <thead>
                    <tr>
                    <th>Descrição</th>
                    <th>Longitude</th>
                    <th>Latitude</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pontoVendas.map(ponto => (
                        <tr key={ponto.id}>
                            <td>{ponto.descricao}</td>
                            <td>{ponto.longitude}</td>
                            <td>{ponto.latitude}</td>
                            <td>
                                <h2 className={
                                    ponto.status === true ? "statusAtivo" : "statusInativo"
                                }>{
                                    ponto.status === true ? "Ativo" : "Inativo"
                                }
                                </h2>
                            </td>
                            <td>
                            <button 
                                    className="mapa-btn"
                                    onClick={() => {
                                        setPontoVendaSelecionadoId(ponto.id);
                                        setShowModalEdicao(true)
                                    }}
                                >
                                    Mapa
                                </button>
                                <button 
                                    className="editar-btn"
                                    onClick={() => {
                                        setPontoVendaSelecionadoId(ponto.id);
                                        setShowModalEdicao(true)
                                    }}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="excluir-btn" 
                                    onClick={() => {
                                        setPontoVendaSelecionadoId(ponto.id);
                                        setShowModal(true)
                                    }}
                                >
                                    Excluir
                                </button>
                                {showModal && pontoVendaSelecionadoId === ponto.id && (
                                    <ModalConfirmacao 
                                        message="Tem certeza que deseja excluir?" 
                                        onConfirm={() => {
                                            handleExcluirPontoVenda(pontoVendaSelecionadoId);
                                            setPontoVendaSelecionadoId(null);
                                            setShowModal(false);
                                            setExclusaoSucesso(true);
                                        }} 
                                        onCancel={() => {
                                            setPontoVendaSelecionadoId(null);
                                            setShowModal(false)
                                        }}
                                    />
                                )}
                            </td>
                        </tr>
                     ))}
                </tbody>
            </table>)}
        </div>
    )
}

export default TabelaPontosVendas