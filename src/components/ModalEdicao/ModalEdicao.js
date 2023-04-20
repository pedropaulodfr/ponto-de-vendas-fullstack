import React, { useEffect, useState } from "react";
import './ModalEdicao.css'
import api from "../../api";
import { CgClose } from "react-icons/cg";
import moment from 'moment';
import Alertas from "../Alertas/Alertas";


function ModalEdicao(props) {
    const [pontoVenda, setPontoVenda] = useState([])
    const [descricao, setDescricao] = useState("")
    const [telefone, setTelefone] = useState("")
    const [status, setStatus] = useState()
    const [dataAbertura, setDataAbertura] = useState("")
    const [cep, setCep] = useState("")
    const [rua, setRua] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [uf, setUf] = useState("")
    const [longitude, setLongitude] = useState("")
    const [latitude, setLatitude] = useState("")
    const [edicaoErro, setEdicaoErro] = useState(false)

    const [novoPontoVenda, setNovoPontoVenda] = useState(false)
    const [novoDescricao, setNovoDescricao] = useState(false)
    const [novoTelefone, setNovoTelefone] = useState(false)
    const [novoStatus, setNovoStatus] = useState(false)
    const [novoDataAbertura, setNovoDataAbertura] = useState(false)
    const [novoCep, setNovoCep] = useState(false)
    const [novoRua, setNovoRua] = useState(false)
    const [novoNumero, setNovoNumero] = useState(false)
    const [novoComplemento, setNovoComplemento] = useState(false)
    const [novoBairro, setNovoBairro] = useState(false)
    const [novoCidade, setNovoCidade] = useState(false)
    const [novoUf, setNovoUf] = useState(false)
    const [novoLongitude, setNovoLongitude] = useState("")
    const [novoLatitude, setNovoLatitude] = useState("")

    
    useEffect(() => {
        if (!novoDescricao) {setDescricao(pontoVenda.descricao)}
        if (!novoTelefone) {setTelefone(pontoVenda.telefone)}
        if (!novoStatus) {setStatus(pontoVenda.status)}
        if (!novoDataAbertura) {setDataAbertura(pontoVenda.dataAbertura)}
        if (!novoCep) {setCep(pontoVenda.cep)}
        if (!novoRua) {setRua(pontoVenda.rua)}
        if (!novoNumero) {setNumero(pontoVenda.numero)}
        if (!novoComplemento) {setComplemento(pontoVenda.complemento)}
        if (!novoBairro) {setBairro(pontoVenda.bairro)}
        if (!novoCidade) {setCidade(pontoVenda.cidade)}
        if (!novoUf) {setUf(pontoVenda.estado)}
        if (!novoLongitude) {setLongitude(pontoVenda.longitude)}
        if (!novoLatitude) {setLatitude(pontoVenda.latitude)}
    })

    useEffect(() => {
        api
    .get(`PontoVendas/${props.pontoVendaId}`)
    .then((response) => {setPontoVenda(response.data)})
    .catch((err) => {console.error(err)})
    }, []);

    useEffect(() => {
        if (edicaoErro) {
          const timer = setTimeout(() => {
            setEdicaoErro(false);
          }, 5000);
    
          return () => clearTimeout(timer);
        }
      }, [edicaoErro]);

    function handleChangeDescricao(event) {setNovoDescricao(true); setDescricao(event.target.value)}
    function handleChangeTelefone(event) {setNovoTelefone(true); setTelefone(event.target.value)}
    function handleChangeStatus(event) {setNovoStatus(true); setStatus(event.target.value)}
    function handleChangeDataAbertura(event) {setNovoDataAbertura(true); setDataAbertura(event.target.value)}
    function handleChangeCep(event) {setNovoCep(true); setCep(event.target.value)}
    function handleChangeRua(event) {setNovoRua(true); setRua(event.target.value)}
    function handleChangeNumero(event) {setNovoNumero(true); setNumero(event.target.value)}
    function handleChangeComplemento(event) {setNovoComplemento(true); setComplemento(event.target.value)}
    function handleChangeBairro(event) {setNovoBairro(true); setBairro(event.target.value)}
    function handleChangeCidade(event) {setNovoCidade(true); setCidade(event.target.value)}
    function handleChangeUf(event) {setNovoUf(true); setUf(event.target.value)}
    function handleChangeLongitude(event) {setNovoLongitude(true); setLongitude(event.target.value)}
    function handleChangeLatitude(event) {setNovoLatitude(true); setLatitude(event.target.value)}

    const handleMascaras = () => {
        const inputTelefone = document.querySelector("input.input-telefone")
        
        inputTelefone.addEventListener("keypress", () => {
            let inputLength = inputTelefone.value.length
    
            if (inputLength == 0) {
                inputTelefone.value += '('
            }
            if (inputLength == 3) {
                inputTelefone.value += ') '
            }
            if (inputLength == 6) {
                inputTelefone.value += ' '
            }
            if (inputLength == 11) {
                inputTelefone.value += '-'
            }
        })


        const inputCep = document.querySelector("input.input-cep")
        inputCep.addEventListener("keypress", () => {
            let inputLength = inputCep.value.length

            if (inputLength === 5) {
                inputCep.value += '-'
            }
        })
    }

    const handleVisualizarListaPontoVendasAtualizada = () => {
        api
        .get(`/PontoVendas`)
        .then((response) => {props.listaPontoVendas(response.data)})
        .catch((error) => {console.error(error)})
    }

    const handleAtualizarPontoVenda = (id, statusModal) => {
        if (descricao !== "" && status !== undefined && dataAbertura !== "") {
            const data = new Date(dataAbertura)
            let dia = data.getDate()
            let mes = (data.getMonth() + 1)

            const dataAberturaFormatada = `${data.getFullYear()}-${mes < 10 ? "0" + mes : mes}-${dia < 10 ? "0" + dia : dia}`

            let booleanStatus = status === "ativo" || status === true ? true : false;
            let validacaoTelefone = telefone === "" ? "Não Informado": telefone;

            api
            .put(`/PontoVendas/${id}`, {
                descricao: descricao,
                telefone: validacaoTelefone,
                status: booleanStatus,
                dataAbertura: dataAberturaFormatada,
                cep: cep,
                rua: rua,
                numero: numero,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: uf,
                longitude: longitude,
                latitude: latitude
            })
            .then((response) => {
                props.setStatus(true)
                statusModal(false);
                handleVisualizarListaPontoVendasAtualizada();
            })
            .catch((err) => {
                console.error(err)
                setEdicaoErro(true)
            })
        } else {
            setEdicaoErro(true)
        }
    }

    return (
        <div className='modal-edicao'>
            {edicaoErro && (
                <Alertas 
                    mensagem="Erro ao atualizar cliente!" 
                    corMensagem="#ffffff" 
                    corFundo="#B41616" 
                    corBarraProgresso="white" 
                    setStatus={setEdicaoErro}
                />
            )}
            <div className='button-close-modal'>
                <CgClose onClick={() => {props.statusModal(false)}} />
            </div>
            <div className='modal-edicao-content'>
                <div className="dados-pessoais-edicao-content">
                    <div className="dados-pessoais-edicao-title">
                        <h2>Dados Pessoais</h2>
                    </div>
                    
                    <div className="inputs-edicao">
                        <input 
                            type="text" 
                            placeholder={"Descrição"} 
                            value={descricao} 
                            onChange={handleChangeDescricao}
                            />
                        <input 
                            type="text" 
                            placeholder={"Telefone"} 
                            className="input-telefone"
                            maxLength="16"
                            value={telefone} 
                            onChange={handleChangeTelefone} 
                            onClick={handleMascaras}
                        />
                        <select 
                            name="Status"
                            value={status === true || status === "ativo" ? "ativo" : "inativo"}
                            defaultValue=""
                            onChange={handleChangeStatus}
                            onClick={handleChangeStatus}
                        >
                            <option value="" disabled >Status</option>
                            <option value="ativo" >Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                        <input 
                            type="date" 
                            value={moment(dataAbertura).format('YYYY-MM-DD')} 
                            onChange={handleChangeDataAbertura}
                        />
                    </div>
                </div>
                <div className="dados-endereco-edicao-content">
                    <div className="dados-endereco-edicao-title">
                        <h2>Dados de Endereço</h2>
                    </div>
                    
                    <div className="inputs-edicao">
                        <input 
                            type="text" 
                            placeholder="CEP" 
                            className="input-cep"
                            maxLength="9"
                            value={cep} 
                            onChange={handleChangeCep}
                            onClick={handleMascaras}
                            />
                        <input 
                            type="text" 
                            placeholder="Rua"
                            value={rua} 
                            onChange={handleChangeRua}
                        />
                        <input 
                            type="text" 
                            placeholder="Numero"  
                            value={numero} 
                            onChange={handleChangeNumero}
                        />
                        <input 
                            type="text" 
                            placeholder="Complemento"
                            value={complemento} 
                            onChange={handleChangeComplemento}
                        />
                        <input 
                            type="text" 
                            placeholder="Bairro"
                            value={bairro} 
                            onChange={handleChangeBairro}
                        />
                        <input 
                            type="text"
                            placeholder="Cidade"
                            value={cidade} 
                            onChange={handleChangeCidade}
                        />
                        <input 
                            type="text" 
                            placeholder="UF"
                            maxLength="2"
                            value={uf} 
                            onChange={handleChangeUf}
                        />
                        <input 
                            type="text" 
                            placeholder="Longitude"
                            value={longitude} 
                            onChange={handleChangeLongitude}
                        />
                        <input 
                            type="text" 
                            placeholder="Latitude"
                            value={latitude} 
                            onChange={handleChangeLatitude}
                        />
                    </div>
                </div>
                <div className="button-salvar-edicao">
                    <button 
                        className="salvar-btn" 
                        onClick={() => {handleAtualizarPontoVenda(props.pontoVendaId, props.statusModal)}}
                    >Atualizar Dados
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalEdicao