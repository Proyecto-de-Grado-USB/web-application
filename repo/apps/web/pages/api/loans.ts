import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllLoans } from '../../app/lib/data';
import { insertLoan } from '../../app/lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const loans = await getAllLoans();
      res.status(200).json(loans);
    } catch (error) {
      console.error('Error fetching loans:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { document_id, user_id, expiration_date, state } = req.body;
      if (!document_id || !user_id || !expiration_date || !state) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      await insertLoan(document_id, user_id, expiration_date, state);
      res.status(201).json({ message: 'Loan inserted successfully' });
    } catch (error) {
      console.error('Error inserting loan:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
