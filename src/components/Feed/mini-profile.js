import { signOut } from '@firebase/auth';
import { useAuth } from '../../context/auth';
import { auth } from '../../lib/firebase';

const MiniProfile = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={user?.photoURL}
        alt={`${user?.displayName}'s profile`}
        className="w-16 h-16 rounded-full border p-[2px]"
      />

      <div className="flex-1 mx-4 space-y-1">
        <h2 className="text-sm font-bold">{user?.displayName}</h2>
        <h3 className="text-xs text-gray-base">Welcome to Instagram</h3>
      </div>

      <button
        onClick={() => signOut(auth)}
        className="text-blue-500 text-xs font-semibold"
      >
        Sign out
      </button>
    </div>
  );
};

export default MiniProfile;
