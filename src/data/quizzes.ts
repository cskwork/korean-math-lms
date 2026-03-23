// 퀴즈 목 데이터 정의
import type { Quiz } from '@/types';

export const quizzes: Quiz[] = [
  {
    id: 'quiz-integers',
    courseId: 'integers',
    title: '정수와 연산 퀴즈',
    description: '정수의 개념과 사칙연산 실력을 확인합니다.',
    passingScore: 60,
    xpReward: 100,
    timeLimit: 600,
    questions: [
      {
        id: 'q-int-1',
        question: '다음 중 정수가 아닌 것은?',
        math: '-3, \\; 0, \\; 1.5, \\; 7',
        options: ['-3', '0', '1.5', '7'],
        correctAnswer: 2,
        explanation:
          '1.5는 소수(소수점이 있는 수)이므로 정수가 아닙니다. 정수는 ..., -2, -1, 0, 1, 2, ... 처럼 소수점 없는 수입니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-int-2',
        question: '(-5) + (+8)의 값은?',
        math: '(-5) + (+8)',
        options: ['-13', '-3', '3', '13'],
        correctAnswer: 2,
        explanation:
          '다른 부호의 덧셈: 절댓값의 차 8 - 5 = 3, 절댓값이 큰 쪽(+8)의 부호를 붙여 +3입니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-int-3',
        question: '(-4) x (-6)의 값은?',
        math: '(-4) \\times (-6)',
        options: ['-24', '-10', '10', '24'],
        correctAnswer: 3,
        explanation:
          '같은 부호(음수 x 음수)의 곱은 양수입니다. 절댓값을 곱하면 4 x 6 = 24.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-int-4',
        question: '(-12) / (+3)의 값은?',
        math: '(-12) \\div (+3)',
        options: ['-4', '-9', '4', '9'],
        correctAnswer: 0,
        explanation:
          '다른 부호(음수 / 양수)의 나눗셈은 음수입니다. 12 / 3 = 4이고 부호가 다르므로 -4.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-int-5',
        question: '수직선에서 -3과 5 사이의 거리는?',
        math: '|-3 - 5| = ?',
        options: ['2', '5', '8', '-8'],
        correctAnswer: 2,
        explanation:
          '두 수 사이의 거리 = |(-3) - 5| = |-8| = 8. 절댓값이므로 항상 양수입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-int-6',
        question: '(-2) x (+3) x (-5)의 값은?',
        math: '(-2) \\times (+3) \\times (-5)',
        options: ['-30', '-11', '11', '30'],
        correctAnswer: 3,
        explanation:
          '음수가 2개(짝수)이므로 결과는 양수. (-2) x (+3) = -6, (-6) x (-5) = 30.',
        difficulty: 'hard',
        points: 20,
      },
      {
        id: 'q-int-7',
        question: '다음 중 절댓값이 가장 큰 수는?',
        math: '|-8|, \\; |5|, \\; |-3|, \\; |7|',
        options: ['-8', '5', '-3', '7'],
        correctAnswer: 0,
        explanation:
          '절댓값은 수직선에서 0까지의 거리입니다. |-8| = 8, |5| = 5, |-3| = 3, |7| = 7. 8이 가장 크므로 -8의 절댓값이 가장 큽니다.',
        difficulty: 'medium',
        points: 15,
      },
    ],
  },
  {
    id: 'quiz-equations',
    courseId: 'equations',
    title: '일차방정식 퀴즈',
    description: '일차방정식의 풀이 능력을 확인합니다.',
    passingScore: 60,
    xpReward: 100,
    timeLimit: 600,
    questions: [
      {
        id: 'q-eq-new-1',
        question: '다음 중 일차방정식인 것은?',
        math: '\\text{(1)}\\ x + 3 = 7 \\quad \\text{(2)}\\ x^2 = 4 \\quad \\text{(3)}\\ 2x + 1 \\quad \\text{(4)}\\ 3 > x',
        options: ['x + 3 = 7', 'x² = 4', '2x + 1', '3 > x'],
        correctAnswer: 0,
        explanation:
          '일차방정식은 미지수의 최고 차수가 1인 등식입니다. x + 3 = 7은 x가 1차이고 등호(=)가 있으므로 일차방정식입니다. x² = 4는 2차, 2x + 1은 등호 없는 식, 3 > x는 부등식이므로 방정식이 아닙니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-eq-new-2',
        question: 'x - 3 = 7의 해는?',
        math: 'x - 3 = 7',
        options: ['4', '7', '10', '21'],
        correctAnswer: 2,
        explanation:
          '양변에 3을 더하면 x = 7 + 3 = 10입니다. 검산: 10 - 3 = 7이므로 맞습니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-eq-1',
        question: 'x + 5 = 12일 때 x의 값은?',
        math: 'x + 5 = 12',
        options: ['5', '7', '12', '17'],
        correctAnswer: 1,
        explanation: '양변에서 5를 빼면(이항하면) x = 12 - 5 = 7입니다. 검산: 7 + 5 = 12이므로 맞습니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-eq-2',
        question: '3x - 6 = 9일 때 x의 값은?',
        math: '3x - 6 = 9',
        options: ['1', '3', '5', '15'],
        correctAnswer: 2,
        explanation: '3x = 9 + 6 = 15, x = 15 / 3 = 5입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-eq-3',
        question: '2(x + 1) = 10일 때 x의 값은?',
        math: '2(x + 1) = 10',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
        explanation: '괄호를 풀면 2x + 2 = 10, 2x = 8, x = 4입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-eq-4',
        question: '어떤 수의 3배에서 2를 빼면 7입니다. 그 수는?',
        math: '3x - 2 = 7',
        options: ['2', '3', '5', '9'],
        correctAnswer: 1,
        explanation: '3x - 2 = 7, 3x = 9, x = 3입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-eq-5',
        question: '5x + 3 = 2x + 15일 때 x의 값은?',
        math: '5x + 3 = 2x + 15',
        options: ['2', '3', '4', '6'],
        correctAnswer: 2,
        explanation:
          '미지수항 이항: 5x - 2x = 15 - 3, 3x = 12, x = 4입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-eq-6',
        question: '4(x - 3) = 2(x + 1)일 때 x의 값은?',
        math: '4(x - 3) = 2(x + 1)',
        options: ['5', '7', '9', '11'],
        correctAnswer: 1,
        explanation:
          '4x - 12 = 2x + 2, 2x = 14, x = 7입니다. x=7을 대입하면: 좌변 4(7-3) = 4×4 = 16, 우변 2(7+1) = 2×8 = 16. 좌변=우변이므로 정답.',
        difficulty: 'hard',
        points: 20,
      },
      {
        id: 'q-eq-7',
        question:
          '연속하는 세 자연수의 합이 24일 때, 가장 작은 수는?',
        math: 'x + (x+1) + (x+2) = 24',
        options: ['6', '7', '8', '9'],
        correctAnswer: 1,
        explanation:
          '3x + 3 = 24, 3x = 21, x = 7. 세 수는 7, 8, 9입니다.',
        difficulty: 'hard',
        points: 20,
      },
    ],
  },
  {
    id: 'quiz-coordinates',
    courseId: 'coordinates',
    title: '좌표와 그래프 퀴즈',
    description: '좌표평면과 일차함수의 이해를 확인합니다.',
    passingScore: 60,
    xpReward: 120,
    timeLimit: 600,
    questions: [
      {
        id: 'q-coord-1',
        question: '점 (3, -2)는 제 몇 사분면에 있는가?',
        math: '(3, -2)',
        options: ['제1사분면', '제2사분면', '제3사분면', '제4사분면'],
        correctAnswer: 3,
        explanation:
          'x > 0, y < 0이면 제4사분면입니다. (3은 양수, -2는 음수)',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-coord-2',
        question: 'y = 2x + 1의 기울기는?',
        math: 'y = 2x + 1',
        options: ['1', '2', '3', '-1'],
        correctAnswer: 1,
        explanation:
          'y = ax + b에서 x의 계수 a가 기울기이므로 2입니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-coord-3',
        question: 'y = -x + 3의 y절편은?',
        math: 'y = -x + 3',
        options: ['-1', '0', '3', '-3'],
        correctAnswer: 2,
        explanation:
          'y = ax + b에서 상수항 b가 y절편이므로 3입니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-coord-4',
        question: '두 점 (1, 2)와 (3, 6)을 지나는 직선의 기울기는?',
        math: 'a = \\frac{6 - 2}{3 - 1}',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        explanation: '기울기 = (6-2)/(3-1) = 4/2 = 2입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-coord-5',
        question: '점 (-5, 0)은 어디에 위치하는가?',
        math: '(-5, 0)',
        options: ['제2사분면', '제3사분면', 'x축 위', 'y축 위'],
        correctAnswer: 2,
        explanation:
          'y좌표가 0이면 x축 위의 점입니다. 축 위의 점은 어느 사분면에도 속하지 않습니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-coord-6',
        question: 'y = 3x - 2에서 x = 4일 때 y의 값은?',
        math: 'y = 3(4) - 2',
        options: ['8', '10', '12', '14'],
        correctAnswer: 1,
        explanation: 'y = 3 x 4 - 2 = 12 - 2 = 10입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-coord-7',
        question:
          '기울기가 -2이고 y절편이 5인 일차함수의 식은?',
        math: 'y = ax + b, \\quad a = -2, \\; b = 5',
        options: ['y = 2x + 5', 'y = -2x + 5', 'y = 5x - 2', 'y = -2x - 5'],
        correctAnswer: 1,
        explanation:
          'y = ax + b에서 기울기 a = -2, y절편 b = 5이므로 y = -2x + 5입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-coord-8',
        question:
          '직선 y = 2x + 3과 평행하고 점 (1, 7)을 지나는 직선의 y절편은?',
        math: 'y = 2x + b, \\quad 7 = 2(1) + b',
        options: ['3', '5', '7', '9'],
        correctAnswer: 1,
        explanation:
          '평행한 직선은 기울기가 같으므로 y = 2x + b입니다. 점 (1, 7)을 대입하면 7 = 2 + b, b = 5. 따라서 y절편은 5입니다.',
        difficulty: 'hard',
        points: 20,
      },
    ],
  },
  {
    id: 'quiz-geometry',
    courseId: 'geometry',
    title: '기본 도형 퀴즈',
    description: '도형의 성질과 넓이 계산 능력을 확인합니다.',
    passingScore: 60,
    xpReward: 120,
    timeLimit: 600,
    questions: [
      {
        id: 'q-geo-1',
        question: '삼각형의 세 내각의 합은?',
        math: '\\angle A + \\angle B + \\angle C = \\, ?',
        options: ['90°', '180°', '270°', '360°'],
        correctAnswer: 1,
        explanation:
          '삼각형의 세 내각의 합은 항상 180°입니다. 이는 유클리드 기하학의 기본 정리로, 어떤 모양의 삼각형이든(예각, 직각, 둔각) 성립합니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-geo-2',
        question: '밑변 6cm, 높이 4cm인 삼각형의 넓이는?',
        math: 'S = \\frac{1}{2} \\times 6 \\times 4',
        options: ['10 cm²', '12 cm²', '24 cm²', '8 cm²'],
        correctAnswer: 1,
        explanation:
          '삼각형의 넓이 공식은 S = (밑변 × 높이) / 2입니다. 왜 2로 나누냐면, 같은 밑변과 높이를 가진 직사각형(넓이 = 6×4 = 24)을 대각선으로 자르면 삼각형 2개가 되기 때문입니다. 따라서 S = 24 / 2 = 12 cm²입니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-geo-3',
        question: '반지름이 5cm인 원의 넓이는? (π ≈ 3.14)',
        math: 'S = \\pi r^2 = \\pi \\times 5^2',
        options: ['31.4 cm²', '78.5 cm²', '15.7 cm²', '50 cm²'],
        correctAnswer: 1,
        explanation:
          '원의 넓이 공식 S = πr²에서 r = 5를 대입합니다. S = 3.14 × 25 = 78.5 cm². r²은 반지름을 제곱하는 것이므로, 반지름이 아닌 지름(10)을 넣지 않도록 주의하세요.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-geo-4',
        question: '두 직선이 만나서 이루는 맞꼭지각이 각각 55°일 때, 나머지 두 각의 크기는?',
        math: '55° + x = 180°',
        options: ['55°', '105°', '125°', '135°'],
        correctAnswer: 2,
        explanation:
          '맞꼭지각은 서로 같고, 이웃한 두 각의 합은 180°(평각)입니다. 따라서 나머지 각 = 180° - 55° = 125°입니다. 두 직선이 만들어내는 4개의 각은 55°, 125°, 55°, 125°가 됩니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-geo-5',
        question: '이등변삼각형의 꼭지각이 40°일 때, 한 밑각의 크기는?',
        math: '40° + 2x = 180°',
        options: ['40°', '60°', '70°', '80°'],
        correctAnswer: 2,
        explanation:
          '이등변삼각형은 두 밑각이 같습니다. 세 내각의 합이 180°이므로 40° + 2x = 180°, 2x = 140°, x = 70°입니다. 이등변삼각형의 성질(두 밑각이 같다)과 내각의 합 성질을 함께 활용합니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-geo-6',
        question: '지름이 14cm인 원의 둘레는? (π ≈ 3.14)',
        math: 'C = \\pi d = \\pi \\times 14',
        options: ['21.98 cm', '43.96 cm', '87.92 cm', '153.86 cm'],
        correctAnswer: 1,
        explanation:
          '원의 둘레 공식은 C = πd (또는 C = 2πr)입니다. π는 원의 둘레와 지름의 비율(약 3.14)이기 때문입니다. C = 3.14 × 14 = 43.96 cm. 만약 반지름(r = 7)을 쓴다면 C = 2 × 3.14 × 7 = 43.96 cm으로 같은 결과입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-geo-7',
        question:
          '삼각형의 두 변의 길이가 3cm, 7cm일 때, 나머지 한 변의 길이가 될 수 없는 것은?',
        math: '|a - b| < c < a + b \\Rightarrow |3 - 7| < c < 3 + 7',
        options: ['5 cm', '7 cm', '9 cm', '11 cm'],
        correctAnswer: 3,
        explanation:
          '삼각형 성립 조건: 한 변의 길이는 나머지 두 변의 차보다 크고, 합보다 작아야 합니다. 즉 |3 - 7| < c < 3 + 7이므로 4 < c < 10. 11은 10보다 크므로 삼각형을 만들 수 없습니다. 이는 가장 긴 변이 나머지 두 변을 합한 것보다 길면 양 끝이 만나지 않기 때문입니다.',
        difficulty: 'hard',
        points: 20,
      },
      {
        id: 'q-geo-8',
        question:
          '삼각형의 두 내각이 45°와 65°일 때, 나머지 한 내각의 크기는?',
        math: '45° + 65° + x = 180°',
        options: ['60°', '70°', '80°', '90°'],
        correctAnswer: 1,
        explanation:
          '삼각형의 세 내각의 합은 180°입니다. 따라서 x = 180° - 45° - 65° = 70°입니다. 이 삼각형은 세 각이 모두 90°보다 작으므로 예각삼각형입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-geo-9',
        question:
          '밑변이 10cm인 삼각형의 넓이가 40cm²일 때, 높이는?',
        math: '\\frac{1}{2} \\times 10 \\times h = 40',
        options: ['4 cm', '6 cm', '8 cm', '10 cm'],
        correctAnswer: 2,
        explanation:
          '삼각형의 넓이 공식 S = (밑변 × 높이) / 2에서 40 = (10 × h) / 2이므로 10h = 80, h = 8 cm입니다. 넓이 공식을 역으로 사용하여 알려진 넓이와 밑변으로부터 높이를 구할 수 있습니다.',
        difficulty: 'hard',
        points: 20,
      },
    ],
  },
  {
    id: 'quiz-statistics',
    courseId: 'statistics',
    title: '통계와 확률 퀴즈',
    description: '대표값과 확률의 기초를 확인합니다.',
    passingScore: 60,
    xpReward: 120,
    timeLimit: 600,
    questions: [
      {
        id: 'q-stat-1',
        question: '자료 3, 5, 7, 9, 11의 평균은?',
        math: '\\bar{x} = \\frac{3+5+7+9+11}{5}',
        options: ['5', '7', '9', '35'],
        correctAnswer: 1,
        explanation: '(3+5+7+9+11)/5 = 35/5 = 7입니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-stat-2',
        question: '자료 2, 3, 3, 5, 8의 최빈값은?',
        math: '2, \\; 3, \\; 3, \\; 5, \\; 8',
        options: ['2', '3', '5', '8'],
        correctAnswer: 1,
        explanation:
          '최빈값은 가장 자주 나타나는 값입니다. 3이 2번으로 가장 많이 나타나므로 최빈값은 3입니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-stat-3',
        question: '주사위를 던져 짝수가 나올 확률은?',
        math: 'P = \\frac{\\text{짝수의 수}}{\\text{전체}} = \\frac{3}{6}',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctAnswer: 2,
        explanation:
          '짝수: 2, 4, 6으로 3가지. 전체: 6가지. P = 3/6 = 1/2입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-stat-4',
        question: '자료 1, 4, 7, 10, 13의 중앙값은?',
        math: '1, \\; 4, \\; \\boxed{7}, \\; 10, \\; 13',
        options: ['4', '7', '10', '35'],
        correctAnswer: 1,
        explanation:
          '중앙값은 자료를 크기순으로 나열했을 때 한가운데 값입니다. 자료가 5개이므로 3번째 값인 7이 중앙값입니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-stat-5',
        question:
          '동전 1개를 던질 때 앞면이 나올 확률과 뒷면이 나올 확률의 합은?',
        math: 'P(\\text{앞면}) + P(\\text{뒷면})',
        options: ['0', '1/2', '1', '2'],
        correctAnswer: 2,
        explanation:
          '전체 확률의 합은 항상 1입니다. P(앞면) + P(뒷면) = 1/2 + 1/2 = 1.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-stat-6',
        question:
          '자료 10, 20, 30, 40, 50, 60의 중앙값은?',
        math: '\\frac{30 + 40}{2} = \\, ?',
        options: ['30', '35', '40', '45'],
        correctAnswer: 1,
        explanation:
          '자료가 6개(짝수)이므로 3번째(30)와 4번째(40)의 평균 = (30+40)/2 = 35입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-stat-7',
        question:
          '1부터 10까지 적힌 카드 중 1장을 뽑을 때, 소수가 나올 확률은?',
        math: 'P = \\frac{n(\\text{소수})}{10}',
        options: ['3/10', '2/5', '1/2', '3/5'],
        correctAnswer: 1,
        explanation:
          '10 이하의 소수: 2, 3, 5, 7 (4개). P = 4/10 = 2/5입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-stat-8',
        question:
          '빨간 구슬 4개, 파란 구슬 6개가 들어있는 주머니에서 1개를 꺼낼 때, 빨간 구슬이 아닐 확률은?',
        math: 'P(\\text{빨간 아님}) = 1 - P(\\text{빨간})',
        options: ['2/5', '3/5', '1/2', '4/5'],
        correctAnswer: 1,
        explanation:
          'P(빨간) = 4/10 = 2/5. 여사건: P(빨간 아님) = 1 - 2/5 = 3/5입니다.',
        difficulty: 'hard',
        points: 20,
      },
    ],
  },
  {
    id: 'quiz-applications',
    courseId: 'applications',
    title: '종합 실력 테스트',
    description: '모든 단원의 개념을 아우르는 종합 문제입니다.',
    passingScore: 60,
    xpReward: 200,
    timeLimit: 900,
    questions: [
      {
        id: 'q-app-1',
        question: '시속 60km로 2시간 달리면 이동 거리는?',
        math: '\\text{거리} = 60 \\times 2',
        options: ['30 km', '60 km', '120 km', '180 km'],
        correctAnswer: 2,
        explanation: '거리 = 속력 x 시간 = 60 x 2 = 120 km입니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-app-2',
        question:
          '현재 아버지 나이가 아들 나이의 3배이고, 아버지 나이가 45세일 때 아들 나이는?',
        math: '3x = 45',
        options: ['12세', '15세', '18세', '20세'],
        correctAnswer: 1,
        explanation: '아들 나이를 x라 하면 3x = 45, x = 15세입니다.',
        difficulty: 'easy',
        points: 10,
      },
      {
        id: 'q-app-3',
        question: '소금물 200g에 소금이 30g 들어있다. 소금의 농도는?',
        math: '\\text{농도} = \\frac{30}{200} \\times 100',
        options: ['10%', '15%', '20%', '30%'],
        correctAnswer: 1,
        explanation: '농도 = (30/200) x 100 = 15%입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-app-4',
        question:
          '직사각형의 둘레가 24cm이고 가로가 세로의 2배일 때, 가로의 길이는?',
        math: '2(2x + x) = 24',
        options: ['4 cm', '6 cm', '8 cm', '12 cm'],
        correctAnswer: 2,
        explanation:
          '세로 = x, 가로 = 2x, 둘레 = 2(2x+x) = 6x = 24, x = 4, 가로 = 8cm입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-app-5',
        question:
          '사과 3개와 배 2개의 가격이 5000원이고, 사과 1개가 800원일 때 배 1개의 가격은?',
        math: '3(800) + 2y = 5000',
        options: ['800원', '1100원', '1300원', '1500원'],
        correctAnswer: 2,
        explanation:
          '2400 + 2y = 5000, 2y = 2600, y = 1300원입니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-app-6',
        question:
          '두 사람이 12km 떨어진 곳에서 동시에 출발하여 마주 걸어갑니다. 시속 4km와 시속 2km로 걸으면 만나는 데 걸리는 시간은?',
        math: '4t + 2t = 12',
        options: ['1시간', '2시간', '3시간', '4시간'],
        correctAnswer: 1,
        explanation:
          '6t = 12, t = 2시간 후에 만납니다.',
        difficulty: 'medium',
        points: 15,
      },
      {
        id: 'q-app-7',
        question:
          '반지름 4cm인 원 안에 내접하는 정사각형의 대각선의 길이는?',
        math: 'd = 2r = 2 \\times 4',
        options: ['4 cm', '6 cm', '8 cm', '10 cm'],
        correctAnswer: 2,
        explanation:
          '내접 정사각형의 대각선은 원의 지름과 같습니다. 지름 = 2 × 반지름 = 2 × 4 = 8 cm입니다.',
        difficulty: 'hard',
        points: 20,
      },
      {
        id: 'q-app-8',
        question:
          '어떤 두 자리 수의 십의 자리와 일의 자리를 바꾸면 원래 수보다 18이 큽니다. 십의 자리와 일의 자리의 차는?',
        math: '(10b + a) - (10a + b) = 18',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        explanation:
          '9b - 9a = 18, 9(b - a) = 18, b - a = 2. 일의 자리 - 십의 자리 = 2입니다.',
        difficulty: 'hard',
        points: 20,
      },
    ],
  },
];

/** ID로 퀴즈를 검색한다. */
export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id);
}

/** 코스 ID에 해당하는 퀴즈 목록을 반환한다. */
export function getQuizzesByCourse(courseId: string): Quiz[] {
  return quizzes.filter((quiz) => quiz.courseId === courseId);
}
