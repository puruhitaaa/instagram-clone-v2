import ProfileHeader from './profile-header';
import ProfileFeed from './profile-feed';
import { useState } from 'react';
import ProfileModal from './profile-modal';

const Profile = ({ followers, profiles, posts }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal ? (
        <ProfileModal
          profiles={profiles}
          show={showModal}
          setShow={setShowModal}
        />
      ) : null}
      <ProfileHeader
        showModal={setShowModal}
        followers={followers}
        posts={posts}
        profiles={profiles}
      />
      <ProfileFeed posts={posts} />
    </>
  );
};

export default Profile;
