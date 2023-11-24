import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiModule } from '@minsky/shared-ui';
import { CreateVariableComponent } from './create-variable/create-variable.component';
import { InsertRoutingModule } from './insert-routing.module';

@NgModule({
  declarations: [CreateVariableComponent],
  imports: [
    CommonModule,
    InsertRoutingModule,
    SharedUiModule
  ],
})
export class InsertModule {}
