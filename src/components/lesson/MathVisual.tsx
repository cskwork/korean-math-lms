// 수학 시각화 SVG 컴포넌트 모음

interface MathVisualProps {
  /** SVG 시각화 유형 */
  visualType: VisualType;
}

export type VisualType =
  | 'number-line'
  | 'coordinate-plane'
  | 'triangle'
  | 'circle'
  | 'bar-chart'
  | 'linear-function'
  | 'balance-scale';

/** 키워드 기반으로 시각화 유형을 결정한다. */
export function detectVisualType(
  title: string,
  content: string,
): VisualType | null {
  const text = `${title} ${content}`;

  if (/수직선/.test(text)) return 'number-line';
  if (/좌표/.test(text)) return 'coordinate-plane';
  if (/삼각형|넓이.*높이/.test(text)) return 'triangle';
  if (/원[의과]|반지름|지름/.test(text)) return 'circle';
  if (/그래프|차트|히스토그램|막대/.test(text)) return 'bar-chart';
  if (/함수|기울기|y\s*=/.test(text)) return 'linear-function';
  if (/저울|방정식.*풀이|등식/.test(text)) return 'balance-scale';

  return null;
}

/** 수학 시각화 SVG 렌더러 */
export function MathVisual({ visualType }: MathVisualProps) {
  switch (visualType) {
    case 'number-line':
      return <NumberLineSvg />;
    case 'coordinate-plane':
      return <CoordinatePlaneSvg />;
    case 'triangle':
      return <TriangleSvg />;
    case 'circle':
      return <CircleSvg />;
    case 'bar-chart':
      return <BarChartSvg />;
    case 'linear-function':
      return <LinearFunctionSvg />;
    case 'balance-scale':
      return <BalanceScaleSvg />;
    default:
      return null;
  }
}

/* ============================================================
 * SVG 1: 수직선 (Number Line)
 * ============================================================ */
function NumberLineSvg() {
  const numbers = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
  const cx = 300; // viewBox 중심 x
  const y = 80; // 수직선 y 위치
  const spacing = 45;

  return (
    <svg
      viewBox="0 0 600 160"
      width="100%"
      role="img"
      aria-label="수직선: -5부터 +5까지의 정수를 나타내는 수직선"
      className="block"
    >
      {/* 음수 영역 배경 */}
      <rect
        x={cx - 5 * spacing}
        y={y - 20}
        width={5 * spacing}
        height={40}
        fill="#fef2f2"
        rx={4}
      />
      {/* 양수 영역 배경 */}
      <rect
        x={cx}
        y={y - 20}
        width={5 * spacing}
        height={40}
        fill="#eff6ff"
        rx={4}
      />

      {/* 주축 */}
      <line
        x1={cx - 5.5 * spacing}
        y1={y}
        x2={cx + 5.5 * spacing}
        y2={y}
        stroke="#374151"
        strokeWidth={2}
      />

      {/* 왼쪽 화살표 */}
      <polygon
        points={`${cx - 5.5 * spacing - 8},${y} ${cx - 5.5 * spacing},${y - 5} ${cx - 5.5 * spacing},${y + 5}`}
        fill="#374151"
      />
      {/* 오른쪽 화살표 */}
      <polygon
        points={`${cx + 5.5 * spacing + 8},${y} ${cx + 5.5 * spacing},${y - 5} ${cx + 5.5 * spacing},${y + 5}`}
        fill="#374151"
      />

      {/* 눈금과 숫자 */}
      {numbers.map((n) => {
        const x = cx + n * spacing;
        const isZero = n === 0;
        return (
          <g key={n}>
            <line
              x1={x}
              y1={y - 8}
              x2={x}
              y2={y + 8}
              stroke={isZero ? '#3b82f6' : '#374151'}
              strokeWidth={isZero ? 2.5 : 1.5}
            />
            {isZero ? (
              <>
                <circle cx={x} cy={y} r={12} fill="#3b82f6" />
                <text
                  x={x}
                  y={y + 4.5}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight="bold"
                  fill="#ffffff"
                >
                  0
                </text>
              </>
            ) : (
              <text
                x={x}
                y={y + 28}
                textAnchor="middle"
                fontSize={12}
                fill="#374151"
                fontWeight={500}
              >
                {n > 0 ? `+${n}` : n}
              </text>
            )}
          </g>
        );
      })}

      {/* 레이블 */}
      <text
        x={cx - 3 * spacing}
        y={y - 30}
        textAnchor="middle"
        fontSize={13}
        fill="#ef4444"
        fontWeight={600}
      >
        음수
      </text>
      <text
        x={cx + 3 * spacing}
        y={y - 30}
        textAnchor="middle"
        fontSize={13}
        fill="#3b82f6"
        fontWeight={600}
      >
        양수
      </text>
    </svg>
  );
}

/* ============================================================
 * SVG 2: 좌표평면 (Coordinate Plane)
 * ============================================================ */
function CoordinatePlaneSvg() {
  const ox = 200;
  const oy = 180;
  const unit = 35;
  const range = 4;

  const pointX = 3;
  const pointY = 2;
  const px = ox + pointX * unit;
  const py = oy - pointY * unit;

  return (
    <svg
      viewBox="0 0 400 360"
      width="100%"
      role="img"
      aria-label="좌표평면: x축과 y축이 있는 2차원 좌표계, 점 (3,2)가 표시됨"
      className="block"
    >
      {/* 격자선 */}
      {Array.from({ length: range * 2 + 1 }, (_, i) => i - range).map((n) => (
        <g key={`grid-${n}`}>
          {n !== 0 && (
            <>
              <line
                x1={ox + n * unit}
                y1={oy - range * unit}
                x2={ox + n * unit}
                y2={oy + range * unit}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <line
                x1={ox - range * unit}
                y1={oy + n * unit}
                x2={ox + range * unit}
                y2={oy + n * unit}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
            </>
          )}
        </g>
      ))}

      {/* X축 */}
      <line
        x1={ox - (range + 0.7) * unit}
        y1={oy}
        x2={ox + (range + 0.7) * unit}
        y2={oy}
        stroke="#374151"
        strokeWidth={2}
      />
      <polygon
        points={`${ox + (range + 0.7) * unit + 8},${oy} ${ox + (range + 0.7) * unit},${oy - 5} ${ox + (range + 0.7) * unit},${oy + 5}`}
        fill="#374151"
      />
      <text
        x={ox + (range + 0.7) * unit + 14}
        y={oy + 5}
        fontSize={14}
        fontWeight={600}
        fill="#374151"
      >
        x
      </text>

      {/* Y축 */}
      <line
        x1={ox}
        y1={oy + (range + 0.7) * unit}
        x2={ox}
        y2={oy - (range + 0.7) * unit}
        stroke="#374151"
        strokeWidth={2}
      />
      <polygon
        points={`${ox},${oy - (range + 0.7) * unit - 8} ${ox - 5},${oy - (range + 0.7) * unit} ${ox + 5},${oy - (range + 0.7) * unit}`}
        fill="#374151"
      />
      <text
        x={ox + 10}
        y={oy - (range + 0.7) * unit - 4}
        fontSize={14}
        fontWeight={600}
        fill="#374151"
      >
        y
      </text>

      {/* 축 눈금 숫자 */}
      {Array.from({ length: range * 2 + 1 }, (_, i) => i - range).map((n) =>
        n !== 0 ? (
          <g key={`tick-${n}`}>
            <text
              x={ox + n * unit}
              y={oy + 18}
              textAnchor="middle"
              fontSize={11}
              fill="#6b7280"
            >
              {n}
            </text>
            <text
              x={ox - 14}
              y={oy - n * unit + 4}
              textAnchor="end"
              fontSize={11}
              fill="#6b7280"
            >
              {n}
            </text>
          </g>
        ) : null,
      )}

      {/* 원점 */}
      <text
        x={ox - 12}
        y={oy + 18}
        textAnchor="end"
        fontSize={11}
        fill="#374151"
        fontWeight={600}
      >
        O
      </text>

      {/* 사분면 라벨 */}
      <text x={ox + 2.5 * unit} y={oy - 2.8 * unit} textAnchor="middle" fontSize={16} fill="#93c5fd" fontWeight={700}>I</text>
      <text x={ox - 2.5 * unit} y={oy - 2.8 * unit} textAnchor="middle" fontSize={16} fill="#fca5a5" fontWeight={700}>II</text>
      <text x={ox - 2.5 * unit} y={oy + 3.2 * unit} textAnchor="middle" fontSize={16} fill="#d9f99d" fontWeight={700}>III</text>
      <text x={ox + 2.5 * unit} y={oy + 3.2 * unit} textAnchor="middle" fontSize={16} fill="#fdba74" fontWeight={700}>IV</text>

      {/* 점 (3,2) 투영 점선 */}
      <line x1={px} y1={py} x2={px} y2={oy} stroke="#3b82f6" strokeWidth={1} strokeDasharray="4 3" />
      <line x1={px} y1={py} x2={ox} y2={py} stroke="#3b82f6" strokeWidth={1} strokeDasharray="4 3" />

      {/* 점 (3,2) */}
      <circle cx={px} cy={py} r={5} fill="#3b82f6" />
      <text x={px + 10} y={py - 8} fontSize={12} fontWeight={600} fill="#3b82f6">
        (3, 2)
      </text>
    </svg>
  );
}

/* ============================================================
 * SVG 3: 삼각형 (Triangle)
 * ============================================================ */
function TriangleSvg() {
  // 꼭짓점 좌표
  const A = { x: 200, y: 40 };
  const B = { x: 60, y: 260 };
  const C = { x: 340, y: 260 };
  // 수선의 발
  const H = { x: 200, y: 260 };

  return (
    <svg
      viewBox="0 0 400 310"
      width="100%"
      role="img"
      aria-label="삼각형: 꼭짓점 A, B, C와 높이가 표시된 삼각형"
      className="block"
    >
      {/* 삼각형 채우기 */}
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill="#eff6ff"
        stroke="#3b82f6"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 높이선 */}
      <line
        x1={A.x}
        y1={A.y}
        x2={H.x}
        y2={H.y}
        stroke="#ef4444"
        strokeWidth={1.5}
        strokeDasharray="6 3"
      />

      {/* 직각 표시 */}
      <polyline
        points={`${H.x - 12},${H.y} ${H.x - 12},${H.y - 12} ${H.x},${H.y - 12}`}
        fill="none"
        stroke="#ef4444"
        strokeWidth={1.5}
      />

      {/* 각도 호: 꼭짓점 A */}
      <path
        d={`M ${A.x - 14},${A.y + 20} A 20 20 0 0 1 ${A.x + 14},${A.y + 20}`}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1.5}
      />
      {/* 각도 호: 꼭짓점 B */}
      <path
        d={`M ${B.x + 22},${B.y} A 20 20 0 0 0 ${B.x + 10},${B.y - 18}`}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1.5}
      />
      {/* 각도 호: 꼭짓점 C */}
      <path
        d={`M ${C.x - 22},${C.y} A 20 20 0 0 1 ${C.x - 10},${C.y - 18}`}
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1.5}
      />

      {/* 꼭짓점 라벨 */}
      <text x={A.x} y={A.y - 10} textAnchor="middle" fontSize={14} fontWeight={700} fill="#1e40af">A</text>
      <text x={B.x - 14} y={B.y + 6} textAnchor="middle" fontSize={14} fontWeight={700} fill="#1e40af">B</text>
      <text x={C.x + 14} y={C.y + 6} textAnchor="middle" fontSize={14} fontWeight={700} fill="#1e40af">C</text>

      {/* 변 라벨 */}
      <text x={(B.x + C.x) / 2} y={B.y + 22} textAnchor="middle" fontSize={13} fontWeight={600} fill="#374151">a</text>
      <text x={(A.x + C.x) / 2 + 16} y={(A.y + C.y) / 2} textAnchor="middle" fontSize={13} fontWeight={600} fill="#374151">b</text>
      <text x={(A.x + B.x) / 2 - 16} y={(A.y + B.y) / 2} textAnchor="middle" fontSize={13} fontWeight={600} fill="#374151">c</text>

      {/* 높이 라벨 */}
      <text x={H.x + 14} y={(A.y + H.y) / 2 + 4} fontSize={12} fontWeight={600} fill="#ef4444">h</text>
    </svg>
  );
}

/* ============================================================
 * SVG 4: 원 (Circle)
 * ============================================================ */
function CircleSvg() {
  const cx = 200;
  const cy = 170;
  const r = 100;

  return (
    <svg
      viewBox="0 0 400 340"
      width="100%"
      role="img"
      aria-label="원: 중심 O, 반지름 r, 지름 d가 표시된 원"
      className="block"
    >
      {/* 원 */}
      <circle cx={cx} cy={cy} r={r} fill="#f0fdf4" stroke="#10b981" strokeWidth={2.5} />

      {/* 지름선 */}
      <line
        x1={cx - r}
        y1={cy}
        x2={cx + r}
        y2={cy}
        stroke="#6b7280"
        strokeWidth={1.5}
        strokeDasharray="6 3"
      />

      {/* 반지름선 */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + r * Math.cos(Math.PI / 4)}
        y2={cy - r * Math.sin(Math.PI / 4)}
        stroke="#3b82f6"
        strokeWidth={2}
      />

      {/* 중심점 */}
      <circle cx={cx} cy={cy} r={4} fill="#374151" />
      <text x={cx - 12} y={cy - 8} fontSize={14} fontWeight={700} fill="#374151">O</text>

      {/* 반지름 라벨 */}
      <text
        x={cx + r * Math.cos(Math.PI / 4) / 2 + 10}
        y={cy - r * Math.sin(Math.PI / 4) / 2 - 6}
        fontSize={14}
        fontWeight={700}
        fill="#3b82f6"
      >
        r
      </text>

      {/* 지름 라벨 */}
      <text x={cx} y={cy + 20} textAnchor="middle" fontSize={14} fontWeight={700} fill="#6b7280">d = 2r</text>

      {/* 둘레 호 표시 */}
      <path
        d={`M ${cx + r},${cy} A ${r} ${r} 0 0 1 ${cx - r},${cy}`}
        fill="none"
        stroke="#10b981"
        strokeWidth={3}
        strokeDasharray="8 4"
        opacity={0.6}
      />

      {/* 공식 */}
      <text x={cx} y={cy + r + 40} textAnchor="middle" fontSize={13} fill="#374151" fontWeight={600}>
        둘레 = 2{'\u03C0'}r
      </text>
      <text x={cx} y={cy + r + 60} textAnchor="middle" fontSize={13} fill="#374151" fontWeight={600}>
        넓이 = {'\u03C0'}r{'\u00B2'}
      </text>
    </svg>
  );
}

/* ============================================================
 * SVG 5: 막대그래프 (Bar Chart)
 * ============================================================ */
function BarChartSvg() {
  const days = ['월', '화', '수', '목', '금'];
  const values = [3, 5, 2, 6, 4];
  const maxVal = 7;
  const barW = 40;
  const gap = 20;
  const chartLeft = 60;
  const chartBottom = 230;
  const chartHeight = 180;
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  return (
    <svg
      viewBox="0 0 400 280"
      width="100%"
      role="img"
      aria-label="막대그래프: 월요일부터 금요일까지 주간 학습 시간"
      className="block"
    >
      {/* 제목 */}
      <text x={200} y={24} textAnchor="middle" fontSize={14} fontWeight={700} fill="#374151">
        주간 학습 시간
      </text>

      {/* Y축 격자선 */}
      {Array.from({ length: maxVal + 1 }, (_, i) => i).map((v) => {
        const yy = chartBottom - (v / maxVal) * chartHeight;
        return (
          <g key={`y-${v}`}>
            <line x1={chartLeft} y1={yy} x2={chartLeft + (barW + gap) * 5 + gap} y2={yy} stroke="#e5e7eb" strokeWidth={1} />
            <text x={chartLeft - 8} y={yy + 4} textAnchor="end" fontSize={11} fill="#6b7280">
              {v}
            </text>
          </g>
        );
      })}

      {/* Y축 */}
      <line x1={chartLeft} y1={chartBottom} x2={chartLeft} y2={chartBottom - chartHeight - 10} stroke="#374151" strokeWidth={1.5} />

      {/* 막대 */}
      {days.map((day, i) => {
        const bx = chartLeft + gap + i * (barW + gap);
        const bh = (values[i] / maxVal) * chartHeight;
        const by = chartBottom - bh;
        return (
          <g key={day}>
            <rect x={bx} y={by} width={barW} height={bh} fill={colors[i]} rx={4} ry={4} />
            <text x={bx + barW / 2} y={by - 6} textAnchor="middle" fontSize={12} fontWeight={600} fill={colors[i]}>
              {values[i]}h
            </text>
            <text x={bx + barW / 2} y={chartBottom + 18} textAnchor="middle" fontSize={12} fill="#374151" fontWeight={500}>
              {day}
            </text>
          </g>
        );
      })}

      {/* Y축 라벨 */}
      <text
        x={16}
        y={chartBottom - chartHeight / 2}
        textAnchor="middle"
        fontSize={11}
        fill="#6b7280"
        transform={`rotate(-90, 16, ${chartBottom - chartHeight / 2})`}
      >
        시간 (h)
      </text>
    </svg>
  );
}

/* ============================================================
 * SVG 6: 일차함수 (Linear Function)
 * ============================================================ */
function LinearFunctionSvg() {
  const ox = 180;
  const oy = 200;
  const unit = 30;
  const range = 5;

  // y = 2x + 1
  const slope = 2;
  const intercept = 1;

  function toSvg(xVal: number, yVal: number) {
    return { x: ox + xVal * unit, y: oy - yVal * unit };
  }

  // 선 범위
  const x1 = -2;
  const x2 = 3;
  const p1 = toSvg(x1, slope * x1 + intercept);
  const p2 = toSvg(x2, slope * x2 + intercept);

  // y절편
  const yInt = toSvg(0, intercept);
  // 기울기 삼각형: (1,3) ~ (2,5) -> dx=1, dy=2
  const slopeP1 = toSvg(1, slope * 1 + intercept);
  const slopeP2 = toSvg(2, slope * 2 + intercept);
  const slopeCorner = toSvg(2, slope * 1 + intercept);

  return (
    <svg
      viewBox="0 0 400 340"
      width="100%"
      role="img"
      aria-label="일차함수 그래프: y = 2x + 1의 직선이 좌표평면에 그려짐"
      className="block"
    >
      {/* 격자 */}
      {Array.from({ length: range * 2 + 1 }, (_, i) => i - range).map((n) => (
        <g key={`g-${n}`}>
          {n !== 0 && (
            <>
              <line x1={ox + n * unit} y1={oy - range * unit} x2={ox + n * unit} y2={oy + range * unit} stroke="#f3f4f6" strokeWidth={1} />
              <line x1={ox - range * unit} y1={oy + n * unit} x2={ox + range * unit} y2={oy + n * unit} stroke="#f3f4f6" strokeWidth={1} />
            </>
          )}
        </g>
      ))}

      {/* 축 */}
      <line x1={ox - (range + 0.5) * unit} y1={oy} x2={ox + (range + 0.5) * unit} y2={oy} stroke="#374151" strokeWidth={1.5} />
      <line x1={ox} y1={oy + (range + 0.5) * unit} x2={ox} y2={oy - (range + 0.5) * unit} stroke="#374151" strokeWidth={1.5} />

      {/* 축 화살표 */}
      <polygon points={`${ox + (range + 0.5) * unit + 6},${oy} ${ox + (range + 0.5) * unit},${oy - 4} ${ox + (range + 0.5) * unit},${oy + 4}`} fill="#374151" />
      <polygon points={`${ox},${oy - (range + 0.5) * unit - 6} ${ox - 4},${oy - (range + 0.5) * unit} ${ox + 4},${oy - (range + 0.5) * unit}`} fill="#374151" />

      <text x={ox + (range + 0.5) * unit + 12} y={oy + 5} fontSize={13} fontWeight={600} fill="#374151">x</text>
      <text x={ox + 8} y={oy - (range + 0.5) * unit - 2} fontSize={13} fontWeight={600} fill="#374151">y</text>

      {/* 축 눈금 */}
      {Array.from({ length: range * 2 + 1 }, (_, i) => i - range).map((n) =>
        n !== 0 ? (
          <g key={`t-${n}`}>
            <text x={ox + n * unit} y={oy + 16} textAnchor="middle" fontSize={10} fill="#9ca3af">{n}</text>
            <text x={ox - 12} y={oy - n * unit + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{n}</text>
          </g>
        ) : null,
      )}
      <text x={ox - 12} y={oy + 14} textAnchor="end" fontSize={10} fill="#374151" fontWeight={600}>O</text>

      {/* 직선 y = 2x + 1 */}
      <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#3b82f6" strokeWidth={2.5} />

      {/* 기울기 삼각형 */}
      <line x1={slopeP1.x} y1={slopeP1.y} x2={slopeCorner.x} y2={slopeCorner.y} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 2" />
      <line x1={slopeCorner.x} y1={slopeCorner.y} x2={slopeP2.x} y2={slopeP2.y} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 2" />

      {/* 기울기 라벨 */}
      <text x={slopeCorner.x + 8} y={(slopeCorner.y + slopeP1.y) / 2 + 4} fontSize={11} fill="#ef4444" fontWeight={600}>1</text>
      <text x={(slopeCorner.x + slopeP2.x) / 2} y={slopeCorner.y + 16} textAnchor="middle" fontSize={11} fill="#ef4444" fontWeight={600}>2</text>

      {/* y절편 점 */}
      <circle cx={yInt.x} cy={yInt.y} r={5} fill="#10b981" />
      <text x={yInt.x + 10} y={yInt.y - 8} fontSize={12} fontWeight={600} fill="#10b981">
        (0, 1)
      </text>

      {/* 수식 라벨 */}
      <text x={p2.x + 8} y={p2.y - 4} fontSize={13} fontWeight={700} fill="#3b82f6">
        y = 2x + 1
      </text>

      {/* 기울기 설명 */}
      <text x={slopeCorner.x + 20} y={slopeCorner.y + 4} fontSize={10} fill="#ef4444">
        기울기 = 2/1 = 2
      </text>
    </svg>
  );
}

/* ============================================================
 * SVG 7: 양팔 저울 (Balance Scale)
 * ============================================================ */
function BalanceScaleSvg() {
  return (
    <svg
      viewBox="0 0 400 280"
      width="100%"
      role="img"
      aria-label="양팔 저울: 왼쪽에 x + 3, 오른쪽에 7, 등호가 받침점에 표시됨"
      className="block"
    >
      {/* 받침대 */}
      <polygon points="200,240 170,270 230,270" fill="#d1d5db" stroke="#9ca3af" strokeWidth={1.5} />

      {/* 지지대 */}
      <line x1={200} y1={100} x2={200} y2={240} stroke="#6b7280" strokeWidth={3} />

      {/* 수평 막대 */}
      <line x1={60} y1={100} x2={340} y2={100} stroke="#374151" strokeWidth={4} strokeLinecap="round" />

      {/* 받침점 원 */}
      <circle cx={200} cy={100} r={8} fill="#f59e0b" stroke="#d97706" strokeWidth={2} />
      <text x={200} y={104} textAnchor="middle" fontSize={12} fontWeight={900} fill="#ffffff">=</text>

      {/* 왼쪽 접시 -- 줄 */}
      <line x1={100} y1={100} x2={60} y2={140} stroke="#6b7280" strokeWidth={1.5} />
      <line x1={100} y1={100} x2={140} y2={140} stroke="#6b7280" strokeWidth={1.5} />

      {/* 왼쪽 접시 */}
      <ellipse cx={100} cy={145} rx={50} ry={10} fill="#dbeafe" stroke="#93c5fd" strokeWidth={1.5} />
      <rect x={60} y={150} width={80} height={42} rx={8} fill="#eff6ff" stroke="#93c5fd" strokeWidth={1.5} />
      <text x={100} y={176} textAnchor="middle" fontSize={18} fontWeight={700} fill="#1d4ed8">
        x + 3
      </text>

      {/* 오른쪽 접시 -- 줄 */}
      <line x1={300} y1={100} x2={260} y2={140} stroke="#6b7280" strokeWidth={1.5} />
      <line x1={300} y1={100} x2={340} y2={140} stroke="#6b7280" strokeWidth={1.5} />

      {/* 오른쪽 접시 */}
      <ellipse cx={300} cy={145} rx={50} ry={10} fill="#dcfce7" stroke="#86efac" strokeWidth={1.5} />
      <rect x={260} y={150} width={80} height={42} rx={8} fill="#f0fdf4" stroke="#86efac" strokeWidth={1.5} />
      <text x={300} y={176} textAnchor="middle" fontSize={18} fontWeight={700} fill="#166534">
        7
      </text>

      {/* 등호 라벨 */}
      <text x={200} y={260} textAnchor="middle" fontSize={12} fill="#6b7280" fontWeight={500}>
        양변이 같으면 균형
      </text>
    </svg>
  );
}
