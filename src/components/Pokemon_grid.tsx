import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PokemonCard } from './Pokemon_card';
import { Pokemon } from './Pokemon_struct';

export const PokemonGrid: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const pokemonArray: Pokemon[] = response.data.results.map((pokemon: any, index: number) => {
        return {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name}.png`,
        }
      });
      setPokemonData(pokemonArray);
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="pokemon-grid">
      {pokemonData.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export {};