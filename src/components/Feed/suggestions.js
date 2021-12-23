import useProfiles from '../../hooks/profiles';
import useIsFollowing from '../../hooks/isFollowing';
import { useAuth } from '../../context/auth';
import { useRouter } from 'next/router';

const Suggestions = () => {
  const { user } = useAuth();
  const router = useRouter();
  const profiles = useProfiles(user?.displayName);
  const isFollowing = useIsFollowing(user?.uid);

  console.log('These logs are from suggestions.js', profiles);
  console.log('Profiles:', profiles);
  console.log('User:', user);
  console.log('IsFollowing:', isFollowing);

  return (
    <div className="flex flex-col mt-14 ml-10">
      <p className="p-4 text-sm font-semibold text-gray-base">Suggestions</p>
      {profiles.length > 0
        ? profiles.map((profile) => (
            <div
              key={profile.userId}
              className="flex items-center space-x-5 p-4"
            >
              <img
                className="w-10 h-10 object-contain rounded-full cursor-pointer"
                onClick={() => router.push(`profile/${profile.username}`)}
                src={profile.profileImage}
                alt={`${profile.username}'s img`}
              />
              <p className="text-sm font-semibold flex-1">{profile.username}</p>
              <span className="cursor-pointer text-xs bg-blue-medium text-white font-bold px-3 py-2 rounded">
                Follow
              </span>
            </div>
          ))
        : null}
    </div>
  );
};

export default Suggestions;
