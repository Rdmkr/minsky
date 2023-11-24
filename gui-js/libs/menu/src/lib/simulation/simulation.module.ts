import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiModule } from '@minsky/shared-ui';
import { SimulationRoutingModule } from './simulation-routing.module';
import { SimulationParametersComponent } from './simulation/simulation-parameters.component';

@NgModule({
  declarations: [SimulationParametersComponent],
  imports: [CommonModule, SimulationRoutingModule, SharedUiModule],
})
export class SimulationModule {}
