import React from 'react'
import ReactDom from 'react-dom'
import styled from '@emotion/styled';
import { breakpoints } from '../styles/Screen';

interface Props {
    setLocalData?:Function;
}

const Modal:React.FunctionComponent<Props> = ({children,setLocalData})=> {
 
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

const Body = styled.div`
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
background-color:#fff;
border-radius:10px;
padding:50px;
z-index:1000;
width:60%;
transition: opacity 1000ms cubic-bezier(0.165, 0.84, 0.44, 1);
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

export default Modal;
