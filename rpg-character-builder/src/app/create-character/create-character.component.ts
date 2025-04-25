import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Character } from '../players/players.interface';

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink],
  styles: `.page {
    padding-top: 2em;
    margin-top: 7em;
    display: block;
    flex: 0 0 auto;
    height: 100vh;
    max-width: calc(1080px- 1.6em);
    min-width: calc(800px- 1.6em);
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
  .page.create-character .container {
    margin: auto;
    padding: .8em;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: nowrap;
    align-items: start;
    flex-direction: row;
    justify-items: left;
    justify-content: left;
    width: calc(98% - 1.6em);
  }
  .page.create-character .container > .character-form,
  .page.create-character .container > .results {
    display: flex;
    flex: 0 0 auto;
    margin: .4em;
    flex-direction: column;
  }
  .page.create-character .container > .character-form {
    height: auto;
    border-radius: .4em;
    width: calc(30% - 1.6em);
    max-width: calc(30% - 1.6em);
    min-width: calc(30% - 1.6em);
    background: rgba(20, 20, 20, 0.5);
  }
  .page.create-character .container > .results {
    width: calc(100% - calc(30% + 1.6em));
    max-width: calc(100% - calc(30% + 1.6em));
    min-width: calc(100% - calc(30% + 1.6em));
  }


  .page.create-character .container > .character-form input,
  .page.create-character .container > .character-form textarea,
  .page.create-character .container > .character-form select {
    padding: .4em;
    outline: none;
    border-radius: .4em;
    border: .2em solid #111;
    width: calc(100% - 1.2em);
  }
  .page.create-character .container > .character-form input[type="submit"] {
    color: #fff;
    margin: auto;
    background: red;
    font-size: 1rem;
    font-weight: bolder;
    padding: 1.2em 0 1.2em 0;
    text-transform: uppercase;
    cursor: pointer;
  }
  .page.create-character .container > .character-form input[type="submit"]:hover {
    color: red;
    background: #fff;
  }


  .page.create-character .container > .character-form .section {
    display: flex;
    padding: .4em;
    flex: 0 0 auto;
    align-items: start;
    justify-items: left;
    justify-content: left;
  }
  .page.create-character .container > .character-form .section.row {
    flex-direction: row;
  }
  .page.create-character .container > .character-form .section.column {
    flex-direction: column;
  }


  .page.create-character .container > .character-form .section.row label {
    width: calc(50% - .8em);
  }
 .page.create-character .container > .character-form .section.column label {
    width: calc(100% - .8em);
  }

  .page.create-character .container > .character-form label {
    color: #fff;
    display: flex;
    flex: 0 0 auto;
    font-size: 1.25rem;
    align-items: start;
    position: relative;
    justify-items: left;
    justify-content: left;
    flex-direction: column;
    margin: .2em;
  }

  table {
    margin: auto;
    width: 100%;
    margin-top: 1em;
    margin-bottom: 1em;
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
  @media only screen and (max-width: 1024px) {
    .page.create-character .container {
      margin: auto;
      padding: .8em;
      display: flex;
      flex: 0 0 auto;
      flex-wrap: nowrap;
      align-items: start;
      flex-direction: column;
      justify-items: center;
      justify-content: center;
      width: calc(98% - 1.6em);
    }
    .page.create-character .container > .character-form,
    .page.create-character .container > .results {
      display: flex;
      flex: 0 0 auto;
      margin: .4em;
      flex-direction: column;
    }
    .page.create-character .container > .character-form {
      height: auto;
      border-radius: .4em;
      width: calc(100% - 1.6em);
      max-width: calc(100% - 1.6em);
      min-width: calc(100% - 1.6em);
      background: rgba(20, 20, 20, 0.5);
    }
    .page.create-character .container > .results {
      width: calc(100% - 1.6em);
      max-width: calc(100% - 1.6em);
      min-width: calc(100% - 1.6em);
    }
  }
  `,
  template: `
    <section class="page create-character">
      <div class="container">
        <form #characterForm="ngForm" class="character-form" (ngSubmit)="onSubmit()" >
          <div class="section row"><h2 class="title">Create a new player</h2></div>
          <div class="section row">
            <label>
              <span class="field-title">Name:</span>
              <input
                type="text"
                name="name"
                [(ngModel)]="characterModel.name"
                placeholder="Name"
                required
              />
            </label>
            <label>
              <span class="field-title">Gender:</span>
              <select name="gender" [(ngModel)]="characterModel.gender">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <div class="section row">
            <label>
              <span class="field-title">Class:</span>
              <select name="class" [(ngModel)]="characterModel.class" required>
                <option>Warrior</option>
                <option>Mage</option>
                <option>Rogue</option>
              </select>
            </label>
            <label>
              Faction:
              <select name="faction" [(ngModel)]="characterModel.faction" required>
                <option>The Arcane Circle</option>
                <option>The Silent Blades</option>
                <option>The Bloomfield</option>
                <option>Draw Swords</option>
              </select>
            </label>
          </div>

          <div class="section column">
            <label>
              Starting Location:
              <select name="class" [(ngModel)]="characterModel.startingLocation">
                <option>Wet Lands</option>
                <option>Eldoria Spire</option>
                <option>Pyrestone Keep</option>
                <option>Mystic Falls</option>
              </select>
            </label>
            <label>
              Fun Fact:
              <textarea
                name="funFact"
                [(ngModel)]="characterModel.funFact"
                required
                placeholder="Tell us a little about your character"
              ></textarea>
            </label>
          </div>
          <div class="section row">
            <input
              type="submit"
              value="Create Character"
              [disabled]="!characterForm.form.valid"
            >
          </div>
        </form>
        <section class="results">
          <h3 class="title">Newly Created Players</h3>
          <ul *ngIf="characters.length > 0">
            <li *ngFor="let c of characters">
              <table>
                <tr><th>Systems</th><th>Info</th><tr>
                <tr><td>ID</td><td>{{c.id}}</td></tr>
                <tr><td>Player</td><td>{{c.name}}</td></tr>
                <tr><td>Gender</td><td>{{c.gender}}</td></tr>
                <tr><td>Class</td><td>{{c.class}}</td></tr>
                <tr><td>Faction</td><td>{{c.faction}}</td></tr>
                <tr><td>Location</td><td>{{c.startingLocation}}</td></tr>
                <tr><td>About</td><td>{{c.funFact}}</td></tr>
              </table>
            </li>
          </ul>
        </section>
      </div>
    </section>
  `
})
export class CreateCharacterComponent {

  // Initialize characterModel
  characterModel: Partial<Character> = {
    name:             '',
    class:            'Mage',
    gender:           'Male',
    faction:          'The Arcane Circle',
    funFact:          '',
    startingLocation: 'Wet Lands'
  };

  characters: Character[] = [];

  generateRandomId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  onSubmit() {
    const newCharacter: Character = {
      id: this.generateRandomId(),
      name: this.characterModel.name!,
      gender: this.characterModel.gender as Character['gender'],
      class: this.characterModel.class as Character['class'],
      faction: this.characterModel.faction as Character['faction'],
      funFact: this.characterModel.funFact!,
      startingLocation: this.characterModel.startingLocation as Character['startingLocation'],
    };
    console.log("New character created:", newCharacter); // Debug log
    this.characters.push(newCharacter);
    this.resetForm();
  }

  resetForm() {
    this.characterModel = {
      name:             '',
      class:            'Mage',
      gender:           'Male',
      faction:          'The Arcane Circle',
      funFact:          '',
      startingLocation: 'Wet Lands'
    };
  }

}
