import { sendPasswordResetCode } from '../utils/authUtils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const success = await sendPasswordResetCode(email);

  if (success) {
    res.status(200).json({ message: 'Code sent successfully' });
  } else {
    res.status(500).json({ error: 'Failed to send code' });
  }
}