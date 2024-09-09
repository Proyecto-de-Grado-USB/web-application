import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

type Activity = {
  action_id: string;
  action_type: string;
  action_date: string;
  document_id: string;
};

const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'activity'));
        const activitiesData = querySnapshot.docs.map(doc => ({
          action_id: doc.id,
          ...doc.data()
        })) as Activity[];
        setActivities(activitiesData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, isLoading, error };
};

export default useActivities;
