import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllLoans } from '../../app/lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const loans = await getAllLoans();
    res.status(200).json(loans);
  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
