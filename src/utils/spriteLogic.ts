export const specialCases : {[index: string]: string} = {
    "zygarde-50": "zygarde",
    "mimikyu-disguised": "mimikyu",
    "minior-red-meteor": "minior-red-core",
    // add more special cases as needed
  };
  
  export const getPokemonSpriteName = (pokemonName: string): string => {
    return specialCases[pokemonName] || pokemonName;
  };
  
  export const getSpriteUrl = (id: number): string => {
    const spriteUrls: { [key: string]: string } = {
      '650': 'https://img.pokemondb.net/sprites/black-white/normal/',
      '722': 'https://img.pokemondb.net/sprites/x-y/normal/',
      '803': 'https://img.pokemondb.net/sprites/sun-moon/normal/',
      '808': 'https://img.pokemondb.net/sprites/ultra-sun-ultra-moon/normal/',
      '10001': 'https://img.pokemondb.net/sprites/home/normal/',
    };
  
    const spriteRange = Object.keys(spriteUrls)
      .map(Number)
      .find((range) => id < range);
  
    return spriteUrls[String(spriteRange) || '10001']; // default to the last URL
  };

  export{};