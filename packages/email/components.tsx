import type { ComponentProps } from 'react';
import { Body as ReactEmailBody, Link as ReactEmailLink } from 'react-email';

export {
  Button,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  render,
  Section,
  Tailwind,
  Text,
} from 'react-email';

/** Tailwind `text-*` utilities that set something other than the text colour. */
const NON_COLOR_TEXT_UTILITY =
  /^text-(?:center|left|right|justify|start|end|wrap|nowrap|balance|pretty|ellipsis|clip|xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/;

/** Tailwind `bg-*` utilities that do not set the background colour or image. */
const NON_PAINT_BACKGROUND_UTILITY = /^bg-(?:clip|origin)-/;

const setsBackground = (className?: string) =>
  (className ?? '')
    .split(/\s+/)
    .some((utility) => utility.startsWith('bg-') && !NON_PAINT_BACKGROUND_UTILITY.test(utility));

const setsTextColor = (className?: string) =>
  (className ?? '').split(/\s+/).some((utility) => utility.startsWith('text-') && !NON_COLOR_TEXT_UTILITY.test(utility));

/**
 * React Email's `Link` falls back to a hardcoded `#067df7`
 * (`react-email/dist/components/link/link.mjs`) whenever the caller passes no
 * text-colour utility. That blue is not a design-system token, and it reached
 * every anchor in these templates that carries no colour class — the branding
 * URL and branding logo links in particular.
 *
 * Defaulting the colour here, in the one module every email component imports
 * from, means an anchor can no longer fall through to a non-token colour, and
 * no call site has to remember. A caller that does set a `text-*` colour keeps
 * it, so this cannot override an intentional choice.
 */
export const Link = ({ className, ...props }: ComponentProps<typeof ReactEmailLink>) => (
  <ReactEmailLink
    className={setsTextColor(className) ? className : `${className ?? ''} text-primary`.trim()}
    {...props}
  />
);

/**
 * The mail client paints whatever is outside the 600px column itself, and its
 * default is white. Fifteen of the thirty templates render `<Body>` with no
 * background at all, so on those the design system's void content sat on a
 * white page — invisible when `--background` was white, glaring once it became
 * the void.
 *
 * Rather than edit fifteen templates, default the background here, in the one
 * module every email component imports from. A template that sets its own
 * background keeps it.
 */
export const Body = ({ className, ...props }: ComponentProps<typeof ReactEmailBody>) => (
  <ReactEmailBody
    className={setsBackground(className) ? className : `${className ?? ''} bg-background`.trim()}
    {...props}
  />
);
