
const UpdateMyPokemon = (pokemon:any):any => {
    const existingPokemon = JSON.parse(localStorage.getItem('myPokemon') || '[]');
    const isExsist:number = (existingPokemon.length > 0) ? 
                        existingPokemon.findIndex((element:any) => element.pokemon.nickname === pokemon.pokemon.nickname)
                        :-1;
                        
    if(isExsist<0){
        existingPokemon.push(pokemon);
        localStorage.setItem('myPokemon',JSON.stringify(existingPokemon));
        console.log("Successfully add pokemon to your list");
        console.log(JSON.parse(localStorage.getItem('myPokemon') || '[]'),"LOCAL STORAGE")
    }
    else{
        console.log("Pokemon nickname already exsist", existingPokemon[isExsist])
    }
    return existingPokemon;

}

export {UpdateMyPokemon}