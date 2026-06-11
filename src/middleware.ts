import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is signed in and the current path is /login, redirect to /
  if (session && req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If user is NOT signed in and the current path is NOT /login or /register, redirect to /login
  if (!session && 
      !req.nextUrl.pathname.startsWith('/login') && 
      !req.nextUrl.pathname.startsWith('/register') &&
      !req.nextUrl.pathname.startsWith('/auth')
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
