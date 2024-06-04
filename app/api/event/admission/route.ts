import { createClient } from '@/utils/supabase/server';
import { NextResponse, NextRequest } from 'next/server';

type AdmissionSchema = {
  pass_id: string;
  event: string;
  subevent?: string;
};

export async function POST(req: NextRequest) {
  const data: AdmissionSchema = await req.json();
  const supabase = createClient();

  let { data: eventAdmissionResponse, error } = await supabase
    .schema('connections')
    .from('pass_status')
    .insert({
      pass_id: parseInt(data.pass_id),
      event: data.event,
      subevent: data.subevent,
      redeemed: true,
    })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: eventAdmissionResponse }, { status: 200 });
}
