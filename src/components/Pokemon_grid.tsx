import React from 'react';
import { pokemonData } from './data_Kanto';
import { PokemonCard } from './Pokemon_card';
import '../styles/styles.css'

export const PokemonGrid: React.FC = () => {
  return (
    <div className="pokemon-grid">
      {pokemonData.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export {};