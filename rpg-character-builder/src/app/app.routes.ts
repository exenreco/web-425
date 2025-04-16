import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { SigninComponent } from './signin/signin.component';
import { CreateCharacterComponent } from './create-character/create-character.component';
import { CreateGuildComponent } from './create-guild/create-guild.component';
import { CharacterFactionComponent } from './character-faction/character-faction.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  // public routes…
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'create-guild', component: CreateGuildComponent },
  { path: 'character-faction', component: CharacterFactionComponent },

  // protected route:
  { path: 'create-character', component: CreateCharacterComponent, canActivate: [AuthGuard] },

  // wildcard / 404:
  { path: '**', redirectTo: '' }
];
