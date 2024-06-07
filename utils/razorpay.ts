export const processPayment = async (
  order_id: string,
  name: string,
  email: string,
  amount: string,
) => {
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

        const result = await fetch('/api/payment/verify', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
        const res = await result.json();

        if (res.isOk) alert('payment succeed');
        else {
          alert(res.message);
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
