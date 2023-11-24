import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@minsky/shared-ui';
import { DialogComponent } from './component/dialog/dialog.component';
import { DeepCoreModule } from '@minsky/deepcore';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DeepCoreModule
  ],
  declarations: [DialogComponent],
  exports: [DialogComponent],
  providers: []
})
export class CoreModule {}
