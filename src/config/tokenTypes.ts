/* istanbul ignore file */
export const tokenTypes: Record<string, {
  label: string;
  key: string;
  exclude?: string[];
}> = {
  color: {
    label: 'Colors',
    key: 'color'
  },
  gradient: {
    label: 'Gradients',
    key: 'gradient'
  },
  font: {
    label: 'Font Styles',
    key: 'font'
  },
  typography: {
    label: 'Typography',
    key: 'typography',
    exclude: ['original']
  },
  effect: {
    label: 'Effects',
    key: 'effect'
  },
  grid: {
    label: 'Grids',
    key: 'grid'
  },
  border: {
    label: 'Borders',
    key: 'border'
  },
  breakpoint: {
    label: 'Breakpoints',
    key: 'breakpoint'
  },
  radius: {
    label: 'Radii',
    key: 'radius'
  },
  size: {
    label: 'Sizes',
    key: 'size'
  },
  spacing: {
    label: 'Spacing',
    key: 'spacing'
  },
  motion: {
    label: 'Motion',
    key: 'motion'
  },
  opacity: {
    label: 'Opacity',
    key: 'opacity'
  },
  variables: {
    label: 'Figma Variables',
    key: 'variables',
    exclude: ['original']
  }
}
