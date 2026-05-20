import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware function
 *
 * Runs BEFORE pages load.
 *
 * Used for:
 * - authentication
 * - redirects
 * - route protection
 */
export function middleware(
  request: NextRequest
) {

  /**
   * Example:
   * Check if user is authenticated
   *
   * Later we will replace this
   * with real Supabase session validation
   */
  const isAuthenticated = false;

  /**
   * If user tries to access dashboard
   * without login
   */
  if (
    request.nextUrl.pathname.startsWith(
      '/dashboard'
    ) &&
    !isAuthenticated
  ) {

    /**
     * Redirect to login page
     */
    return NextResponse.redirect(
      new URL('/login', request.url)
    );
  }

  /**
   * Allow request if authorized
   */
  return NextResponse.next();
}

/**
 * Configure which routes
 * middleware should run on
 */
export const config = {

  matcher: ['/dashboard/:path*'],
};