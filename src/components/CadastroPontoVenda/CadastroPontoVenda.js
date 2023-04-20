import React, { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './CadastroPontoVenda.css';
import '../ListaPontosVendas/ListaPontosVendas'
import api from "../../api";
import Alertas from "../Alertas/Alertas";

function CadastroPontoVenda() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    const formattedDate = formatter.format(currentDate);

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
    const [cadastroSucesso, setCadastroSucesso] = useState(false)
    const [cadastroErro, setCadastroErro] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (cadastroSucesso || cadastroErro) {
          const timer = setTimeout(() => {
            setCadastroSucesso(false);
            setCadastroErro(false);
          }, 5000);
    
          return () => clearTimeout(timer);
        }
    }, [cadastroSucesso, cadastroErro]);
   
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

        const inputCEP = document.querySelector("input.input-cep")
        inputCEP.addEventListener("keypress", () => {
            let inputLength = inputCEP.value.length

            if (inputLength === 5) {
                inputCEP.value += '-'
            }
        })
    }

    const handleSalvarPontoVenda = () => {
        if ((descricao !== "") && (status !== undefined) && (dataAbertura) !== "") {
            const data = new Date(dataAbertura)
            let dia = data.getDate()
            let mes = data.getMonth()

            if ((dia + 1) < 10) {
                dia = "0" + (dia + 1)
            } else {
                dia++
            }

            if ((mes + 1) < 10) {
                mes = "0" + (mes + 1)
            } else {
                mes++
            }

            const dataNascimentoFormatada = `${data.getFullYear()}-${mes}-${dia}`

            let booleanStatus = status === "true" ? true : false;
            let validacaoTelefone = telefone === "" ? "Não Informado": telefone;
            let validacaoComplemento = complemento === "" ? "": complemento;

            api
            .post("/PontoVendas", {
                descricao: descricao,
                telefone: validacaoTelefone,
                status: booleanStatus,
                dataAbertura: dataNascimentoFormatada,
                cep: cep,
                rua: rua,
                numero: numero,
                complemento: validacaoComplemento,
                bairro: bairro,
                cidade: cidade,
                estado: uf,
                longitude: longitude,
                latitude: latitude
            })
            .then((response) => {
                setCadastroSucesso(true);
                navigate("/")
            })
            .catch((err) => {
                console.error(err)
                console.error(err.response.data.errors)
                setCadastroErro(true)
            })
        } else {
            setCadastroErro(true)
        }

    }


    return (
        <div className="CadastroPontoVenda">
            {cadastroSucesso && (
                <Alertas 
                    mensagem="Ponto de Venda cadastrado com sucesso!" 
                    corMensagem="#ffffff" corFundo="#219653" 
                    corBarraProgresso="white" 
                    setStatus={setCadastroSucesso}
                />
            )}
            {cadastroErro && (
                <Alertas 
                    mensagem="Erro ao realizar cadastro!" 
                    corMensagem="#ffffff" corFundo="#B41616" 
                    corBarraProgresso="white" 
                    setStatus={setCadastroErro}
                />
            )}
            <div className='cadastro-header'>
                <h2>Cadastro de Ponto de Venda</h2>
                <h2 className="data-atual">{formattedDate}</h2>
            </div>

            <div className='cadastro-ponto-venda-content'>

                <div className="dados-gerais-content">
                    <div className="dados-gerais-title">
                        <h2>Dados Gerais</h2>
                    </div>
                    
                    <div className="inputs">
                        <input 
                            type="text" 
                            placeholder="Descrição*" 
                            value={descricao} 
                            onChange={e => setDescricao(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Telefone de Contato"
                            className="input-telefone"
                            maxLength="16"
                            value={telefone} 
                            onChange={e => setTelefone(e.target.value)} 
                            onClick={handleMascaras}
                        />
                        <select 
                            name="Status"
                            value={status}
                            defaultValue=""
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="" disabled>Status*</option>
                            <option value={true}>Ativo</option>
                            <option value={false}>Inativo</option>
                        </select>
                        <input 
                        type="date" 
                        placeholder="Data de Abertura" 
                        value={dataAbertura} 
                        onChange={e => setDataAbertura(e.target.value)}
                        />
                    </div>
                </div>

                <div className="dados-endereco-content">
                    <div className="dados-endereco-title">
                        <h2>Dados de Endereço</h2>
                    </div>
                    
                    <div className="inputs">
                        <input 
                            type="text" 
                            placeholder="CEP" 
                            className="input-cep"
                            maxLength="9"
                            value={cep} 
                            onChange={e => setCep(e.target.value)}
                            onClick={handleMascaras}
                        />
                        <input 
                            type="text" 
                            placeholder="Rua" 
                            value={rua} 
                            onChange={e => setRua(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Nº" 
                            value={numero} 
                            onChange={e => setNumero(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Complemento" 
                            value={complemento} 
                            onChange={e => setComplemento(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Bairro" 
                            value={bairro} 
                            onChange={e => setBairro(e.target.value)}
                        />
                        <input 
                            type="text"
                             placeholder="Cidade"
                            value={cidade} 
                            onChange={e => setCidade(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="UF"
                            maxLength="2"
                            value={uf} 
                            onChange={e => setUf(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Lontigude"
                            value={longitude} 
                            onChange={e => setLongitude(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Latitude"
                            value={latitude} 
                            onChange={e => setLatitude(e.target.value)}
                        />
                    </div>
                </div>

                <div className="buttons">
                    <button className="salvar-btn" onClick={handleSalvarPontoVenda}>Salvar Dados</button>
                    <Link to="/">
                        <button className="voltar-btn">Voltar</button>
                    </Link>
                </div>


            </div>
    
            
        </div>
    )
}

export default CadastroPontoVenda;
