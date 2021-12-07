import React from 'react'
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import styled from '@emotion/styled';
import Footer from '../components/Footer';
const Layout:React.FunctionComponent = ()=> {
    const Main = styled.div`
    margin-top:100px;
    padding : 0 7%;
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