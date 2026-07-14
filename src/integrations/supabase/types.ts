export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      engagements: {
        Row: {
          age_range: string | null
          benevolat: boolean | null
          city: string | null
          civisme_biens: boolean | null
          civisme_haine: boolean | null
          civisme_lois: boolean | null
          created_at: string
          email: string | null
          first_name: string
          fruits: string[] | null
          gender: string | null
          id: string
          last_name: string
          membre_association: boolean | null
          paix_actions: string[] | null
          paix_indispensable: boolean | null
          phone: string | null
          quartier: string | null
          quartier_participation: boolean | null
          region: string
          signed: boolean
          testimony: string | null
          valeurs: string[] | null
        }
        Insert: {
          age_range?: string | null
          benevolat?: boolean | null
          city?: string | null
          civisme_biens?: boolean | null
          civisme_haine?: boolean | null
          civisme_lois?: boolean | null
          created_at?: string
          email?: string | null
          first_name: string
          fruits?: string[] | null
          gender?: string | null
          id?: string
          last_name: string
          membre_association?: boolean | null
          paix_actions?: string[] | null
          paix_indispensable?: boolean | null
          phone?: string | null
          quartier?: string | null
          quartier_participation?: boolean | null
          region: string
          signed?: boolean
          testimony?: string | null
          valeurs?: string[] | null
        }
        Update: {
          age_range?: string | null
          benevolat?: boolean | null
          city?: string | null
          civisme_biens?: boolean | null
          civisme_haine?: boolean | null
          civisme_lois?: boolean | null
          created_at?: string
          email?: string | null
          first_name?: string
          fruits?: string[] | null
          gender?: string | null
          id?: string
          last_name?: string
          membre_association?: boolean | null
          paix_actions?: string[] | null
          paix_indispensable?: boolean | null
          phone?: string | null
          quartier?: string | null
          quartier_participation?: boolean | null
          region?: string
          signed?: boolean
          testimony?: string | null
          valeurs?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      engagements_public: {
        Row: {
          age_range: string | null
          benevolat: boolean | null
          city: string | null
          civisme_biens: boolean | null
          civisme_haine: boolean | null
          civisme_lois: boolean | null
          created_at: string | null
          first_name: string | null
          fruits: string[] | null
          gender: string | null
          id: string | null
          membre_association: boolean | null
          paix_actions: string[] | null
          paix_indispensable: boolean | null
          quartier: string | null
          quartier_participation: boolean | null
          region: string | null
          signed: boolean | null
          testimony: string | null
          valeurs: string[] | null
        }
        Insert: {
          age_range?: string | null
          benevolat?: boolean | null
          city?: string | null
          civisme_biens?: boolean | null
          civisme_haine?: boolean | null
          civisme_lois?: boolean | null
          created_at?: string | null
          first_name?: string | null
          fruits?: string[] | null
          gender?: string | null
          id?: string | null
          membre_association?: boolean | null
          paix_actions?: string[] | null
          paix_indispensable?: boolean | null
          quartier?: string | null
          quartier_participation?: boolean | null
          region?: string | null
          signed?: boolean | null
          testimony?: string | null
          valeurs?: string[] | null
        }
        Update: {
          age_range?: string | null
          benevolat?: boolean | null
          city?: string | null
          civisme_biens?: boolean | null
          civisme_haine?: boolean | null
          civisme_lois?: boolean | null
          created_at?: string | null
          first_name?: string | null
          fruits?: string[] | null
          gender?: string | null
          id?: string | null
          membre_association?: boolean | null
          paix_actions?: string[] | null
          paix_indispensable?: boolean | null
          quartier?: string | null
          quartier_participation?: boolean | null
          region?: string | null
          signed?: boolean | null
          testimony?: string | null
          valeurs?: string[] | null
        }
        Relationships: []
      }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
