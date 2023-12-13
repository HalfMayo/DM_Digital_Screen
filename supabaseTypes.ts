import AttackBase from "./src/interfaces/AttackBase"
import AttackSpecial from "./src/interfaces/AttackSpecial"
import Condition from "./src/interfaces/Condition"
import Feat from "./src/interfaces/Feat"
import SaveThrows from "./src/interfaces/SaveThrows"
import Spell from "./src/interfaces/Spell"
import Stats from "./src/interfaces/Stats"

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
  | Stats
  | SaveThrows
  | Feat
  | AttackBase
  | AttackSpecial
  | Condition
  | Spell

export interface Database {
  public: {
    Tables: {
      conditions: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      monsters: {
        Row: {
          ac: number
          attacks_specials_explanation: string[] | null
          attacks_melee: Json | null
          attacks_ranged: Json | null
          attacks_special: Json | null
          conditions: string[] | null
          created_at: string
          feats: Json | null
          hp: number
          id: number
          immunities: string | null
          items: string | null
          languages: string | null
          lore_spec: string | null
          more_ac: string | null
          more_perception: string | null
          more_speed: string | null
          more_ts: string | null
          name: string
          perception: number
          resistances: string | null
          save_throws: Json | null
          skills: Json | null
          speed: number
          spells: Json | null
          stats: Json | null
          unique: boolean
          weaknesses: string | null
        }
        Insert: {
          ac: number
          attacks_specials_explanation?: string[] | null
          attacks_melee?: Json | null
          attacks_ranged?: Json | null
          attacks_special: Json | null
          conditions?: string[] | null
          created_at?: string
          feats?: Json | null
          hp: number
          id?: number
          immunities?: string | null
          items?: string | null
          languages?: string | null
          lore_spec?: string | null
          more_ac?: string | null
          more_perception?: string | null
          more_speed?: string | null
          more_ts?: string | null
          name: string
          perception: number
          resistances?: string | null
          save_throws?: Json | null
          skills?: Json | null
          speed: number
          spells?: Json | null
          stats?: Json | null
          unique: boolean
          weaknesses?: string | null
        }
        Update: {
          ac?: number
          attacks_specials_explanation?: string[] | null
          attacks_melee?: Json | null
          attacks_ranged?: Json | null
          attacks_special: Json | null
          conditions?: string[] | null
          created_at?: string
          feats?: Json | null
          hp?: number
          id?: number
          immunities?: string | null
          items?: string | null
          languages?: string | null
          lore_spec?: string | null
          more_ac?: string | null
          more_perception?: string | null
          more_speed?: string | null
          more_ts?: string | null
          name?: string
          perception?: number
          resistances?: string | null
          save_throws: Json | null
          skills?: Json | null
          speed?: number
          spells?: Json | null
          stats?: Json | null
          unique?: boolean
          weaknesses?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          created_at: string
          crit_failure: string | null
          crit_success: string | null
          description: string | null
          failure: string | null
          id: number
          name: string | null
          num_actions: number | null
          requirements: string | null
          samples: string | null
          skill: string | null
          success: string | null
          trained: boolean | null
        }
        Insert: {
          created_at?: string
          crit_failure?: string | null
          crit_success?: string | null
          description?: string | null
          failure?: string | null
          id?: number
          name?: string | null
          num_actions?: number | null
          requirements?: string | null
          samples?: string | null
          skill?: string | null
          success?: string | null
          trained?: boolean | null
        }
        Update: {
          created_at?: string
          crit_failure?: string | null
          crit_success?: string | null
          description?: string | null
          failure?: string | null
          id?: number
          name?: string | null
          num_actions?: number | null
          requirements?: string | null
          samples?: string | null
          skill?: string | null
          success?: string | null
          trained?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

  export type MonsterProps = Database["public"]["Tables"]["monsters"]["Row"];
