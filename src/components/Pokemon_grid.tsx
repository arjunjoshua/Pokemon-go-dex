import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PokemonCard } from './Pokemon_card';
import { Pokemon } from './Pokemon_struct';
import '../styles/Pokemon_grid.css';

const unreleasedPokemonIds = [489, 490, 493];

export const PokemonGrid: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [currentRegion, setCurrentRegion] = useState('kanto');

  useEffect(() => {
    const fetchPokemonData = async () => {
      let limit: number = 0, offset: number = 0;
      if (currentRegion === 'kanto') {
        limit = 151;
        offset = 0;
      } else if (currentRegion === 'johto') {
        limit = 100;
        offset = 151;
      } else if (currentRegion === 'hoenn') {
        limit = 135;
        offset = 251;
      } else if (currentRegion === 'sinnoh') {
        limit = 107;
        offset = 386
      }
       
      const unreleasedPokemonIds = [489, 490, 493];
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemonArray: Pokemon[] = response.data.results.map((pokemon: any, index: number) => {
        const id = offset + index + 1;
        return {
          id: id,
          name: pokemon.name,
          sprite: `https://img.pokemondb.net/sprites/black-white/normal/${pokemon.name}.png`,
          isUnreleased: unreleasedPokemonIds.includes(id),
        }
      });
      setPokemonData(pokemonArray);
    };

    fetchPokemonData();
  }, [currentRegion]);

  const handleTabChange = (newRegion: string) => {
    setCurrentRegion(newRegion);
  };

  return (
    <div>
      <h1 className="header">Current Released dex in Pokemon go</h1>
      <div className="tabs">
        <button className={currentRegion === 'kanto' ? "tab active-tab" : "tab"} onClick={() => handleTabChange('kanto')}>Kanto</button>
        <button className={currentRegion === 'johto' ? "tab active-tab" : "tab"} onClick={() => handleTabChange('johto')}>Johto</button>
        <button className={currentRegion === 'hoenn' ? "tab active-tab" : "tab"} onClick={() => handleTabChange('hoenn')}>Hoenn</button>
        <button className={currentRegion === 'sinnoh' ? "tab active-tab" : "tab"} onClick={() => handleTabChange('sinnoh')}>Sinnoh</button>
      </div>
      <div className="pokemon-grid">
      {pokemonData.map(pokemon => (
          <PokemonCard 
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </div>
    </div>
  );
};