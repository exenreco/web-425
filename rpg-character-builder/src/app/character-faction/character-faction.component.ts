import { Component } from '@angular/core';

@Component({
  selector: 'app-character-faction',
  standalone: true,
  imports: [],
  template: `
    <section class="page">
      <h1>Character Faction</h1><br>
      <p>character-faction works!</p>
    </section>
  `,
  styles: `.page {
    text-align: center;
    padding-top: 2em;
    margin-top: 7em;
    display: block;
    flex: 1 1 auto;
    height: 100vh;
  }`
})
export class CharacterFactionComponent {

}
