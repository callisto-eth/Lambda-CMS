import { z } from 'zod';

export const subEventMetadata = z.discriminatedUnion('platform', [
  z.object({
    id: z.string(),
    topic: z.string(),
    description: z.string(),
    start_time: z.string(),
    end_time: z.string(),
    max_attendees: z.number(),
    entry_price: z.number(),
    platform: z.literal('ONLINE'),
    metadata: z.object({
      link: z.string(),
    }),
  }),
  z.object({
    id: z.string(),
    topic: z.string(),
    description: z.string(),
    start_time: z.string(),
    end_time: z.string(),
    max_attendees: z.number(),
    entry_price: z.number(),
    platform: z.literal('OFFLINE'),
    metadata: z.custom<Root>(),
  }),
]);

export interface Root {
  x: number;
  y: number;
  raw: Raw;
  label: string;
  bounds: number[][];
}

export interface Raw {
  lat: string;
  lon: string;
  name: string;
  type: string;
  class: string;
  osm_id: number;
  licence: string;
  osm_type: string;
  place_id: number;
  importance: number;
  place_rank: number;
  addresstype: string;
  boundingbox: string[];
  display_name: string;
}

export const createEventSchema = z.object({
  event_name: z.string({
    message: 'Please enter a valid name',
  }),
  event_desc: z.string({
    message: 'Please enter a valid description',
  }),
  date: z.object({
    from: z.date({
      message: 'Please enter a valid date',
    }),
    to: z.date({
      message: 'Please enter a valid date',
    }),
  }),
  event_mode: z.string({
    message: 'Please select a valid mode',
  }),
  spaces_enabled: z.boolean().optional(),
  event_visibility: z.string({
    message: 'Please select a valid visibility',
  }),
  chat_enabled: z.boolean().optional(),
  banner_image: z.string().optional(),
  profile_image: z.string().optional(),
});

export const profileSchema = z.object({
  id: z.string().optional(),
  username: z.string({
    required_error: "Username can't be empty",
  }),
  bio: z.string({
    required_error: "Bio can't be empty",
  }),
  profile_image: z.string({
    required_error: 'Please upload an Avatar',
  }),
});

export const createSubEventSchema = z.object({
  topic: z.string({
    message: 'Please enter a valid topic',
  }),
  description: z.string({
    message: 'Please enter a valid description',
  }),
  date: z.object({
    from: z.date({
      message: 'Please enter a valid date',
    }),
    to: z.date({
      message: 'Please enter a valid date',
    }),
  }),
  start_time: z.date(),
  end_time: z.date(),
  entry_price: z.string(),
  banner_image: z.string().optional(),
  max_attendees: z.string(),
  platform: z.enum(['ONLINE', 'OFFLINE']),
  metadata: z.custom<
    | {
        link: string;
      }
    | Root
  >((value) => {
    return value
      ? Object.keys(value).includes('link') ||
          Object.keys(value).includes('raw')
      : false;
  }),
});
