import { createClient } from './supabase/client';

export const processPayment = async (
  order_id: string,
  name: string,
  email: string,
  amount: string,
  subevent: string,
  event: string,
) => {
  const supabase = createClient();

  try {
    const options = {
      key: process.env.key_id,
      amount: parseFloat(amount) * 100,
      currency: 'INR',
      name: name,
      description: 'Test Transaction',
      order_id: order_id,
      handler: async function (response: any) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await fetch('/api/payment/invoice/check', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });

        const res: {
          isOk: boolean;
          message: string;
        } = await result.json();

        if (res.isOk) {
          const { data: paymentResponse, error: paymentError } = await supabase
            .from('payments')
            .update({ paid: true })
            .eq('id', order_id);

          if (!paymentError) {
            const userData = await supabase.auth.getUser();

            if (userData.data.user) {
              const { data: attendeeResponse, error: attendeeError } =
                await supabase
                  .schema('connections')
                  .from('event_attendees')
                  .select('id')
                  .eq('attendee', userData.data.user.id)
                  .eq('event', event)
                  .single();

              if (!attendeeError) {
                const { data: createPassResponse, error: createPassError } =
                  await supabase
                    .schema('connections')
                    .from('subevent_attendees')
                    .insert({
                      subevent: subevent,
                      attendee: attendeeResponse.id,
                    });
              }
            }
          }
        }
      },
      prefill: {
        name: name,
        email: email,
      },
      theme: {
        color: '#3399cc',
      },
    };

    // @ts-ignore
    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response: any) {
      alert(response.error.description);
    });
    paymentObject.open();
  } catch (error) {
    console.log(error);
  }
};
