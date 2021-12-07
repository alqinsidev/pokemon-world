import React,{useState, useContext} from 'react'
import Modal from '../../components/Modal'
import styled from '@emotion/styled'
import { breakpoints } from '../../styles/Screen'
import Button from '../../components/Button'
import { CatchPossibilities } from '../../misc/CatchPossibilities'
import { UpdateMyPokemon } from '../../misc/UpdatePokemon'
import { useParams } from 'react-router'
import { PokemonContext } from '../../context/PokemonContext'
import { Wait } from '../../misc/Wait'
import { Color } from '../../styles/Color'

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

type TyphograhpyProps = {
    weight?:number;
    color?:string;
    size?:string;
}

const CatchModal:React.FunctionComponent<Props> = ({onClose,pokemon})=>{
    let params = useParams();
    const [busy,setBusy] = useState<boolean>(false);
    const [success,setSuccess] = useState<boolean>(false);
    const [modal,setModal] = useState<number>(0);
    const [buttonLabel, setButtonLabel] = useState<string>(`Trying...`)
    const [buttonColor, setButtonColor] = useState<string>(Color.primary)
    const [nickname,setNickname] = useState<string>(``);
    const {profile,setProfile} = useContext(PokemonContext)
    
    const clickHandler = (event:any):void => {
        onClose();
    }
    
    const catchHandler = async ():Promise<void> => {
        if(!busy){
            setBusy(true)
            await Wait(3000);
            console.log(`Trying to catch ${params.name}`);
            setButtonLabel(`Almost there ...`)
            try{
                await Wait(3000);
                if(CatchPossibilities()){
                    console.log(`${params.name} are successfully catched`);
                    // const update:Function = UpdateMyPokemon({pokemon:{
                        //     name:params.name,
                        //     nickname:"beni"
                        // }})
                        // setProfile({...profile,Pokemons:update})
                        setButtonColor(Color.success)
                        setButtonLabel(`Yeaaayy ...`)
                        await Wait(2000);
                        setSuccess(true)
                    } else {
                        console.log(`${params.name} is running away !`);
                        setButtonColor(Color.danger)
                        setButtonLabel(`No... He ran away`)
                        await Wait(2000);
                    }
                    setButtonLabel(`Trying...`)
                    setBusy(false)
                    setButtonColor(Color.primary)
                }
                catch(e) {
                    if(e) console.error(e);
                    setBusy(false)
                }
            }
        }
        
        const SavePokemonHandler = async ():Promise<void>=>{
            // setModal(1);
            const update:Function = UpdateMyPokemon({pokemon:{
                    name:params.name,
                    nickname:nickname
                }})
                console.log(profile.Pokemons.length,update.length,profile.Pokemons.length < update.length);
                
                if(profile.Pokemons.length < update.length){
                    setModal(3)
                    await Wait(2000);
                    setProfile({...profile,Pokemons:update})
                } else {
                    setModal(2)
                    await Wait(1000);
                    setModal(1);
                }
                // await Wait(2000)
        }
        
        const Image = React.memo(()=><Img src={pokemon?.sprites?.front_default} alt="" />)
        if(modal === 0){
            return(
                <Modal>

                <button onClick={clickHandler}>X</button>
                <Main>
                    {
                        !success?
                        <>
                            <Image/>
                            <h4>{pokemon?.name}</h4>
                            <Button color={buttonColor} label={busy?buttonLabel:`Catch Me`} onClick={catchHandler}/>
                        </>
                        :
                        <>
                            <Typhograhpy weight={700}>You have catch {pokemon?.name}</Typhograhpy>
                            <Image/>
                            <Typhograhpy size=".8rem">Do you want to save it to your collection?</Typhograhpy>
                        </>

}
                </Main>
                    {
                        !success? null:
                        <Col>
                            <Button block={false} label="Release" color={Color.danger} onClick={clickHandler} />
                            <Button block={false} label="Save it" color={Color.primary} onClick={()=>setModal(1)} />
                        </Col>
                    }
            </Modal>
        )
    } else if(modal===1) {
        return(
            <Modal>
                <Main>
                
                    <Typhograhpy size="1rem">Give your {pokemon?.name} name</Typhograhpy>
                    <Input type="text" value={nickname} onChange={e => setNickname(e.target.value)}/>
                    <Button label="Submit" onClick={()=> SavePokemonHandler()}/>
                </Main>
            </Modal>
        );
    } else if(modal===2){
        return(
            <Modal>
                <Main>
                
                    <Typhograhpy size="1rem">Please enter another name !</Typhograhpy>
                </Main>
            </Modal>
        ); 
        } else {
        return(
            <Modal>
                <Main>
                
                    <Typhograhpy size=".8rem">{nickname} ({pokemon?.name}) has been added to your collection !</Typhograhpy>
                </Main>
            </Modal>
        );
    }
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
    margin:15px;
        &[type="text"]{
            color:${Color.darkGray};
            font-weight:600;
            font-size:1rem;
        }
`
export default CatchModal;