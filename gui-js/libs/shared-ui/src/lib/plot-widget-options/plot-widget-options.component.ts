import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ElectronService } from '@minsky/deepcore';
import { PlotWidget } from '@minsky/shared';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'minsky-plot-widget-options',
  templateUrl: './plot-widget-options.component.html',
  styleUrls: ['./plot-widget-options.component.scss'],
})
export class PlotWidgetOptionsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  itemId: string;

  public get title(): AbstractControl {
    return this.form.get('title');
  }
  public get xLabel(): AbstractControl {
    return this.form.get('xLabel');
  }
  public get yLabel(): AbstractControl {
    return this.form.get('yLabel');
  }
  public get rhsYLabel(): AbstractControl {
    return this.form.get('rhsYLabel');
  }
  public get plotType(): AbstractControl {
    return this.form.get('plotType');
  }
  public get numberOfXTicks(): AbstractControl {
    return this.form.get('numberOfXTicks');
  }
  public get numberOfYTicks(): AbstractControl {
    return this.form.get('numberOfYTicks');
  }
  public get grid(): AbstractControl {
    return this.form.get('grid');
  }
  public get subGrid(): AbstractControl {
    return this.form.get('subGrid');
  }
  public get legend(): AbstractControl {
    return this.form.get('legend');
  }
  public get legendLeft(): AbstractControl {
    return this.form.get('legendLeft');
  }
  public get legendTop(): AbstractControl {
    return this.form.get('legendTop');
  }
  public get legendFontSz(): AbstractControl {
    return this.form.get('legendFontSz');
  }
  public get xLogScale(): AbstractControl {
    return this.form.get('xLogScale');
  }
  public get yLogScale(): AbstractControl {
    return this.form.get('yLogScale');
  }

  constructor(
    private electronService: ElectronService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.itemId = params.itemId;
    });

    this.form = new FormGroup({
      title: new FormControl(''),
      xLabel: new FormControl(''),
      yLabel: new FormControl(''),
      rhsYLabel: new FormControl(''),
      plotType: new FormControl('automatic'),
      numberOfXTicks: new FormControl(null),
      numberOfYTicks: new FormControl(null),
      grid: new FormControl(false),
      subGrid: new FormControl(false),
      legend: new FormControl(false),
      legendLeft: new FormControl(false),
      legendTop: new FormControl(false),
      legendFontSz: new FormControl(false),
      xLogScale: new FormControl(false),
      yLogScale: new FormControl(false),
    });
  }

  ngOnInit() {
    (async () => {
      await this.updateFormValues();
    })();
  }

  async updateFormValues() {
    if (this.electronService.isElectron) {
      let plot=new PlotWidget(this.electronService.minsky.namedItems.elem(this.itemId).second);
      this.title.setValue(await plot.title());
      this.xLabel.setValue(await plot.xlabel());
      this.yLabel.setValue(await plot.ylabel());
      this.rhsYLabel.setValue(await plot.y1label());
      this.plotType.setValue(await plot.plotType());
      this.numberOfXTicks.setValue(await plot.nxTicks());
      this.numberOfYTicks.setValue(await plot.nyTicks());
      this.grid.setValue(await plot.grid());
      this.subGrid.setValue(await plot.subgrid());
      this.legend.setValue(await plot.legend());
      this.legendLeft.setValue(await plot.legendLeft());
      this.legendTop.setValue(await plot.legendTop());
      this.legendFontSz.setValue(await plot.legendFontSz());
      this.xLogScale.setValue(await plot.logx());
      this.yLogScale.setValue(await plot.logy());
    }
  }
  async handleSave() {
    if (this.electronService.isElectron) {
      let plot=new PlotWidget(this.electronService.minsky.namedItems.elem(this.itemId).second);
      plot.title(this.title.value);
      plot.xlabel(this.xLabel.value);
      plot.ylabel(this.yLabel.value);
      plot.y1label(this.rhsYLabel.value);
      plot.plotType(this.plotType.value);
      plot.nxTicks(this.numberOfXTicks.value);
      plot.nyTicks(this.numberOfYTicks.value);
      plot.grid(this.grid.value);
      plot.subgrid(this.subGrid.value);
      plot.legend(this.legend.value);
      plot.legendLeft(this.legendLeft.value);
      plot.legendTop(this.legendTop.value);
      plot.legendFontSz(this.legendFontSz.value);
      plot.logx(this.xLogScale.value);
      plot.logy(this.yLogScale.value);
      plot.requestRedraw();
      this.electronService.minsky.canvas.requestRedraw();
    }

    this.closeWindow();
  }

  closeWindow() {this.electronService.closeWindow();}

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@angular-eslint/no-empty-lifecycle-method
  ngOnDestroy() {}
}
