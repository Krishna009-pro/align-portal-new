# Project Submission Document

## 1) Working Link (Dummy)
- https://align-portal-demo.example.com

## 2) Source Code Repository (Dummy)
- https://github.com/example-org/align-portal-new

## 3) Architecture Diagram

```mermaid
flowchart LR
  U1[Employee User]
  U2[Manager User]

  subgraph FE[Next.js 16 App Router Frontend]
    P1[Auth Pages\n/login]
    P2[Employee Pages\n/dashboard\n/goals\n/check-in]
    P3[Manager Pages\n/team\n/team/review-goals\n/team/review-checkin]
    C1[Client Firebase SDK\nsrc/lib/firebase/client.ts]
    S1[Session & Route Protection\nsrc/lib/session.ts\nsrc/hooks/useProtectedSession.ts]
  end

  subgraph BE[Next.js Server/API Layer]
    A1[/api/goals]
    A2[/api/firebase/health]
    C2[Firebase Admin SDK\nsrc/lib/firebase/admin.ts]
  end

  subgraph FB[Firebase]
    F1[Firebase Authentication]
    F2[Cloud Firestore]
  end

  U1 --> P2
  U2 --> P3
  U1 --> P1
  U2 --> P1

  P1 --> C1
  P2 --> C1
  P3 --> C1
  P2 --> S1
  P3 --> S1

  P2 --> A1
  P3 --> A1
  A2 --> C2
  A1 --> C2

  C1 --> F1
  C1 --> F2
  C2 --> F1
  C2 --> F2
```

## Notes
- This is a single consolidated document as requested.
- Links are intentionally dummy placeholders.
