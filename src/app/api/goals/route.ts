import { firebaseAdminDb } from "@/lib/firebase/admin";
import type { GoalRecord, GoalSheetRecord } from "@/lib/types";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

function parseGoals(value: unknown): GoalRecord[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is GoalRecord => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const goal = item as Partial<GoalRecord>;
      return (
        typeof goal.id === "string" &&
        typeof goal.thrustArea === "string" &&
        typeof goal.title === "string" &&
        typeof goal.uom === "string" &&
        typeof goal.target === "string" &&
        typeof goal.weightage === "number"
      );
    })
    .map((goal) => ({
      ...goal,
      status: goal.status ?? "submitted",
      description: goal.description ?? "",
    }));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const goalsSnapshot = await firebaseAdminDb
      .collection("users")
      .doc(userId)
      .collection("goals")
      .orderBy("createdAt", "asc")
      .get();

    const goals = goalsSnapshot.docs.map((doc) => ({
      ...(doc.data() as Omit<GoalRecord, "id">),
      id: doc.id,
    }));

    return NextResponse.json({ goals });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch goals",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: { userId?: string; goals?: GoalRecord[] };

  try {
    body = (await request.json()) as { userId?: string; goals?: GoalRecord[] };
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const userId = body.userId;
  const goals = parseGoals(body.goals);

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  if (!goals.length) {
    return NextResponse.json({ error: "At least one goal is required" }, { status: 400 });
  }

  try {
    const userRef = firebaseAdminDb.collection("users").doc(userId);
    const goalsCollection = userRef.collection("goals");

    const oldGoals = await goalsCollection.get();
    const batch = firebaseAdminDb.batch();

    oldGoals.docs.forEach((doc) => batch.delete(doc.ref));

    goals.forEach((goal) => {
      const goalRef = goalsCollection.doc(goal.id);
      batch.set(goalRef, {
        ...goal,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
    });

    const sheet: GoalSheetRecord = {
      goals,
      submittedAt: new Date().toISOString(),
      status: "submitted",
    };

    batch.set(userRef.collection("goalSheets").doc("current"), {
      ...sheet,
      updatedAt: FieldValue.serverTimestamp(),
    });

    await batch.commit();

    return NextResponse.json({ ok: true, goalCount: goals.length });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to save goals",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
