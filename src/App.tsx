import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PokemonGrid } from './components/Pokemon_grid';

interface RouteWrapperProps {
  defaultRegion: string;
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({ defaultRegion }) => <PokemonGrid defaultRegion={defaultRegion} />;

const App = () => (
  <Router>
    <Routes>
    <Route path="/kanto" element={<RouteWrapper defaultRegion="kanto" />} />
      <Route path="/johto" element={<RouteWrapper defaultRegion="johto" />} />
      <Route path="/hoenn" element={<RouteWrapper defaultRegion="hoenn" />} />
      <Route path="/sinnoh" element={<RouteWrapper defaultRegion="sinnoh" />} />
      <Route path="/unova" element={<RouteWrapper defaultRegion="unova" />} />
      <Route path="/kalos" element={<RouteWrapper defaultRegion="kalos" />} />
      <Route path="/alola" element={<RouteWrapper defaultRegion="alola" />} />
      <Route path="/" element={<RouteWrapper defaultRegion="kanto" />} />
    </Routes>
  </Router>
);

export default App;
