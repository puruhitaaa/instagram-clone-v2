import { CogIcon } from '@heroicons/react/outline';
import { useAuth } from '../../context/auth';

const ProfileHeader = ({ showModal, followers, posts, profiles }) => {
  const { user } = useAuth();

  return (
    <div className="sm:max-w-lg mx-auto flex items-center justify-between h-[200px] p-4">
      <div>
        <img
          className="w-40 h-40 rounded-full"
          src={profiles[0]?.profileImage}
          alt={profiles[0]?.username}
        />
      </div>

      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl">{profiles[0]?.username}</h2>
          {profiles[0]?.username === user?.displayName ? null : (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white px-3 py-2"
              type="button"
            >
              Follow
            </button>
          )}

          {profiles[0]?.username === user?.displayName ? (
            <span
              onClick={() => showModal(true)}
              className="bg-gray-background cursor-pointer h-5 w-5"
            >
              <CogIcon className="h-full hover:scale-110 transition-transform" />
            </span>
          ) : null}
        </div>

        <div className="flex items-center space-x-4">
          <span className="inline-flex">
            <p className="font-bold mr-2">{posts?.length}</p> posts
          </span>
          <span className="inline-flex">
            <p className="font-bold mr-2">{followers}</p> followers
          </span>
          <span className="inline-flex">
            <p className="font-bold mr-2">{profiles[0]?.followings || 0}</p>{' '}
            followings
          </span>
        </div>

        <div>
          <p>{profiles[0]?.biography}</p>
        </div>

        <div>
          <p>{profiles[0]?.website}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
