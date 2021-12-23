import Head from 'next/head';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { auth } from '../../src/lib/firebase';
import { withPublic } from '../../src/hooks/route';

function LoginPage() {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    emailAddress: '',
    password: '',
  });
  const [error, setError] = useState('');

  const isInvalid = formValue.emailAddress === '' || formValue.password === '';

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSignIn = async (e) => {
    const { emailAddress, password } = formValue;
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, emailAddress, password);
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Firebased Instagram - Sign In</title>
      </Head>

      <div className="container flex flex-col md:flex-row mx-auto max-w-screen-md items-center justify-center h-screen">
        <div className="hidden md:flex w-3/5">
          <img
            src="/images/iphone-with-profile.jpg"
            alt="iPhone with Instagram"
          />
        </div>
        <div className="flex flex-col md:w-2/5">
          <div className="rounded flex flex-col items-center bg-white p-4 border-gray-primary mb-4">
            <h1 className="flex justify-center w-full">
              <img
                className="mt-2 w-6/12 mb-4"
                src="/images/logo.png"
                alt="Instagram"
              />
            </h1>

            {error ? (
              <p className="mb-4 text-xs text-red-primary">{error}</p>
            ) : null}

            <form onSubmit={handleSignIn} method="POST">
              <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                name="emailAddress"
                className="styled-input"
                onChange={(e) => handleChange(e)}
                value={formValue.emailAddress}
              />
              <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                name="password"
                className="styled-input"
                min="6"
                onChange={(e) => handleChange(e)}
                value={formValue.password}
              />
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                  isInvalid ? 'opacity-50 cursor-not-allowed' : null
                }`}
              >
                Sign In
              </button>
            </form>
          </div>

          <div className="rounded flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
            <p className="text-sm">
              Do not have an account?{' '}
              <span
                className="font-bold cursor-pointer text-blue-medium"
                onClick={() => router.push('/sign-up')}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default withPublic(LoginPage);
