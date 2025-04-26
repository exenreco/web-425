import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Guild } from '../create-guild/create.guild.interface';

@Component({
  selector: 'app-guild-list',
  standalone: true,
  imports: [ CommonModule, NgFor, NgIf ],
  encapsulation: ViewEncapsulation.None,
  styles: `
    .guild-list {color: #fff; margin: auto; width: calc(100% - 1.25em);}
    .guild-list .empty {color: #888; text-align: center; padding: 2em 0 2em 0;}
    .guild-list .guild .card {color: #333; width: 100%;}
  `,
  template: `
    <ul class="guild-list">
      <li *ngIf="guilds.length === 0" class="empty">
        <p>No guilds created yet.</p>
      </li>
      <li *ngFor="let g of guilds" class="guild">
        <table class="card">
          <tr><th>Systems</th><th>Info</th><tr>
          <tr><td>ID</td><td>{{g.id}}</td></tr>
          <tr><td>Guild</td><td>{{g.name}}</td></tr>
          <tr><td>Type</td><td>{{g.type}}</td></tr>
          <tr><td>Description</td><td>{{g.description}}</td></tr>
          <tr><td>Accepted Terms</td><td>{{g.terms}}</td></tr>
          <tr><td>Notification Preference</td><td>{{g.notificationPreference}}</td></tr>
        </table>
      </li>
    </ul>
  `
})
export class GuildListComponent {
  @Input() guilds:Guild[] = []; // receive emitted
}
