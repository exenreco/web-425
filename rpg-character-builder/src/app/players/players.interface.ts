export interface Character {
  id: number;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  class: 'Warrior' | 'Mage' | 'Rogue';
  faction: 'The Arcane Circle' | 'The Silent Blades' | 'The Bloomfield' | 'Draw Swords';
  startingLocation: "Wet Lands" | 'Eldoria Spire' | 'Pyrestone Keep' | 'Mystic Falls';
  funFact: string;
}
