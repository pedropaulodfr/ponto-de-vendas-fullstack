import React from "react";
import './Home.css'
import Toolbar from "../../components/Toolbar/Toolbar";
import ListaPontosVendas from "../../components/ListaPontosVendas/ListaPontosVendas";


const Home = () => {
    return (
        <div className="Home">
            <Toolbar />
            <ListaPontosVendas />
        </div>
    )
}

export default Home;