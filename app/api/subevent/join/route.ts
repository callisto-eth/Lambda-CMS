import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

type joinSubeventSchema = {
  subevent: string;
  attendee: string;
};

export async function POST(req: NextRequest) {
  const data: joinSubeventSchema = await req.json();
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  // Validate payment if the subevent is paid (may get deprecated in favor of RLS, cuz this shit cost 2 db calls)
  let { data: fetchSubeventResponse, error: fetchSubeventError } =
    await supabase.from('sub_events').select('*').eq('id', data.subevent);

  if (fetchSubeventError) {
    return NextResponse.json(
      { error: fetchSubeventError.message },
      { status: 500 },
    );
  }
  if (fetchSubeventResponse && fetchSubeventResponse[0].entry_price != 0) {
    let { data: paymentStatusResponse, error: fetchPaymentStatusError } =
      await supabase
        .from('payments')
        .select('*')
        .eq('user', data.attendee)
        .eq('subevent', data.subevent);

    if (fetchPaymentStatusError) {
      return NextResponse.json(
        { error: fetchPaymentStatusError },
        { status: 500 },
      );
    }

    // @ts-ignore - typescript fuck shit gang gang
    if (!paymentStatusResponse[0].paid || !paymentStatusResponse[0]) {
      return NextResponse.json(
        { error: 'Bruh pay for the event scammer' },
        { status: 403 },
      );
    }
  }

  let { data: joinSubeventResponse, error: joinSubeventError } = await supabase
    .schema('connections')
    .from('subevents_attendees')
    // @ts-ignore - again, outdated types.
    .insert({
      subevent: data.subevent,
      attendee: user.data.user?.id,
    })
    .select();

  if (joinSubeventError) {
    return NextResponse.json(
      { error: joinSubeventError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ data: joinSubeventResponse }, { status: 200 });
}
