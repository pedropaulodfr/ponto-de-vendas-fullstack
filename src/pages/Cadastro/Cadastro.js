import React from 'react';

import CadastroPontoVenda from '../../components/CadastroPontoVenda/CadastroPontoVenda';

import Toolbar from "../../components/Toolbar/Toolbar";
import './Cadastro.css'


function Cadastro () {
    return (
        <div className='Cadastro'>
           <div className='cadastro-container'></div>
           
           <Toolbar />

           <div className='component-cadastra-ponto-venda'>
                <CadastroPontoVenda />
            </div>
        </div>
    )
}

export default Cadastro