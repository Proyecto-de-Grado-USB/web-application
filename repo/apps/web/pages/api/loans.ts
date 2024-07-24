import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllLoans, insertLoan, patchLoanState } from '../../app/lib/data';
import type { Loan } from '../../hooks/loanInterface';

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
      const { document_id, user_id, expiration_date, state, user_name, phone, email, teacher, career, reg_univ } = req.body;

      if (!document_id || !user_id || !expiration_date || !state || !user_name || !phone || !email || !teacher || !career || !reg_univ) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const newLoan: Loan = {
        document_id,
        user_id,
        expiration_date,
        state,
        user_name,
        phone,
        email,
        teacher,
        career,
        reg_univ
      };

      await insertLoan(newLoan);
      res.status(201).json({ message: 'Loan inserted successfully' });
    } catch (error) {
      console.error('Error inserting loan:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { loanId, newState } = req.body;

      if (!loanId || !newState) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      await patchLoanState(loanId, newState);
      res.status(200).json({ message: 'Loan state updated successfully' });
    } catch (error) {
      console.error('Error updating loan state:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
