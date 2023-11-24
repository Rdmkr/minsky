import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiModule } from '@minsky/shared-ui';
import { DimensionsComponent } from './dimensions/dimensions.component';
import { EditRoutingModule } from './edit-routing.module';

@NgModule({
  declarations: [DimensionsComponent],
  imports: [CommonModule, EditRoutingModule, SharedUiModule],
})
export class EditModule {}
