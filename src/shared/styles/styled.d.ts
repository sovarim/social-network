import 'styled-components';

export type MediaCreator = (breakpoint: keyof IBreakpoints) => string;

export interface IBreakpoints {
  desktop: number;
  laptop: number;
  tablet: number;
  mobile: number;
}

export interface ITypography {
  h1: string;
  h2: string;
  h3: string;
  text: string;
  text2: string;
  caption: string;
}

export interface IShape {
  borderRadius: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      lightText: string;
      error: string;
    };
    breakpoints: IBreakpoints & {
      max: MediaCreator;
      min: MediaCreator;
    };
    typography: ITypography;
    shadows: string[];
    shape: IShape;
  }
}
