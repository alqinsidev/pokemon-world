import {gql} from '@apollo/client'

export const POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        status
        message
        results {
            url
            name
            image
        }
        }
    }
    `;
    
export const POKEMON = gql`
query pokemon($name: String!) {
    pokemon(name: $name) {
    id
    name
    sprites {
        front_default
    }
    moves {
        move {
        name
        }
    }
    types {
        type {
        name
        }
    }
    }
}
`;
