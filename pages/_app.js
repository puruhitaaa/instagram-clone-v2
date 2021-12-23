import '../src/styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { AuthProvider } from '../src/context/auth';
import { PostProvider } from '../src/context/posts';
import { ModalProvider } from '../src/context/modal';

import { combineProviders } from '../src/helper/combineProviders';

const Providers = combineProviders([AuthProvider, PostProvider, ModalProvider]);

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-background">
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </div>
  );
}

export default MyApp;
