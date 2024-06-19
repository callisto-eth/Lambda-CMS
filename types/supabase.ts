export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  connections: {
    Tables: {
      admissions: {
        Row: {
          admitted: boolean
          created_at: string
          pass: string
          subevent_attendee: string
        }
        Insert: {
          admitted: boolean
          created_at?: string
          pass: string
          subevent_attendee: string
        }
        Update: {
          admitted?: boolean
          created_at?: string
          pass?: string
          subevent_attendee?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_admissions_pass_fkey"
            columns: ["pass"]
            isOneToOne: true
            referencedRelation: "event_attendees"
            referencedColumns: ["pass_id"]
          },
          {
            foreignKeyName: "connections_admissions_subevent_attendee_fkey"
            columns: ["subevent_attendee"]
            isOneToOne: false
            referencedRelation: "subevent_attendees"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_members: {
        Row: {
          chat: string
          created_at: string
          event_attendee_id: string | null
          member: string
        }
        Insert: {
          chat: string
          created_at?: string
          event_attendee_id?: string | null
          member: string
        }
        Update: {
          chat?: string
          created_at?: string
          event_attendee_id?: string | null
          member?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_chat_members_chat_fkey"
            columns: ["chat"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_chat_members_event_attendee_id_fkey"
            columns: ["event_attendee_id"]
            isOneToOne: false
            referencedRelation: "event_attendees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_chat_members_event_attendee_id_fkey"
            columns: ["event_attendee_id"]
            isOneToOne: false
            referencedRelation: "profile_attendees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_chat_members_member_fkey"
            columns: ["member"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          author: string
          chat: string
          content: string
          created_at: string
          id: number
          medias: string[]
        }
        Insert: {
          author: string
          chat: string
          content: string
          created_at?: string
          id?: number
          medias: string[]
        }
        Update: {
          author?: string
          chat?: string
          content?: string
          created_at?: string
          id?: number
          medias?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "connections_chat_messages_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_chat_messages_chat_fkey"
            columns: ["chat"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      event_attendees: {
        Row: {
          attendee: string
          created_at: string
          event: string
          id: string
          pass_id: string
          role: Database["public"]["Enums"]["E_EVENT_ROLE"]
        }
        Insert: {
          attendee: string
          created_at?: string
          event: string
          id?: string
          pass_id?: string
          role?: Database["public"]["Enums"]["E_EVENT_ROLE"]
        }
        Update: {
          attendee?: string
          created_at?: string
          event?: string
          id?: string
          pass_id?: string
          role?: Database["public"]["Enums"]["E_EVENT_ROLE"]
        }
        Relationships: [
          {
            foreignKeyName: "connections_event_attendees_attendee_fkey"
            columns: ["attendee"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_event_attendees_event_fkey"
            columns: ["event"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_whitelists: {
        Row: {
          created_at: string
          email: string
          event: string
        }
        Insert: {
          created_at?: string
          email: string
          event: string
        }
        Update: {
          created_at?: string
          email?: string
          event?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_event_whitelists_event_fkey"
            columns: ["event"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces_posts: {
        Row: {
          author: string
          content: string
          created_at: string
          id: string
          likes: string[] | null
          space: string
          title: string
        }
        Insert: {
          author?: string
          content: string
          created_at?: string
          id: string
          likes?: string[] | null
          space: string
          title: string
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          id?: string
          likes?: string[] | null
          space?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_spaces_posts_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_spaces_posts_space_fkey"
            columns: ["space"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      subevent_attendees: {
        Row: {
          created_at: string
          event_attendee: string
          id: string
          subevent: string
        }
        Insert: {
          created_at?: string
          event_attendee: string
          id?: string
          subevent: string
        }
        Update: {
          created_at?: string
          event_attendee?: string
          id?: string
          subevent?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_subevent_attendees_event_attendee_fkey"
            columns: ["event_attendee"]
            isOneToOne: false
            referencedRelation: "event_attendees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_subevent_attendees_event_attendee_fkey"
            columns: ["event_attendee"]
            isOneToOne: false
            referencedRelation: "profile_attendees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_subevent_attendees_subevent_fkey"
            columns: ["subevent"]
            isOneToOne: false
            referencedRelation: "sub_events"
            referencedColumns: ["id"]
          },
        ]
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
  public: {
    Tables: {
      chats: {
        Row: {
          created_at: string
          id: string
          type: Database["public"]["Enums"]["E_CHAT_TYPE"] | null
        }
        Insert: {
          created_at?: string
          id?: string
          type?: Database["public"]["Enums"]["E_CHAT_TYPE"] | null
        }
        Update: {
          created_at?: string
          id?: string
          type?: Database["public"]["Enums"]["E_CHAT_TYPE"] | null
        }
        Relationships: []
      }
      events: {
        Row: {
          chat: string | null
          created_at: string
          description: string | null
          end_time: string
          id: string
          name: string
          organizer: string
          platform: Database["public"]["Enums"]["E_EVENT_PLATFORM"]
          slug: string | null
          spaces: string | null
          start_time: string
          visibility: Database["public"]["Enums"]["E_EVENT_VISIBILITY"]
        }
        Insert: {
          chat?: string | null
          created_at?: string
          description?: string | null
          end_time: string
          id?: string
          name: string
          organizer: string
          platform: Database["public"]["Enums"]["E_EVENT_PLATFORM"]
          slug?: string | null
          spaces?: string | null
          start_time: string
          visibility: Database["public"]["Enums"]["E_EVENT_VISIBILITY"]
        }
        Update: {
          chat?: string | null
          created_at?: string
          description?: string | null
          end_time?: string
          id?: string
          name?: string
          organizer?: string
          platform?: Database["public"]["Enums"]["E_EVENT_PLATFORM"]
          slug?: string | null
          spaces?: string | null
          start_time?: string
          visibility?: Database["public"]["Enums"]["E_EVENT_VISIBILITY"]
        }
        Relationships: [
          {
            foreignKeyName: "public_events_chat_fkey"
            columns: ["chat"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_organizer_fkey"
            columns: ["organizer"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_spaces_fkey"
            columns: ["spaces"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          paid: boolean
          subevent: string
          user: string
        }
        Insert: {
          amount: number
          created_at?: string
          id: string
          paid: boolean
          subevent: string
          user: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          paid?: boolean
          subevent?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_payments_subevent_fkey"
            columns: ["subevent"]
            isOneToOne: false
            referencedRelation: "sub_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_payments_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string
          created_at: string
          id: string
          metadata: Json | null
          username: string
        }
        Insert: {
          bio: string
          created_at?: string
          id: string
          metadata?: Json | null
          username: string
        }
        Update: {
          bio?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          allow_participants: boolean | null
          created_at: string
          id: string
        }
        Insert: {
          allow_participants?: boolean | null
          created_at?: string
          id?: string
        }
        Update: {
          allow_participants?: boolean | null
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      sub_events: {
        Row: {
          created_at: string
          description: string
          end_time: string
          entry_price: number
          event: string
          id: string
          max_attendees: number
          metadata: Json | null
          platform: Database["public"]["Enums"]["E_EVENT_PLATFORM"]
          start_time: string
          topic: string
        }
        Insert: {
          created_at?: string
          description: string
          end_time: string
          entry_price: number
          event: string
          id?: string
          max_attendees: number
          metadata?: Json | null
          platform: Database["public"]["Enums"]["E_EVENT_PLATFORM"]
          start_time: string
          topic: string
        }
        Update: {
          created_at?: string
          description?: string
          end_time?: string
          entry_price?: number
          event?: string
          id?: string
          max_attendees?: number
          metadata?: Json | null
          platform?: Database["public"]["Enums"]["E_EVENT_PLATFORM"]
          start_time?: string
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_sub_events_event_fkey"
            columns: ["event"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      profile_attendees: {
        Row: {
          attendee: string | null
          event: string | null
          id: string | null
          role: Database["public"]["Enums"]["E_EVENT_ROLE"] | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "connections_event_attendees_attendee_fkey"
            columns: ["attendee"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_event_attendees_event_fkey"
            columns: ["event"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_posts: {
        Row: {
          author: string | null
          content: string | null
          created_at: string | null
          id: string | null
          likes: string[] | null
          space: string | null
          title: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "connections_spaces_posts_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_spaces_posts_space_fkey"
            columns: ["space"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      delete_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: string
      }
      generate_slug: {
        Args: {
          size: number
        }
        Returns: string
      }
      generate_uid: {
        Args: {
          size: number
        }
        Returns: string
      }
      get_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: Json
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      is_claims_admin: {
        Args: {
          claim: string
        }
        Returns: boolean
      }
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: Json
        }
        Returns: string
      }
    }
    Enums: {
      E_CHAT_TYPE: "PRIVATE" | "GROUP"
      E_EVENT_PLATFORM: "ONLINE" | "OFFLINE"
      E_EVENT_ROLE: "ORGANIZER" | "ADMIN" | "PARTICIPANT"
      E_EVENT_VISIBILITY: "PUBLIC" | "PRIVATE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

