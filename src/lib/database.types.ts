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
      addresses: {
        Row: {
          city: string
          country: string
          created_at: string
          id: string
          is_default: boolean
          label: string | null
          lat: number | null
          line1: string
          line2: string | null
          lng: number | null
          owner_id: string
          state: string | null
        }
        Insert: {
          city: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          lat?: number | null
          line1: string
          line2?: string | null
          lng?: number | null
          owner_id: string
          state?: string | null
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          lat?: number | null
          line1?: string
          line2?: string | null
          lng?: number | null
          owner_id?: string
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          after: Json | null
          before: Json | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          after?: Json | null
          before?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          after?: Json | null
          before?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      availability: {
        Row: {
          booking_id: string | null
          created_at: string
          ends_at: string
          id: string
          is_booked: boolean
          partner_id: string
          starts_at: string
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          ends_at: string
          id?: string
          is_booked?: boolean
          partner_id: string
          starts_at: string
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          ends_at?: string
          id?: string
          is_booked?: boolean
          partner_id?: string
          starts_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_booking_fk"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "availability_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          availability_id: string | null
          balance_kobo: number
          buyer_id: string
          confirmed_at: string | null
          created_at: string
          deposit_kobo: number
          escrow_hold_id: string | null
          id: string
          location: string | null
          partner_id: string
          reminders_sent: number
          scheduled_at: string
          service_id: string
          status: Database["public"]["Enums"]["booking_status"]
        }
        Insert: {
          availability_id?: string | null
          balance_kobo?: number
          buyer_id: string
          confirmed_at?: string | null
          created_at?: string
          deposit_kobo?: number
          escrow_hold_id?: string | null
          id?: string
          location?: string | null
          partner_id: string
          reminders_sent?: number
          scheduled_at: string
          service_id: string
          status?: Database["public"]["Enums"]["booking_status"]
        }
        Update: {
          availability_id?: string | null
          balance_kobo?: number
          buyer_id?: string
          confirmed_at?: string | null
          created_at?: string
          deposit_kobo?: number
          escrow_hold_id?: string | null
          id?: string
          location?: string | null
          partner_id?: string
          reminders_sent?: number
          scheduled_at?: string
          service_id?: string
          status?: Database["public"]["Enums"]["booking_status"]
        }
        Relationships: [
          {
            foreignKeyName: "bookings_availability_id_fkey"
            columns: ["availability_id"]
            isOneToOne: false
            referencedRelation: "availability"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_escrow_fk"
            columns: ["escrow_hold_id"]
            isOneToOne: false
            referencedRelation: "escrow_holds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          look_id: string | null
          product_id: string
          quantity: number
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          look_id?: string | null
          product_id: string
          quantity?: number
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          look_id?: string | null
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_look_id_fkey"
            columns: ["look_id"]
            isOneToOne: false
            referencedRelation: "looks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          last_message_at: string
          partner_id: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          last_message_at?: string
          partner_id: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          last_message_at?: string
          partner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      disputes: {
        Row: {
          created_at: string
          escrow_hold_id: string
          evidence: Json
          id: string
          raised_by: string
          reason: string
          resolution_note: string | null
          resolved_at: string | null
          resolved_by: string | null
          sla_due_at: string | null
          status: Database["public"]["Enums"]["dispute_status"]
        }
        Insert: {
          created_at?: string
          escrow_hold_id: string
          evidence?: Json
          id?: string
          raised_by: string
          reason: string
          resolution_note?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          sla_due_at?: string | null
          status?: Database["public"]["Enums"]["dispute_status"]
        }
        Update: {
          created_at?: string
          escrow_hold_id?: string
          evidence?: Json
          id?: string
          raised_by?: string
          reason?: string
          resolution_note?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          sla_due_at?: string | null
          status?: Database["public"]["Enums"]["dispute_status"]
        }
        Relationships: [
          {
            foreignKeyName: "disputes_escrow_hold_id_fkey"
            columns: ["escrow_hold_id"]
            isOneToOne: false
            referencedRelation: "escrow_holds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_raised_by_fkey"
            columns: ["raised_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      escrow_holds: {
        Row: {
          auto_release_at: string | null
          booking_id: string | null
          buyer_id: string
          created_at: string
          currency: string
          dispute_id: string | null
          held_at: string | null
          id: string
          order_id: string | null
          refunded_at: string | null
          release_trigger: string
          released_at: string | null
          state: Database["public"]["Enums"]["escrow_state"]
          total_kobo: number
        }
        Insert: {
          auto_release_at?: string | null
          booking_id?: string | null
          buyer_id: string
          created_at?: string
          currency?: string
          dispute_id?: string | null
          held_at?: string | null
          id?: string
          order_id?: string | null
          refunded_at?: string | null
          release_trigger?: string
          released_at?: string | null
          state?: Database["public"]["Enums"]["escrow_state"]
          total_kobo: number
        }
        Update: {
          auto_release_at?: string | null
          booking_id?: string | null
          buyer_id?: string
          created_at?: string
          currency?: string
          dispute_id?: string | null
          held_at?: string | null
          id?: string
          order_id?: string | null
          refunded_at?: string | null
          release_trigger?: string
          released_at?: string | null
          state?: Database["public"]["Enums"]["escrow_state"]
          total_kobo?: number
        }
        Relationships: [
          {
            foreignKeyName: "escrow_dispute_fk"
            columns: ["dispute_id"]
            isOneToOne: false
            referencedRelation: "disputes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_holds_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_holds_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_holds_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      escrow_splits: {
        Row: {
          amount_kobo: number
          bps: number | null
          created_at: string
          escrow_hold_id: string
          id: string
          partner_id: string | null
          party: Database["public"]["Enums"]["split_party"]
          released: boolean
          subaccount_code: string | null
        }
        Insert: {
          amount_kobo: number
          bps?: number | null
          created_at?: string
          escrow_hold_id: string
          id?: string
          partner_id?: string | null
          party: Database["public"]["Enums"]["split_party"]
          released?: boolean
          subaccount_code?: string | null
        }
        Update: {
          amount_kobo?: number
          bps?: number | null
          created_at?: string
          escrow_hold_id?: string
          id?: string
          partner_id?: string | null
          party?: Database["public"]["Enums"]["split_party"]
          released?: boolean
          subaccount_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "escrow_splits_escrow_hold_id_fkey"
            columns: ["escrow_hold_id"]
            isOneToOne: false
            referencedRelation: "escrow_holds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escrow_splits_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      look_products: {
        Row: {
          hotspot: Json | null
          look_id: string
          position: number
          product_id: string
        }
        Insert: {
          hotspot?: Json | null
          look_id: string
          position?: number
          product_id: string
        }
        Update: {
          hotspot?: Json | null
          look_id?: string
          position?: number
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "look_products_look_id_fkey"
            columns: ["look_id"]
            isOneToOne: false
            referencedRelation: "looks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "look_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      looks: {
        Row: {
          created_at: string
          created_by: string | null
          editorial_copy: string | null
          featured: boolean
          hero_media: Json
          id: string
          is_published: boolean
          matched_partner_id: string | null
          matched_service_id: string | null
          search_vector: unknown
          slug: string
          source: Database["public"]["Enums"]["look_source"]
          tags: string[]
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          editorial_copy?: string | null
          featured?: boolean
          hero_media?: Json
          id?: string
          is_published?: boolean
          matched_partner_id?: string | null
          matched_service_id?: string | null
          search_vector?: unknown
          slug: string
          source?: Database["public"]["Enums"]["look_source"]
          tags?: string[]
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          editorial_copy?: string | null
          featured?: boolean
          hero_media?: Json
          id?: string
          is_published?: boolean
          matched_partner_id?: string | null
          matched_service_id?: string | null
          search_vector?: unknown
          slug?: string
          source?: Database["public"]["Enums"]["look_source"]
          tags?: string[]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "looks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "looks_matched_partner_id_fkey"
            columns: ["matched_partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "looks_matched_service_id_fkey"
            columns: ["matched_service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          conversation_id: string
          created_at: string
          id: string
          sender_id: string
        }
        Insert: {
          body: string
          conversation_id: string
          created_at?: string
          id?: string
          sender_id: string
        }
        Update: {
          body?: string
          conversation_id?: string
          created_at?: string
          id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          attempts: number
          channel: string
          created_at: string
          dedupe_key: string | null
          id: string
          payload: Json
          sent_at: string | null
          status: string
          template: string
          user_id: string
        }
        Insert: {
          attempts?: number
          channel: string
          created_at?: string
          dedupe_key?: string | null
          id?: string
          payload?: Json
          sent_at?: string | null
          status?: string
          template: string
          user_id: string
        }
        Update: {
          attempts?: number
          channel?: string
          created_at?: string
          dedupe_key?: string | null
          id?: string
          payload?: Json
          sent_at?: string | null
          status?: string
          template?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          line_total_kobo: number
          order_id: string
          partner_id: string
          product_id: string
          quantity: number
          unit_price_kobo: number
        }
        Insert: {
          created_at?: string
          id?: string
          line_total_kobo: number
          order_id: string
          partner_id: string
          product_id: string
          quantity: number
          unit_price_kobo: number
        }
        Update: {
          created_at?: string
          id?: string
          line_total_kobo?: number
          order_id?: string
          partner_id?: string
          product_id?: string
          quantity?: number
          unit_price_kobo?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address_id: string | null
          buyer_id: string
          confirmed_at: string | null
          created_at: string
          currency: string
          escrow_hold_id: string | null
          id: string
          shipping_kobo: number
          status: Database["public"]["Enums"]["order_status"]
          subtotal_kobo: number
          total_kobo: number
          tracking: Json | null
        }
        Insert: {
          address_id?: string | null
          buyer_id: string
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          escrow_hold_id?: string | null
          id?: string
          shipping_kobo?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal_kobo?: number
          total_kobo?: number
          tracking?: Json | null
        }
        Update: {
          address_id?: string | null
          buyer_id?: string
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          escrow_hold_id?: string | null
          id?: string
          shipping_kobo?: number
          status?: Database["public"]["Enums"]["order_status"]
          subtotal_kobo?: number
          total_kobo?: number
          tracking?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_escrow_fk"
            columns: ["escrow_hold_id"]
            isOneToOne: false
            referencedRelation: "escrow_holds"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          areas: string[]
          bio: string | null
          created_at: string
          display_name: string
          id: string
          is_live: boolean
          kind: Database["public"]["Enums"]["partner_kind"]
          logo_url: string | null
          no_show_rate: number
          owner_id: string
          percentage_charge: number
          rating: number
          rating_count: number
          reliability_score: number
          slug: string | null
          subaccount_code: string | null
          verification_status: Database["public"]["Enums"]["verification_status"]
        }
        Insert: {
          areas?: string[]
          bio?: string | null
          created_at?: string
          display_name: string
          id?: string
          is_live?: boolean
          kind: Database["public"]["Enums"]["partner_kind"]
          logo_url?: string | null
          no_show_rate?: number
          owner_id: string
          percentage_charge?: number
          rating?: number
          rating_count?: number
          reliability_score?: number
          slug?: string | null
          subaccount_code?: string | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Update: {
          areas?: string[]
          bio?: string | null
          created_at?: string
          display_name?: string
          id?: string
          is_live?: boolean
          kind?: Database["public"]["Enums"]["partner_kind"]
          logo_url?: string | null
          no_show_rate?: number
          owner_id?: string
          percentage_charge?: number
          rating?: number
          rating_count?: number
          reliability_score?: number
          slug?: string | null
          subaccount_code?: string | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "partners_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_kobo: number
          channel: string | null
          created_at: string
          escrow_hold_id: string
          id: string
          paid_at: string | null
          paystack_reference: string
          raw: Json | null
          split_code: string | null
          status: Database["public"]["Enums"]["payment_status"]
        }
        Insert: {
          amount_kobo: number
          channel?: string | null
          created_at?: string
          escrow_hold_id: string
          id?: string
          paid_at?: string | null
          paystack_reference: string
          raw?: Json | null
          split_code?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Update: {
          amount_kobo?: number
          channel?: string | null
          created_at?: string
          escrow_hold_id?: string
          id?: string
          paid_at?: string | null
          paystack_reference?: string
          raw?: Json | null
          split_code?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "payments_escrow_hold_id_fkey"
            columns: ["escrow_hold_id"]
            isOneToOne: false
            referencedRelation: "escrow_holds"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          amount_kobo: number
          created_at: string
          escrow_hold_id: string
          escrow_split_id: string
          failure_reason: string | null
          id: string
          partner_id: string | null
          paystack_transfer_ref: string | null
          released_at: string | null
          status: Database["public"]["Enums"]["payout_status"]
          subaccount_code: string | null
        }
        Insert: {
          amount_kobo: number
          created_at?: string
          escrow_hold_id: string
          escrow_split_id: string
          failure_reason?: string | null
          id?: string
          partner_id?: string | null
          paystack_transfer_ref?: string | null
          released_at?: string | null
          status?: Database["public"]["Enums"]["payout_status"]
          subaccount_code?: string | null
        }
        Update: {
          amount_kobo?: number
          created_at?: string
          escrow_hold_id?: string
          escrow_split_id?: string
          failure_reason?: string | null
          id?: string
          partner_id?: string | null
          paystack_transfer_ref?: string | null
          released_at?: string | null
          status?: Database["public"]["Enums"]["payout_status"]
          subaccount_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payouts_escrow_hold_id_fkey"
            columns: ["escrow_hold_id"]
            isOneToOne: false
            referencedRelation: "escrow_holds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payouts_escrow_split_id_fkey"
            columns: ["escrow_split_id"]
            isOneToOne: true
            referencedRelation: "escrow_splits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payouts_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          color: string | null
          created_at: string
          currency: string
          density: string | null
          description: string | null
          id: string
          images: Json
          inventory: number
          is_published: boolean
          length_in: number | null
          nafdac_ref: string | null
          origin: string | null
          partner_id: string
          price_kobo: number
          provenance: string | null
          search_vector: unknown
          texture: string | null
          title: string
          type: string
          verification_status: Database["public"]["Enums"]["verification_status"]
        }
        Insert: {
          color?: string | null
          created_at?: string
          currency?: string
          density?: string | null
          description?: string | null
          id?: string
          images?: Json
          inventory?: number
          is_published?: boolean
          length_in?: number | null
          nafdac_ref?: string | null
          origin?: string | null
          partner_id: string
          price_kobo: number
          provenance?: string | null
          search_vector?: unknown
          texture?: string | null
          title: string
          type: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Update: {
          color?: string | null
          created_at?: string
          currency?: string
          density?: string | null
          description?: string | null
          id?: string
          images?: Json
          inventory?: number
          is_published?: boolean
          length_in?: number | null
          nafdac_ref?: string | null
          origin?: string | null
          partner_id?: string
          price_kobo?: number
          provenance?: string | null
          search_vector?: unknown
          texture?: string | null
          title?: string
          type?: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "products_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          is_admin: boolean
          is_partner: boolean
          locale: string | null
          notification_prefs: Json
          phone: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_admin?: boolean
          is_partner?: boolean
          locale?: string | null
          notification_prefs?: Json
          phone?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_admin?: boolean
          is_partner?: boolean
          locale?: string | null
          notification_prefs?: Json
          phone?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author_id: string
          body: string | null
          booking_id: string | null
          created_at: string
          id: string
          media: Json
          order_id: string | null
          rating: number
          subject: Database["public"]["Enums"]["subject_type"]
          subject_id: string
        }
        Insert: {
          author_id: string
          body?: string | null
          booking_id?: string | null
          created_at?: string
          id?: string
          media?: Json
          order_id?: string | null
          rating: number
          subject: Database["public"]["Enums"]["subject_type"]
          subject_id: string
        }
        Update: {
          author_id?: string
          body?: string | null
          booking_id?: string | null
          created_at?: string
          id?: string
          media?: Json
          order_id?: string | null
          rating?: number
          subject?: Database["public"]["Enums"]["subject_type"]
          subject_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          areas: string[]
          base_price_kobo: number
          cancellation_policy: Json
          category: string
          created_at: string
          deposit_bps: number
          description: string | null
          duration_min: number
          id: string
          is_published: boolean
          name: string
          partner_id: string
          supplies_hair: boolean
        }
        Insert: {
          areas?: string[]
          base_price_kobo: number
          cancellation_policy?: Json
          category: string
          created_at?: string
          deposit_bps?: number
          description?: string | null
          duration_min?: number
          id?: string
          is_published?: boolean
          name: string
          partner_id: string
          supplies_hair?: boolean
        }
        Update: {
          areas?: string[]
          base_price_kobo?: number
          cancellation_policy?: Json
          category?: string
          created_at?: string
          deposit_bps?: number
          description?: string | null
          duration_min?: number
          id?: string
          is_published?: boolean
          name?: string
          partner_id?: string
          supplies_hair?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "services_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      verifications: {
        Row: {
          authenticity_checked: boolean
          business_verified: boolean
          created_at: string
          decided_at: string | null
          evidence: Json
          expires_at: string | null
          id: string
          id_verified: boolean
          mystery_shop_notes: string | null
          nafdac_ref: string | null
          reviewer_id: string | null
          status: Database["public"]["Enums"]["verification_status"]
          subject: Database["public"]["Enums"]["subject_type"]
          subject_id: string
        }
        Insert: {
          authenticity_checked?: boolean
          business_verified?: boolean
          created_at?: string
          decided_at?: string | null
          evidence?: Json
          expires_at?: string | null
          id?: string
          id_verified?: boolean
          mystery_shop_notes?: string | null
          nafdac_ref?: string | null
          reviewer_id?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          subject: Database["public"]["Enums"]["subject_type"]
          subject_id: string
        }
        Update: {
          authenticity_checked?: boolean
          business_verified?: boolean
          created_at?: string
          decided_at?: string | null
          evidence?: Json
          expires_at?: string | null
          id?: string
          id_verified?: boolean
          mystery_shop_notes?: string | null
          nafdac_ref?: string | null
          reviewer_id?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          subject?: Database["public"]["Enums"]["subject_type"]
          subject_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verifications_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          created_at: string
          event_id: string
          id: string
          payload: Json
          processed_at: string | null
          provider: string
          type: string | null
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          payload: Json
          processed_at?: string | null
          provider?: string
          type?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          provider?: string
          type?: string | null
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          look_id: string | null
          product_id: string | null
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          look_id?: string | null
          product_id?: string | null
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          look_id?: string | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_look_id_fkey"
            columns: ["look_id"]
            isOneToOne: false
            referencedRelation: "looks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
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
      booking_status:
        | "requested"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "no_show_client"
        | "no_show_stylist"
      dispute_status:
        | "open"
        | "under_review"
        | "resolved_release"
        | "resolved_refund"
        | "resolved_partial"
        | "rejected"
      escrow_state:
        | "initiated"
        | "held"
        | "partially_released"
        | "released"
        | "refunded"
        | "partially_refunded"
        | "disputed"
        | "cancelled"
      look_source: "wura_editorial" | "partner" | "user_ugc"
      order_status:
        | "pending"
        | "paid"
        | "processing"
        | "shipped"
        | "delivered"
        | "confirmed"
        | "cancelled"
        | "refunded"
      partner_kind: "vendor" | "stylist" | "both"
      payment_status:
        | "initialized"
        | "success"
        | "failed"
        | "abandoned"
        | "reversed"
      payout_status: "pending" | "processing" | "paid" | "failed"
      split_party: "platform" | "vendor" | "stylist"
      subject_type: "product" | "partner"
      verification_status:
        | "unverified"
        | "pending"
        | "verified"
        | "rejected"
        | "expired"
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
      booking_status: [
        "requested",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
        "no_show_client",
        "no_show_stylist",
      ],
      dispute_status: [
        "open",
        "under_review",
        "resolved_release",
        "resolved_refund",
        "resolved_partial",
        "rejected",
      ],
      escrow_state: [
        "initiated",
        "held",
        "partially_released",
        "released",
        "refunded",
        "partially_refunded",
        "disputed",
        "cancelled",
      ],
      look_source: ["wura_editorial", "partner", "user_ugc"],
      order_status: [
        "pending",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "confirmed",
        "cancelled",
        "refunded",
      ],
      partner_kind: ["vendor", "stylist", "both"],
      payment_status: [
        "initialized",
        "success",
        "failed",
        "abandoned",
        "reversed",
      ],
      payout_status: ["pending", "processing", "paid", "failed"],
      split_party: ["platform", "vendor", "stylist"],
      subject_type: ["product", "partner"],
      verification_status: [
        "unverified",
        "pending",
        "verified",
        "rejected",
        "expired",
      ],
    },
  },
} as const

