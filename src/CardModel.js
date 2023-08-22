import React from "react";

function CardModel({card,setCard,closeModal}) {
    return(
        <div className="modal" style={{width:'357px'}}>
            <div className="modal-content">
                <span className="close" onClick={closeModal} style={{fontSize:'30px'}}>&times;</span>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <div style={{display:'flex',fontSize:'13px',justifyContent:'space-between'}}>
                <p >{card.userName}</p>
                <p>{card.status}</p>
                </div>
            </div>
        </div>
    )
}
export default CardModel;