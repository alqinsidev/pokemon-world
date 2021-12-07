import React from 'react'
import styled from '@emotion/styled'

interface Props {
    label: string;
    color? : string;
    stretch?: boolean;
}

const Badge: React.FunctionComponent<Props> = ({label,color,stretch})=> {
    const BadgeWrapper = styled.div`
        ${stretch?`flex:1;`:null}
        min-width:100px;
        font-size:.9rem;
        text-align:center;
        border-radius:3px;
        line-height:18px;
        padding:5px;
        margin:5px;
        color:#fff;
        text-transform:capitalize;
        background-color:${color?`${color}`:"#3f2e2a"};
    `
    return(
        <BadgeWrapper>
            {label}
        </BadgeWrapper>
    )
}

export default Badge;