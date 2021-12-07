import { useQuery } from '@apollo/client';
import React, {useState,useEffect, useContext} from 'react'
import styled from '@emotion/styled';
import { POKEMON } from '../graphql/query';
import { Type2Color } from '../misc/TypeColor';
import Badge from './Badge';
import { Color } from '../styles/Color';
import { PokemonContext } from '../context/PokemonContext';
import { HowMuchIHave } from '../misc/MyPokemon';

interface Props {
    name: string;
    url?: string;
    image: string;
    onClick: Function;
    owned?: boolean;
    nickname?:string;
}

type Pokemon = {
    id: number;
    name: string;
    moves:any;
    sprites:any;
    types:any;
}


const PokemonCard: React.FunctionComponent<Props> = ({name,url,image,onClick,owned = true,nickname})=>{
    const [pokemon,setPokemon] = useState<Pokemon | undefined>(undefined);
    const {data} = useQuery(POKEMON,{
        variables:{
            name:name
        }
    })

    const {profile} = useContext(PokemonContext)

    useEffect(()=> {
        if(data){
            setPokemon(data.pokemon)
        }
    },[data])

    
    return (
        <CardWrapper onClick={()=>onClick(name)}>
            <Img src={pokemon?.sprites?.front_default} alt=''/>
            <H4 key={url}>{name}</H4>
            {
                nickname ?
                <P>{nickname}</P>:null

            }
            {
                owned?
                <P>Owned : {HowMuchIHave(name,profile.Pokemons)}</P>:null
            }
            <Row>
                {pokemon && pokemon.types.map((a:any,b:number) => <Badge key={b+'-'+a.id} label={a.type.name} color={Type2Color(a.type.name)}/>)}
            </Row>
        </CardWrapper>
    )
}
const CardWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    border-radius:3px;
    line-height:18px;
    border-style:solid;
    border-width:1px;
    border-color:${Color.darkGrey};
    margin:10px;
    padding:10px;
    max-width:450px;
    min-width:280px;
`
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    align-content:center;
`
const H4 = styled.h4`
    text-transform:capitalize;
    font-weight:500;
    font-size:1.6rem;
    color:${Color.darkGray};
    margin:9px;
`
const P = styled.p`
    margin: 9px;
    font-weight:400;
    font-size:1rem;
    color:${Color.gray};
`
const Img = styled.img`
    background-color:${Color.grey};
    border-radius:5px;
`

export default PokemonCard;
