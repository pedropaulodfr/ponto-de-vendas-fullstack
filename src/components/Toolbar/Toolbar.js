import React from "react";
import './Toolbar.css'
import logoBrancaCSJ from '../../assets/logo-csjgroup-branco.png'
import { Link } from 'react-router-dom'
import { FaPowerOff } from "react-icons/fa";



const Toolbar = () => {
    return (
        <div className="Toolbar">
            <div className="Toolbar-container">
                <div className='logo-content'>
                    <img src={logoBrancaCSJ} className='logo-nav-csj'></img>
                </div>
                <div className='logout-content'>
                    <div className='logout-btn-content'>
                        <Link to="/">
                            <FaPowerOff className='logout-btn' />
                        </Link>
                    </div>
                    <div className='logout-nome-content'>
                        <h2>Pedro Paulo</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Toolbar;