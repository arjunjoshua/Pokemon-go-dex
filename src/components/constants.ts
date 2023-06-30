export const unreleasedPokemonIds = [489, 490, 493];
export const unreleasedShinies = [
  417, 422, 423, 433, 434, 435, 
  446, 441, 455, 479, 489, 492, 
  493, 494, 540, 541, 542, 548, 
  549, 550, 551, 552, 553, 556, 
  561, 564, 565, 566, 567, 570, 
  571, 574, 575, 576, 577, 578, 
  579, 580, 581, 585, 586, 587, 
  595, 596, 602, 603, 604, 619,
  620, 622, 623, 626, 636, 637, 
  647, 648];

export enum Region {
    Kanto = "kanto",
    Johto = "johto",
    Hoenn = "hoenn",
    Sinnoh = "sinnoh",
    Unova = "unova",
    Kalos = "kalos",
    Alola = "alola"
  }
  
export const regionData = {
    [Region.Kanto]: { limit: 151, offset: 0 },
    [Region.Johto]: { limit: 100, offset: 151 },
    [Region.Hoenn]: { limit: 135, offset: 251 },
    [Region.Sinnoh]: { limit: 107, offset: 386 },
    [Region.Unova]: { limit: 156, offset: 493 },
    [Region.Kalos]: { limit: 72, offset: 649 },
    [Region.Alola]: { limit: 88, offset: 721 }
  };
  
export{};