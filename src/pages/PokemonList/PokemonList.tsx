import React, {useEffect, useState, useContext} from 'react'
import {useQuery} from '@apollo/client'
import { POKEMONS } from '../../graphql/query'
import PokemonCard from '../../components/PokemonCard'
import { PokemonContext } from '../../context/PokemonContext'
import { useNavigate } from 'react-router'
import styled from '@emotion/styled'
import { Color } from '../../styles/Color'
import { Link } from 'react-router-dom'

type Pokemons = {
count: number;
message: string;
next: string;
prevoius: string;
results: Pokemon[];
status: boolean;
}

type Pokemon = {
    id: number;
    url: string;
    name: string;
    image: string;
}
const PokemonList: React.FunctionComponent = ()=> {
    const [pokemons, setPokemons] = useState<Pokemons | any | undefined>(undefined)
    const [myPokemon,setMypokemon] = useState<any | undefined>(undefined)
    const {data} = useQuery(POKEMONS,{
        variables:{
            limit:20,
            offset:0
        }
    })

    let navigate = useNavigate();

    const {profile} = useContext(PokemonContext);
    
    useEffect(()=>{
        if(profile){
            setMypokemon(profile.Pokemons);
        }
        
    },[profile])

    useEffect(()=>{
        if(data){
            const response: Pokemons = data.pokemons
            setPokemons(response);
        }
    },[data])

    const pokemonDetail = (name:string):void => {
        navigate(`/detail/${name}`)        
    }
    return (
        <Container>
            <StyledLink to="/profile">
                <Card>
                    <Img src="https://cdn-icons-png.flaticon.com/512/361/361998.png" alt=""/>
                    <H2>My Pokemon : {myPokemon?.length || "0"}</H2>
                </Card>
            </StyledLink>
            <H2>Pokemon List</H2>
            {
                pokemons?.results.map((pokemon:any,index:number) => <PokemonCard onClick={pokemonDetail} key={index} name={pokemon.name} url={pokemon.url} image={pokemon.image} />)
            }
        </Container>
    )
}
const Container = styled.div`
    display:flex;
    flex-direction:column;
`
const Card = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    padding:20px 10px;
    background-color:${Color.lightYellow};
    border-radius:5px;
    border-style:solid;
    border-width:.5px;
    border-color:${Color.pikachuYellow};
        &:hover{
            background-color:${Color.pikachuYellow};
        }
    `
const H2 = styled.h2`
        text-transform:uppercase;
        color:${Color.gray};
    `
const Img = styled.img`
    width:50px;
    height:50px;
`

const StyledLink = styled(Link)`
        text-decoration:none;
`

export default PokemonList;
