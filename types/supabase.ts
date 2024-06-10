export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  connections: {
    Tables: {
      chat_members: {
        Row: {
          chat: string;
          created_at: string;
          member: string;
        };
        Insert: {
          chat: string;
          created_at: string;
          member: string;
        };
        Update: {
          chat?: string;
          created_at?: string;
          member?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'connections_chat_members_chat_fkey';
            columns: ['chat'];
            isOneToOne: false;
            referencedRelation: 'chats';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'connections_chat_members_member_fkey';
            columns: ['member'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      chat_messages: {
        Row: {
          author: string;
          chat: string;
          content: string;
          created_at: string;
          id: number;
          medias: string[];
        };
        Insert: {
          author: string;
          chat: string;
          content: string;
          created_at?: string;
          id?: number;
          medias?: string[];
        };
        Update: {
          author?: string;
          chat?: string;
          content?: string;
          created_at?: string;
          id?: number;
          medias?: string[];
        };
        Relationships: [
          {
            foreignKeyName: 'connections_chat_messages_author_fkey';
            columns: ['author'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'connections_chat_messages_chat_fkey';
            columns: ['chat'];
            isOneToOne: false;
            referencedRelation: 'chats';
            referencedColumns: ['id'];
          },
        ];
      };
      event_attendees: {
        Row: {
          attendee: string;
          created_at: string;
          event: string;
          role: Database['public']['Enums']['E_EVENT_ROLE'];
        };
        Insert: {
          attendee: string;
          created_at?: string;
          event: string;
          role: Database['public']['Enums']['E_EVENT_ROLE'];
        };
        Update: {
          attendee?: string;
          created_at?: string;
          event?: string;
          role?: Database['public']['Enums']['E_EVENT_ROLE'];
        };
        Relationships: [
          {
            foreignKeyName: 'connections_event_attendees_attendee_fkey';
            columns: ['attendee'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_attendees_event_fkey';
            columns: ['event'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      event_whitelists: {
        Row: {
          created_at: string;
          email: string;
          event: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          event: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          event?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'connections_event_whitelists_event_fkey';
            columns: ['event'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      pass_status: {
        Row: {
          created_at: string;
          event: string;
          pass_id: number;
          redeemed: boolean | null;
          subevent: string | null;
          user: string | null;
        };
        Insert: {
          created_at?: string;
          event: string;
          pass_id?: number;
          redeemed?: boolean | null;
          subevent?: string | null;
          user?: string | null;
        };
        Update: {
          created_at?: string;
          event?: string;
          pass_id?: number;
          redeemed?: boolean | null;
          subevent?: string | null;
          user?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'connections_pass_status_event_fkey';
            columns: ['event'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'connections_pass_status_subevent_fkey';
            columns: ['subevent'];
            isOneToOne: false;
            referencedRelation: 'sub_events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'connections_pass_status_user_fkey';
            columns: ['user'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      spaces_posts: {
        Row: {
          author: string;
          content: string;
          created_at: string;
          id: number;
          likes: number;
          medias: string[];
          space: string;
        };
        Insert: {
          author: string;
          content: string;
          created_at?: string;
          id?: number;
          likes?: number;
          medias?: string[];
          space: string;
        };
        Update: {
          author?: string;
          content?: string;
          created_at?: string;
          id?: number;
          likes?: number;
          medias?: string[];
          space?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'spaces_posts_space_fkey';
            columns: ['space'];
            isOneToOne: false;
            referencedRelation: 'spaces';
            referencedColumns: ['id'];
          },
        ];
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
  plugins: {
    Tables: {
      [_ in never]: never;
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
  public: {
    Tables: {
      chats: {
        Row: {
          created_at: string;
          id: string;
          type: Database['public']['Enums']['E_CHAT_TYPE'] | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          type?: Database['public']['Enums']['E_CHAT_TYPE'] | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          type?: Database['public']['Enums']['E_CHAT_TYPE'] | null;
        };
        Relationships: [];
      };
      events: {
        Row: {
          chat: string | null;
          created_at: string;
          description: string;
          end_time: string;
          id: string;
          name: string;
          organizer: string;
          platform: Database['public']['Enums']['E_EVENT_PLATFORM'];
          spaces: string | null;
          start_time: string;
          visibility: Database['public']['Enums']['E_EVENT_TYPE'];
        };
        Insert: {
          chat?: string | null;
          created_at?: string;
          description: string;
          end_time: string;
          id?: string;
          name: string;
          organizer: string;
          platform: Database['public']['Enums']['E_EVENT_PLATFORM'];
          spaces?: string | null;
          start_time: string;
          visibility?: Database['public']['Enums']['E_EVENT_TYPE'];
        };
        Update: {
          chat?: string | null;
          created_at?: string;
          description?: string;
          end_time?: string;
          id?: string;
          name?: string;
          organizer?: string;
          platform?: Database['public']['Enums']['E_EVENT_PLATFORM'];
          spaces?: string | null;
          start_time?: string;
          visibility?: Database['public']['Enums']['E_EVENT_TYPE'];
        };
        Relationships: [
          {
            foreignKeyName: 'events_chat_fkey';
            columns: ['chat'];
            isOneToOne: false;
            referencedRelation: 'chats';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'events_spaces_fkey';
            columns: ['spaces'];
            isOneToOne: false;
            referencedRelation: 'spaces';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_events_organizer_fkey';
            columns: ['organizer'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      payments: {
        Row: {
          amount: number;
          created_at: string;
          id: string;
          paid: boolean;
          subevent: string;
          user: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          id: string;
          paid?: boolean;
          subevent: string;
          user: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          id?: string;
          paid?: boolean;
          subevent?: string;
          user?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'payments_subevent_fkey';
            columns: ['subevent'];
            isOneToOne: false;
            referencedRelation: 'sub_events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payments_user_fkey';
            columns: ['user'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      plugins: {
        Row: {
          created_at: string;
          id: string;
          metadata: Json;
        };
        Insert: {
          created_at?: string;
          id?: string;
          metadata: Json;
        };
        Update: {
          created_at?: string;
          id?: string;
          metadata?: Json;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          bio: string;
          created_at: string;
          id: string;
          metadata: Json | null;
          username: string;
          visibility: Database['public']['Enums']['E_PROFILE_VISIBILITY'];
        };
        Insert: {
          bio: string;
          created_at?: string;
          id?: string;
          metadata?: Json | null;
          username: string;
          visibility?: Database['public']['Enums']['E_PROFILE_VISIBILITY'];
        };
        Update: {
          bio?: string;
          created_at?: string;
          id?: string;
          metadata?: Json | null;
          username?: string;
          visibility?: Database['public']['Enums']['E_PROFILE_VISIBILITY'];
        };
        Relationships: [
          {
            foreignKeyName: 'public_profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      spaces: {
        Row: {
          allow_participants: boolean;
          created_at: string;
          id: string;
        };
        Insert: {
          allow_participants?: boolean;
          created_at?: string;
          id?: string;
        };
        Update: {
          allow_participants?: boolean;
          created_at?: string;
          id?: string;
        };
        Relationships: [];
      };
      sub_events: {
        Row: {
          created_at: string;
          description: string;
          end_time: string;
          entry_price: number;
          event: string;
          id: string;
          max_attendees: number;
          platform: Database['public']['Enums']['E_EVENT_PLATFORM'];
          start_time: string;
          topic: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          end_time: string;
          entry_price: number;
          event: string;
          id?: string;
          max_attendees: number;
          platform?: Database['public']['Enums']['E_EVENT_PLATFORM'];
          start_time: string;
          topic: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          end_time?: string;
          entry_price?: number;
          event?: string;
          id?: string;
          max_attendees?: number;
          platform?: Database['public']['Enums']['E_EVENT_PLATFORM'];
          start_time?: string;
          topic?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_sub_events_event_fkey';
            columns: ['event'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      authorize: {
        Args: {
          event: string;
        };
        Returns: boolean;
      };
      event_role_based_acess: {
        Args: {
          event: Json;
        };
        Returns: Json;
      };
      get_role_by_event: {
        Args: {
          event: string;
        };
        Returns: Database['public']['Enums']['E_EVENT_ROLE'];
      };
    };
    Enums: {
      E_CHAT_TYPE: 'PRIVATE' | 'GROUP';
      E_EVENT_PLATFORM: 'ONLINE' | 'OFFLINE' | 'HYBRID';
      E_EVENT_ROLE: 'ORGANIZER' | 'ADMIN' | 'PARTICIPANT';
      E_EVENT_TYPE: 'PRIVATE' | 'PUBLIC';
      E_PROFILE_VISIBILITY: 'PUBLIC' | 'PRIVATE';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
