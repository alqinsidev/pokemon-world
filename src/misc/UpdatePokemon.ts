
export const UpdateMyPokemon = (pokemon:any):any => {
    const existingPokemon = JSON.parse(localStorage.getItem('myPokemon') || '[]');
    const isExsist:number = (existingPokemon.length > 0) ? 
                        existingPokemon.findIndex((element:any) => element.pokemon.nickname === pokemon.pokemon.nickname)
                        :-1;
                        
    if(isExsist<0){
        existingPokemon.push(pokemon);
        localStorage.setItem('myPokemon',JSON.stringify(existingPokemon));
        // console.log("Successfully add pokemon to your list");
        // console.log(JSON.parse(localStorage.getItem('myPokemon') || '[]'),"LOCAL STORAGE")
    }
    else{
        // console.log("Pokemon nickname already exsist", existingPokemon[isExsist])
    }
    return existingPokemon;

}

export const ReleasePokemon = (pokemon:any):any => {
    const existingPokemon = JSON.parse(localStorage.getItem('myPokemon') || '[]');
    const index = existingPokemon.findIndex((element:any) => element.pokemon.nickname === pokemon.pokemon.nickname)
    const newPokemon = immutableSplice(existingPokemon,index,1)
    localStorage.setItem('myPokemon',JSON.stringify(newPokemon));
    return newPokemon;
    
}

const immutableSplice = (arr:any, start:number, deleteCount:number, ...items:any):any => {
    return [ ...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount) ]
    }

