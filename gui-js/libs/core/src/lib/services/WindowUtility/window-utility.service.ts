import { Injectable } from '@angular/core';
import { delayBeforeClosingPopupWindow, ElectronCanvasOffset,} from '@minsky/shared';
import { ElectronService } from '../electron/electron.service';

@Injectable({
  providedIn: 'root',
})
export class WindowUtilityService {
  private minskyCanvasElement: HTMLCanvasElement = null;
  private minskyCanvasContainer: HTMLElement = null;
  private leftOffset = 0;
  private topOffset = 0;
  private drawableWidth = 0;
  private drawableHeight = 0;
  private scrollableAreaWidth = null;
  private scrollableAreaHeight = null;
  private mainWindowId = 1;
  SCROLLABLE_AREA_FACTOR = 100;

  constructor(private electronService: ElectronService) { }

  public async reInitialize() {
    this.minskyCanvasContainer = document.getElementById(
      'minsky-canvas-container'
    );

    let currentWindow=await this.electronService.getCurrentWindow();
    if (this.minskyCanvasContainer && currentWindow.id === this.mainWindowId) {
      const bodyElement = document.getElementsByTagName('body')[0];
      this.minskyCanvasElement = document.getElementById(
        'main-minsky-canvas'
      ) as HTMLCanvasElement;

      this.minskyCanvasContainer.style.height =
        bodyElement.clientHeight - this.minskyCanvasContainer.offsetTop + 'px';

      if (!this.scrollableAreaWidth || !this.scrollableAreaHeight) {
        // Scrollable area size should not change

        this.scrollableAreaWidth =
          bodyElement.clientWidth * this.SCROLLABLE_AREA_FACTOR;
        this.scrollableAreaHeight =
          bodyElement.clientHeight * this.SCROLLABLE_AREA_FACTOR;
      }
      this.minskyCanvasElement.style.width = this.scrollableAreaWidth + 'px';
      this.minskyCanvasElement.style.height = this.scrollableAreaHeight + 'px';

      // After setting the above, container gets scrollbars, so we need to compute drawableWidth & Height only now (clientWidth/clientHeight change after scrollbar addition)

      const clientRect = this.minskyCanvasContainer.getBoundingClientRect();
      const documentRect = document.documentElement.getBoundingClientRect();

      this.leftOffset = clientRect.left;
      this.topOffset = clientRect.top-documentRect.top;
      this.drawableWidth = clientRect.right-clientRect.left;
      this.drawableHeight = clientRect.bottom-clientRect.top;
    }
  }

  public scrollToCenter() {
    this.minskyCanvasElement.scrollTop = this.scrollableAreaHeight / 2;
    this.minskyCanvasElement.scrollLeft = this.scrollableAreaWidth / 2;
  }

  public getMinskyCanvasOffset(): ElectronCanvasOffset {
    return {
      left: this.leftOffset,
      top: this.topOffset,
    };
  }

  public getDrawableArea() {
    return {
      width: this.drawableWidth,
      height: this.drawableHeight,
    };
  }

  public getScrollableArea() {
    return {
      width: this.scrollableAreaWidth,
      height: this.scrollableAreaHeight,
    };
  }

  public getMinskyCanvasElement(): HTMLElement {
    return this.minskyCanvasElement;
  }

  public getMinskyContainerElement(): HTMLElement {
    return this.minskyCanvasContainer;
  }

  public async isMainWindow(): Promise<boolean> {
    let currentWindow=await this.electronService.getCurrentWindow();
    return currentWindow.id === 1;
  }

  public closeCurrentWindowIfNotMain() {
    if (this.electronService.isElectron) {
      setTimeout(async () => {
        const currentWindow = await this.electronService.getCurrentWindow();
        if (currentWindow?.id !== 1) {
          this.electronService.closeWindow();
        }
      }, delayBeforeClosingPopupWindow);
    }
  }
}
