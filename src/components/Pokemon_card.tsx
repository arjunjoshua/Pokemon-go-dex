import React from 'react';
import { Pokemon } from './Pokemon_struct';
import '../styles/styles.css';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
        <img src={pokemon.sprite} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
    </div>
  );
};

export {};  
