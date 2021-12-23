import { useRouter } from 'next/router';
import { useAuth } from '../context/auth';

export function withPublic(Component) {
  return function WithPublic(props) {
    const router = useRouter();
    const auth = useAuth();

    if (auth.user) {
      typeof window !== 'undefined' && router.replace('/');
      return <h1>Loading...</h1>;
    }

    return <Component auth={auth} {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth();
    const router = useRouter();

    if (!auth.user) {
      typeof window !== 'undefined' && router.replace('/login');
      return <h1>Loading...</h1>;
    }

    return <Component auth={auth} {...props} />;
  };
}
