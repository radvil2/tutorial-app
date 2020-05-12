import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [AppRouting, CoreModule, LayoutModule],
})
export class AppModule {}
