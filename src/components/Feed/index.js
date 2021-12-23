import { useAuth } from '../../context/auth';
import Posts from './posts';
import MiniProfile from './mini-profile';
import Stories from './stories';
import Suggestions from './suggestions';

const Feed = () => {
  const { user } = useAuth();

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${
        !user ? '!grid-cols-1 !max-w-3xl' : null
      }`}
    >
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed top-20">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </div>
  );
};

export default Feed;
