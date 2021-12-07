import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import React, {useState,useEffect, useContext} from 'react'
import { useParams } from 'react-router';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { PokemonContext } from '../../context/PokemonContext';
import { POKEMON } from '../../graphql/query';
import { HowMuchIHave } from '../../misc/MyPokemon';
import { Type2Color } from '../../misc/TypeColor';
import { Color } from '../../styles/Color';
import { breakpoints } from '../../styles/Screen';
import CatchModal from './CatchModal';

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

const PokemonDetail: React.FunctionComponent = ()=> {
    let params = useParams();
    const [pokemon,setPokemon] = useState<Pokemon | null>(null)
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const {profile} = useContext(PokemonContext)
    
    const {data} = useQuery(POKEMON,{
        variables:{
            name:params?.name
        }
    })

    
    useEffect(()=>{
        if(data){
            if(data.id !== null){
                setPokemon(data.pokemon)
            }
        }
    },[data])

    return (
        <Main>
            {
                (pokemon?.id !== null)?
                <>
                    <H2>{pokemon?.name || null}</H2>
                    <Img src={pokemon?.sprites?.front_default} alt="" />
                    <Container>
                        <Typhograhpy color={"#000"} size={'1.3rem'} weight={400}>Type</Typhograhpy>
                        <Col>
                            {pokemon && pokemon.types.map((a:any,b:number) => <Badge stretch={true} key={ `b-` + b + `-` +a.type.name} label={a.type.name} color={Type2Color(a.type.name)}/>)}
                        </Col>
                    </Container>
                    <Container>
                        <Typhograhpy color={"#000"} size={'1.3rem'} weight={400}>Moves</Typhograhpy>
                    </Container>
                    <ContainerOverflow>
                        {pokemon?.moves.map((a:any,b:number)=> <Badge key={`b-`+b} stretch={true} label={a.move.name}/>)}
                    </ContainerOverflow>
                    <Typhograhpy color={Color.gray} size={'.9rem'} weight={400}>You owned {HowMuchIHave(pokemon?.name || '',profile.Pokemons)} {pokemon?.name}</Typhograhpy>
                    <Button color={Color.secondary} label="Catch pokemon" onClick={()=>setIsOpen(!isOpen)} />
                </> 
                    :
                    <h4>Pokemon not found</h4>
                }
                {isOpen?<CatchModal onClose={()=> setIsOpen(false)} pokemon={pokemon}/>:null}
            </Main>
    )
}

const Main = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;

`
const Container = styled.div`
    display:flex;
    justify-content:flex-start;
    align-items:flex-start;
    flex-direction:column;
    border-radius:10px;
    padding: 10px;
    ${breakpoints.sm}{
        width:300px;
    }
`
const ContainerOverflow = styled.div`
    display:flex;
    flex-wrap:wrap;
    overflow:scroll;
    max-height:35vh;
    justify-content:flex-start;
    align-items:flex-start;
    flex-direction:row;
    border-radius:10px;
    background-color:#f2f2f2;
    padding:10px;
    margin:10px;
    ${breakpoints.sm}{
        width:300px;
    }
`

const Col = styled.div`
    display:flex;
    flex-wrap:wrap;
    flex-direction:row;
    width:100%;
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

const Img = styled.img`
    width:320px;
    height:320px;
    border-radius:5px;
    background-color:#f2f2f2;
    margin-bottom:15px;
`

const H2 = styled.h2`
    text-transform:capitalize;
`

export default PokemonDetail;