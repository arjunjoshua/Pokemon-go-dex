import React, { useState, useEffect } from "react";
import axios from "axios";
import { PokemonCard } from "./Pokemon_card";
import { Pokemon } from "./Pokemon_struct";
import "../styles/Pokemon_grid.css";
import { useForm } from "react-hook-form";


export const PokemonGrid: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [currentRegion, setCurrentRegion] = useState("kanto");
  const { register, watch } = useForm();
  const showShiny = watch('showShiny');

  useEffect(() => {
    const fetchPokemonData = async () => {
      let limit: number = 0,
        offset: number = 0;
      if (currentRegion === "kanto") {
        limit = 151;
        offset = 0;
      } else if (currentRegion === "johto") {
        limit = 100;
        offset = 151;
      } else if (currentRegion === "hoenn") {
        limit = 135;
        offset = 251;
      } else if (currentRegion === "sinnoh") {
        limit = 107;
        offset = 386;
      } else if (currentRegion === "unova") {
        limit = 156;
        offset = 493;
      }

      const unreleasedPokemonIds = [489, 490, 493];
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
        <button
          className={currentRegion === "kanto" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("kanto")}
        >
          Kanto
        </button>
        <button
          className={currentRegion === "johto" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("johto")}
        >
          Johto
        </button>
        <button
          className={currentRegion === "hoenn" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("hoenn")}
        >
          Hoenn
        </button>
        <button
          className={currentRegion === "sinnoh" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("sinnoh")}
        >
          Sinnoh
        </button>
        <button
          className={currentRegion === "unova" ? "tab active-tab" : "tab"}
          onClick={() => handleTabChange("unova")}
        >
          Unova
        </button>
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
