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
