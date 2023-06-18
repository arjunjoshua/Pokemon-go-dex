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

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const pokemonArray: Pokemon[] = response.data.results.map(
        (pokemon: any, index: number) => {
          const id = offset + index + 1;
          return {
            id: id,
            name: pokemon.name,
            sprite: `https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name}.png`,
            isUnreleased: unreleasedPokemonIds.includes(id),
            shinyUnreleased: unreleasedShinies.includes(id),
          };
        }
      );
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
      </div>
  );
};
