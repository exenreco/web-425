import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  template: `
  <section class="page">
    <h1>Signin</h1><br>
    <p>signin works!</p>
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
export class SigninComponent {

}
