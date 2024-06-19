import { Database } from '@/types/supabase';
import { createClient } from './supabase/client';
import { handleErrors } from './helpers';

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
      description: 'Transcation for Subevent Registration',
      order_id: order_id,
      handler: async function (response: any) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await fetch(
          process.env.NODE_ENV === 'production'
            ? 'https://lambda.events/api/payment/invoice/check'
            : `http://localhost:3000/api/payment/invoice/check`,
          {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
          },
        );

        const res: {
          isOk: boolean;
          message: string;
        } = await result.json();

        console.log(res);
        if (res.isOk) {
          const { error: paymentError } = await supabase
            .from('payments')
            .update({ paid: true })
            .eq('id', order_id);

          if (!paymentError) {
            const userData = await supabase.auth.getUser();

            if (userData.data.user) {
              const {
                data: eventAttendeesResponse,
                error: eventAttendeesError,
                status: eventAttendeesStatus,
              }: {
                data:
                  | Database['connections']['Tables']['event_attendees']['Row'][]
                  | null;
                error: string | null;
                status: number;
              } = await (
                await fetch(
                  process.env.NODE_ENV === 'production'
                    ? 'https://lambda.events/api/event/attendee/fetch'
                    : `http://localhost:3000/api/event/attendee/fetch`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ eventId: event }),
                  },
                )
              ).json();

              if (eventAttendeesError)
                handleErrors(eventAttendeesError, eventAttendeesStatus);

              if (
                eventAttendeesResponse &&
                userData.data.user &&
                eventAttendeesResponse.length > 0
              ) {
                const attendeeID = eventAttendeesResponse.find(
                  (eventAttendee) => {
                    return eventAttendee.attendee === userData.data.user!.id;
                  },
                );

                if (attendeeID && attendeeID.id) {
                  const { error: createSubEventAttendeeError } = await supabase
                    .schema('connections')
                    .from('subevent_attendees')
                    .insert({
                      subevent: subevent,
                      event_attendee: attendeeID.id,
                    });

                  if (createSubEventAttendeeError)
                    handleErrors(createSubEventAttendeeError.message, 500);
                }
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
        color: '#FB4500',
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
