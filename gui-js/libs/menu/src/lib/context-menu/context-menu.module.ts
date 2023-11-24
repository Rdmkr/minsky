import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiModule } from '@minsky/shared-ui';
import { ColorPickerModule } from 'ngx-color-picker';
import { ContextMenuRoutingModule } from './context-menu-routing.module';
import { PenStylesComponent } from './pen-styles/pen-styles.component';
@NgModule({
  declarations: [PenStylesComponent],
  imports: [
    CommonModule,
    SharedUiModule,
    ContextMenuRoutingModule,
    ColorPickerModule,
  ],
})
export class ContextMenuModule {}
