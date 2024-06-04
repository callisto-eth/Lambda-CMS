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
            foreignKeyName: 'connections_event_attendees_event_fkey';
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
      subevents_attendees: {
        Row: {
          attendee: string;
          created_at: string;
          event: string;
          payment_id: string;
          subevent: string;
        };
        Insert: {
          attendee: string;
          created_at?: string;
          event: string;
          payment_id: string;
          subevent: string;
        };
        Update: {
          attendee?: string;
          created_at?: string;
          event?: string;
          payment_id?: string;
          subevent?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'connections_subevents_attendees_attendee_fkey';
            columns: ['attendee'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'connections_subevents_attendees_event_fkey';
            columns: ['event'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'connections_subevents_attendees_payment_id_fkey';
            columns: ['payment_id'];
            isOneToOne: false;
            referencedRelation: 'payments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'connections_subevents_attendees_subevent_fkey';
            columns: ['subevent'];
            isOneToOne: false;
            referencedRelation: 'sub_events';
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
  public: {
    Tables: {
      chat_messages: {
        Row: {
          author: string;
          body: string;
          created_at: string;
          event: string;
          id: number;
          media: string[] | null;
        };
        Insert: {
          author: string;
          body: string;
          created_at?: string;
          event: string;
          id?: number;
          media?: string[] | null;
        };
        Update: {
          author?: string;
          body?: string;
          created_at?: string;
          event?: string;
          id?: number;
          media?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_messages_author_fkey';
            columns: ['author'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_messages_event_fkey';
            columns: ['event'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
        ];
      };
      events: {
        Row: {
          chat_enabled: boolean;
          created_at: string;
          description: string;
          end_time: string;
          id: string;
          name: string;
          organizer: string;
          platform: Database['public']['Enums']['E_EVENT_PLATFORM'];
          spaces_enabled: boolean;
          start_time: string;
          visibility: Database['public']['Enums']['E_EVENT_TYPE'];
        };
        Insert: {
          chat_enabled?: boolean;
          created_at?: string;
          description: string;
          end_time: string;
          id?: string;
          name: string;
          organizer: string;
          platform: Database['public']['Enums']['E_EVENT_PLATFORM'];
          spaces_enabled?: boolean;
          start_time: string;
          visibility?: Database['public']['Enums']['E_EVENT_TYPE'];
        };
        Update: {
          chat_enabled?: boolean;
          created_at?: string;
          description?: string;
          end_time?: string;
          id?: string;
          name?: string;
          organizer?: string;
          platform?: Database['public']['Enums']['E_EVENT_PLATFORM'];
          spaces_enabled?: boolean;
          start_time?: string;
          visibility?: Database['public']['Enums']['E_EVENT_TYPE'];
        };
        Relationships: [
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
          payee: string;
          payer: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          id: string;
          paid?: boolean;
          payee: string;
          payer: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          id?: string;
          paid?: boolean;
          payee?: string;
          payer?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_payments_payee_fkey';
            columns: ['payee'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_payments_payer_fkey';
            columns: ['payer'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
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
          author: string | null;
          body: string;
          created_at: string;
          id: number;
          likes: number;
          media: string[] | null;
        };
        Insert: {
          author?: string | null;
          body: string;
          created_at?: string;
          id?: number;
          likes?: number;
          media?: string[] | null;
        };
        Update: {
          author?: string | null;
          body?: string;
          created_at?: string;
          id?: number;
          likes?: number;
          media?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'spaces_author_fkey';
            columns: ['author'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      sub_events: {
        Row: {
          created_at: string;
          description: string;
          end_time: string;
          entry_price: number;
          event: string;
          id: string;
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
      E_CHAT_TYPE: 'E_CHAT_PUBLiC' | 'E_CHAT_GROUP';
      E_EVENT_PLATFORM: 'E_EVENT_ONLINE' | 'E_EVENT_OFFLINE' | 'E_EVENT_HYBRID';
      E_EVENT_ROLE:
        | 'E_EVENT_ORGANIZER'
        | 'E_EVENT_ADMIN'
        | 'E_EVENT_PARTICIPANT';
      E_EVENT_TYPE: 'E_EVENT_PRIVATE' | 'E_EVENT_PUBLIC';
      E_PROFILE_VISIBILITY: 'E_PROFILE_PUBLIC' | 'E_PROFILE_PRIVATE';
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
