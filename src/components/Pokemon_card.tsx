import React from 'react';
import { Pokemon } from './Pokemon_struct';
import '../styles/styles.css';

interface PokemonCardProps {
 pokemon : Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className={`pokemon-card ${pokemon.isUnreleased ? 'unreleased' : ''}`}>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </div>
  );
};

export {};  
