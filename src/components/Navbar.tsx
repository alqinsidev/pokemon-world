import React from 'react'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Color } from '../styles/Color';

const Navbar:React.FunctionComponent = ()=> {
    const Header = styled.header`
        position:fixed;
        top:0;
        width:100%;
        align-items:center;
        text-align:center;
        padding: 15px 0;
        background-color:${Color.danger};
        overflow:hidden;
    `
    const Img = styled.img`
        height:40px;
    `


    return (
        <Header>
            <Link to="/pokedex">
                <Img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="" />
            </Link>
        </Header>
    )
}

export default Navbar;
