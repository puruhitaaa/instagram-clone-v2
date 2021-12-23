import { collection, onSnapshot, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../lib/firebase';

export default function useStories() {
  const [stories, setStories] = useState([]);

  useEffect(
    () =>
      onSnapshot(query(collection(firestore, 'stories')), (snapshot) => {
        setStories(
          snapshot.docs.map((story) => ({
            ...story.data(),
            docId: story.id,
          }))
        );
      }),
    [firestore]
  );

  return stories;
}
