import { extractCookieFromHeaders } from '@documenso/auth/server/lib/utils/cookies';
import { getOptionalSession } from '@documenso/auth/server/lib/utils/get-session';
import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { PREFERRED_TEAM_URL_COOKIE } from '@documenso/lib/constants/cookies';
import { getTeams } from '@documenso/lib/server-only/team/get-teams';
import { formatDocumentsPath } from '@documenso/lib/utils/teams';
import { ZTeamUrlSchema } from '@documenso/trpc/server/team-router/schema';
import { msg } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Link, redirect } from 'react-router';

import { appMetaTags } from '~/utils/meta';

import type { Route } from './+types/_index';

const APP_NAME = 'DHDTech.io Sign';

const DOCUMENSO_UPSTREAM = 'https://github.com/documenso/documenso';

const LANDING_DESCRIPTION =
  'DHDTech.io Sign is a free, self-hosted instance of Documenso for open-source document signing — create, send and sign agreements electronically, no per-seat fee.';

export function meta() {
  return [
    ...appMetaTags(msg`Free document signing`, { description: LANDING_DESCRIPTION }),
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: APP_NAME,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `${NEXT_PUBLIC_WEBAPP_URL()}/`,
        description: LANDING_DESCRIPTION,
        license: 'https://www.gnu.org/licenses/agpl-3.0.html',
        isBasedOn: DOCUMENSO_UPSTREAM,
        author: {
          '@type': 'Organization',
          name: 'Documenso, Inc.',
          url: DOCUMENSO_UPSTREAM,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    },
  ];
}

export const links: Route.LinksFunction = () => [{ rel: 'canonical', href: `${NEXT_PUBLIC_WEBAPP_URL()}/` }];

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getOptionalSession(request);

  if (session.isAuthenticated) {
    const teamUrlCookie = extractCookieFromHeaders(PREFERRED_TEAM_URL_COOKIE, request.headers);

    // const referrer = request.headers.get('referer');
    // let isReferrerFromTeamUrl = false;

    // if (referrer) {
    //   const referrerUrl = new URL(referrer);

    //   if (referrerUrl.pathname.startsWith('/t/')) {
    //     isReferrerFromTeamUrl = true;
    //   }
    // }

    const preferredTeamUrl =
      teamUrlCookie && ZTeamUrlSchema.safeParse(teamUrlCookie).success ? teamUrlCookie : undefined;

    // // Early return for no preferred team.
    // if (!preferredTeamUrl || isReferrerFromTeamUrl) {
    //   throw redirect('/inbox');
    // }

    const teams = await getTeams({ userId: session.user.id });

    let currentTeam = teams.find((team) => team.url === preferredTeamUrl);

    if (!currentTeam && teams.length === 1) {
      currentTeam = teams[0];
    }

    if (!currentTeam) {
      throw redirect('/inbox');
    }

    throw redirect(formatDocumentsPath(currentTeam.url));
  }

  // Unauthenticated visitors get the public landing page rather than being
  // bounced straight to the sign-in wall.
  return null;
}

export default function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 md:px-10 md:py-20">
        <div className="flex flex-wrap border border-border font-mono text-[10px] text-muted-foreground uppercase tracking-[0.15em]">
          <span className="border-border border-r px-3 py-2">DHDTech.io</span>
          <span className="border-border border-r px-3 py-2">Sign</span>
          <span className="border-border border-r px-3 py-2">AGPL-3.0</span>
          <span className="px-3 py-2 text-documenso-400">Free · Self-hosted</span>
        </div>

        <h1 className="mt-10 font-bold font-sans text-4xl uppercase leading-[0.86] tracking-[-0.045em] md:text-6xl">
          <Trans>Document signing, self-hosted and free.</Trans>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          <Trans>
            DHDTech.io Sign is a self-hosted instance of Documenso — the open-source document signing platform. Create,
            send and sign agreements electronically, with no per-seat fee and no trial period.
          </Trans>
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/signup"
            className="border border-primary bg-primary px-6 py-3 font-mono text-primary-foreground text-xs uppercase tracking-[0.15em] transition-opacity hover:opacity-90"
          >
            <Trans>Create account</Trans>
          </Link>

          <Link
            to="/signin"
            className="border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:border-documenso-500 hover:text-documenso-400"
          >
            <Trans>Sign in</Trans>
          </Link>
        </div>

        <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
          <section className="bg-background p-6">
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              {'/// 01 — WHAT IT IS'}
            </p>
            <h2 className="mt-3 font-bold font-sans text-base uppercase tracking-[-0.02em]">
              <Trans>Electronic signatures</Trans>
            </h2>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              <Trans>
                Upload a PDF, place the fields, and send it for signature. Recipients sign in the browser — no account,
                no printing, no scanner.
              </Trans>
            </p>
          </section>

          <section className="bg-background p-6">
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              {'/// 02 — WHO IT IS FOR'}
            </p>
            <h2 className="mt-3 font-bold font-sans text-base uppercase tracking-[-0.02em]">
              <Trans>Small teams and freelancers</Trans>
            </h2>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              <Trans>
                Anyone who needs a legally binding signature without a per-seat contract — contracts, proposals, NDAs
                and onboarding paperwork.
              </Trans>
            </p>
          </section>

          <section className="bg-background p-6">
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              {'/// 03 — THE DEAL'}
            </p>
            <h2 className="mt-3 font-bold font-sans text-base uppercase tracking-[-0.02em]">
              <Trans>Free and self-hosted</Trans>
            </h2>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              <Trans>
                DHDTech.io runs and hosts this instance, free to use. The software is open source under AGPL-3.0.
              </Trans>
            </p>
          </section>
        </div>

        <footer className="mt-16 border-border border-t pt-6 text-muted-foreground text-xs leading-relaxed">
          <p>
            <Trans>
              Built on{' '}
              <a
                href={DOCUMENSO_UPSTREAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-documenso-400 underline underline-offset-2"
              >
                Documenso
              </a>
              , the open-source DocuSign alternative. All credit to the original community. Licensed under AGPL-3.0.
            </Trans>
          </p>
        </footer>
      </div>
    </main>
  );
}
