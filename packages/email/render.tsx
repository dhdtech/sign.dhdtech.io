import { DEFAULT_BRAND_COLORS } from '@documenso/lib/constants/theme';
import type { EmailBrandingColors } from '@documenso/lib/utils/email-branding-colors';
import { resolveEmailBrandingColors } from '@documenso/lib/utils/email-branding-colors';
import type { I18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import * as ReactEmail from '@react-email/render';

import { Tailwind } from './components';
import { BrandingProvider, type BrandingSettings } from './providers/branding';

export type RenderOptions = ReactEmail.Options & {
  branding?: BrandingSettings;
  i18n?: I18n;
};

/**
 * The default email token set: the shadcn theme tokens, sourced as hex from
 * `DEFAULT_BRAND_COLORS` (which mirrors `theme.css`). Emails can't use CSS
 * variables, so these are concrete hex values baked into the Tailwind config.
 *
 * Resolved through the same `resolveEmailBrandingColors` pipeline as tenant
 * colours so the default values live in exactly one place (`DEFAULT_BRAND_COLORS`)
 * and the default + tenant paths can't drift. Used when a tenant has no
 * (entitled) brand colours.
 */
const DEFAULT_EMAIL_BRANDING_COLORS: EmailBrandingColors =
  resolveEmailBrandingColors(DEFAULT_BRAND_COLORS) ?? DEFAULT_BRAND_COLORS;

/**
 * Map the resolved colour set to flat semantic Tailwind tokens. Templates use
 * these directly (`bg-primary`, `text-muted-foreground`, `border-border`, …),
 * mirroring the app's shadcn tokens, instead of bespoke `slate-*`/`documenso-*`
 * scale classes.
 *
 * Always defined: falls back to `DEFAULT_EMAIL_BRANDING_COLORS` when no tenant
 * colours are supplied, so the tokens resolve whether or not custom branding is
 * in play.
 */
const buildEmailColors = (brandingColors?: EmailBrandingColors): Record<string, string> => {
  const c = brandingColors ?? DEFAULT_EMAIL_BRANDING_COLORS;

  return {
    background: c.background,
    foreground: c.foreground,
    muted: c.muted,
    'muted-foreground': c.mutedForeground,
    primary: c.primary,
    'primary-foreground': c.primaryForeground,
    secondary: c.secondary,
    'secondary-foreground': c.secondaryForeground,
    accent: c.accent,
    'accent-foreground': c.accentForeground,
    destructive: c.destructive,
    'destructive-foreground': c.destructiveForeground,
    warning: c.warning,
    border: c.border,
  };
};

/**
 * The Tailwind theme handed to React Email for every render.
 *
 * Emails carry no CSS custom properties, so the palette arrives as the concrete
 * hex values above. The typography and radius below mirror the app's design
 * tokens (`Space Grotesk` / `Martian Mono`, radius 0), but the webfonts are
 * named in the stack only — no `@font-face` is injected, because the major
 * clients strip webfonts and a self-hosted woff2 would never load. Clients that
 * cannot resolve the named family fall through to the system sans stack.
 */
const buildEmailTailwindConfig = (tailwindColors: Record<string, string>) => ({
  theme: {
    extend: {
      colors: tailwindColors,
      fontFamily: {
        sans: [
          'Space Grotesk',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: ['Martian Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
      },
    },
  },
});

export const render = async (element: React.ReactNode, options?: RenderOptions) => {
  const { branding, ...otherOptions } = options ?? {};

  const tailwindColors = buildEmailColors(branding?.brandingColors);

  return ReactEmail.render(
    <BrandingProvider branding={branding}>
      <Tailwind config={buildEmailTailwindConfig(tailwindColors)}>{element}</Tailwind>
    </BrandingProvider>,
    otherOptions,
  );
};

export const renderWithI18N = async (element: React.ReactNode, options?: RenderOptions) => {
  const { branding, i18n, ...otherOptions } = options ?? {};

  if (!i18n) {
    throw new Error('i18n is required');
  }

  const tailwindColors = buildEmailColors(branding?.brandingColors);

  return ReactEmail.render(
    <I18nProvider i18n={i18n}>
      <BrandingProvider branding={branding}>
        <Tailwind config={buildEmailTailwindConfig(tailwindColors)}>{element}</Tailwind>
      </BrandingProvider>
    </I18nProvider>,
    otherOptions,
  );
};
