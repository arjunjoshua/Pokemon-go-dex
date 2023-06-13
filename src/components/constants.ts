export const unreleasedPokemonIds = [489, 490, 493];
export const unreleasedShinies = [417, 422, 423, 433, 441, 455, 489, 489, 492, 493, 494];

export enum Region {
    Kanto = "kanto",
    Johto = "johto",
    Hoenn = "hoenn",
    Sinnoh = "sinnoh",
    Unova = "unova"
  }
  
export const regionData = {
    [Region.Kanto]: { limit: 151, offset: 0 },
    [Region.Johto]: { limit: 100, offset: 151 },
    [Region.Hoenn]: { limit: 135, offset: 251 },
    [Region.Sinnoh]: { limit: 107, offset: 386 },
    [Region.Unova]: { limit: 156, offset: 493 }
  };
  
export{};