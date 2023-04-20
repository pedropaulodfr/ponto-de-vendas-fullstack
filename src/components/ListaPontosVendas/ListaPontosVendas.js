import React, { useState } from "react";
import TabelaPontosVendas from "../TabelaPontosVendas/TabelaPontosVendas";
import './ListaPontosVendas.css'
import { Link } from 'react-router-dom'


const ListaPontosVendas = () => {

    const [pesquisa, setPesquisa] = useState("")
    const [statusPesquisa, setStatusPesquisa] = useState()

    return (
        <div className="lista-pontos-vendas-container">
            <div className='lista-header'>
                <h2>Lista de Pontos de Vendas</h2>
                <Link to="/cadastro">
                    <button className='cadastrar-novo-btn'>Cadastrar Novo</button>
                </Link>
            </div>

             <div className='lista-pontos-vendas-content'>

                <div className='lista-body'>
                    <div className='lista-top'>
                        <h2 className="pontos-vendas-title">Pontos de Vendas</h2>
                        <input 
                            type="text" 
                            placeholder="Pesquisar"
                            onChange={(e) => {setPesquisa(e.target.value); setStatusPesquisa(true)}}
                        />
                    </div>
                </div>

                <TabelaPontosVendas pesquisa={pesquisa} statusPesquisa={statusPesquisa}/>

            </div>


        </div>
    )
}

export default ListaPontosVendas;