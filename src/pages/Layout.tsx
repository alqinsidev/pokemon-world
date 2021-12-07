import React from 'react'
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import styled from '@emotion/styled';
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
        </div>
    );
}

export default Layout;