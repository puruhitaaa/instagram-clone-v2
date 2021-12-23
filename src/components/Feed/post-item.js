import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
} from '@firebase/firestore';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { firestore } from '../../lib/firebase';
import useComments from '../../hooks/comments';
import useLikes from '../../hooks/likes';
import Moment from 'react-moment';
import router from 'next/router';

const Post = ({
  username,
  image,
  caption,
  id: postDocId,
  profileImage,
  timestamp,
}) => {
  const { user } = useAuth();
  const comments = useComments(postDocId);
  const likes = useLikes(postDocId);

  const [comment, setComment] = useState('');
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () => setHasLiked(likes.findIndex((like) => like.id === user?.uid) !== -1),
    [likes]
  );

  const handleLike = async () => {
    if (hasLiked) {
      await deleteDoc(doc(firestore, 'posts', postDocId, 'likes', user.uid));
    } else {
      await setDoc(doc(firestore, 'posts', postDocId, 'likes', user.uid), {
        username: user.displayName,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(firestore, 'posts', postDocId, 'comments'), {
      comment: commentToSend,
      username: user.displayName,
      profileImage: user.photoURL,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-center p-5">
        <img
          onClick={() => router.push(`/profile/${username}`)}
          src={profileImage}
          alt={`${username}'s profile`}
          className="rounded-full h-12 w-12 object-contain cursor-pointer border p-1 mr-3"
        />
        <p className="flex-1 text-sm font-bold tracking-wide">{username}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>

      <img
        src={image}
        alt={`${username}'s post`}
        className="object-cover w-full"
      />

      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          {hasLiked ? (
            <HeartIconFilled
              onClick={handleLike}
              className="btn text-red-500"
            />
          ) : (
            <HeartIcon onClick={handleLike} className="btn" />
          )}
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>

        <BookmarkIcon className="btn" />
      </div>

      <p className="px-5 pt-5 pb-2 truncate">
        {likes.length > 0 ? (
          <p className="font-bold tracking-wide mb-1">{likes.length} likes</p>
        ) : null}

        <span className="font-bold text-sm tracking-wide mr-1">
          {username}{' '}
        </span>
        {caption}
      </p>

      <p className="px-5 pb-5 truncate">
        <Moment className="text-xs tracking-wide lowercase" fromNow>
          {timestamp?.toDate()}
        </Moment>
      </p>

      {comments.length > 0 ? (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black-faded scrollbar-thin">
          {comments.map((comment) => (
            <div
              className="flex items-center space-x-2 mb-3"
              key={comment.docId}
            >
              <img
                onClick={() => router.push(`/profile/${comment.username}`)}
                src={comment.profileImage}
                alt={`${username}'s comment`}
                className="h-7 cursor-pointer rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold tracking-wide mr-1">
                  {comment.username}
                </span>{' '}
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <form onSubmit={sendComment} className="flex items-center p-4">
        <EmojiHappyIcon className="h-7 cursor-pointer" />

        <input
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Add a comment..."
          className="border-none flex-1 focus:ring-0 outline-none"
          value={comment}
        />
        <button
          disabled={!comment.trim()}
          type="submit"
          className={`font-semibold text-blue-500 disabled:text-blue-400 disabled:cursor-not-allowed`}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
