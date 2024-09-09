export interface Loan {
    document_id: string;
    user_id: string;
    expiration_date: string;
    state: 'standby' | 'completed' | 'pending' | 'rejected';
    user_name: string;
    phone: string;
    email: string;
    teacher: string;
    career: string;
    reg_univ: string;
  }