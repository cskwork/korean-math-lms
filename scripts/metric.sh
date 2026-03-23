#!/usr/bin/env bash
# korean-math-lms 프로젝트 품질 지표 산출 스크립트
# 빌드(40), 린트(30), 콘텐츠(30) 기준 0-100 복합 점수를 계산한다.

set -euo pipefail

cd "$(dirname "$0")/.."

total=0

# ── 1. 빌드 검사 (40점) ──
build_score=0
if npm run build --silent > /dev/null 2>&1; then
  build_score=40
  echo "Build: PASS (40/40)"
else
  echo "Build: FAIL (0/40)"
fi
total=$((total + build_score))

# ── 2. 린트 검사 (30점) ──
lint_score=0
if npm run lint --silent > /dev/null 2>&1; then
  lint_score=30
  echo "Lint: PASS (30/30)"
else
  echo "Lint: FAIL (0/30)"
fi
total=$((total + lint_score))

# ── 3. 콘텐츠 수량 검사 (30점) ──
content_score=0
lesson_count=0
lessons_file="src/data/lessons.ts"

if [[ -f "$lessons_file" ]]; then
  lesson_count=$(grep -c "id: '" "$lessons_file" || true)
fi

if [[ $lesson_count -ge 20 ]]; then
  content_score=30
elif [[ $lesson_count -ge 15 ]]; then
  content_score=20
elif [[ $lesson_count -ge 10 ]]; then
  content_score=10
else
  content_score=0
fi
echo "Content: ${lesson_count} lessons (${content_score}/30)"
total=$((total + content_score))

# ── 최종 점수 출력 ──
echo "---"
echo "SCORE: ${total}"
