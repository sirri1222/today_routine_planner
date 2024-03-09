import { createMiddlewareClient } from "@supabase/auth-helper-nextjs";
import { NextRequest } from "next/server";
import { config } from "process";

export async function middleware(req: NextRequest) {
  const res = NextRequest.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return NextRequest.rewrite(new URL("/login", req.url));
  }
  return res;
}

export const config = {
  matcher: ["/(("],
};
