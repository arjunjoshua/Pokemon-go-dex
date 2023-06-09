import React from 'react';
import { PokemonGrid } from './components/Pokemon_grid';

export const App: React.FC = () => {
  return (
    <div className="app">
      <PokemonGrid />
    </div>
  );
};

export default App;
