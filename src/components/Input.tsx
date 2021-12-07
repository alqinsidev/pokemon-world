import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Color } from '../styles/Color'

interface Props {
    type:string;
    onChange:Function;
    value?:string;
}
const Input:React.FunctionComponent<Props> = ({type = "text",onChange, value})=> {
    const [local,setLocal] = useState<string>('')
    return (
        <In type={type} value={local} onChange={e=> setLocal(e.target.value)}/>
    )
}

const In = styled.input`
    height:2rem;
    width:100%;
        &[type="text"]{
            color:${Color.darkGray};
            font-weight:600;
            font-size:1rem;
        }
`
export default Input;