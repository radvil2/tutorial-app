import { Component } from '@angular/core';

@Component({
  selector: 'rad-root',
  template: `
    <div class="theme-wrapper default-theme">
      <rad-layout>
        <router-outlet></router-outlet>
      </rad-layout>
    </div>
  `,
})
export class AppComponent {}
