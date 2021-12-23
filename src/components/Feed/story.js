import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Stories from 'react-insta-stories';

const Story = ({ profileImage, username, items }) => {
  const [showStory, setShowStory] = useState(false);

  const _renderStoryView = () => (
    <>
      <Transition.Root show={showStory} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setShowStory}
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
              <div className="inline-block rounded-lg overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl">
                <Stories defaultInterval={6500} stories={items} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        onClick={() => setShowStory(true)}
        src={profileImage}
        alt={`profile-${username}`}
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
      />
      <p className="text-xs font-bold">{username}</p>
      {showStory ? _renderStoryView() : null}
    </div>
  );
};

export default Story;
