interface PokemonType {
  name: string;
}

export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  isUnreleased: boolean;
  shinyUnreleased: boolean;
  types: PokemonType[];
}

export {};
