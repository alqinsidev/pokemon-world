import styled from '@emotion/styled';
import React from 'react'
import { Color } from '../styles/Color';

const Footer:React.FunctionComponent = ()=> {
    return (
        <FooterWrapper>
            <h5>Padlan Alqinsi</h5>
            <h5>@alqinsidev</h5>

        </FooterWrapper>
    );
}

const FooterWrapper = styled.footer`
        display:flex;
        justify-content:space-around;
        align-items:center;
        padding: 15px 0;
        background-color:${Color.danger};
        color:#fff;
        margin-top:50px;
    `

export default Footer;