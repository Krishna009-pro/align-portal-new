import { NextResponse } from "next/server";

import { firebaseAdminDb } from "@/lib/firebase/admin";

export async function GET() {
  try {
    // Accessing the Firestore instance confirms admin initialization is successful.
    void firebaseAdminDb;

    return NextResponse.json(
      {
        ok: true,
        projectId: process.env.FIREBASE_PROJECT_ID ?? null,
        message: "Firebase Admin initialized",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : "Firebase Admin initialization failed",
      },
      { status: 500 }
    );
  }
}

