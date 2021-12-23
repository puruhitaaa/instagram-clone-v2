import { Fragment, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { doc, updateDoc } from '@firebase/firestore';
import { updateProfile } from '@firebase/auth';
import { firestore } from '../../lib/firebase';
import { auth } from '../../lib/firebase';

const ProfileModal = ({ show, setShow, profiles }) => {
  const [username, setUsername] = useState('');
  const [biography, setBiography] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const ref = doc(firestore, 'profiles', profiles[0]?.userId);

    try {
      await updateProfile(auth?.currentUser, {
        displayName: username,
      });

      await updateDoc(ref, {
        username: !username ? profiles[0]?.username : username,
        biography: !biography ? profiles[0]?.biography : biography,
      });
      // router.reload(window.location.pathname);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setShow}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            aria-hidden={true}
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <form onSubmit={handleEditProfile} className="space-y-3">
                <div className="flex flex-col p-2">
                  <label className="mb-2" htmlFor="biography">
                    Bio
                  </label>
                  <input
                    className="bg-transparent"
                    name="biography"
                    type="text"
                    placeholder="Input a new bio..."
                    defaultValue={profiles[0]?.biography}
                    onChange={(e) => setBiography(e.target.value)}
                  />
                </div>

                <div className="flex flex-col p-2">
                  <label className="mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="bg-transparent"
                    name="username"
                    type="text"
                    placeholder="Input a new username..."
                    defaultValue={profiles[0]?.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <Fragment>
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Update Profile
                  </button>
                </Fragment>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProfileModal;
