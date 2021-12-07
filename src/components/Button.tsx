import styled from '@emotion/styled';
import {Color} from '../styles/Color'
interface Props {
    label: string;
    color?: string;
    block?: boolean;
    onClick: Function;
}

const Button:React.FunctionComponent<Props> = ({label,color,onClick,block = true})=>{
    const ButtonWrapper = styled.div`
        ${block?`width:100%`:null};
        background-color:${color?color:Color.primary};
        color:#fff;
        font-size:.9rem;
        font-weight:bold;
        border-radius:5px;
        text-align:center;
        padding:0.75em 1.25em 0.675em;
        vertical-align:middle;
        max-width:10em;
        margin: 5px 0;
            &:active, &:hover{
                background-color:${color?color:Color.primaryDarker};
            }
    `
    const clickHandler = (event:any):void => {
        onClick();
    }

    return (
        <ButtonWrapper onClick={clickHandler}>
            {label}
        </ButtonWrapper>
    )
}

export default Button;