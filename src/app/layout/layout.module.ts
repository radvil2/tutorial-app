import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './container/layout.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { FooterComponent } from './components/footer/footer.component';

const LAYOUT_COMPONENTS = [
  LayoutComponent,
  TopnavComponent,
  SidenavComponent,
  FooterComponent,
];

@NgModule({
  declarations: [...LAYOUT_COMPONENTS],
  imports: [SharedModule, RouterModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
