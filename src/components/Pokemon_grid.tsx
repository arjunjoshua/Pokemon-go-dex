import React, { useState, useEffect } from "react";
import axios from "axios";
import { PokemonCard } from "./Pokemon_card";
import { Pokemon } from "./Pokemon_struct";
import "../styles/Pokemon_grid.css";
import { useForm } from "react-hook-form";
import {unreleasedPokemonIds, unreleasedShinies, Region, regionData} from "./constants"
import {Link} from 'react-router-dom'


export const PokemonGrid: React.FC<{ defaultRegion: string }> = ({ defaultRegion }) => {
  const [currentRegion, setCurrentRegion] = useState(defaultRegion);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const { register, watch } = useForm();
  const showShiny = watch('showShiny');

  useEffect(() => {
    const fetchPokemonData = async () => {
      const { limit, offset } = regionData[currentRegion as Region];

      // Try to load data from local storage
      const cachedData = localStorage.getItem(`pokemonData-${currentRegion}`);
      if (cachedData) {
        setPokemonData(JSON.parse(cachedData));
        return; // don't fetch new data if cached data exists
      }

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const pokemonArray: Pokemon[] = await Promise.all(
        response.data.results.map(async (pokemon: any, index: number) => {
          const id = offset + index + 1;
          
          // fetch individual pokemon data to get types
          const pokemonResponse = await axios.get(pokemon.url);
          const pokemonData = pokemonResponse.data;

          let sprite: string;
          if (id < 650)
           sprite = `https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name}.png`;
          else if (id < 722)
           sprite = `https://img.pokemondb.net/sprites/x-y/normal/${pokemon.name}.png`;
          else if (id > 802 && id < 810)
            sprite = `https://img.pokemondb.net/sprites/ultra-sun-ultra-moon/normal/${pokemon.name}.png`;
          else
            sprite = `https://img.pokemondb.net/sprites/sun-moon/normal/${pokemon.name}.png`;
      
          return {
            id: id,
            name: pokemon.name,
            sprite: sprite,
            isUnreleased: unreleasedPokemonIds.includes(id),
            shinyUnreleased: unreleasedShinies.includes(id),
            types: pokemonData.types 
              ? pokemonData.types.map((typeObj: any) => ({ name: typeObj.type.name })) 
              : [],
          };
        })
      );
      
      // Store data in local storage
      localStorage.setItem(`pokemonData-${currentRegion}`, JSON.stringify(pokemonArray));
      setPokemonData(pokemonArray);
    };

    fetchPokemonData();
  }, [currentRegion, showShiny],);

  const handleTabChange = (newRegion: string) => {
    setCurrentRegion(newRegion);
  };

  return (
    <div>
      <h1 className="header">Current Released dex in Pokemon go</h1>
      <div className="tabs">
        <Link to="/kanto"
          className={currentRegion === "kanto" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("kanto")}
        >
          Kanto
        </Link>
        <Link to="/johto"
          className={currentRegion === "johto" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("johto")}
        >
          Johto
        </Link>
        <Link to="/hoenn"
          className={currentRegion === "hoenn" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("hoenn")}
        >
          Hoenn
        </Link>
        <Link to="/sinnoh"
          className={currentRegion === "sinnoh" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("sinnoh")}
        >
          Sinnoh
        </Link>
        <Link to="/unova"
          className={currentRegion === "unova" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("unova")}
        >
          Unova
        </Link>
        <Link to="/kalos"
          className={currentRegion === "kalos" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("kalos")}
        >
          Kalos
        </Link>
        <Link to="/alola"
          className={currentRegion === "alola" ? "tab active-tab" : "tab"} 
          onClick={() => handleTabChange("alola")}
        >
          Alola 
        </Link>
      </div>
      <form className="shinyCheckbox">
        <label htmlFor="showShiny">Show shiny eligible pokemon</label>
        <input type="checkbox" {...register("showShiny")}/>
      </form>
      <div className="pokemon-grid">
          {pokemonData.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} showShiny={showShiny} />
          ))}
        </div>
        <button className="btn_top" onClick={() => window.scrollTo(0, 0)}>Scroll to top</button>
      </div>
  );
};
