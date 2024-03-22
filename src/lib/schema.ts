export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          id: number;
          insertedat: string;
          isComplete: boolean | null;
          description: string | null;
          title: string | null;
          user_id: string;
        };
        Insert: Partial<
          Omit<
            Database["public"]["Tables"]["todos"]["Row"],
            "id" | "insertedat"
          >
        > & { user_id: string };
        Update: Partial<Database["public"]["Tables"]["todos"]["Row"]> & {
          id?: number;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
