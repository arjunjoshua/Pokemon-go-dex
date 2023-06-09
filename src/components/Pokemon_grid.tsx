import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PokemonCard } from './Pokemon_card';
import { Pokemon } from './Pokemon_struct';

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
      }

      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemonArray: Pokemon[] = response.data.results.map((pokemon: any, index: number) => {
        return {
          id: offset + index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`,
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
      <div>
        <button onClick={() => handleTabChange('kanto')}>Kanto</button>
        <button onClick={() => handleTabChange('johto')}>Johto</button>
      </div>
      <div className="pokemon-grid">
        {pokemonData.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};