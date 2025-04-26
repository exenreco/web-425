import { Component, Output, EventEmitter } from '@angular/core';
import { GuildListComponent } from '../guild-list/guild-list.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

import { Guild } from './create.guild.interface';

@Component({
  selector: 'app-create-guild',
  standalone: true,
  imports: [GuildListComponent, CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink],
  template: `
    <section class="page create-guild">
      <div class="container">
        <form [formGroup]="guildForm" (ngSubmit)="onSubmit()" class="form">
          <h2 class="page-title">Create a new guild:</h2>
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
          <h3 class="page-title">Newly Created Guilds</h3>
          <app-guild-list [guilds]="guilds"></app-guild-list>
        </section>
      </div>
    </section>
  `,
  styles: `
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
  guilds: Guild[] = [];

  // Emit new guilds
  @Output() addGuild = new EventEmitter<Guild>();

  guildForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }


  // Initialize GuildModel
  GuildModel: Partial<Guild> = {
    name: '',
    type: 'Casual',
    terms: false,
    description: '',
    notificationPreference: 'Email',
  };

  initializeForm(): void {
    this.guildForm = this.fb.group({
      id: this.generateRandomId(),
      name: [this.GuildModel.name, Validators.required],
      type: [this.GuildModel.type, Validators.required],
      terms: [this.GuildModel.terms, Validators.requiredTrue],
      description: [this.GuildModel.description, Validators.required],
      notificationPreference: [this.GuildModel.notificationPreference, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.guildForm.valid) {
      const newGuild: Guild = this.guildForm.value as Guild;
      this.addGuild.emit(newGuild); // Emit the event
      this.guilds.push(this.guildForm.value as Guild);
      this.guildForm.reset({...this.GuildModel, id: this.generateRandomId()});
    } else this.guildForm.markAllAsTouched();
  }

  generateRandomId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }
}
