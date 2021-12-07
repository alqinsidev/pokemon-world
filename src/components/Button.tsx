import styled from '@emotion/styled';
import {Color} from '../styles/Color'
interface Props {
    label: string;
    color?: string;
    onClick: Function;
}

const Button:React.FunctionComponent<Props> = ({label,color,onClick})=>{
    const ButtonWrapper = styled.div`
        background-color:${color?color:Color.primary};
        color:#fff;
        font-size:.9rem;
        font-weight:bold;
        border-radius:5px;
        text-align:center;
        padding:0.75em 1.25em 0.675em;
        vertical-align:middle;
        width:100%;
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