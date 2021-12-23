import { collection, onSnapshot, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../lib/firebase';

export default function useLikes(postDocId) {
  const [likes, setLikes] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore, 'posts', postDocId, 'likes')),
        (snapshot) => {
          setLikes(snapshot.docs);
        }
      ),
    [firestore, postDocId]
  );

  return likes;
}
