import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { i18n, type MessageDescriptor } from '@lingui/core';

export type AppMetaTagsOptions = {
  /** Override the default page description. */
  description?: string;
  /** Emit `robots: noindex, follow` — for pages that must not rank, such as auth screens. */
  noindex?: boolean;
};

export const appMetaTags = (title?: MessageDescriptor, options: AppMetaTagsOptions = {}) => {
  const description =
    options.description ??
    'Send, sign and manage agreements with DHDTech.io Sign — a fast, precise signing flow and the infrastructure to build on.';

  return [
    {
      title: title ? `${i18n._(title)} - DHDTech.io Sign` : 'DHDTech.io Sign',
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content: 'DHDTech.io Sign, document signing, e-signature, agreements, smart templates, signing infrastructure',
    },
    {
      // Upstream copyright notice — kept intact. Documenso, Inc. is the author
      // of the AGPL-3.0 work this application is derived from.
      name: 'author',
      content: 'Documenso, Inc.',
    },
    {
      name: 'robots',
      content: options.noindex ? 'noindex, follow' : 'index, follow',
    },
    {
      property: 'og:title',
      content: 'DHDTech.io Sign - Signing infrastructure',
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
  ];
};
