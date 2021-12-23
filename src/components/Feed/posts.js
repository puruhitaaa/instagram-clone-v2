import { usePost } from '../../context/posts';

import Post from './post-item';

const Posts = () => {
  const { posts } = usePost();

  return (
    <div>
      {posts?.map((post) => (
        <Post
          key={post.docId}
          id={post.docId}
          username={post.username}
          profileImage={post.profileImage}
          image={post.image}
          caption={post.caption}
          timestamp={post.timestamp}
        />
      ))}
    </div>
  );
};

export default Posts;
