import Head from 'next/head';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { addDoc, collection, doc, setDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { auth, firestore } from '../../src/lib/firebase';
import { withPublic } from '../../src/hooks/route';

function SignUpPage() {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    username: '',
    fullName: '',
    emailAddress: '',
    password: '',
  });
  const [error, setError] = useState('');

  const isInvalid =
    formValue.username === '' ||
    formValue.fullName === '' ||
    formValue.emailAddress === '' ||
    formValue.password === '';

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSignUp = async (e) => {
    const { username, fullName, emailAddress, password } = formValue;
    e.preventDefault();

    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        emailAddress,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL:
          'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg',
      });

      await addDoc(collection(firestore, 'users'), {
        userId: createdUser.user.uid,
        username: username.toLowerCase(),
        fullName,
        emailAddress: emailAddress.toLowerCase(),
        dateCreated: Date.now(),
      });

      await setDoc(doc(firestore, 'profiles', createdUser.user.uid), {
        userId: createdUser.user.uid,
        username: username.toLowerCase(),
        fullName,
        emailAddress: emailAddress.toLowerCase(),
        dateCreated: Date.now(),
        biography: 'Hello, I am on Instagram 2.0!',
        profileImage:
          'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg',
        website: null,
      });

      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Firebased Instagram - Sign Up</title>
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

            <form onSubmit={handleSignUp} method="POST">
              <input
                aria-label="Enter your username"
                type="text"
                placeholder="Username"
                name="username"
                className="styled-input"
                onChange={(e) => handleChange(e)}
                min="6"
                max="12"
                value={formValue.username}
              />
              <input
                aria-label="Enter your full name"
                type="text"
                placeholder="Full name"
                name="fullName"
                className="styled-input"
                onChange={(e) => handleChange(e)}
                min="6"
                value={formValue.fullName}
              />
              <input
                aria-label="Enter your email address"
                type="email"
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
                Sign Up
              </button>
            </form>
          </div>

          <div className="rounded flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
            <p className="text-sm">
              Already have an account?{' '}
              <span
                className="font-bold cursor-pointer text-blue-medium"
                onClick={() => router.push('/login')}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default withPublic(SignUpPage);
