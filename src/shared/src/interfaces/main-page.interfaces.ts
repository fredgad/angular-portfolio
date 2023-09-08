export interface GearPositionsI {
  top: string;
  left: string;
}

export interface GearImagesI {
  name: string;
  path: string;
}

export interface BarMenuI {
  name: string;
  nameRu: string;
  link: string;
  linkRu?: string;
  isRoute?: boolean;
  target?: string;
  download?: string;
  state: boolean;
}

export interface TabsPositionsI {
  [key: number]: string[];
}
