export interface EmailMeta {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  avatar: string;
  avatarColor: string;
}

export const inboxEmails: EmailMeta[] = [
  {
    id: '1',
    sender: 'HDFC Bank',
    senderEmail: 'information@mailers.hdfcbank.bank.in',
    subject: 'Planned System Maintenance on 11 April 2026 : Service Impact Details',
    preview: 'If you are unable to view this message correctly, cli...',
    time: '9:15 PM',
    isRead: false,
    isStarred: false,
    hasAttachment: false,
    avatar: 'H',
    avatarColor: '#D71E28',
  },
  {
    id: '2',
    sender: 'HDFC Bank',
    senderEmail: 'information@mailers.hdfcbank.bank.in',
    subject: 'Revised TCS Rates on Foreign Exchange transactions under LRS from 1st April 2026',
    preview: 'Know More If you are unable to view t...',
    time: '2:37 PM',
    isRead: false,
    isStarred: false,
    hasAttachment: false,
    avatar: 'H',
    avatarColor: '#D71E28',
  },
  {
    id: '3',
    sender: 'me, Sam, Enrique 14',
    senderEmail: 'team@company.com',
    subject: 'My tokens are Deducted - Automatically',
    preview: 'Hello Team, Is any one addressing my email? it\'s been one day i kept no one is re...',
    time: 'Apr 9',
    isRead: true,
    isStarred: true,
    hasAttachment: true,
    avatar: 'S',
    avatarColor: '#1a73e8',
  },
  {
    id: '4',
    sender: 'HDFC Bank',
    senderEmail: 'information@mailers.hdfcbank.bank.in',
    subject: '🚨 Important: Calls from HDFC Bank start with 1600',
    preview: 'Please read this important security message If you are unable to view...',
    time: 'Apr 7',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'H',
    avatarColor: '#D71E28',
  },
  {
    id: '5',
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: '[GitHub] Your fine-grained personal access token is about to expire',
    preview: '@krishnakumarsabbu-prog, your fine-grained person...',
    time: 'Apr 7',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'G',
    avatarColor: '#24292e',
  },
  {
    id: '6',
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: '[GitHub] Sudo email verification code',
    preview: 'Please verify your identity, krishnakumarsabbu-prog Here is your GitHub sudo auth...',
    time: 'Apr 4',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    avatar: 'G',
    avatarColor: '#24292e',
  },
  {
    id: '7',
    sender: 'Team Rocket',
    senderEmail: 'team@rocket.new',
    subject: "Your Rocket App 'TodoApp' is ready for preview",
    preview: 'Hey there, Great news, your Rocket app is ready to preview! Click below to...',
    time: 'Apr 4',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'R',
    avatarColor: '#e8453c',
  },
  {
    id: '8',
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: '[GitHub] A third-party GitHub Application has been added to your account',
    preview: 'Hey krishnakumarsabbu-prog! A third-party Gi...',
    time: 'Apr 4',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'G',
    avatarColor: '#24292e',
  },
  {
    id: '9',
    sender: 'StackBlitz, Inc.',
    senderEmail: 'billing@stackblitz.com',
    subject: 'Your receipt from StackBlitz, Inc. #2398-9864',
    preview: 'Your receipt from StackBlitz, Inc. #2398-9864',
    time: 'Apr 2',
    isRead: true,
    isStarred: false,
    hasAttachment: true,
    avatar: 'S',
    avatarColor: '#1389fd',
  },
  {
    id: '10',
    sender: 'HDFC Bank',
    senderEmail: 'information@mailers.hdfcbank.bank.in',
    subject: 'Important: Changes to Your HDFC Bank Debit Card Fees Effective May 1st, 2026',
    preview: 'If you are unable to view this message co...',
    time: 'Apr 1',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'H',
    avatarColor: '#D71E28',
  },
  {
    id: '11',
    sender: 'Monika at Bolt.new',
    senderEmail: 'monika@bolt.new',
    subject: 'Draw me like one of your Bolt projects 🎨',
    preview: 'Turn flow diagrams into code with Bolt + Miro Connectors',
    time: 'Apr 1',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'M',
    avatarColor: '#0f9d58',
  },
  {
    id: '12',
    sender: 'Eric at Bolt.new',
    senderEmail: 'eric@bolt.new',
    subject: "Important update: We're retiring Bolt's V1 agent",
    preview: 'Action needed: Transfer your projects by August 3, 2026',
    time: 'Mar 31',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'E',
    avatarColor: '#673ab7',
  },
  {
    id: '13',
    sender: 'Google',
    senderEmail: 'no-reply@accounts.google.com',
    subject: 'Security alert for krishna.sabbu@gmail.com',
    preview: 'This is a copy of a security alert sent to krishna.sabbu@gmail.com. krishnaku...',
    time: 'Mar 27',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'G',
    avatarColor: '#4285f4',
  },
  {
    id: '14',
    sender: 'StackBlitz, Inc.',
    senderEmail: 'billing@stackblitz.com',
    subject: 'Your receipt from StackBlitz, Inc. #2664-7593',
    preview: 'Your receipt from StackBlitz, Inc. #2664-7593',
    time: 'Mar 27',
    isRead: true,
    isStarred: false,
    hasAttachment: true,
    avatar: 'S',
    avatarColor: '#1389fd',
  },
  {
    id: '15',
    sender: 'HDFC Bank Smart Sta.',
    senderEmail: 'statements@hdfcbank.com',
    subject: 'Email Account Statement of your HDFC Bank Account ***2701 for the period 27-Feb-2026 TO 26-Mar-2026',
    preview: 'View your Sm...',
    time: 'Mar 27',
    isRead: true,
    isStarred: false,
    hasAttachment: true,
    avatar: 'H',
    avatarColor: '#D71E28',
  },
  {
    id: '16',
    sender: 'HDFC Bank',
    senderEmail: 'information@mailers.hdfcbank.bank.in',
    subject: 'Insta Alert Price revision',
    preview: 'If you are unable to view this message correctly, click here Dear Customer, Greetings from HDFC ...',
    time: 'Mar 25',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'H',
    avatarColor: '#D71E28',
  },
  {
    id: '17',
    sender: 'Vishal from Rocket',
    senderEmail: 'vishal@rocket.new',
    subject: 'Welcome onboard! Your Rocket is ready to blast off',
    preview: 'Hey there, This is Vishal from Rocket.new. Thanks for signing up with u...',
    time: 'Mar 21',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'V',
    avatarColor: '#e8453c',
  },
  {
    id: '18',
    sender: '"Google AI Studio"',
    senderEmail: 'no-reply@google.com',
    subject: '[Billing Update] Gemini API usage tier updates and billing caps starting Apr 2026',
    preview: 'Review your usage to better manage you...',
    time: 'Mar 19',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'G',
    avatarColor: '#4285f4',
  },
  {
    id: '19',
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: '[GitHub] A first-party GitHub OAuth application has been added to your account',
    preview: 'Hey krishnakumarsabbu-prog! A first-pa...',
    time: 'Mar 18',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: 'G',
    avatarColor: '#24292e',
  },
  {
    id: '20',
    sender: 'GitHub',
    senderEmail: 'noreply@github.com',
    subject: '[GitHub] Sudo email verification code',
    preview: 'Please verify your identity, krishnakumarsabbu-prog Here is your GitHub sudo auth...',
    time: 'Mar 18',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    avatar: 'G',
    avatarColor: '#24292e',
  },
];

export const getEmailHtml = (emailId: string): string => {
  const emailTemplates: Record<string, string> = {
    '1': maintenanceEmail,
    '2': tcsRatesEmail,
  };
  return emailTemplates[emailId] || genericEmail(emailId);
};

const maintenanceEmail = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><style>body{margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;}</style></head>
<body>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:4px;overflow:hidden;">
      <tr><td style="background:#004C8F;padding:18px 24px;">
        <span style="color:#fff;font-size:22px;font-weight:700;letter-spacing:1px;font-family:Arial,sans-serif;">&#9632; HDFC BANK</span>
      </td></tr>
      <tr><td style="background:#f0f7ff;border-bottom:1px solid #dde8f5;padding:10px 24px;">
        <p style="margin:0;font-size:12px;color:#5a6a7e;text-align:center;font-family:Arial,sans-serif;">If you are unable to view this message correctly, <a href="#" style="color:#004C8F;">click here</a></p>
      </td></tr>
      <tr><td style="padding:32px 24px;">
        <h2 style="font-size:18px;font-weight:700;color:#1a2940;margin:0 0 20px;font-family:Arial,sans-serif;">Planned System Maintenance on 11 April 2026 : Service Impact Details</h2>
        <p style="font-size:14px;color:#333;margin:0 0 16px;font-family:Arial,sans-serif;line-height:1.6;">Dear Customer,</p>
        <p style="font-size:14px;color:#333;margin:0 0 16px;font-family:Arial,sans-serif;line-height:1.6;">To enhance your banking experience, we are undergoing essential system maintenance on 11th April 2026, 02:30 AM - 06:30 AM IST (4 Hours).</p>
        <p style="font-size:14px;color:#333;margin:0 0 16px;font-family:Arial,sans-serif;line-height:1.6;">It's important to note that during this period, the following HDFC Bank NetBanking and App services will be unavailable:</p>
        <ul style="font-size:14px;color:#333;font-family:Arial,sans-serif;line-height:2;padding-left:20px;">
          <li>Accounts</li><li>Deposits</li><li>Loans</li><li>Cards</li><li>Payments & Transfers</li><li>Investments</li>
        </ul>
        <p style="font-size:14px;color:#333;margin:16px 0;font-family:Arial,sans-serif;line-height:1.6;">We apologize for the inconvenience and thank you for your patience.</p>
        <p style="font-size:13px;color:#666;margin:0 0 8px;font-family:Arial,sans-serif;">Warm Regards,<br/><strong>HDFC Bank Customer Care</strong></p>
      </td></tr>
      <tr><td style="background:#f0f4f8;border-top:1px solid #dde8f5;padding:20px 24px;">
        <p style="font-size:11px;color:#888;margin:0;text-align:center;font-family:Arial,sans-serif;">This is an auto-generated email. Please do not reply.<br/>HDFC Bank Ltd., HDFC Bank House, Senapati Bapat Marg, Lower Parel, Mumbai - 400 013.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;

const tcsRatesEmail = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><style>body{margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;}</style></head>
<body>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:4px;overflow:hidden;">
      <tr><td style="background:#004C8F;padding:18px 24px;">
        <span style="color:#fff;font-size:22px;font-weight:700;letter-spacing:1px;font-family:Arial,sans-serif;">&#9632; HDFC BANK</span>
      </td></tr>
      <tr><td style="background:#f0f7ff;border-bottom:1px solid #dde8f5;padding:10px 24px;">
        <p style="margin:0;font-size:12px;color:#5a6a7e;text-align:center;font-family:Arial,sans-serif;">If you are unable to view this message correctly, <a href="#" style="color:#004C8F;">click here</a></p>
      </td></tr>
      <tr><td style="padding:32px 24px;">
        <h2 style="font-size:18px;font-weight:700;color:#1a2940;margin:0 0 20px;font-family:Arial,sans-serif;">Revised TCS Rates on Foreign Exchange Transactions under LRS from 1st April 2026</h2>
        <p style="font-size:14px;color:#333;margin:0 0 16px;font-family:Arial,sans-serif;line-height:1.6;"><strong>Dear Customer,</strong></p>
        <p style="font-size:14px;color:#333;margin:0 0 16px;font-family:Arial,sans-serif;line-height:1.6;">Thank you for being a valued HDFC Bank customer.</p>
        <p style="font-size:14px;color:#333;margin:0 0 16px;font-family:Arial,sans-serif;line-height:1.6;">We would like to share an important update on the TCS (Tax Collected at Source) rates for foreign currency transactions and remittances under the Liberalised Remittance Scheme (LRS), effective from 1 April 2026.</p>
        <p style="font-size:14px;color:#333;margin:0 0 24px;font-family:Arial,sans-serif;line-height:1.6;">These rates are based on the latest government guidelines and apply to all resident individuals using LRS for remittances or Forex purchases.</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dde8f5;border-radius:4px;overflow:hidden;margin-bottom:24px;">
          <tr style="background:#004C8F;">
            <th style="padding:12px 16px;text-align:left;color:#fff;font-size:13px;font-family:Arial,sans-serif;">Purpose</th>
            <th style="padding:12px 16px;text-align:center;color:#fff;font-size:13px;font-family:Arial,sans-serif;">TCS Rate (upto ₹7 lakh)</th>
            <th style="padding:12px 16px;text-align:center;color:#fff;font-size:13px;font-family:Arial,sans-serif;">TCS Rate (above ₹7 lakh)</th>
          </tr>
          <tr style="background:#f9fbff;"><td style="padding:11px 16px;font-size:13px;color:#333;border-top:1px solid #dde8f5;font-family:Arial,sans-serif;">Education (Loan from Financial Institution)</td><td style="padding:11px 16px;font-size:13px;text-align:center;border-top:1px solid #dde8f5;font-family:Arial,sans-serif;">Nil</td><td style="padding:11px 16px;font-size:13px;text-align:center;border-top:1px solid #dde8f5;font-family:Arial,sans-serif;">0.5%</td></tr>
          <tr><td style="padding:11px 16px;font-size:13px;color:#333;border-top:1px solid #dde8f5;font-family:Arial,sans-serif;">Medical Treatment Abroad</td><td style="padding:11px 16px;font-size:13px;text-align:center;border-top:1px solid #dde8f5;font-family:Arial,sans-serif;">Nil</td><td style="padding:11px 16px;font-size:13px;text-align:center;border-top:1px solid #dde8f5;font-family:Arial,sans-serif;">5%</td></tr>
          <tr style="background:#f9fbff;"><td style="padding:11px 16px;font-size:13px;color:#333;border-top:1px solid #dde8f5;font-family:Arial,sans-serif;">Foreign Travel (Tour Package)</td><td style="padding:11px 16px;font-size:13px;text-align:center;border-top:1px solid #dde8f5;font-family:Arial,sans-serif;">Nil</td><td style="padding:11px 16px;font-size:13px;text-align:center;border-top:1px solid #dde8f5;font-family:Arial,sans-serif;">5%</td></tr>
          <tr><td style="padding:11px 16px;font-size:13px;color:#333;border-top:1px solid #dde8f5;font-family:Arial,sans-serif;">Other Remittances (e.g. investments, gifts)</td><td style="padding:11px 16px;font-size:13px;text-align:center;border-top:1px solid #dde8f5;font-family:Arial,sans-serif;">Nil</td><td style="padding:11px 16px;font-size:13px;text-align:center;border-top:1px solid #dde8f5;font-family:Arial,sans-serif;">20%</td></tr>
        </table>
        <p style="font-size:14px;color:#333;margin:0 0 16px;font-family:Arial,sans-serif;line-height:1.6;"><strong>Note:</strong> TCS collected can be claimed as a tax credit while filing your Income Tax Return (ITR).</p>
        <p style="font-size:13px;color:#666;margin:0;font-family:Arial,sans-serif;">Warm Regards,<br/><strong>HDFC Bank Customer Care</strong></p>
      </td></tr>
      <tr><td style="background:#f0f4f8;border-top:1px solid #dde8f5;padding:20px 24px;">
        <p style="font-size:11px;color:#888;margin:0;text-align:center;font-family:Arial,sans-serif;">This is an auto-generated email. Please do not reply.<br/>HDFC Bank Ltd., HDFC Bank House, Senapati Bapat Marg, Lower Parel, Mumbai - 400 013.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;

function genericEmail(id: string): string {
  const email = inboxEmails.find(e => e.id === id);
  if (!email) return '<html><body><p>Email not found</p></body></html>';
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/><style>body{margin:0;padding:24px;background:#fff;font-family:Arial,sans-serif;color:#202124;}</style></head>
<body>
  <h2 style="font-size:18px;margin:0 0 16px;">${email.subject}</h2>
  <p style="font-size:14px;color:#5f6368;margin:0 0 24px;">From: ${email.sender} &lt;${email.senderEmail}&gt;</p>
  <p style="font-size:14px;line-height:1.7;margin:0 0 16px;">Dear User,</p>
  <p style="font-size:14px;line-height:1.7;margin:0 0 16px;">${email.preview}</p>
  <p style="font-size:14px;line-height:1.7;margin:0 0 16px;">Please review the details and take necessary action at your earliest convenience.</p>
  <p style="font-size:14px;margin:24px 0 0;">Best regards,<br/><strong>${email.sender}</strong></p>
</body></html>`;
}
