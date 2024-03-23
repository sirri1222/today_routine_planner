"use client";

import React from "react";
import {
  SessionContextProvider,
  useSession,
} from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabase";
type Props = {
  children: React.ReactNode;
};

const SessionProvider = ({ children }: Props) => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
};

export default SessionProvider;
