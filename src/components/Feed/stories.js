import { useState } from 'react';
import useStories from '../../hooks/stories';
import { PlusCircleIcon } from '@heroicons/react/outline';

import Story from './story';
import StoryModal from './story-modal';

const Stories = () => {
  const [showModal, setShowModal] = useState(false);
  const stories = useStories();

  return (
    <div className="flex items-center space-x-4 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black-faded">
      {showModal ? (
        <StoryModal showModal={showModal} setShowModal={setShowModal} />
      ) : null}

      <div className="flex flex-col items-center">
        <PlusCircleIcon
          onClick={() => setShowModal(true)}
          className="h-14 w-14 text-red-500 cursor-pointer hover:scale-110 transition transform duration-200 ease-out p-[1.5px]"
        />
        <p className="text-xs font-semibold">Add Story</p>
      </div>

      {stories.map((story) => (
        <Story
          key={story.docId}
          profileImage={story.profileImage}
          username={story.username}
          items={story.items.map((item) => item.downloadURL)}
        />
      ))}
    </div>
  );
};

export default Stories;
