export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  daysLeft,
}) => {
  const subject = `Reminder: Your ${subscriptionName} subscription renews in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`;

  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Hi ${userName},</h2>
      <p>This is a friendly reminder that your <strong>${subscriptionName}</strong> subscription is renewing soon.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr><td style="padding: 8px 0;"><strong>Plan</strong></td><td>${planName}</td></tr>
        <tr><td style="padding: 8px 0;"><strong>Price</strong></td><td>${price}</td></tr>
        <tr><td style="padding: 8px 0;"><strong>Renewal Date</strong></td><td>${renewalDate}</td></tr>
        <tr><td style="padding: 8px 0;"><strong>Payment Method</strong></td><td>${paymentMethod}</td></tr>
      </table>
      <p>If you'd like to make changes or cancel, please do so before the renewal date.</p>
      <p>Thanks,<br/>Subscription Tracker</p>
    </div>
  `;

  return { subject, body };
};