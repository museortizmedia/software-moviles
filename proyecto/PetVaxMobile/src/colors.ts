// colors.ts
export interface PetVaxColorsType {
  surface: string;
  surfaceDim: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  onSurface: string;
  onSurfaceVariant: string;
  outline: string;
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  error: string;
  onError: string;
  errorContainer: string;
  warningContainer: string;
  onWarningContainer: string;
}

export const PetVaxColors: PetVaxColorsType = {
  surface: '#f9f9ff',
  surfaceDim: '#d3daef',
  surfaceContainer: '#e9edff',
  surfaceContainerHigh: '#e1e8fd',
  onSurface: '#141b2b',
  onSurfaceVariant: '#3d4947',
  outline: '#6d7a77',
  
  // Brand Colors
  primary: '#00685f', 
  onPrimary: '#ffffff',
  primaryContainer: '#008378',
  onPrimaryContainer: '#f4fffc',
  
  secondary: '#55615f',
  secondaryContainer: '#d8e5e2',
  onSecondaryContainer: '#5b6765',
  
  tertiary: '#535d6b',
  
  // Status
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  warningContainer: '#fef3c7', 
  onWarningContainer: '#92400e',
};