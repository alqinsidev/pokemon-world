import {createContext} from 'react'

const PokemonContext = createContext({
    profile:{
        DisplayName:localStorage.getItem('displayName'),
        Pokemons:JSON.parse(localStorage.getItem('myPokemon') || '[]')
    },
    setProfile: (x:object)=> {},
});

export {PokemonContext};