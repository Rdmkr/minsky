import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiModule } from '@minsky/shared-ui';
import { AboutComponent } from './about/about.component';
import { FileRoutingModule } from './file-routing.module';
import { LogSimulationComponent } from './log-simulation/log-simulation.component';

@NgModule({
  declarations: [AboutComponent, LogSimulationComponent],
  imports: [CommonModule, FileRoutingModule, SharedUiModule],
})
export class FileModule {}
