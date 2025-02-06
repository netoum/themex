export type ThemexKey = string;
export type ThemexValue = string;

export interface ThemexOptions {
  key: ThemexKey;
  default: ThemexValue;
  values: ThemexValue[];
}