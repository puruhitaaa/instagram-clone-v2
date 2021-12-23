import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  onSnapshot,
} from '@firebase/firestore';
import { firestore } from '../../src/lib/firebase';
import { withProtected } from '../../src/hooks/route';
import Profile from '../../src/components/Profile';
import Header from '../../src/components/Header';

function ProfilePage() {
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    async function fetchUserProfileByUsername(usernameParam) {
      const q = query(
        collection(firestore, 'profiles'),
        where('username', '==', usernameParam)
      );
      const querySnapshot = await getDocs(q);

      setProfiles(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }))
      );
    }

    async function fetchUserFollowers() {
      const q = query(
        collection(firestore, 'profiles', profiles[0]?.userId, 'followers')
      );
      const querySnapshot = await getDocs(q);

      setFollowers(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }))
      );
    }

    async function fetchPostsByUsername(usernameParam) {
      const q = query(
        collection(firestore, 'posts'),
        where('username', '==', usernameParam)
      );
      const querySnapshot = await getDocs(q, orderBy('timestamp', 'desc'));

      setPosts(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }))
      );
    }

    fetchUserProfileByUsername(username ? username : null);
    fetchPostsByUsername(username ? username : null);

    if (profiles.length > 0) {
      fetchUserFollowers();
    }
  }, []);

  return (
    <div className="bg-gray-background min-h-screen">
      <Head>
        <title>{username}'s Profile</title>
      </Head>

      <Header />

      <div className="mx-auto max-w-screen-lg">
        <Profile
          followers={followers.length > 0 ? followers.length : null}
          profiles={profiles}
          posts={posts}
        />
      </div>
    </div>
  );
}

export default withProtected(ProfilePage);
