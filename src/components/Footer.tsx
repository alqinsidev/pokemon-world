import styled from '@emotion/styled';
import React from 'react'
import { Color } from '../styles/Color';

const Footer:React.FunctionComponent = ()=> {
    return (
        <FooterWrapper>
            <StyledLink href="https://linkedin.com/in/alqinsi" target="_blank">Padlan Alqinsi</StyledLink>
            <StyledLink href="https://github.com/alqinsidev/pokemon-world" target="_blank">@alqinsidev</StyledLink>


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
const StyledLink = styled.a`
    text-decoration:none;
    color:#fff
`

export default Footer;