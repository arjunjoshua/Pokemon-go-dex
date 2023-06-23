import React from 'react';
import { Pokemon } from './Pokemon_struct';
import '../styles/styles.css';

interface PokemonCardProps {
  pokemon : Pokemon;
  showShiny : boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, showShiny }) => {
  const spriteToUse = showShiny 
    ? pokemon.sprite.replace("normal", "shiny")
    : pokemon.sprite;
  return (
    <div className={`pokemon-card ${pokemon.isUnreleased || (pokemon.shinyUnreleased && showShiny) ? 'unreleased' : ''}`}>
      <img src={spriteToUse} alt={pokemon.name} />
      <p>{pokemon.name}</p>
      <div className="types">
    {pokemon.types.map((type, index) => (
      <div key={index} className={`type type-${type.name}`}>
        {type.name}
      </div>
    ))}
  </div>
</div>
  );
};

export {};  
