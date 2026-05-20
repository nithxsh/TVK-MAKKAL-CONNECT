# Product Requirements Document (PRD) - Makkal Connect

## 1. Product Overview
Makkal Connect is a premium, production-grade welfare guidance portal designed to help citizens navigate state welfare programs. It features a high-fidelity immersive interface with a focus on accessibility and personalized results through a conditional onboarding wizard.

- **Main Purpose**: Simplify welfare discovery through an interactive, multi-lingual quiz and personalized dashboard.
- **Target Users**: Tamil Nadu citizens seeking state welfare benefits, ranging from students to senior citizens.
- **Market Value**: High-impact social tool with a premium UI/UX, bridging the gap between complex government schemes and citizen eligibility.

## 2. Core Features

### 2.1 User Roles
| Role | Registration Method | Core Permissions |
|------|---------------------|------------------|
| Citizen | Google Sign-In | Complete onboarding, view personalized schemes, share status. |

### 2.2 Feature Module
1. **Immersive Hero (Gate Entry)**: A high-contrast landing page with language selection and primary CTA.
2. **Onboarding Quiz Wizard**: A 9-step (0-8) interactive pipeline to collect user demographics.
3. **Conditional Rendering Engine**: A sophisticated mapping matrix that filters schemes based on user input.
4. **Results Dashboard**: A split-panel view displaying profile snapshots and eligible scheme cards.
5. **Viral Engagement Engine**: WhatsApp sharing, audio read-outs (Kural Udhavi), and document checklists.

### 2.3 Page Details
| Page Name | Module Name | Feature description |
|-----------|-------------|---------------------|
| Landing View | Hero Section | Immersive maroon gradient, language toggle, and floating leader portrait. |
| Onboarding | Quiz Wizard | 8-step single-question cards with spring physics and progress tracking. |
| Dashboard | Profile Snapshot | Left panel displaying user parameters with Incognito Labs analytics branding. |
| Dashboard | Scheme Directory | Right panel with dynamic scheme cards, document checklists, and "Apply" links. |
| Dashboard | Engagement Tools | WhatsApp share button and "Kural Udhavi" audio reader. |

## 3. Core Process
The user enters the portal, selects a language, and starts the "Get Your Schemes" journey. They complete an 8-step quiz covering age, employment, income, etc. The engine processes these variables to render a personalized dashboard with eligible schemes (e.g., Senior Citizen Pension for Age >= 60, Agri Subsidies for Farmers).

```mermaid
graph TD
  "Start" --> "Language Selection (Step 0)"
  "Language Selection (Step 0)" --> "Name Input (Step 1)"
  "Name Input (Step 1)" --> "Age Metrics (Step 2)"
  "Age Metrics (Step 2)" --> "Job Selector (Step 3)"
  "Job Selector (Step 3)" --> "Conditional: Farmer? (Step 4)"
  "Conditional: Farmer? (Step 4)" --> "Household Finance (Step 5)"
  "Household Finance (Step 5)" --> "Marital Status (Step 6)"
  "Marital Status (Step 6)" --> "Disability Vector (Step 7)"
  "Disability Vector (Step 7)" --> "Rendering Engine"
  "Rendering Engine" --> "Dashboard (Results View)"
  "Dashboard (Results View)" --> "Welfare Pass Sharing"
  "Dashboard (Results View)" --> "Kural Udhavi (Audio)"
```

## 4. User Interface Design

### 4.1 Design Style
- **Theme**: "White Canvas" minimal theme with high contrast.
- **Primary Colors**: TVK Maroon (#800020), Velvet Yellow (#ffcc00).
- **Secondary Colors**: Zinc spectrum (zinc-100 to zinc-500).
- **Physics**: Fluid spring motion (stiffness: 100, damping: 14) with infinite floating loops on widgets.
- **Localization**: Pure English or Pure Formal Tamil (zero Thanglish).

### 4.2 Page Design Overview
| Page Name | Module Name | UI Elements |
|-----------|-------------|-------------|
| Landing | Hero Section | Maroon gradient background, Bold typography, Pulsing Yellow CTA. |
| Onboarding | Question Card | Anti-gravity floating card, Single question, Tactile selection chips. |
| Dashboard | Result Grid | Split-panel (4:8 ratio), Card-based schemes, Hover effects. |

### 4.3 Responsiveness
- Desktop-first design with a focus on premium aesthetics.
- Mobile-adaptive layout for quiz cards and dashboard panels.
- Touch optimization for selection chips and range sliders.

### 4.4 Branding Placement
- **Incognito Builds**: Navbar header (right) and site-wide footer.
- **Incognito Hacks**: Security verification label under Google Sign-In.
- **Incognito Labs**: Analytics logic token in the Income Screening module.
