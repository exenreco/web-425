import { Component } from '@angular/core';

@Component({
  selector: 'app-create-guild',
  standalone: true,
  imports: [],
  template: `
    <section class="page">
      <h1>Create Guild</h1><br>
      <p>create-guild works!</p>
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
export class CreateGuildComponent {

}
