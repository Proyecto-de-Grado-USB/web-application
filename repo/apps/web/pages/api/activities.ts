import type { NextApiRequest, NextApiResponse } from 'next';
import { insertActivity } from '../../app/lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { action_type, action_date } = req.body;

      if (!action_type || !action_date) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      await insertActivity(action_type, action_date);
      res.status(201).json({ message: 'Activity inserted successfully' });
    } catch (error) {
      console.error('Error inserting activity:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
