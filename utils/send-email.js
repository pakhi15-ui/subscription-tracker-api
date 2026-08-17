import dayjs from "dayjs";
import transporter, { accountEmail } from "../config/nodemailer.js";
import { generateEmailTemplate } from "./email-template.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Missing required parameters: to, type");

  const { subject, body } = generateEmailTemplate({
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
    daysLeft: type,
  });

  const mailOptions = {
    from: accountEmail,
    to,
    subject,
    html: body,
  };

  await transporter.sendMail(mailOptions);
};