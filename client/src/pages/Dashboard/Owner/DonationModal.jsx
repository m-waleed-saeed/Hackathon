// // DonationModal.js
// import React, { useState } from 'react';
// import { Modal, Form, Input, InputNumber, Button, message, Card, Divider } from 'antd';
// // import { loadStripe } from '@stripe/stripe-js';
// // import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import { baseURL } from '../../../redux/store';

// // const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your Stripe publishable key

// const CheckoutForm = ({ campaign, onSuccess, onCancel }) => {
//   const [loading, setLoading] = useState(false);
//   // const stripe = useStripe();
//   // const elements = useElements();
//   const [form] = Form.useForm();

//   const handleSubmit = async (values) => {
//             if (!stripe || !elements) {
//       return;
//     }

//     setLoading(true);

//     try {
//       // Create payment intent on your server
//       const { data: { clientSecret } } = await axios.post(`${baseURL}/create-payment-intent`, {
//         amount: values.amount * 100, // Convert to cents
//         currency: 'usd',
//         campaignId: campaign._id,
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });

//       // Confirm the payment with Stripe
//         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         if (!stripe || !elements) {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: values.name,
//             email: values.email,
//           },
//         }
//       });

//       if (error) {
//         message.error(error.message);
//         setLoading(false);
//         return;
//       }

//       if (paymentIntent.status === 'succeeded') {
//         // Record the donation in your database
//         await axios.post(`${baseURL}/donations`, {
//           campaignId: campaign._id,
//           amount: values.amount,
//           paymentIntentId: paymentIntent.id,
//         }, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//         });

//         message.success('Payment successful!');
//         onSuccess();
//       }
//     } catch (error) {
//       console.error(error);
//       message.error('Payment failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form form={form} layout="vertical" onFinish={handleSubmit}>
//       <div style={{ marginBottom: '16px' }}>
//         <h3>Donating to: {campaign.title}</h3>
//         <p>Goal: ${campaign.goalAmount} | Raised: ${campaign.raisedAmount}</p>
//       </div>

//       <Form.Item
//         name="name"
//         label="Full Name"
//         rules={[{ required: true, message: 'Please enter your name' }]}
//       >
//         <Input placeholder="John Doe" />
//       </Form.Item>

//       <Form.Item
//         name="email"
//         label="Email"
//         rules={[
//           { required: true, message: 'Please enter your email' },
//           { type: 'email', message: 'Please enter a valid email' }
//         ]}
//       >
//         <Input placeholder="john@example.com" />
//       </Form.Item>

//       <Form.Item
//         name="amount"
//         label="Donation Amount ($)"
//         rules={[{ required: true, message: 'Please enter donation amount' }]}
//       >
//         <InputNumber 
//           min={1} 
//           style={{ width: '100%' }} 
//           placeholder="Enter amount"
//         />
//       </Form.Item>

//       <Form.Item
//         label="Credit Card Details"
//         required
//       >
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: '16px',
//                 color: '#424770',
//                 '::placeholder': {
//                   color: '#aab7c4',
//                 },
//               },
//               invalid: {
//                 color: '#9e2146',
//               },
//             },
//           }}
//         />
//       </Form.Item>

//       <Divider />

//       <Form.Item>
//         <Button 
//           type="primary" 
//           htmlType="submit" 
//           loading={loading} 
//           disabled={!stripe}
//           style={{ width: '100%', marginBottom: '10px' }}
//         >
//           Donate ${form.getFieldValue('amount') || 0}
//         </Button>
//         <Button onClick={onCancel} style={{ width: '100%' }}>
//           Cancel
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// const DonationModal = ({ visible, onCancel, campaign, onSuccess }) => {
//   return (
//     <Modal
//       title="Make a Donation"
//       visible={visible}
//       onCancel={onCancel}
//       footer={null}
//       width={500}
//     >
//       {campaign && (
//         <Elements stripe={stripePromise}>
//           <CheckoutForm 
//             campaign={campaign} 
//             onSuccess={onSuccess} 
//             onCancel={onCancel}
//           />
//         </Elements>
//       )}
//     </Modal>
//   );
// };

// export default DonationModal;