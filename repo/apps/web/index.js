const { db } = require('./firebase');
const { collection, deleteDoc, getDocs, addDoc } = require('firebase/firestore');

async function deleteAllDocuments(collectionName) {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletePromises);
}

async function insertAdminUsers() {
  const adminUsersRef = collection(db, 'users');
  
  const users = [
    { name: 'Pablo Terceros', email: 'user1@example.com', password: 'password1' },
    { name: 'Andres Camacho', email: 'user2@example.com', password: 'password2' }
  ];

  const insertPromises = users.map(user => addDoc(adminUsersRef, user));
  await Promise.all(insertPromises);
}

async function insertLoans() {
  const loansRef = collection(db, 'loans');

  const loanData = [
    {
      document_id: '978-0-19-715402-1',
      user_id: '1',
      expiration_date: '2024-08-20',
      state: 'standby',
      user_name: 'Juan Perez',
      phone: '70000001',
      email: 'juan.perez@example.com',
      teacher: 'Prof. Gomez',
      career: 'Ingeniería',
      reg_univ: '20210001'
    },
    {
      document_id: '978-0-19-715402-2',
      user_id: '2',
      expiration_date: '2024-07-20',
      state: 'pending',
      user_name: 'Maria Lopez',
      phone: '70000002',
      email: 'maria.lopez@example.com',
      teacher: 'Prof. Martinez',
      career: 'Medicina',
      reg_univ: '20210002'
    },
    {
      document_id: '978-0-19-715402-3',
      user_id: '3',
      expiration_date: '2024-07-20',
      state: 'completed',
      user_name: 'Carlos Ruiz',
      phone: '70000003',
      email: 'carlos.ruiz@example.com',
      teacher: 'Prof. Fernandez',
      career: 'Derecho',
      reg_univ: '20210003'
    }
  ];

  const insertPromises = loanData.map(loan => addDoc(loansRef, loan));
  await Promise.all(insertPromises);
}

async function insertActivity() {
  const activityRef = collection(db, 'activity');

  const activityData = [
    { action_type: 'search', action_date: '2024-10-27T22:50:43-04:00', document_id: null },
    { action_type: 'insert', action_date: '2024-10-28T22:50:43-04:00', document_id: '978-0-19-715402-1' },
    { action_type: 'modify', action_date: '2024-10-29T22:50:43-04:00', document_id: '978-0-19-715402-2' },
    { action_type: 'delete', action_date: '2024-10-28T22:50:43-04:00', document_id: '978-0-19-715402-3' }
  ];

  const insertPromises = activityData.map(action => addDoc(activityRef, action));
  await Promise.all(insertPromises);
}

async function main() {
    try {
      await deleteAllDocuments('users');
      await deleteAllDocuments('loans');
      await deleteAllDocuments('activity');
  
      await insertAdminUsers();
      await insertLoans();
      await insertActivity();
  
      console.log('Data reset and insertion complete!');
    } catch (err) {
      console.error('Error during execution:', err);
    } finally {
      process.exit();
    }
  }
  
  main();  
