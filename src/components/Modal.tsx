import React from 'react'
import ReactDom from 'react-dom'
import styled from '@emotion/styled';
import { breakpoints } from '../styles/Screen';



const Modal:React.FunctionComponent = ({children})=> {
    const Body = styled.div`
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        background-color:#fff;
        padding:50px;
        z-index:1000;
        width:60%;
        ${breakpoints.md}{
            width:40%;
        }
        ${breakpoints.lg}{
            width:30%;
        }
    `

    const Overlay = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:rgb(0,0,0,.7);
    z-index:1000;
    `
    const portalDiv = document.getElementById('portal')!;
    return ReactDom.createPortal(
        <>
        <Overlay>
            <Body>
                {children}
            </Body>
        </Overlay>
        </>,
        portalDiv
    )
}

export default Modal;
