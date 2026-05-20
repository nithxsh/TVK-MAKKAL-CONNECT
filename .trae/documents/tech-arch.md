# Technical Architecture - Makkal Connect

## 1. Architecture Design
The application is built as a highly interactive React SPA (Single Page Application) with a centralized state management system for onboarding data and conditional rendering logic.

```mermaid
graph TD
  "Frontend (React + Vite)" --> "UI Components (Radix UI + Tailwind)"
  "Frontend (React + Vite)" --> "Motion Engine (Framer Motion)"
  "Frontend (React + Vite)" --> "State Management (React Context/Hooks)"
  "State Management" --> "Conditional Engine (Logic Matrix)"
  "Frontend (React + Vite)" --> "External: Firebase Auth (Google)"
  "Frontend (React + Vite)" --> "External: Web Speech API (Audio)"
```

## 2. Technology Description
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion (Physics: stiffness 100, damping 14)
- **UI Components**: Radix UI (Accessible primitives)
- **Authentication**: Firebase Auth (Google Provider)
- **Icons**: Lucide React
- **Audio**: Web Speech API (for "Kural Udhavi")

## 3. Route Definitions
Since this is a single-page immersive experience, routing is managed via internal state (`viewState`).

| View State | Purpose |
|------------|---------|
| `landing`  | Immersive Hero view (Gate Entry) |
| `onboarding` | 8-step Quiz Wizard |
| `dashboard` | Split-panel Results View |

## 4. State Model
The global state will track user demographics and session preferences.

### 4.1 User Profile State
```typescript
interface UserProfile {
  language: 'en' | 'ta';
  name: string;
  age: number;
  employment: string; // student, farmer, etc.
  landArea?: number; // conditional for farmers
  monthlyIncome: number;
  maritalStatus: 'single' | 'married';
  isDifferentlyAbled: boolean;
}
```

### 4.2 Scheme Asset Schema
```typescript
interface SchemeAsset {
  id: string;
  title: { en: string; ta: string };
  description: { en: string; ta: string };
  benefit: string;
  checklist: string[];
  type: 'pension' | 'subsidy' | 'grant' | 'service';
}
```

## 5. Conditional Rendering Logic Matrix
- **Age Filter**: `if (age >= 60)` -> Show Senior Schemes only.
- **Disability Filter**: `if (isDifferentlyAbled)` -> Prepend DIS_01, DIS_02.
- **Job Sector Mapping**: Map `employment` key to specific scheme arrays (e.g., `GIG_01` for `gig_worker`).
- **Income Ceiling**: `if (monthlyIncome * 12 > 500000)` -> Flag "Income Limit Crossed", hide cash grants.
- **Marital Logic**: `if (maritalStatus === 'married')` -> Show HH_01/03, hide HH_02.

## 6. Branding & Verification Placement
- **Incognito Builds**: Integrated in `Navbar` and `Footer` components.
- **Incognito Hacks**: Integrated as a sub-label in the `AuthButton` component.
- **Incognito Labs**: Integrated in the `IncomeScreeningWidget` component.
