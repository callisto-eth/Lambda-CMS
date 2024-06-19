import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';
import { handleErrors } from '@/utils/helpers';

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

  const { error } = await supabase
    .from('payments')
    .update({ paid: true })
    .eq('id', orderCreationId)
    .single();

  if (error) handleErrors(error.message, 500);

  return NextResponse.json(
    { message: 'payment verified successfully', isOk: true },
    { status: 200 },
  );
}
