import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HttpClient, provideHttpClient, HttpErrorResponse } from '@angular/common/http';
import { Faction } from './faction.interface';

/** NOTE:
 *  ----------------------------------------------------------------------
 *  THE SERVER WILL AUTOMATICALLY START ON -> npm start
 *
 *  prevent server start use -> ng serve
 *
 ** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

@Component({
  selector: 'app-character-faction',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterOutlet, RouterLink ],
  styles: `
    .page.character-faction .fraction-handler {
      margin: auto;
      padding: .4em 0 .4em 0;
      width: calc(100% - 1.45em);
    }
    .page.character-faction .fraction-handler .error,
    .page.character-faction .fraction-handler .empty {
      color: #888;
      font-size: 1.25rem;
      text-align: center;
      font-weight: bolder;
      padding: .4em 0 .4em 0;
    }
  `,
  template: `
    <section class="page character-faction">
      <h1 class="page-title">Character Faction</h1>
      <ul class="fraction-handler">
        <li *ngIf="error" class="error">{{ errorMessage }}</li>
        <li *ngIf="!error && factions.length">
          <ul class="faction-list">
            <li *ngFor="let f of factions" class="card">
              <table class="card">
                <tr><th>Systems</th><th>Info</th><tr>
                <tr class="data-row"><td>ID</td><td>{{f.id}}</td></tr>
                <tr class="data-row"><td>Faction</td><td>{{f.name}}</td></tr>
                <tr class="data-row"><td>Description</td><td>{{f.description}}</td></tr>
              </table>
            </li>
          </ul>
        </li>
        <li *ngIf="!error && factions.length === 0" class="empty">No character factions found.</li>
      </ul>
    </section>
  `
})
export class CharacterFactionComponent implements OnInit {
  factions: Faction[] = [];
  error = false;
  errorMessage: string = '';

  // faction API url
  private apiUrl = 'http://localhost:3000/api/character-factions';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Faction[]>(this.apiUrl).subscribe({
      next: data => this.factions = data,
      error: (err: HttpErrorResponse) => {
        this.error = true;
        this.errorMessage = err.status === 0
          ? 'Server is unreachable. Please try again later.'
          : `Error ${err.status}: ${err.message}`;
      }
    });
  }
}
