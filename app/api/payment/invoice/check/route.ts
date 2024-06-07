import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
) => {
  const keySecret = process.env.RAZORPAY_SECRET;
  if (!keySecret) {
    throw new Error(
      'Razorpay key secret is not defined in environment variables.',
    );
  }
  const sig = crypto
    .createHmac('sha256', keySecret)
    .update(razorpayOrderId + '|' + razorpayPaymentId)
    .digest('hex');
  return sig;
};

export async function POST(request: NextRequest) {
  const { orderCreationId, razorpayPaymentId, razorpaySignature } =
    await request.json();

  const signature = generatedSignature(orderCreationId, razorpayPaymentId);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_KEY || '',
  );

  if (signature !== razorpaySignature) {
    return NextResponse.json(
      { error: 'Unpaid or failed', isOk: false },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from('payments')
    .update({ paid: true })
    .match({ rzp_order_id: orderCreationId })
    .single();

  console.log(cookies().getAll());
  return NextResponse.json(
    { message: 'payment verified successfully', isOk: true },
    { status: 200 },
  );
}
