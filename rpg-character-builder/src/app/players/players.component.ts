import { Component } from '@angular/core';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [],
  template: `
  <section class="page">
    <h1>Players</h1><br>
    <p>players works!</p>
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
export class PlayersComponent {

}
