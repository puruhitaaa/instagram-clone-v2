import { Fragment, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/outline';
import { useAuth } from '../../context/auth';
import { v4 as uuidv4 } from 'uuid';
import {
  arrayUnion,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  setDoc,
} from '@firebase/firestore';
import { firestore, storage } from '../../lib/firebase';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';

const StoryModal = ({ showModal, setShowModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(null);
  const filePickerRef = useRef(null);
  const { user } = useAuth();

  const uploadStory = async () => {
    if (loading) return;

    setLoading(true);

    await setDoc(
      doc(firestore, 'stories', user.uid),
      {
        username: user.displayName,
        profileImage: user.photoURL,
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );

    const imageRef = ref(storage, `stories/${user.uid}/image-${uuidv4()}`);

    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        const docRef = doc(firestore, 'stories', user.uid);

        await updateDoc(docRef, {
          items: arrayUnion({ downloadURL }),
        });
      }
    );

    setShowModal(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToStory = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setShowModal}
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
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden={true}
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
              <div>
                {selectedFile ? (
                  <img
                    className="w-full object-contain cursor-pointer"
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    alt="selected-file"
                  />
                ) : (
                  <div
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                    onClick={() => filePickerRef.current.click()}
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden={true}
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload to story
                    </Dialog.Title>

                    <div>
                      <input
                        ref={filePickerRef}
                        hidden={true}
                        onChange={addImageToStory}
                        type="file"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    disabled={!selectedFile}
                    onClick={uploadStory}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                  >
                    {loading ? 'Uploading...' : 'Upload Story'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default StoryModal;
