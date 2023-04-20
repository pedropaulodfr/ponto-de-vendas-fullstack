import React from "react";
import './ModalMapa.css'
import { CgClose } from "react-icons/cg";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


function ModalMapa (props) {  
    return (
        <div className="ModalMapa">
            <div className='button-close-modal'>
                <CgClose onClick={() => {props.statusModal(false)}} />
            </div>
            <div className='modal-mapa-content'>
                <div className="mapa">
                    <MapContainer center={[parseFloat(props.latitude), parseFloat(props.longitude)]} zoom={13}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[props.latitude, props.longitude]}>
                            <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <div className="button-salvar-edicao">
                    <button 
                        className="salvar-btn" 
                        onClick={() => {props.statusModal(false)}}
                    >Fechar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalMapa;
