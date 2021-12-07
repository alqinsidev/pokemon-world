import React,{useMemo,useState,useEffect} from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import { BrowserRouter as Router, Routes,  Route } from "react-router-dom";
import PokemonList from './pages/PokemonList/PokemonList';
import {PokemonContext} from './context/PokemonContext';
import PokemonDetail from './pages/PokemonDetail/PokemonDetail';
import MyPokemonList from './pages/MyPokemonList/MyPokemonList';
import Layout from './pages/Layout';
const client = new ApolloClient({
  uri:`https://graphql-pokeapi.graphcdn.app`,
  cache: new InMemoryCache()
});

function App() {
  const [profile,setProfile] = useState({
      DisplayName:localStorage.getItem('displayName'),
      Pokemons:JSON.parse(localStorage.getItem('myPokemon') || '[]')
  })
  const value:any = useMemo(
    ()=> ({profile,setProfile}),[profile]
  );

  useEffect(()=>{
    // localStorage.setItem('myPokemon','[]');
    console.log("myPokemon:",JSON.parse(localStorage.getItem('myPokemon') || '[]'));
    if(localStorage.getItem('displayName') === null){
      localStorage.setItem('displayName',"Guest")
    }
    if(localStorage.getItem('myPokemon') === null){
      localStorage.setItem('myPokemon',JSON.stringify([]))
    }
    
  },[])

  return (
    <ApolloProvider client={client}>
      <PokemonContext.Provider value={value}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<PokemonList/>} />
              <Route path="profile" element={<MyPokemonList/>}/>
              <Route path="detail/:name" element={<PokemonDetail/>}/>
            </Route>
          </Routes>
        </Router>
      </PokemonContext.Provider>
    </ApolloProvider>
  );
}

export default App;
