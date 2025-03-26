import { Component } from '@angular/core';

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [],
  template: `
    <section class="page">
      <h1>Create Character</h1><br>
      <p>create-character works!</p>
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
export class CreateCharacterComponent {

}
