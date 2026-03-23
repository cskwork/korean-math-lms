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
    title: '교과서 기반 수업',
    description: '2026 교과과정에 맞춘 단계별 수업으로 기초부터 심화까지 배웁니다.',
    accent: 'bg-primary-100 text-primary-700',
    iconBg: 'bg-primary-600',
  },
  {
    icon: Gamepad2,
    title: '즉석 피드백 퀴즈',
    description: '문제를 풀면 바로 해설이 나옵니다. 틀린 부분을 즉시 확인하세요.',
    accent: 'bg-amber-100 text-amber-700',
    iconBg: 'bg-amber-500',
  },
  {
    icon: Trophy,
    title: '배지와 레벨',
    description: 'XP를 쌓고 레벨을 올리면서 배지를 모으세요. 학습이 게임이 됩니다.',
    accent: 'bg-orange-100 text-orange-700',
    iconBg: 'bg-orange-500',
  },
  {
    icon: Target,
    title: '진도 맞춤 추천',
    description: '내가 어디서 막혔는지 파악하고, 다음에 풀 문제를 자동으로 추천합니다.',
    accent: 'bg-rose-100 text-rose-700',
    iconBg: 'bg-rose-500',
  },
] as const;

/** 학생 후기 데이터 -- 유기적 평점, 다양한 이니셜 */
const testimonials = [
  {
    name: '박지민',
    grade: '중1',
    quote:
      '수학이 재미있어질 수 있다는 걸 처음 알았어요. 퀴즈 점수 올라가는 게 게임하는 것 같습니다.',
    initials: '지',
    rating: 5,
    color: 'bg-primary-100 text-primary-700',
  },
  {
    name: '이준호',
    grade: '중1',
    quote:
      '방정식이 어려웠는데 단계별로 배우니까 어느새 혼자 풀 수 있게 됐어요. 배지 모으는 재미도 쏠쏠합니다.',
    initials: '준',
    rating: 4,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    name: '최서연',
    grade: '중1',
    quote:
      '매일 10분씩 꾸준히 하니까 시험 점수가 23점이나 올랐어요. 연속 학습 기록이 동기부여가 됩니다.',
    initials: '서',
    rating: 5,
    color: 'bg-rose-100 text-rose-700',
  },
] as const;

/** 학습 과정 단계 */
const learningSteps = [
  {
    step: 1,
    title: '개념 학습',
    description: '교과서 핵심 개념을 시각 자료와 함께 이해합니다.',
    icon: Lightbulb,
    gradient: 'from-primary-500 to-primary-600',
  },
  {
    step: 2,
    title: '연습 문제',
    description: '단계별 연습 문제로 배운 개념을 직접 적용해봅니다.',
    icon: CheckCircle2,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    step: 3,
    title: '퀴즈 도전',
    description: '실전 퀴즈로 실력을 확인하고 XP와 배지를 획득합니다.',
    icon: Sparkles,
    gradient: 'from-rose-500 to-pink-500',
  },
] as const;

/** 통계 데이터 -- 유기적 숫자 */
const stats = [
  { value: '6', label: '강좌', icon: BookOpen },
  { value: '22', label: '수업', icon: GraduationCap },
  { value: '127', label: '퀴즈 문제', icon: Gamepad2 },
  { value: '847', label: '학습 중인 학생', icon: Users },
] as const;

/* ============================
   랜딩 페이지 컴포넌트
   ============================ */

/** 랜딩 페이지 (서버 컴포넌트) */
export default function HomePage() {
  const LeadIcon = features[0].icon;
  return (
    <div className="space-y-24 pb-20">
      {/* ===== 히어로 섹션 (좌측 정렬 스플릿) ===== */}
      <section className="relative -mx-4 -mt-6 overflow-hidden rounded-b-4xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 px-4 py-20 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 lg:py-28">
        {/* 점 패턴 오버레이 */}
        <div className="dot-pattern absolute inset-0 opacity-30" aria-hidden="true" />

        {/* 부유하는 수학 기호들 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <span className="animate-float-slow absolute left-[8%] top-[15%] text-4xl text-white/[0.07] select-none">+</span>
          <span className="animate-float-medium absolute left-[20%] top-[60%] text-5xl text-white/[0.06] select-none">÷</span>
          <span className="animate-float-fast absolute left-[35%] top-[25%] text-3xl text-white/[0.08] select-none font-mono">x²</span>
          <span className="animate-float-medium absolute right-[30%] top-[15%] text-4xl text-white/[0.07] select-none font-mono">π</span>
          <span className="animate-float-slow absolute right-[15%] top-[45%] text-5xl text-white/[0.06] select-none">=</span>
          <span className="animate-float-fast absolute right-[8%] top-[70%] text-3xl text-white/[0.08] select-none font-mono">∑</span>
          <span className="animate-float-medium absolute left-[50%] top-[75%] text-4xl text-white/[0.05] select-none font-mono">√</span>
          <span className="animate-float-slow absolute left-[70%] top-[30%] text-3xl text-white/[0.07] select-none font-mono">∞</span>
        </div>

        {/* 그래디언트 광원 효과 */}
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary-400/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-primary-300/15 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* 좌측: 텍스트 */}
          <div className="text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
              <GraduationCap className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              <span>중학교 1학년 수학</span>
              <span className="ml-1 rounded-full bg-white/15 px-2 py-0.5 text-xs">2026</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tighter sm:text-5xl lg:text-6xl">
              수학, 게임처럼
              <br />
              배워보세요
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-primary-100/90">
              교과서 개념을 퀴즈로 확인하고, XP를 쌓고, 배지를 모으세요.
              매일 10분이면 충분합니다.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="animate-pulse-glow group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-primary-700 shadow-xl transition-all duration-300 ease-premium hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]"
              >
                학습 시작하기
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/25 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all duration-300 ease-premium hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
              >
                강좌 둘러보기
              </Link>
            </div>
          </div>

          {/* 우측: 통계 미니 카드 (데스크톱) */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
            {stats.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="stagger-item rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md"
                  style={{ '--stagger-index': i } as React.CSSProperties}
                >
                  <StatIcon className="mb-2 h-5 w-5 text-primary-200" strokeWidth={1.5} aria-hidden="true" />
                  <p className="text-3xl font-extrabold tracking-tight text-white font-mono tabular-nums">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-sm text-primary-200">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 기능 카드 섹션 (비대칭 벤토) ===== */}
      <section>
        <div className="mb-12">
          <span className="mb-3 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700">
            주요 기능
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            왜 수학의 달인인가요?
          </h2>
          <p className="mt-2 max-w-lg text-gray-500">
            개념 학습부터 실전 퀴즈까지, 수학 공부에 필요한 도구를 모았습니다.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]">
          {/* 첫 번째 카드: 크게 */}
          <div
            className="card-hover stagger-item group rounded-2xl border border-gray-100/80 bg-white p-8 shadow-sm lg:row-span-2"
            style={{ '--stagger-index': 0 } as React.CSSProperties}
          >
            <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${features[0].iconBg} shadow-sm`}>
              <LeadIcon className="h-5 w-5 text-white" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              {features[0].title}
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-gray-500">
              {features[0].description}
            </p>
          </div>

          {/* 나머지 카드: 우측 스택 */}
          {features.slice(1).map((feature, i) => (
            <div
              key={feature.title}
              className="card-hover stagger-item group rounded-2xl border border-gray-100/80 bg-white p-6 shadow-sm"
              style={{ '--stagger-index': i + 1 } as React.CSSProperties}
            >
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${feature.iconBg} shadow-sm`}>
                <feature.icon className="h-5 w-5 text-white" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="mb-1.5 text-base font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 학습 과정 미리보기 섹션 ===== */}
      <section>
        <div className="mb-12">
          <span className="mb-3 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700">
            학습 과정
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            3단계로 실력이 오릅니다
          </h2>
          <p className="mt-2 max-w-lg text-gray-500">
            개념 이해, 연습, 실전의 반복이 실력을 만듭니다.
          </p>
        </div>

        <div className="relative">
          {/* 연결선 (데스크톱) */}
          <div className="absolute left-0 right-0 top-[3.5rem] hidden lg:block" aria-hidden="true">
            <div className="mx-auto flex max-w-3xl items-center justify-between px-24">
              <div className="h-px flex-1 bg-gradient-to-r from-primary-200 to-amber-200" />
              <div className="mx-4 h-1.5 w-1.5 rounded-full bg-amber-300" />
              <div className="h-px flex-1 bg-gradient-to-r from-amber-200 to-rose-200" />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {learningSteps.map((item, i) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.step}
                  className="card-hover stagger-item group relative rounded-2xl border border-gray-100/80 bg-white p-7 text-center shadow-sm"
                  style={{ '--stagger-index': i } as React.CSSProperties}
                >
                  <div
                    className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-sm transition-transform duration-500 ease-premium group-hover:scale-110`}
                  >
                    <span className="text-xl font-bold text-white font-mono">{item.step}</span>
                  </div>

                  <StepIcon className="mx-auto mb-3 h-6 w-6 text-gray-400" strokeWidth={1.5} aria-hidden="true" />

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

      {/* ===== 통계 섹션 (모바일용 -- 데스크톱은 히어로에 통합) ===== */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 px-6 py-14 lg:hidden">
        <div className="dot-pattern absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-sm gap-6 text-center sm:max-w-4xl sm:grid-cols-4">
          {stats.map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={stat.label}
                className="stagger-item group"
                style={{ '--stagger-index': i } as React.CSSProperties}
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm transition-transform duration-300 ease-premium group-hover:scale-110">
                  <StatIcon className="h-5 w-5 text-white" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <p className="animate-count-up text-4xl font-extrabold tracking-tight text-white font-mono tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-primary-200">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== 학생 후기 섹션 ===== */}
      <section>
        <div className="mb-12">
          <span className="mb-3 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700">
            학생 후기
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            학생들이 직접 이야기합니다
          </h2>
          <p className="mt-2 max-w-lg text-gray-500">
            수학의 달인과 함께 공부하고 있는 학생들의 경험입니다.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="card-hover stagger-item group relative rounded-2xl border border-gray-100/80 bg-white p-7 shadow-sm"
              style={{ '--stagger-index': i } as React.CSSProperties}
            >
              {/* 장식용 큰 따옴표 */}
              <span
                className="absolute right-6 top-4 text-6xl font-serif leading-none text-primary-100/60 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${t.color}`}>
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.grade}</p>
                  </div>
                </div>

                {/* 별점 */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  ))}
                  {Array.from({ length: 5 - t.rating }).map((_, idx) => (
                    <Star
                      key={`empty-${idx}`}
                      className="h-4 w-4 text-gray-200"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  ))}
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
      <section className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-16 text-center">
        <div className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-primary-500/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-primary-400/10 blur-3xl" aria-hidden="true" />
        <div className="dot-pattern absolute inset-0 opacity-15" aria-hidden="true" />

        <div className="relative">
          <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            오늘 시작하면 내일 달라집니다
          </h2>
          <p className="mx-auto mb-10 max-w-md text-gray-400">
            모든 강좌와 퀴즈를 무료로 이용할 수 있습니다.
            <br />
            하루 10분, 수학 실력의 변화를 직접 확인하세요.
          </p>
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-primary-600/25 transition-all duration-300 ease-premium hover:scale-[1.03] hover:bg-primary-500 hover:shadow-2xl active:scale-[0.98]"
          >
            학습 시작하기
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
