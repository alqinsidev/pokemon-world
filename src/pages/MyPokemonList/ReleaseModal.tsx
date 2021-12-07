import React,{useState, useEffect, useContext} from 'react'
import Modal from '../../components/Modal'
import styled from '@emotion/styled'
import { breakpoints } from '../../styles/Screen'
import Button from '../../components/Button'
import { useParams } from 'react-router'
import { PokemonContext } from '../../context/PokemonContext'
import { Wait } from '../../misc/Wait'
import { Color } from '../../styles/Color'
import { useQuery } from '@apollo/client'
import { POKEMON } from '../../graphql/query'

interface Props {
    onClose:Function;
    name:string;
    nickname:string;
}

type Pokemon = {
    id: number;
    name: string;
    moves:any;
    sprites:any;
    types:any;
}

type TyphograhpyProps = {
    weight?:number;
    color?:string;
    size?:string;
}

const ReleaseModal:React.FunctionComponent<Props> = ({onClose,name,nickname})=>{
    let params = useParams();
    const [pokemon,setPokemon] = useState<Pokemon | undefined>(undefined);
    const {profile,setProfile} = useContext(PokemonContext)
    
    const clickHandler = (event:any):void => {
        onClose();
    }
    const {data} = useQuery(POKEMON,{
        variables:{
            name:name
        }
    })
    useEffect(()=> {
        if(data){
            setPokemon(data.pokemon)
        }
    },[data])
    

        
        
        const Image = React.memo(()=><Img src={pokemon?.sprites?.front_default} alt="" />)
            return(
                <Modal>
                    <button onClick={clickHandler}>X</button>
                    <Main>
                        <Image/>
                        <h4>{nickname} ({pokemon?.name})</h4>
                        <Button color={Color.danger} label="Release" onClick={()=>null}/>
                    </Main>
                </Modal>
        )
    }

const Main = styled.div`
${breakpoints.sm}{
    display:flex;
    justify-content:space-between;
    flex-direction:column;
    align-items:center;
}
`
const Col = styled.div`
${breakpoints.sm}{
    margin:10px;
    display:flex;
    flex-direction:row;
    justify-content: space-around;
}
`
const Img = styled.img`
width:256px;
heigth:256px;
background-color:#f2f2f2;
border-radius:5px;
    margin:10px;
`
const Typhograhpy = styled.div<TyphograhpyProps>`
    font-weight:${props =>
        props.weight? props.weight: 500
    };
    font-size:${props =>
        props.size? props.size : `1rem`
    };
    color:${props =>
        props.color? props.color: `#000`
    };
`
const Input = styled.input`
    height:2rem;
    width:100%;
        &[type="text"]{
            color:${Color.darkGray};
            font-weight:600;
            font-size:1rem;
        }
`
export default ReleaseModal;