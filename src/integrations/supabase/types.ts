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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blogs: {
        Row: {
          author_designation: string | null
          author_name: string | null
          banner_text: string | null
          category: string | null
          content: string | null
          content_format: string
          created_at: string
          description: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          is_banner: boolean
          is_featured: boolean
          is_labs_featured: boolean
          og_image_url: string | null
          published: boolean
          published_date: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          slug: string
          tags: string | null
          title: string
          updated_at: string
          writer_id: string | null
          youtube_url: string | null
        }
        Insert: {
          author_designation?: string | null
          author_name?: string | null
          banner_text?: string | null
          category?: string | null
          content?: string | null
          content_format?: string
          created_at?: string
          description?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_banner?: boolean
          is_featured?: boolean
          is_labs_featured?: boolean
          og_image_url?: string | null
          published?: boolean
          published_date?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug: string
          tags?: string | null
          title: string
          updated_at?: string
          writer_id?: string | null
          youtube_url?: string | null
        }
        Update: {
          author_designation?: string | null
          author_name?: string | null
          banner_text?: string | null
          category?: string | null
          content?: string | null
          content_format?: string
          created_at?: string
          description?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_banner?: boolean
          is_featured?: boolean
          is_labs_featured?: boolean
          og_image_url?: string | null
          published?: boolean
          published_date?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug?: string
          tags?: string | null
          title?: string
          updated_at?: string
          writer_id?: string | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blogs_writer_id_fkey"
            columns: ["writer_id"]
            isOneToOne: false
            referencedRelation: "writers"
            referencedColumns: ["id"]
          },
        ]
      }
      case_studies: {
        Row: {
          author_designation: string | null
          author_name: string | null
          banner_text: string | null
          category: string | null
          content: string | null
          content_format: string
          created_at: string
          description: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          is_banner: boolean
          is_featured: boolean
          is_labs_featured: boolean
          og_image_url: string | null
          published: boolean
          published_date: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          slug: string
          tags: string | null
          title: string
          updated_at: string
          writer_id: string | null
          youtube_url: string | null
        }
        Insert: {
          author_designation?: string | null
          author_name?: string | null
          banner_text?: string | null
          category?: string | null
          content?: string | null
          content_format?: string
          created_at?: string
          description?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_banner?: boolean
          is_featured?: boolean
          is_labs_featured?: boolean
          og_image_url?: string | null
          published?: boolean
          published_date?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug: string
          tags?: string | null
          title: string
          updated_at?: string
          writer_id?: string | null
          youtube_url?: string | null
        }
        Update: {
          author_designation?: string | null
          author_name?: string | null
          banner_text?: string | null
          category?: string | null
          content?: string | null
          content_format?: string
          created_at?: string
          description?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_banner?: boolean
          is_featured?: boolean
          is_labs_featured?: boolean
          og_image_url?: string | null
          published?: boolean
          published_date?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug?: string
          tags?: string | null
          title?: string
          updated_at?: string
          writer_id?: string | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_studies_writer_id_fkey"
            columns: ["writer_id"]
            isOneToOne: false
            referencedRelation: "writers"
            referencedColumns: ["id"]
          },
        ]
      }
      qa_guide_topic_clusters: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          slug: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          slug: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          slug?: string
          title?: string
        }
        Relationships: []
      }
      qa_guides: {
        Row: {
          author_name: string | null
          content: string | null
          content_format: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          intent: string | null
          internal_link_suggestions: Json
          meta_robots: string
          og_image_url: string | null
          previous_url_path: string | null
          published_date: string | null
          quality_checks: Json
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          slug: string
          source: Json
          status: string
          tags: string | null
          tier: string
          title: string
          topic_cluster: string
          updated_at: string
          url_path: string
        }
        Insert: {
          author_name?: string | null
          content?: string | null
          content_format?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          intent?: string | null
          internal_link_suggestions?: Json
          meta_robots?: string
          og_image_url?: string | null
          previous_url_path?: string | null
          published_date?: string | null
          quality_checks?: Json
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug: string
          source?: Json
          status?: string
          tags?: string | null
          tier?: string
          title: string
          topic_cluster: string
          updated_at?: string
          url_path: string
        }
        Update: {
          author_name?: string | null
          content?: string | null
          content_format?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          intent?: string | null
          internal_link_suggestions?: Json
          meta_robots?: string
          og_image_url?: string | null
          previous_url_path?: string | null
          published_date?: string | null
          quality_checks?: Json
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug?: string
          source?: Json
          status?: string
          tags?: string | null
          tier?: string
          title?: string
          topic_cluster?: string
          updated_at?: string
          url_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "qa_guides_topic_cluster_fkey"
            columns: ["topic_cluster"]
            isOneToOne: false
            referencedRelation: "qa_guide_topic_clusters"
            referencedColumns: ["slug"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          display_order: number
          id: string
          is_published: boolean
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          display_order?: number
          id?: string
          is_published?: boolean
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          display_order?: number
          id?: string
          is_published?: boolean
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_openings: {
        Row: {
          created_at: string
          department: string
          description: string
          employment_type: Database["public"]["Enums"]["employment_type"]
          id: string
          location: string
          organization_id: string | null
          published: boolean
          role: string
          slug: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          department: string
          description: string
          employment_type?: Database["public"]["Enums"]["employment_type"]
          id?: string
          location: string
          organization_id?: string | null
          published?: boolean
          role: string
          slug?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          description?: string
          employment_type?: Database["public"]["Enums"]["employment_type"]
          id?: string
          location?: string
          organization_id?: string | null
          published?: boolean
          role?: string
          slug?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_openings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "job_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      job_organizations: {
        Row: {
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      news_backlinks: {
        Row: {
          created_at: string
          description: string | null
          header: string
          id: string
          link_url: string | null
          logo_url: string
          news_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          header: string
          id?: string
          link_url?: string | null
          logo_url: string
          news_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          header?: string
          id?: string
          link_url?: string | null
          logo_url?: string
          news_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_backlinks_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "news_updates"
            referencedColumns: ["id"]
          },
        ]
      }
      news_updates: {
        Row: {
          author_designation: string | null
          author_name: string | null
          banner_text: string | null
          category: string | null
          content: string
          content_format: string
          created_at: string
          description: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          is_banner: boolean
          is_featured: boolean
          og_image_url: string | null
          published: boolean
          published_date: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          slug: string
          social_embed_description: string | null
          social_embed_image: string | null
          social_embed_url: string | null
          tags: string | null
          title: string
          updated_at: string
          writer_id: string | null
          youtube_url: string | null
        }
        Insert: {
          author_designation?: string | null
          author_name?: string | null
          banner_text?: string | null
          category?: string | null
          content: string
          content_format?: string
          created_at?: string
          description?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_banner?: boolean
          is_featured?: boolean
          og_image_url?: string | null
          published?: boolean
          published_date?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug: string
          social_embed_description?: string | null
          social_embed_image?: string | null
          social_embed_url?: string | null
          tags?: string | null
          title: string
          updated_at?: string
          writer_id?: string | null
          youtube_url?: string | null
        }
        Update: {
          author_designation?: string | null
          author_name?: string | null
          banner_text?: string | null
          category?: string | null
          content?: string
          content_format?: string
          created_at?: string
          description?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_banner?: boolean
          is_featured?: boolean
          og_image_url?: string | null
          published?: boolean
          published_date?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug?: string
          social_embed_description?: string | null
          social_embed_image?: string | null
          social_embed_url?: string | null
          tags?: string | null
          title?: string
          updated_at?: string
          writer_id?: string | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "news_updates_writer_id_fkey"
            columns: ["writer_id"]
            isOneToOne: false
            referencedRelation: "writers"
            referencedColumns: ["id"]
          },
        ]
      }
      terms_content: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      writers: {
        Row: {
          created_at: string
          description: string | null
          designation: string | null
          id: string
          linkedin_url: string | null
          name: string
          profile_image: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          designation?: string | null
          id?: string
          linkedin_url?: string | null
          name: string
          profile_image?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          designation?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string
          profile_image?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      employment_type: "full_time" | "part_time" | "internship"
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
    Enums: {
      app_role: ["admin", "user"],
      employment_type: ["full_time", "part_time", "internship"],
    },
  },
} as const
