// src/firebaseAdmin.ts
import * as admin from "firebase-admin";
import * as serviceAccount from "../bookstoreAccountKey.json"; // Import your service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
