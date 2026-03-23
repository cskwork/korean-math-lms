# korean-math-lms

Production-ready Korean middle school math learning management system. EBS i-inspired design with gamified learning, interactive content, and full Korean localization.

**Live Demo**: [korean-math-lms.vercel.app](https://korean-math-lms.vercel.app)

## Features

### Content
- **22 lessons** across 6 courses (integers, equations, coordinates, geometry, statistics, applications)
- **75 practice problems** with 3 difficulty tiers per lesson
- **49 quiz questions** across 6 quizzes with balanced difficulty distribution
- **7 inline SVG math visualizations** (number line, coordinate plane, triangle, circle, bar chart, linear function, balance scale)
- All content in Korean, aligned to Korean middle school grade 1 curriculum

### UI/UX
- EBS i-inspired clean blue/white design system
- Gamification: XP, levels, badges, streaks, achievement tracking
- Glassmorphism effects, gradient animations, micro-interactions
- KaTeX math rendering for equations and formulas
- Responsive design (mobile, tablet, desktop)
- Accessible (ARIA labels, keyboard navigation, semantic HTML)

### Pages
| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, stats, testimonials |
| `/dashboard` | Student dashboard with stats, progress chart, activity feed |
| `/courses` | Course listing with difficulty filters |
| `/courses/[id]` | Course detail with lesson list and progress |
| `/courses/[id]/lessons/[id]` | Lesson viewer with math content, practice problems |
| `/quiz/[id]` | Interactive quiz with animations, score donut chart |
| `/profile` | User profile with badges, stats, learning history |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS
- **Math**: KaTeX
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build   # production build
npm run lint    # ESLint
npm run metric  # quality score (build + lint + content count)
```

## Project Structure

```
src/
  app/            # Next.js App Router pages
  components/
    ui/           # Button, Card, Badge, ProgressBar
    layout/       # Header, Sidebar, Footer
    dashboard/    # StatsCards, ProgressChart, RecentActivity, AchievementBadges
    course/       # CourseCard, CourseList
    lesson/       # LessonContent, LessonNav, MathRenderer, MathVisual
    quiz/         # QuizQuestion, QuizResult
  data/           # Mock data (courses, 22 lessons, quizzes, user)
  lib/            # Utilities
  types/          # TypeScript type definitions
```

## Content Coverage

| Course | Lessons | Topics |
|--------|---------|--------|
| Integers & Operations | 3 | Integer concepts, addition/subtraction, multiplication/division |
| Linear Equations | 3 | Equation basics, solving, word problems |
| Coordinates & Graphs | 3 | Coordinate plane, linear functions, slope/intercept |
| Basic Geometry | 3 | Points/lines/angles, triangles, circles |
| Statistics & Probability | 3 | Mean/median/mode, probability basics, data representation |
| Applications & Challenges | 7 | Speed/distance, age problems, ratios, reviews, competition prep |

## License

MIT
