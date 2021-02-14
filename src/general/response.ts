export interface CodyResponse {
  cody: string | string[];
  details?: string | string[];
  type?: CodyResponseType;
  reply?: ReplyCallback;
}

export enum CodyResponseType {
  Info = 'Info',
  Error = 'Error',
  Warning = 'Warning',
  Question = 'Question',
}

export type EmitResponse = (res: CodyResponse) => void;

export type ReplyCallback<T = any> = (reply: T) => Promise<CodyResponse>;

export const isCodyError =(err: any): err is CodyResponse => {
  if(err && typeof err === 'object') {
    return err.hasOwnProperty('cody') && err.hasOwnProperty('type') && err.type === CodyResponseType.Error;
  }

  return false;
}

export const isCodyWarning =(warning: any): warning is CodyResponse => {
  if(warning && typeof warning === 'object') {
    return warning.hasOwnProperty('cody') && warning.hasOwnProperty('type') && warning.type === CodyResponseType.Warning;
  }

  return false;
}
