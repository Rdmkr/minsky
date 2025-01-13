import { MainRenderingTabs } from '../constants/MainRenderingTabs';
export interface InitializePopupWindowPayload {
  customTitle? : string,
  itemInfo: CanvasItem;
  url: string;
  height?: number;
  width?: number;
  minHeight?: number;
  minWidth?: number;
  modal?: boolean;
}

export interface CurrentWindowDetails {
  id: number;
  dontCloseOnEscape: boolean;
  dontCloseOnReturn: boolean;
}

export interface MinskyProcessPayload {
  mouseX?: number;
  mouseY?: number;
  filePath?: string;
  command?: string;
  windowId?: number;
  showServiceStartedDialog?: boolean;
  key?: string;
  shift?: boolean;
  capsLock?: boolean;
  ctrl?: boolean;
  meta?: boolean;
  alt?: boolean;
  args?: Record<string, unknown>;
  location?: number;
}

export interface ImportStockPayload {
  command: string;
  columnIndex: number;
}

export interface HandleDescriptionPayload {
  command: string;
  handleIndex: number;
  description: string;
}

export interface HandleDimensionPayload {
  command: string;
  handleIndex: number;
  type: string;
  units: string;
}

export interface ElectronCanvasOffset {
  left: number;
  top: number;
}

export interface AppLayoutPayload {
 drawableArea: {
    width: number;
    height: number;
  };
  offset: ElectronCanvasOffset;
}

export interface ChangeTabPayload {
  newTab: MainRenderingTabs;
}

export interface HeaderEvent {
  action: string;
  target: string;
  value?: unknown;
}

export interface DownloadCSVPayload {
  windowUid: string;
  url: string;
}

export enum ClassType {
  Variable = 'Variable',
  VarConstant = 'VarConstant',
  Operation = 'Operation',
  IntOp = 'IntOp',
  DataOp = 'DataOp',
  PlotWidget = 'PlotWidget',
  GodleyIcon = 'GodleyIcon',
  Group = 'Group',
  Item = 'Item',
  SwitchIcon = 'SwitchIcon',
  Ravel = 'Ravel',
  Lock = 'Lock',
  Sheet = 'Sheet',
    UserFunction = 'UserFunction',
    VariablePane = 'VariablePane',
}

export enum RecordingStatus {
  RecordingCanceled = 'RecordingCanceled',
  RecordingStarted = 'RecordingStarted',
  RecordingStopped = 'RecordingStopped',
}

export enum GodleyTableOutputStyles {
  DRCR = 'DRCR',
  SIGN = 'sign',
}

export enum ReplayRecordingStatus {
  ReplayStarted = 'ReplayStarted',
  ReplayStopped = 'ReplayStopped',
  ReplayPaused = 'ReplayPaused',
}

export interface CanvasItem {
    classType: ClassType;
    displayContents: boolean;
    id: string;
}

export interface CreateWindowPayload {
  uid?: string;
  width?: number;
  useContentSize?: boolean;
  height?: number;
  title: string;
  modal?: boolean;
  backgroundColor?: string;
  url?: string;
  minWidth?: number;
  minHeight?: number;
  alwaysOnTop?: boolean;
  raiseIfPresent?: boolean; ///< if true, then raise an existing window instead of creating a duplicate
}


export interface TypeValueName {
  type : string,
  value? : string | number,
  name? : string
}
