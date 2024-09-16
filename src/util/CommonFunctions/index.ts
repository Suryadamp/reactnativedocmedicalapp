import RazorpayCheckout from 'react-native-razorpay';
import { COLORS, SIZES } from '../../constants';

type RazorpayPaymentOptions = {
  description?: string;
  amount?: string;
  name?: string;
};

export const handleRazorPayment = (
  item: RazorpayPaymentOptions,
): Promise<{
  success: boolean;
  response?: { razorpay_payment_id: string };
  error?: { code: string; description: string };
}> => {
  return new Promise((resolve, reject) => {
    const options = {
      description: item?.description,
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_PwafetXDyY8QOr', // Your api key
      amount: Number(item?.amount) * 100,
      name: item?.name,
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: { color: COLORS.background.primary },
    };

    RazorpayCheckout.open(options)
      .then((data: { razorpay_payment_id: string }) => {
        // handle success
        resolve({ success: true, response: data });
      })
      .catch((error: any) => {
        // handle failure
        reject({ success: false, error });
      });
  });
};
export const sizesSnapPoints = (size: number) => {
  const screenHeight = (SIZES.screenHeight / size) * (100 / SIZES.screenHeight);
  console.log(`${screenHeight}%`);
  return `${screenHeight}%`;
};
