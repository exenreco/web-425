import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Guild } from './create.guild.interface';

@Component({
  selector: 'app-create-guild',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink],
  template: `
    <section class="page create-guild">
      <div class="container">
        <form [formGroup]="guildForm" (ngSubmit)="onSubmit()" class="form">
          <h2 class="title">New Guild Info:</h2>
          <div>
            <label for="name">Guild Name</label>
            <input id="name" formControlName="name" />
            <div *ngIf="guildForm.controls['name'].invalid && guildForm.controls['name'].touched" class="error">
              Name is required.
            </div>
          </div>

          <div>
            <label for="description">Description</label>
            <textarea id="description" formControlName="description"></textarea>
            <div *ngIf="guildForm.controls['description'].invalid && guildForm.controls['description'].touched" class="error">
              Description is required.
            </div>
          </div>

          <div>
            <label for="type">Type</label>
            <select id="type" formControlName="type">
              <option value="Competitive">Competitive</option>
              <option value="Casual">Casual</option>
              <option value="Social">Social</option>
              <option value="Educational">Educational</option>
            </select>
            <div *ngIf="guildForm.controls['type'].invalid && guildForm.controls['type'].touched" class="error">
              Type is required.
            </div>
          </div>

          <div>
            <label>
              Notification Preference
            </label>
            <label class="label-group"><input type="radio" formControlName="notificationPreference" value="Email" /> Email</label>
            <label class="label-group"><input type="radio" formControlName="notificationPreference" value="SMS" /> SMS</label>
            <label class="label-group"><input type="radio" formControlName="notificationPreference" value="In-App" /> In-App</label>
            <div *ngIf="guildForm.controls['notificationPreference'].invalid && guildForm.controls['notificationPreference'].touched" class="error">
              Please select a notification preference.
            </div>
          </div>

          <div>
            <label class="label-group"><input type="checkbox" formControlName="terms" /> Accept Terms</label>
            <div *ngIf="guildForm.controls['terms'].invalid && guildForm.controls['terms'].touched" class="error">
              You must accept terms.
            </div>
          </div>

          <button type="submit" [disabled]="guildForm.invalid">Create Guild</button>
        </form>
        <section class="results">
          <h3 class="title">Newly Created Guilds</h3>
          <div *ngIf="guilds.length > 0" class="guild-list">
            <ul>
              <li *ngFor="let g of guilds">
                <table>
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
          </div>
        </section>
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
    .title {
      width: 98%;
      margin: auto;
      color: #fff;
      font-weight: bold;
      font-size: 2rem;
      text-align: left;
      border-bottom: .15em solid #fff;
    }
    .page .container {
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
    .page .container .form,
    .page .container .results {
      display: flex;
      flex: 0 0 auto;
      margin: .4em;
      flex-direction: column;
    }
    .page .container .form {
      color: #fff;
      height: auto;
      border-radius: .4em;
      width: calc(30% - 1.6em);
      max-width: calc(30% - 1.6em);
      min-width: calc(30% - 1.6em);
      background: rgba(20, 20, 20, 0.5);
    }
    .page .container .results {
      width: calc(100% - calc(30% + 1.6em));
      max-width: calc(100% - calc(30% + 1.6em));
      min-width: calc(100% - calc(30% + 1.6em));
    }

    .page .container .form div {
      margin: 1em;
      display: flex;
      flex: 0 0 auto;
      text-align: left;
      flex-direction: column;
    }
    .page .container .form .label-group {
      display: flex;
      flex: 0 0 auto;
      justify-items: left;
      justify-content: left;
      align-items: start;
      flex-direction: row-revers;
      margin-top: .4em;
      margin-bottom: .4em;
    }
    .page .container .form .label-group input {
      width: 2em;
    }
    .page .container .form input {
      width: 100%;
      padding: 0.5em;
      box-sizing: border-box;
    }
    .page .container .form button {
      width: 100%;
      padding: 0.75em;
      background: red;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .page .container .form button:disabled {
      background: #aaa;
    }
    .page .container .form .error {
      color: red;
      font-size: 0.9em;
    }
    table {
    margin: auto;
    margin-top: 1em;
    margin-bottom: 1em;
    width: calc(100% - 2em);
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
    .page .container {
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
    .page .container > .form,
    .page .container > .results {
      display: flex;
      flex: 0 0 auto;
      margin: .4em;
      flex-direction: column;
    }
    .page .container > .form {
      height: auto;
      border-radius: .4em;
      width: calc(100% - 1.6em);
      max-width: calc(100% - 1.6em);
      min-width: calc(100% - 1.6em);
      background: rgba(20, 20, 20, 0.5);
    }
    .page .container > .results {
      width: calc(100% - 1.6em);
      max-width: calc(100% - 1.6em);
      min-width: calc(100% - 1.6em);
    }
  }
  `
})
export class CreateGuildComponent {

  // Initialize characterModel
  guildModel: Partial<Guild> = {
    id:               this.generateRandomId(),
    name:             '',
    type:             'Casual',
    terms:            false,
    description:      '',
    notificationPreference: 'Email'
  };

  guildForm!: FormGroup;
  guilds: Guild[] = [];

  constructor(private fb: FormBuilder) {}

  generateRandomId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }

  ngOnInit(): void {
    this.guildForm = this.fb.group({
      id: this.generateRandomId(),
      name: [this.guildModel.name, Validators.required],
      type: [this.guildModel.type, Validators.required],
      terms: [this.guildModel.terms, Validators.requiredTrue],
      description: [this.guildModel.description, Validators.required],
      notificationPreference: [this.guildModel.notificationPreference, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.guildForm.valid) {
      this.guilds.push(this.guildForm.value as Guild);
      this.guildForm.reset({...this.guildModel, id: this.generateRandomId()});
    } else this.guildForm.markAllAsTouched();
  }
}
