# Project Submission Document

## 1) Working Link (Dummy)
- https://align-portal-new.vercel.app/

## 2) Source Code Repository (Dummy)
- https://github.com/Krishna009-pro/align-portal-new

## 3) Architecture Diagram

```mermaid
flowchart TB
  %% Users
  EU[Employee User]
  MU[Manager User]

  %% Platform Edge
  subgraph VERCEL[Vercel Hosting Platform]
    EDGE[Vercel Edge Network / CDN]

    subgraph NEXTAPP[Next.js 16 Application]
      ROUTER[App Router\nsrc/app/*]

      subgraph UI[Presentation Layer]
        AUTHUI[Auth UI\n/login]
        EMPUI[Employee UI\n/dashboard, /goals, /check-in]
        MGRUI[Manager UI\n/team, /review-goals, /review-checkin]
      end

      subgraph CLIENT[Client Runtime]
        CLIENTSDK[Firebase Client SDK\nsrc/lib/firebase/client.ts]
        SESSION[Session Guard & Hooks\nsrc/lib/session.ts\nsrc/hooks/useProtectedSession.ts]
        STORE[Zustand Store\nsrc/store/wizardStore.ts]
      end

      subgraph SERVER[Server Runtime]
        API_GOALS[API Route: /api/goals]
        API_HEALTH[API Route: /api/firebase/health]
        ADMINSDK[Firebase Admin SDK\nsrc/lib/firebase/admin.ts]
      end
    end
  end

  %% External Services
  subgraph FIREBASE[Google Firebase]
    FAUTH[Firebase Authentication]
    FSTORE[Cloud Firestore]
  end

  subgraph CONFIG[Runtime Configuration]
    ENV[Environment Variables\nNEXT_PUBLIC_* and FIREBASE_*]
  end

  %% Traffic Flow
  EU --> EDGE
  MU --> EDGE
  EDGE --> ROUTER

  ROUTER --> AUTHUI
  ROUTER --> EMPUI
  ROUTER --> MGRUI

  AUTHUI --> CLIENTSDK
  EMPUI --> CLIENTSDK
  MGRUI --> CLIENTSDK

  EMPUI --> SESSION
  MGRUI --> SESSION
  EMPUI --> STORE

  EMPUI --> API_GOALS
  MGRUI --> API_GOALS
  API_HEALTH --> ADMINSDK
  API_GOALS --> ADMINSDK

  CLIENTSDK --> FAUTH
  CLIENTSDK --> FSTORE
  ADMINSDK --> FAUTH
  ADMINSDK --> FSTORE

  ENV --> CLIENTSDK
  ENV --> ADMINSDK
```

## Notes
- This is a single consolidated document as requested.
- Links are intentionally dummy placeholders.
