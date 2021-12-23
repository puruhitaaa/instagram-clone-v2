import { initializeApp, getApps, cert } from 'firebase-admin/app';

import serviceAccount from './serviceAccountKey.json';

if (!getApps.length) {
  try {
    initializeApp(
      {
        credential: cert({
          privateKey: serviceAccount.private_key,
          clientEmail: serviceAccount.client_email,
          projectId: serviceAccount.project_id,
        }),
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
      },
      'firebase-admin'
    );
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
// const storage = getStorage(app);
// const firestore = getFirestore(app);
// const auth = getAuth(app);

// export { app, auth, storage, firestore };
