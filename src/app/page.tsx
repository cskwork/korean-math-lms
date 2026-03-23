import Link from 'next/link';
import {
  BookOpen,
  Gamepad2,
  Trophy,
  Target,
  ArrowRight,
  GraduationCap,
  Star,
  Users,
  Lightbulb,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

/* ============================
   데이터 정의
   ============================ */

/** 기능 카드 데이터 */
const features = [
  {
    icon: BookOpen,
    title: '체계적 학습',
    description: '교과과정에 맞춘 단계별 수업으로 기초부터 심화까지 체계적으로 배웁니다.',
    gradient: 'from-blue-500 to-blue-600',
    lightBg: 'from-blue-50 to-blue-100/50',
  },
  {
    icon: Gamepad2,
    title: '재미있는 퀴즈',
    description: '학습 내용을 퀴즈로 확인하고, 즉각적인 피드백으로 이해도를 높입니다.',
    gradient: 'from-emerald-500 to-teal-600',
    lightBg: 'from-emerald-50 to-teal-100/50',
  },
  {
    icon: Trophy,
    title: '성취 시스템',
    description: '배지, 레벨, XP 시스템으로 학습 동기를 유지하고 성취감을 느껴보세요.',
    gradient: 'from-amber-500 to-orange-600',
    lightBg: 'from-amber-50 to-orange-100/50',
  },
  {
    icon: Target,
    title: '맞춤형 학습',
    description: '내 진도에 맞춘 학습 경로와 약점 보완 추천으로 효율적으로 공부합니다.',
    gradient: 'from-purple-500 to-indigo-600',
    lightBg: 'from-purple-50 to-indigo-100/50',
  },
] as const;

/** 학생 후기 데이터 */
const testimonials = [
  {
    name: '박지민',
    grade: '중1',
    quote:
      '수학이 이렇게 재미있을 줄 몰랐어요! 퀴즈 풀면서 점수 올라가는 게 게임하는 것 같아요.',
    avatar: '👧',
    rating: 5,
  },
  {
    name: '이준호',
    grade: '중1',
    quote:
      '방정식이 어려웠는데 단계별로 배우니까 어느새 혼자 풀 수 있게 됐어요. 배지 모으는 재미도 있어요!',
    avatar: '👦',
    rating: 5,
  },
  {
    name: '최서연',
    grade: '중1',
    quote:
      '매일 조금씩 꾸준히 하니까 수학 성적이 올랐어요. 연속 학습 기록 깨는 게 목표입니다!',
    avatar: '👩',
    rating: 5,
  },
] as const;

/** 학습 과정 단계 */
const learningSteps = [
  {
    step: 1,
    title: '개념 학습',
    description: '교과서 기반의 핵심 개념을 시각 자료와 함께 이해합니다.',
    icon: Lightbulb,
    gradient: 'from-blue-500 to-cyan-500',
    emoji: '📖',
  },
  {
    step: 2,
    title: '연습 문제',
    description: '단계별 연습 문제로 배운 개념을 직접 적용해봅니다.',
    icon: CheckCircle2,
    gradient: 'from-emerald-500 to-green-500',
    emoji: '✏️',
  },
  {
    step: 3,
    title: '퀴즈 도전',
    description: '실전 퀴즈로 실력을 확인하고 XP와 배지를 획득합니다.',
    icon: Sparkles,
    gradient: 'from-purple-500 to-pink-500',
    emoji: '🏆',
  },
] as const;

/** 통계 데이터 */
const stats = [
  { value: '6개', label: '강좌', icon: BookOpen },
  { value: '22개', label: '수업', icon: GraduationCap },
  { value: '120+', label: '퀴즈 문제', icon: Gamepad2 },
  { value: '1,000+', label: '학습 중인 학생', icon: Users },
] as const;

/* ============================
   랜딩 페이지 컴포넌트
   ============================ */

/** 랜딩 페이지 (서버 컴포넌트) */
export default function HomePage() {
  return (
    <div className="space-y-20 pb-16">
      {/* ===== 히어로 섹션 ===== */}
      <section className="relative -mx-4 -mt-6 overflow-hidden rounded-b-[2.5rem] bg-gradient-to-br from-blue-600 via-blue-500 via-60% to-indigo-700 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {/* 점 패턴 오버레이 */}
        <div className="dot-pattern absolute inset-0 opacity-40" aria-hidden="true" />

        {/* 부유하는 수학 기호들 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <span className="animate-float-slow absolute left-[8%] top-[15%] text-4xl text-white/[0.07] select-none">+</span>
          <span className="animate-float-medium absolute left-[20%] top-[60%] text-5xl text-white/[0.06] select-none">÷</span>
          <span className="animate-float-fast absolute left-[35%] top-[25%] text-3xl text-white/[0.08] select-none">x²</span>
          <span className="animate-float-medium absolute right-[30%] top-[15%] text-4xl text-white/[0.07] select-none">π</span>
          <span className="animate-float-slow absolute right-[15%] top-[45%] text-5xl text-white/[0.06] select-none">=</span>
          <span className="animate-float-fast absolute right-[8%] top-[70%] text-3xl text-white/[0.08] select-none">∑</span>
          <span className="animate-float-medium absolute left-[50%] top-[75%] text-4xl text-white/[0.05] select-none">√</span>
          <span className="animate-float-slow absolute left-[70%] top-[30%] text-3xl text-white/[0.07] select-none">∞</span>
        </div>

        {/* 그래디언트 광원 효과 */}
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-medium backdrop-blur-md">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            <span>중학교 1학년 수학</span>
            <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">2026 교과과정</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            수학, 재미있게 배우자!
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-blue-100/90 sm:text-xl">
            교과서 개념부터 실생활 응용까지, 게임처럼 즐기면서 수학 실력을 키워보세요.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="btn-shimmer animate-pulse-glow group inline-flex items-center gap-2 rounded-2xl bg-white px-9 py-4 text-lg font-bold text-blue-600 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              지금 시작하기
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/30 px-9 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
            >
              강좌 둘러보기
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 기능 카드 섹션 ===== */}
      <section>
        <div className="text-center">
          <h2 className="gradient-text mb-3 text-2xl font-extrabold sm:text-3xl">
            왜 수학의 달인인가요?
          </h2>
          <p className="mx-auto max-w-lg text-gray-500">
            학습에 필요한 모든 것을 한곳에서 제공합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card-hover group relative rounded-2xl border border-gray-100/60 bg-white p-6 shadow-sm"
            >
              {/* 배경 그래디언트 장식 */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.lightBg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                aria-hidden="true"
              />

              <div className="relative">
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg shadow-blue-500/10`}
                >
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 학습 과정 미리보기 섹션 ===== */}
      <section>
        <div className="text-center">
          <h2 className="gradient-text mb-3 text-2xl font-extrabold sm:text-3xl">
            학습 과정 미리보기
          </h2>
          <p className="mx-auto max-w-lg text-gray-500">
            3단계로 구성된 체계적인 학습 과정을 만나보세요.
          </p>
        </div>

        <div className="relative mt-12">
          {/* 연결선 (데스크톱) */}
          <div className="absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden="true">
            <div className="mx-auto flex max-w-3xl items-center justify-between px-20">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-200 to-emerald-200" />
              <div className="mx-4 h-2 w-2 rounded-full bg-emerald-300" />
              <div className="h-0.5 flex-1 bg-gradient-to-r from-emerald-200 to-purple-200" />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {learningSteps.map((item) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.step}
                  className="card-hover group relative rounded-2xl border border-gray-100/60 bg-white p-7 text-center shadow-sm"
                >
                  {/* 단계 번호 */}
                  <div
                    className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <span className="text-xl font-bold text-white">{item.step}</span>
                  </div>

                  <span className="mb-2 block text-3xl" aria-hidden="true">{item.emoji}</span>

                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 통계 섹션 ===== */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 px-6 py-14">
        {/* 점 패턴 */}
        <div className="dot-pattern absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-4xl gap-8 text-center sm:grid-cols-4">
          {stats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className="group">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm transition-transform group-hover:scale-110">
                  <StatIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="animate-count-up text-4xl font-extrabold text-white sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm font-medium text-blue-200">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== 학생 후기 섹션 ===== */}
      <section>
        <div className="text-center">
          <h2 className="gradient-text mb-3 text-2xl font-extrabold sm:text-3xl">
            학생들의 이야기
          </h2>
          <p className="mx-auto max-w-lg text-gray-500">
            수학의 달인과 함께 성장하고 있는 학생들의 후기입니다.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-hover group relative rounded-2xl border border-gray-100/60 bg-white p-7 shadow-sm"
            >
              {/* 장식용 큰 따옴표 */}
              <span
                className="absolute right-6 top-4 text-6xl font-serif leading-none text-blue-100/60 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 text-2xl shadow-sm">
                    {t.avatar}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.grade}</p>
                  </div>
                </div>

                {/* 별점 */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      style={{
                        fill: 'url(#star-gradient)',
                        color: '#fbbf24',
                      }}
                      aria-hidden="true"
                    />
                  ))}
                  {/* SVG 그래디언트 정의 */}
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <p className="text-sm leading-relaxed text-gray-600">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 하단 CTA ===== */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 py-16 text-center">
        {/* 장식 */}
        <div className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl" aria-hidden="true" />
        <div className="dot-pattern absolute inset-0 opacity-20" aria-hidden="true" />

        <div className="relative">
          <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            지금 바로 시작해보세요!
          </h2>
          <p className="mx-auto mb-10 max-w-md text-gray-400">
            무료로 모든 강좌와 퀴즈를 이용할 수 있습니다.
            <br />
            수학 실력 향상의 첫 걸음을 지금 내딛으세요.
          </p>
          <Link
            href="/dashboard"
            className="btn-shimmer group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
          >
            학습 시작하기
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
