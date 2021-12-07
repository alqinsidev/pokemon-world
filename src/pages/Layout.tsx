import React from 'react'
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import styled from '@emotion/styled';
import Footer from '../components/Footer';
const Layout:React.FunctionComponent = ()=> {
    const Main = styled.div`
    display:flex;
    justify-content:center;
    width:100%;
    margin-top:100px;
    `
    return (
        <div>
            <Navbar/>
            <Main>
                <Outlet/>
            </Main>
            <Footer/>
        </div>
    );
}

export default Layout;