import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import moment from 'moment-timezone';

const useActivitiesInsert = () => {
  const insertAction = async (actionType: string, documentId: string) => {
    const date = moment().tz('America/La_Paz');
    const actionDate = date.format();

    try {
      await addDoc(collection(db, 'activity'), {
        action_type: actionType,
        action_date: actionDate,
        document_id: documentId,
      });
    } catch (error) {
      console.error('Error inserting activity into Firestore:', error);
      throw error;
    }
  };

  return { insertAction };
};

export default useActivitiesInsert;
