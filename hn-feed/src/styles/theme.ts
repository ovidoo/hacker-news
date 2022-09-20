// theme.ts

// 1. import `extendTheme` function
import {extendTheme, type ThemeConfig} from '@chakra-ui/react'
import type { ComponentStyleConfig } from '@chakra-ui/theme'


// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const customColors = {
    brand: {
        1: 'rgba(254, 113, 57, 1)',
        900: 'rgba(254, 113, 57, 0.9)',
        800: 'rgba(254, 113, 57, 0.8)',
        700: 'rgba(254, 113, 57, 0.7)',
        600: 'rgba(254, 113, 57, 0.6)',
        500: 'rgba(254, 113, 57, 1)',
        400: 'rgba(254, 113, 57, 0.4)',
        300: 'rgba(254, 113, 57, 0.3)',
        200: 'rgba(254, 113, 57, 0.2)',
        100: 'rgba(254, 113, 57, 0.1)',
        50: 'rgba(254, 113, 57, 0.05)',
    },
}

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
const Button: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    borderRadius: '0', // <-- border radius is same for all variants and sizes
  },
  // Two variants: outline and solid
  variants: {
    solid: {
      bg: 'brand.900',
      color: 'white',
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
}

// 3. extend the theme
export const theme = extendTheme({config, colors: customColors,  components: {
    Button,
  },})
