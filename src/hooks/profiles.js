import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../lib/firebase';

export default function useProfiles(loggedInUsername) {
  const [profiles, setProfiles] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(firestore, 'profiles'),
          where('username', '!=', loggedInUsername),
          orderBy('username', 'asc')
        ),
        (snapshot) => {
          setProfiles(snapshot.docs.map((profile) => profile.data()));
        }
      ),
    [firestore]
  );

  return profiles;
}
