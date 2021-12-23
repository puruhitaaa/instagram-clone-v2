import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../lib/firebase';

export default function useComments(postDocId) {
  const [comments, setComments] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(firestore, 'posts', postDocId, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          setComments(
            snapshot.docs.map((comment) => ({
              ...comment.data(),
              docId: comment.id,
            }))
          );
        }
      ),
    [firestore, postDocId]
  );

  return comments;
}
