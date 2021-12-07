import React, {useEffect, useState, useContext} from 'react'
import {useQuery} from '@apollo/client'
import { POKEMONS } from '../graphql/query'
import PokemonCard from '../components/PokemonCard'
import { PokemonContext } from '../context/PokemonContext'
import { useNavigate } from 'react-router'
import styled from '@emotion/styled'
import { Color } from '../styles/Color'
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
    const [pokemons, setPokemons] = useState<Pokemons | undefined>(undefined)
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
        <div>
            <Link to="/profile">
                <Card>
                    <h1>My Pokemon : {myPokemon?.length || "0"}</h1>
                </Card>
            </Link>
            <h2>Explore more pokemon</h2>
            {
                pokemons?.results.map((pokemon:any,index:number) => <PokemonCard onClick={pokemonDetail} key={index} name={pokemon.name} url={pokemon.url} image={pokemon.image} />)
            }
        </div>
    )
}

const Card = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding:20px 10px;
    background-color:${Color.pikachuYellow};
    border-radius:5px;
    border-style:solid;
    border-width:.5px;
    border-color:${Color.primary};
`

export default PokemonList;
