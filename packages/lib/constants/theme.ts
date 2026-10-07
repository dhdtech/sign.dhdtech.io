import type { TCssVarsSchema } from '../types/css-vars';

/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * KEEP THIS FILE IN SYNC WITH `packages/ui/styles/theme.css`.
 *
 * These are the light-mode default values for the CSS custom properties
 * defined under `:root` in the theme stylesheet, exposed here as hex strings
 * so they can be used as defaults for colour-picker UI components and other
 * places that don't render through CSS variables.
 *
 * If you change a value in `theme.css`, update it here too. There is NO
 * automated check linking the two files; they have drifted historically
 * and will drift again unless you update both.
 *
 * Computed via `colord({ h, s, l }).toHex()` — see the inline HSL comments
 * for the source-of-truth values from `theme.css`.
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
export const DEFAULT_BRAND_COLORS = {
  background: '#0a0a0a', //              0 0% 3.9%    (void)
  foreground: '#e0e0e0', //              0 0% 87.8%   (ink)
  muted: '#161616', //                   0 0% 8.6%    (surface-2)
  mutedForeground: '#828a97', //         217.1 9.2% 55.1% (faint)
  popover: '#101010', //                 0 0% 6.3%    (surface)
  popoverForeground: '#e0e0e0', //       0 0% 87.8%   (ink)
  card: '#101010', //                    0 0% 6.3%    (surface)
  cardBorder: '#282828', //              0 0% 15.7%   (line-strong)
  cardForeground: '#e0e0e0', //          0 0% 87.8%   (ink)
  fieldCard: '#161616', //               0 0% 8.6%    (surface-2)
  fieldCardBorder: '#282828', //         0 0% 15.7%   (line-strong)
  fieldCardForeground: '#e0e0e0', //     0 0% 87.8%   (ink)
  widget: '#101010', //                  0 0% 6.3%    (surface)
  widgetForeground: '#161616', //        0 0% 8.6%    (surface-2)
  border: '#191919', //                  0 0% 9.8%    (line)
  input: '#282828', //                   0 0% 15.7%   (line-strong)
  primary: '#818cf8', //                 234.5 89.5% 73.9% (accent-light)
  primaryForeground: '#0a0a0a', //       0 0% 3.9%    (void)
  secondary: '#161616', //               0 0% 8.6%    (surface-2)
  secondaryForeground: '#e0e0e0', //     0 0% 87.8%   (ink)
  accent: '#161616', //                  0 0% 8.6%    (surface-2)
  accentForeground: '#e0e0e0', //        0 0% 87.8%   (ink)
  destructive: '#ef4444', //             0 84.2% 60.2% (danger)
  destructiveForeground: '#0a0a0a', //   0 0% 3.9%    (void)
  ring: '#6366f1', //                    238.7 83.5% 66.7% (accent)
  warning: '#f59e0b', //                 37.7 92.1% 50.2% (warning)
  envelopeEditorBackground: '#101010', //0 0% 6.3%    (surface)
  // `cardBorderTint` is intentionally excluded from the colour-picker UI:
  // unlike the rest of these tokens it is consumed via `rgb(var(--token))`
  // (not `hsl(...)`) and stored as raw RGB triplets in `theme.css`. It does
  // not flow through `toNativeCssVars` and is not user-customisable from the
  // branding form. `radius` is a length, not a colour, so it lives in
  // `DEFAULT_BRAND_RADIUS` below.
} as const satisfies Record<keyof Omit<TCssVarsSchema, 'radius' | 'cardBorderTint'>, string>;

export const DEFAULT_BRAND_RADIUS = '0rem';
