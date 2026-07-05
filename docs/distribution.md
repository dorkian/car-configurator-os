# Distribution and Branding

## Vehicle Naming

**Official name: Falcon X**
Fictional — avoids manufacturer IP/legal issues while signaling automotive taste.
Alternatives on file: Velaro GT, Aureon S.

The project's personal story (README About, LinkedIn, Medium, ashkian.com) *can and should* reference Ash's professional experience with automotive configurators — but the open-source app itself uses Falcon X only.

---

## Personal Branding Anchor

All distribution surfaces must explicitly repeat:
- Full name: **Ashkan Dorkian**
- Positioning: **AI-native frontend developer**

This drives recruiter search indexing across GitHub, Google, Medium, and LinkedIn.

---

## GitHub

**Handle:** `dorkian`
**Repo:** `https://github.com/dorkian/car-configurator-os`

### Repo settings (to configure when publishing)
- **Description:** `Open-source 2D car configurator — React, Vite, TypeScript, Zustand. Pricing engine, compatibility rules, URL-shareable builds.`
- **Website:** link to live demo once deployed
- **Topics:** `react` `vite` `typescript` `configurator` `frontend-architecture` `zustand` `open-source` `portfolio`

### GitHub bio (profile-level)
```
Ashkan Dorkian — AI-native frontend developer. Building open-source tools and side projects.
React · TypeScript · Vite · n8n · FastAPI
```

### Pinned-repo card copy

**Repository name:** `car-configurator-os`

**About (GitHub repo description — 160 chars max):**
```
Open-source 2D car configurator — React, Vite, TypeScript, Zustand. Pricing engine, compatibility rules, URL-shareable builds.
```

**README headline (H1):**
```
Car Configurator OS
```

**README tagline (first paragraph):**
```
An open-source, client-side car configurator built with React, TypeScript, and Vite — built to demonstrate production-grade frontend architecture, business logic, and automotive UX thinking.
```

### Pin strategy
Pin `car-configurator-os` as the **#1 pinned repo** on the profile. Ensure the card shows a meaningful description and at least a few stars before promoting on LinkedIn/Medium.

---

## README (Case Study Format)

The final README should read as a case study, not just a setup guide. Target audience: senior frontend engineers and engineering managers who are evaluating Ash.

Structure:
1. What it is (1 sentence)
2. Live demo + screenshot
3. Why this project exists (recruiter context paragraph)
4. What it demonstrates (bullet list — architecture, UX, business thinking)
5. Tech stack table
6. Architecture overview + link to `docs/architecture.md`
7. Product decisions (why 2D-first, why no backend, what v2 looks like)
8. Local setup (4 lines)
9. About Ashkan Dorkian + links

---

## Medium Article

**Title:** "How I built an open-source car configurator with React, Vite, and TypeScript"
**Target:** Frontend developers, recruiters, engineering managers
**CTA at end:** GitHub repo link + "follow me for more"

Outline:
1. The problem (most portfolio projects are shallow — this one isn't)
2. Choosing the domain (automotive configurator complexity explained)
3. Architecture decisions (feature-sliced, no backend, URL state)
4. The pricing rule engine (integer cents, line items)
5. Option compatibility — the hard part
6. What I'd do differently (3D v2, real API, i18n)
7. What this project shows about how I think

Draft goes in `docs/medium-draft.md` during Week 6.

---

## LinkedIn Post (Launch)

Target: recruiters and frontend engineering leads.

**DRAFT — ready to post:**

```
I just open-sourced a project I'm genuinely proud of.

Car Configurator OS — a 2D automotive configurator built with React, Vite, and TypeScript.

It's not a to-do app. It solves real engineering problems:

→ Option compatibility rules — some packages conflict; disabled states tell you exactly why
→ Integer-cent pricing engine with live line-item breakdown (no floating-point rounding errors)
→ Trim-change recovery — switch trim and the app auto-resets invalid selections and tells you what changed
→ URL-serialized build state — every configuration is a shareable link, zero backend

Stack: React 18 · TypeScript (strict) · Vite · Zustand · Vitest
29 tests, all green. Mobile-responsive. Fully accessible.

Live demo 👇
[link — add before posting]

GitHub 👇
https://github.com/dorkian/car-configurator-os

Open to senior frontend and full-stack roles. DM or connect.

#React #TypeScript #OpenSource #FrontendDevelopment #AshkanDorkian
```

---

## ashkian.com Case Study Page

**URL slug:** `/work/car-configurator-os`
**Format:** Long-form case study with screenshots

Sections:
- Overview (what, why, who it's for)
- Problem (shallow portfolio projects vs. real engineering depth)
- Solution (Falcon X configurator — what it demonstrates)
- Architecture (diagram or description)
- Key engineering decisions (3 decisions with rationale)
- Outcome (GitHub stars, demo link, recruiter responses)
- Tech used

---

## Release Checklist (v1.0.0)

- [ ] All Milestone 1–5 items checked off
- [ ] `npm run build` passes clean
- [ ] `npm run test` passes clean
- [ ] Live demo URL confirmed working
- [ ] Screenshot set captured (at least 4: home, configurator desktop, configurator mobile, summary)
- [ ] OG cover at `public/og-cover.png`
- [ ] README final review
- [ ] CHANGELOG.md v1.0.0 entry written
- [ ] GitHub Release created with notes and screenshots
- [ ] Repo description, topics, and website set on GitHub
- [ ] Repo pinned on profile
- [ ] LinkedIn post drafted and scheduled
- [ ] Medium article published
- [ ] ashkian.com case study live
