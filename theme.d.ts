// theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  // Extend the PaletteColor interface to include your custom a10-a60 properties
  interface PaletteColor {
    a10?: string;
    a20?: string;
    a30?: string;
    a40?: string;
    a50?: string;
    a60?: string;
  }

  // Extend the options interface for creating palette colors
  interface SimplePaletteColorOptions {
    a10?: string;
    a20?: string;
    a30?: string;
    a40?: string;
    a50?: string;
    a60?: string;
  }

  // Add your custom color palettes (surface, tonal) to the main Palette interface
  interface Palette {
    surface: PaletteColor;
    tonal: PaletteColor;
  }

  // Fix: Use SimplePaletteColorOptions instead of PaletteColorOptions
  interface PaletteOptions {
    surface?: SimplePaletteColorOptions;
    tonal?: SimplePaletteColorOptions;
  }
}

// Optional: If you want to use these colors on components
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    surface: true;
    tonal: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    surface: true;
    tonal: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    surface: true;
    tonal: true;
  }
}