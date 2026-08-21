import { NextRequest, NextResponse } from 'next/server';

// beahappycamperdistro.com shares this Vercel deployment with carloruiz.com.
// Root "/" on that domain gets a temporary placeholder until its homepage is built,
// instead of the carloruiz.com portfolio page.
const HC_HOSTS = ['beahappycamperdistro.com', 'www.beahappycamperdistro.com'];

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  if (HC_HOSTS.includes(host) && req.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/hc-root.html', req.url));
  }
}

export const config = {
  matcher: '/',
};
