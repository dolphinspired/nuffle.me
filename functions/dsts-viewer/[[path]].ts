// Reverse-proxy /dsts-viewer/* to the standalone `dsts-viewer` Cloudflare Pages
// project, so https://nuffle.me/dsts-viewer/ serves that project while this
// project keeps owning the nuffle.me apex.
//
// Why a proxy: a Pages custom domain binds to a single project per hostname, so
// a sub-path can't be routed to a different project natively. The viewer is
// built with base '/dsts-viewer/' and deployed with that prefix at its
// pages.dev root, so the incoming pathname maps 1:1 onto the upstream — the
// path is preserved end to end, no rewriting.
//
// The [[path]] catch-all matches /dsts-viewer and everything beneath it
// (including zero trailing segments, i.e. the bare /dsts-viewer/ index).

const UPSTREAM = 'https://dsts-viewer.pages.dev';

export const onRequest = ({ request }: { request: Request }): Promise<Response> => {
  const url = new URL(request.url);
  const target = UPSTREAM + url.pathname + url.search;
  // Carry method, headers, and body through unchanged; let the upstream Pages
  // deployment set its own content types and cache headers.
  return fetch(new Request(target, request));
};
