export const HowMuchIHave = (name:string,pokemons:any):number => {
    return pokemons.filter((element:any)=> element.pokemon.name === name).length
}