import { collection, onSnapshot, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../lib/firebase';

export default function useIsFollowing(loggedInUser) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore, 'profiles', loggedInUser, 'followings')),
        (snapshot) => {
          if (snapshot.docs.length === 0) {
            setIsFollowing(false);
          } else {
            setIsFollowing(true);
          }
        }
      ),
    [firestore, loggedInUser]
  );

  return isFollowing;
}
