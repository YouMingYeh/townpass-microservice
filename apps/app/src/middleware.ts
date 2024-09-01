import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '../lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
