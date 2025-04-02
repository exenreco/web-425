import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from './players.interface';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="page">
    <h2 class="title">Players</h2>
    <div class="players-list">
      <div class="player-card" *ngFor="let character of characters">
        <table>
          <tr>
            <th colspan="2"><h3>{{ character.name }}</h3></th>
          </tr>
          <tr>
            <td>System</td>
            <td>Player</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{{ character.name }}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{{ character.gender }}</td>
          </tr>
          <tr>
            <td>Class:</td>
            <td>{{ character.class }}</td>
          </tr>
          <tr>
            <td>Faction:</td>
            <td>{{ character.faction  }}</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>{{ character.startingLocation  }}</td>
          </tr>
          <tr>
            <td>Fun Fact:</td>
            <td>{{ character.funFact  }}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
`,
styles: `
  .page {
    padding-top: 2em;
    margin-top: 7em;
    display: block;
    flex: 1 1 auto;
    height: 100vh;
  }
  .players-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .player-card {
    width: calc(30% - 4rem);
    margin: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #444;
  }
  .title {
    width: 98%;
    margin: auto;
    color: #fff;
    font-weight: bold;
    font-size: 2rem;
    text-align: left;
    border-bottom: .15em solid #fff;
  }
    table {
      margin: auto;
      width: 100%;
      background: red;
      border-collapse: collapse;
    }
    table th {
      font-size: 2rem;
      text-align: left;
      border-bottom: .15em solid #fff;
    }
    table tr:nth-child(2) {
      font-size: 1rem;
      font-weight: bold;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 4px;
      text-align: left;
    }
    th {
      background-color: #333;
      color: white;
    }

    tr:nth-child(odd) {
      background-color: #f2f2f2; /* Light gray for odd rows */
    }

    tr:nth-child(even) {
      background-color: #ffffff; /* White for even rows */
    }

    tr:hover {
      background-color: #ddd; /* Highlight row on hover */
    }
`})
export class PlayersComponent {
  characters: Character[];
  constructor() {
    this.characters = [
      {
        name: 'Thorn',
        gender: 'Male',
        class: 'Warrior',
        faction: 'The Iron Brotherhood',
        startingLocation: 'Ironhold',
        funFact: 'Thorn once single-handedly defeated a dragon.'
      },
      {
        name: 'Elara',
        gender: 'Female',
        class: 'Mage',
        faction: 'The Arcane Circle',
        startingLocation: 'Mystic Falls',
        funFact: 'Elara can summon lightning with her fingertips.'
      },
      {
        name: 'Shade',
        gender: 'Other',
        class: 'Rogue',
        faction: 'The Silent Blades',
        startingLocation: 'Shadowport',
        funFact: 'Shade is known for disappearing in the blink of an eye.'
      },
      // ... add 7 more characters
      {
        name: 'Broom',
        gender: 'Female',
        class: 'Rogue',
        faction: 'The Bloomfield',
        startingLocation: 'Ironhold',
        funFact: 'Broom is known for portal to different locations in the split of a second.'
      },
      {
        name: 'King',
        gender: 'Male',
        class: 'Mage',
        faction: 'The Silent Blades',
        startingLocation: 'Shadowport',
        funFact: 'King is known for the many tricks up is crown.'
      },
      {
        name: 'Jin',
        gender: 'Other',
        class: 'Warrior',
        faction: 'Draw Swords',
        startingLocation: 'wetlands',
        funFact: 'Jin is known for his mage and combat abilities.'
      },
      {
        name: "Seraphina Nightshade",
        gender: "Female",
        class: "Rogue",
        faction: "Shadow Syndicate",
        startingLocation: "Raven's Hollow",
        funFact: "Seraphina once stole the crown jewels of a fallen kingdom and returned them just for the thrill."
      },
      {
        name: "Magnus Stormcaller",
        gender: "Male",
        class: "Mage",
        faction: "Arcane Council",
        startingLocation: "Eldoria Spire",
        funFact: "Magnus accidentally turned an entire village invisible for a week during a magical experiment gone wrong."
      },
      {
        name: "Kaelin Emberheart",
        gender: "Other",
        class: "Warrior",
        faction: "The Ember Vanguard",
        startingLocation: "Pyrestone Keep",
        funFact: "Kaelin wields a sword that burns with an eternal flame, said to have been forged in the heart of a dying star."
      },
      {
        name: "Sylvara Moondancer",
        gender: "Female",
        class: "Mage",
        faction: "Verdant Circle",
        startingLocation: "Sylvan Glade",
        funFact: "Sylvara can communicate with plants and once convinced an ancient oak to move its roots and save a trapped village."
      }
    ];
  }
}
