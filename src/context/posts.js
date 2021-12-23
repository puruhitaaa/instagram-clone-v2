import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { firestore } from '../lib/firebase';

const PostContext = createContext(null);

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(null);

  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(
            snapshot.docs.map((post) => ({ ...post.data(), docId: post.id }))
          );
        }
      ),
    []
  );

  return (
    <PostContext.Provider value={{ posts }}>{children}</PostContext.Provider>
  );
}

export const usePost = () => {
  return useContext(PostContext);
};
