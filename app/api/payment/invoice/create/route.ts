import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID as string,
  key_secret: process.env.RAZORPAY_SECRET,
});

type CreateInvoiceSchema = {
  amount: string;
  event: string;
  subevent: string;
};

export async function POST(request: NextRequest) {
  const data: CreateInvoiceSchema = await request.json();
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  var orderOptions = {
    amount: parseFloat(data.amount) * 100,
    currency: 'INR',
    receipt: 'rcp1',
  };

  const order = await razorpay.orders.create(orderOptions);

  if (user.data.user) {
    let { data: createInvoiceResponse, error: createInvoiceError } =
      await supabase
        .from('payments')
        .insert({
          id: order.id,
          user: user.data.user.id,
          subevent: data.subevent,
          amount: parseFloat(data.amount) * 100,
        })
        .select();

    if (createInvoiceError) {
      return NextResponse.json(
        { error: createInvoiceError.message },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ orderId: order.id }, { status: 200 });
}
