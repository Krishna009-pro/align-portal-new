import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const envPath = path.join(repoRoot, ".env.local");

function parseEnvFile(content) {
  const env = {};
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex <= 0) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

function loadFirebaseEnv() {
  if (!fs.existsSync(envPath)) {
    throw new Error(`Missing .env.local at ${envPath}`);
  }

  const raw = fs.readFileSync(envPath, "utf8");
  const env = parseEnvFile(raw);

  const required = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
  for (const key of required) {
    if (!env[key]) {
      throw new Error(`Missing ${key} in .env.local`);
    }
  }

  return {
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
}

const credentials = loadFirebaseEnv();

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: credentials.projectId,
      clientEmail: credentials.clientEmail,
      privateKey: credentials.privateKey,
    }),
  });
}

const auth = getAuth();
const db = getFirestore();

const users = [
  {
    email: "admin@align-portal-new.com",
    password: "Admin@12345",
    displayName: "Align Admin",
    role: "admin",
  },
  {
    email: "manager@align-portal-new.com",
    password: "Manager@12345",
    displayName: "Align Manager",
    role: "manager",
  },
  {
    email: "employee@align-portal-new.com",
    password: "Employee@12345",
    displayName: "Align Employee",
    role: "employee",
  },
];

async function upsertUser(user) {
  let record;
  let created = false;

  try {
    record = await auth.getUserByEmail(user.email);
    await auth.updateUser(record.uid, {
      displayName: user.displayName,
      password: user.password,
    });
  } catch (error) {
    if (error?.code !== "auth/user-not-found") {
      throw error;
    }

    record = await auth.createUser({
      email: user.email,
      password: user.password,
      displayName: user.displayName,
      emailVerified: true,
    });
    created = true;
  }

  await auth.setCustomUserClaims(record.uid, { role: user.role });
  await db.collection("users").doc(record.uid).set(
    {
      email: user.email,
      name: user.displayName,
      role: user.role,
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  );

  return { uid: record.uid, email: user.email, role: user.role, created };
}

(async () => {
  const results = [];
  for (const user of users) {
    const result = await upsertUser(user);
    results.push(result);
  }

  console.log("Firebase users ready:");
  for (const result of results) {
    console.log(`- ${result.email} (${result.role}) | uid=${result.uid} | ${result.created ? "created" : "updated"}`);
  }

  console.log("\nLogin passwords:");
  console.log("- admin@align-portal-new.com => Admin@12345");
  console.log("- manager@align-portal-new.com => Manager@12345");
  console.log("- employee@align-portal-new.com => Employee@12345");
})();
