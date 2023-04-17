import { NextApiRequest, NextApiResponse } from 'next';
import api from 'lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET plz thx.' });
  }

  const isHealthy = await api.getHealth();
  if (!isHealthy) {
    // realistically this wouldn't execute but just example
    res.status(500).json({ text: 'OKAY NOW YOU CAN PANIC' });
  }

  res.status(200).json({ text: 'All good in the hood.' });
}
