import React,{useState,useEffect, useContext} from 'react'
import Modal from '../../components/Modal'
import styled from '@emotion/styled'
import { breakpoints } from '../../styles/Screen'
import Button from '../../components/Button'
import { CatchPossibilities } from '../../misc/CatchPossibilities'
import { UpdateMyPokemon } from '../../misc/UpdatePokemon'
import { useParams } from 'react-router'
import { PokemonContext } from '../../context/PokemonContext'
import { Wait } from '../../misc/Wait'

interface Props {
    onClose:Function;
    pokemon:Pokemon | undefined | null;
}

type Pokemon = {
    id: number;
    name: string;
    moves:any;
    sprites:any;
    types:any;
}


const CatchModal:React.FunctionComponent<Props> = ({onClose,pokemon})=>{
    let params = useParams();
    const [busy,setBusy] = useState<boolean>(false);
    const {profile,setProfile} = useContext(PokemonContext)

    const clickHandler = (event:any):void => {
        onClose();
    }

    const catchHandler = async ():Promise<void> => {
        if(!busy){
            setBusy(true)
            console.log(`Trying to catch ${params.name}`);
            try{
                await Wait(2000);
                setBusy(false)
                if(CatchPossibilities()){
                    console.log(`${params.name} are successfully catched`);
                    // const update:Function = UpdateMyPokemon({pokemon:{
                    //     name:params.name,
                    //     nickname:"beni"
                    // }})
                    // setProfile({...profile,Pokemons:update})
                    
                } else {
                    console.log(`${params.name} is running away !`);
                }
            }
            catch(e) {
                if(e) console.error(e);
                setBusy(false)
            }
        }
    }

    const Image = React.memo(()=><Img src={pokemon?.sprites?.front_default} alt="" />)
    return(
        <Modal>
            <Main>
                <button onClick={clickHandler}>X</button>
                {/* <Img src={pokemon?.sprites?.front_default} alt="" /> */}
                <Image/>
                <h4>{pokemon?.name}</h4>
                <Button label={busy?`Processing`:`Catch Me`} onClick={catchHandler}/>
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
const Img = styled.img`
    width:256px;
    heigth:256px;
    background-color:#f2f2f2;
    border-radius:5px;
`

export default CatchModal;