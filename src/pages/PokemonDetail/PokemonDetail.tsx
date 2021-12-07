import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { POKEMON } from '../../graphql/query';
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
    
    const {data} = useQuery(POKEMON,{
        variables:{
            name:params.name
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
        <div>
            {
                (pokemon?.id !== null)?
                <Main>
                    <H2>{pokemon?.name || null}</H2>
                    <Img src={pokemon?.sprites?.front_default} alt="" />
                    <Container>
                        <Typhograhpy color={"#000"} size={'1.3rem'} weight={400}>Type</Typhograhpy>
                        <Col>
                            {pokemon && pokemon.types.map((a:any,b:number) => <Badge stretch={true} key={b+'-'+a.id} label={a.type.name} color={Type2Color(a.type.name)}/>)}
                        </Col>
                    </Container>
                    <Container>
                        <Typhograhpy color={"#000"} size={'1.3rem'} weight={400}>Moves</Typhograhpy>
                    </Container>
                    <ContainerOverflow>
                        {pokemon?.moves.map((a:any)=> <Badge stretch={true} label={a.move.name}/>)}
                    </ContainerOverflow>
                    <Button color={Color.secondary} label="Catch pokemon" onClick={()=>setIsOpen(!isOpen)} />
                </Main>
                :
                <h4>Pokemon not found</h4>
            }
            {isOpen?<CatchModal onClose={()=> setIsOpen(!isOpen)} pokemon={pokemon}/>:null}
        </div>
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
const Container = styled.div`
    display:flex;
    justify-content:flex-start;
    align-items:flex-start;
    flex-direction:column;
    border-radius:10px;
    padding: 10px;
    ${breakpoints.sm}{
        width:300px;
        margin:0 100px;
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
    padding: 10px;
    background-color:#f2f2f2;
    ${breakpoints.sm}{
        width:300px;
        margin:0 100px 30px;
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