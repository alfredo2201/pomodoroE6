import React from "react";
import styled from "styled-components";
import UpdateTask from "../updateTask";


const Modal = (props) => {
    const {open, close, task, setTask, data, setData, title} = props


    if(!open) return null;
    return (
        <div>
            <>
                <Overlay>
                    <ContenedorModal>
                        <EncabezadoModal>
                            <h3
                            >Actualizar </h3>
                        </EncabezadoModal>

                        <BotonCerrar onClick={() => close(false)}>
                            <p>X</p>
                        </BotonCerrar>
                        <UpdateTask
                        data={data}
                        setData = {setData}
                        setTask = {setTask}
                        task = {task}
                        title = {title}
                        close={close}
                        />
                    </ContenedorModal>
                </Overlay>
            </>
        </div>
    )
};

export default Modal;

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    
    display: flex;
    align-items: center;
    justify-content: center;

`;

const ContenedorModal = styled.div`
    width: 500px;
    height: 200px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,101, 0.2) 0px 7px 29px 0px;
    padding: 20px;
`;

const EncabezadoModal = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #E8E8E8;

    h3 {
        font-weight: 500;
        font-size: 16px;
        color: #1766DC;
        /* color: black; */
    }
`;

const BotonCerrar = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;

    width: 30px;
    height: 30px; 
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 50%;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3a3939;

`;

// const BotonCerrar = styled.div`
//     position: absolute;
//     top: 20px;
//     right: 20px;
//     width: 30px;
//     height: 30px;
//     display: flex;
//     justify-content: center;
//     /* border: none; */
//     cursor: pointer;
//     p{
//         color: white;
//         font-weight: 500;
//         font-size: 16px;
//         padding: 5px;
//         border-radius: 1px solid rgba(0,0,0,.5);
//         background: #c70505;
//         border-radius: 50%;
//         width: 200px;
//         align-items: center;
//     }
// `;