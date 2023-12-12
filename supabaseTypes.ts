export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      monsters: {
        Row: {
          ac: number;
          attacks_specials_explanation: string[] | null;
          "attacks-melee": string[] | null;
          "attacks-ranged": string[] | null;
          "attacks-special": string[] | null;
          char: number[];
          conditions: string[] | null;
          created_at: string;
          feats: string[] | null;
          hp: number;
          id: number;
          immunities: string | null;
          items: string | null;
          languages: string | null;
          lore_spec: string | null;
          more_ac: string | null;
          more_perception: string | null;
          name: string;
          perception: number;
          resistances: string | null;
          skills: number[];
          speed: number;
          ts: number[];
          more_ts: string | null;
          unique: boolean;
          weaknesses: string | null;
          more_speed: string | null;
          spells_types: string[] | null;
          base_spells: string[] | null;
          special_spells: string[] | null;
          rituals: string[] | null;
        };
        Insert: {
          ac: number;
          attacks_specials_explanation?: string[] | null;
          "attacks-melee"?: string[] | null;
          "attacks-ranged"?: string[] | null;
          "attacks-special"?: string[] | null;
          char: number[];
          conditions?: string[] | null;
          created_at?: string;
          feats?: string[] | null;
          hp: number;
          id?: number;
          immunities?: string | null;
          items?: string | null;
          languages?: string | null;
          lore_spec?: string | null;
          more_ac?: string | null;
          more_perception?: string | null;
          name: string;
          perception: number;
          resistances?: string | null;
          skills: number[];
          speed: number;
          ts: number[];
          unique: boolean;
          weaknesses?: string | null;
        };
        Update: {
          ac?: number;
          attacks_specials_explanation?: string[] | null;
          "attacks-melee"?: string[] | null;
          "attacks-ranged"?: string[] | null;
          "attacks-special"?: string[] | null;
          char?: number[];
          conditions?: string[] | null;
          created_at?: string;
          feats?: string[] | null;
          hp?: number;
          id?: number;
          immunities?: string | null;
          items?: string | null;
          languages?: string | null;
          lore_spec?: string | null;
          more_ac?: string | null;
          more_perception?: string | null;
          name?: string;
          perception?: number;
          resistances?: string | null;
          skills?: number[];
          speed?: number;
          ts?: number[];
          unique?: boolean;
          weaknesses?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type MonsterProps = Database["public"]["Tables"]["monsters"]["Row"];
