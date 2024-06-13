import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';

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

  const supabase = createClient();

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

  return NextResponse.json(
    { message: 'payment verified successfully', isOk: true },
    { status: 200 },
  );
}
