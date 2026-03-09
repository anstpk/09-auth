import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Змінюємо назву функції з middleware на proxy
export function proxy(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  const isPrivateRoute = pathname.startsWith('/notes') || pathname.startsWith('/profile');
  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};