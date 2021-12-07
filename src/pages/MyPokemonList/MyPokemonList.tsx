import styled from '@emotion/styled';
import React, { useContext, useState } from 'react';
import PokemonCard from '../../components/PokemonCard';
import { PokemonContext } from '../../context/PokemonContext';
import { Color } from '../../styles/Color';
import ReleaseModal from './ReleaseModal';


const MyPokemonList:React.FunctionComponent = ()=>{
  const [pokemon,setPokemon] = useState<any>({name:'',nickname:'',image:''})
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const {profile} = useContext(PokemonContext)

  const handleRelease = (e:object):void =>{
    setPokemon(e);
    setIsOpen(true);
    console.log("nyoy");
    
  }
  return (
    <div>
       <Card>
         <h3>{profile?.DisplayName} Pokemon : {profile.Pokemons.length}</h3>
       </Card>
       {
            profile?.Pokemons.map((pokemon:any,index:number) => <PokemonCard onClick={()=>handleRelease({name:pokemon.pokemon.name,nickname:pokemon.pokemon.nickname,image:pokemon.image})} key={index} name={pokemon.pokemon.name} nickname={pokemon.pokemon.nickname} owned={false} image={pokemon.image} />)
        }
        {isOpen?<ReleaseModal onClose={()=> setIsOpen(false)} name={pokemon?.name} nickname={pokemon.nickname}/>:null}
    </div>
  );
}

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

export default MyPokemonList;