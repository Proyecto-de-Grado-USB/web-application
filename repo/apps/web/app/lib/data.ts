import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export async function findUserByEmailAndPassword(email: string, password: string) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute<any[]>(
      'SELECT * FROM admin_users WHERE email = ? AND password = ?',
      [email, password]
    );
    if (rows.length > 0) {
      const user = rows[0];
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
      };
    }
    return null;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function getAllLoans() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query<any[]>('SELECT * FROM loans');
    return rows;
  } catch (error) {
    console.error('Error querying loans:', error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function insertLoan(document_id: string, user_id: string, expiration_date: string, state: string) {
  const connection = await pool.getConnection();
  try {
    await connection.execute(
      'INSERT INTO loans (document_id, user_id, expiration_date, state) VALUES (?, ?, ?, ?)',
      [document_id, user_id, expiration_date, state]
    );
  } catch (error) {
    console.error('Error inserting loan:', error);
    throw error;
  } finally {
    connection.release();
  }
}