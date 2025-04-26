import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { Character } from '../players/players.interface';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [ CommonModule, NgFor, NgIf ],
  encapsulation: ViewEncapsulation.None,
  styles: `
    .character-list {color: #fff; margin: auto; width: calc(100% - 1.25em);}
    .character-list .empty {color: #888; text-align: center; padding: 2em 0 2em 0;}
    .character-list .character .card {color: #333; width: 100%;}
  `,
  template: `
    <ul class="character-list">
      <li *ngIf="characters.length === 0" class="empty">
        <p>No characters created yet.</p>
      </li>
      <li *ngFor="let c of characters" class="character">
        <table class="card">
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
  `
})
export class CharacterListComponent {
  @Input() characters:Character[] = []; // receive emitted
}
