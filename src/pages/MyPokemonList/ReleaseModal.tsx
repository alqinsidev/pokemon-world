import React,{useState, useEffect, useContext} from 'react'
import Modal from '../../components/Modal'
import styled from '@emotion/styled'
import { breakpoints } from '../../styles/Screen'
import Button from '../../components/Button'
import { PokemonContext } from '../../context/PokemonContext'
import { Wait } from '../../misc/Wait'
import { Color } from '../../styles/Color'
import { useQuery } from '@apollo/client'
import { POKEMON } from '../../graphql/query'
import { ReleasePokemon } from '../../misc/UpdatePokemon'

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
    const [modal,setModal] = useState<number>(0);
    const [pokemon,setPokemon] = useState<Pokemon | undefined>(undefined);
    const {profile,setProfile} = useContext(PokemonContext);
    
    const clickHandler = (event:any):void => {
        onClose();
    }
    const {data} = useQuery(POKEMON,{
        variables:{
            name:name
        }
    })

    const handleRelease = async (input:any):Promise<void> =>{
       const update:Function = ReleasePokemon(input);
       setModal(1)
       await Wait(2000)
       setModal(0)
       setProfile({...profile,Pokemons:update})
    }
    useEffect(()=> {
        if(data){
            setPokemon(data.pokemon)
        }
    },[data])
    

        
        
        const Image = React.memo(()=><Img src={pokemon?.sprites?.front_default} alt="" />)
            if(modal === 0){

                return(
                    <Modal>
                    <button onClick={clickHandler}>X</button>
                    <Main>
                        <Image/>
                        <Typhograhpy size=".9rem">{nickname} ({pokemon?.name})</Typhograhpy>
                        <Button color={Color.danger} label="Release" onClick={()=> handleRelease({pokemon:{name:pokemon?.name,nickname:nickname}})}/>
                    </Main>
                </Modal>
            )} else {

                return(
                    <Modal>
                    <Main>
                        <Typhograhpy size=".9rem">{nickname} ({pokemon?.name}) has been released</Typhograhpy>
                    </Main>
                </Modal>
            )}
    }

const Main = styled.div`
${breakpoints.sm}{
    display:flex;
    justify-content:space-between;
    flex-direction:column;
    align-items:center;
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
export default ReleaseModal;