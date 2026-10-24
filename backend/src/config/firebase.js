import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";
import { getFirestore } from "firebase-admin/firestore";

const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
if (!keyPath) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_PATH is not set in .env");
}

const serviceAccount = JSON.parse(readFileSync(keyPath, "utf8"));

const app = getApps().length
  ? getApps()[0]
  : initializeApp({ credential: cert(serviceAccount) });

export const adminAuth = getAuth(app);

export const adminDb = getFirestore(app);