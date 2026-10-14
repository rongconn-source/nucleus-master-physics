export interface ExamTrapItem {
  trap: string;
  correction: string;
}

export interface FormulaCardItem {
  title: string;
  latex: string;
  note: string;
}

export interface TheoryTopic {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  summaryPoints: string[];
  formulas: FormulaCardItem[];
  examTraps: ExamTrapItem[];
  workedExample: {
    question: string;
    solution: string;
  };
}

export const THEORY_TOPICS: TheoryTopic[] = [
  {
    id: 1,
    code: 'Chuyên đề 01',
    title: 'Cấu trúc Hạt nhân & Kí hiệu Hạt nhân',
    subtitle: 'Nucleon, số khối, đồng vị, kích thước hạt nhân, khối lượng nguyên tử amu và thí nghiệm Rutherford',
    summaryPoints: [
      'Hạt nhân nguyên tử tích điện dương $+Ze$, được cấu tạo từ hai loại hạt gọi chung là nucleon: Proton ($p$, mang điện tích $+e \approx +1,6 \\cdot 10^{-19}\\text{ C}$, khối lượng $m_p \\approx 1,00728\\text{ amu}$) và Neutron ($n$, không mang điện, khối lượng $m_n \\approx 1,00866\\text{ amu}$).',
      'Kí hiệu hạt nhân: ${}^{A}_{Z}\\text{X}$, trong đó $Z$ là nguyên tử số (số proton = số thứ tự trong bảng tuần hoàn), $A$ là số khối (tổng số nucleon: $A = Z + N$). Số neutron trong hạt nhân là $N = A - Z$.',
      'Hạt quark: Hạt nucleon vẫn chưa phải là hạt nhỏ nhất, còn có các hạt nhỏ bé hơn cấu tạo nên các nucleon gọi là hạt quark (theo đúng tài liệu Chủ đề 1).',
      'Thí nghiệm tán xạ Rutherford (1911): Bắn chùm hạt $\\alpha$ vào lá vàng mỏng (độ dày chỉ khoảng $4 \\cdot 10^{-7}\\text{ m} = 400\\text{ nm}$). Phần lớn hạt $\\alpha$ đi thẳng, chỉ khoảng $1/10^4$ hạt bị tán xạ góc lớn hơn $90^\\circ$, chứng minh nguyên tử phần lớn là rỗng và hạt nhân mang điện dương tập trung ở tâm cực nhỏ.',
      'Đồng vị là các hạt nhân có cùng số proton $Z$ nhưng khác nhau số neutron $N$ (dẫn đến khác số khối $A$). Đồng khối là các hạt nhân có cùng số khối $A$ nhưng khác số proton $Z$.',
      'Đơn vị khối lượng nguyên tử ($1\\text{ amu} = 1\\text{ u} = \\frac{1}{12}m({}^{12}_{6}\\text{C}) \\approx 1,66055 \\cdot 10^{-27}\\text{ kg}$). Bán kính hạt nhân $R \\approx 1,2 \\cdot 10^{-15} \\cdot A^{1/3}\\text{ m} = 1,2 \\cdot A^{1/3}\\text{ fm}$. Mật độ khối lượng hạt nhân cực lớn (cỡ $10^{17}\\text{ kg/m}^3$).',
    ],
    formulas: [
      {
        title: 'Số khối & Số hạt Neutron',
        latex: 'A = Z + N \\implies N = A - Z',
        note: 'A: tổng số nucleon; Z: số proton; N: số neutron.',
      },
      {
        title: 'Bán kính & Thể tích hạt nhân',
        latex: 'R = 1,2 \\cdot 10^{-15} \\cdot A^{1/3}\\text{ (m)} = 1,2 \\cdot A^{1/3}\\text{ (fm)}',
        note: 'Thể tích hạt nhân V = (4/3)πR³ tỉ lệ thuận với số khối A.',
      },
      {
        title: 'Đơn vị khối lượng nguyên tử & Năng lượng nghỉ',
        latex: '1\\text{ amu} = 1,66055 \\cdot 10^{-27}\\text{ kg} \\implies 1\\text{ amu}\\cdot c^2 = 931,5\\text{ MeV}',
        note: 'Dùng để quy đổi trực tiếp giữa khối lượng (amu) và năng lượng (MeV).',
      },
      {
        title: 'Điện tích hạt nhân',
        latex: 'q = +Z e = +Z \\cdot 1,6 \\cdot 10^{-19}\\text{ (C)}',
        note: 'Z là số proton; e là điện tích nguyên tố.',
      },
    ],
    examTraps: [
      {
        trap: 'Nhầm lẫn số neutron bằng số khối A hoặc lấy Z trừ A.',
        correction: 'Số khối A là tổng số nucleon (proton + neutron). Số neutron luôn là N = A - Z.',
      },
      {
        trap: 'Cho rằng các đồng vị của cùng một nguyên tố có tính chất phóng xạ và vật lý giống hệt nhau.',
        correction: 'Các đồng vị có cùng số Z nên có tính chất hóa học tương tự nhau, nhưng khác số khối A nên tính chất vật lý và độ bền phóng xạ hoàn toàn khác nhau (ví dụ ¹²C bền, ¹⁴C phóng xạ β⁻).',
      },
      {
        trap: 'Hiểu sai hạt nhân Hydrogen thường (¹₁H) có 1 proton và 1 neutron.',
        correction: 'Hạt nhân ¹₁H có Z = 1, A = 1 nên số neutron N = 1 - 1 = 0 (không có neutron nào).',
      },
      {
        trap: 'Nhầm lẫn giữa điện tích hạt nhân q = +Ze và số proton Z.',
        correction: 'Số proton là Z (một số nguyên không thứ nguyên), còn điện tích của hạt nhân là q = +Ze = +Z·(1,6·10⁻¹⁹ C) đo bằng Coulomb.',
      },
    ],
    workedExample: {
      question:
        'Hạt nhân Uranium ${}^{235}_{92}\\text{U}$ có bao nhiêu hạt nucleon, proton, neutron? Tính điện tích của hạt nhân này và ước tính bán kính của nó.',
      solution:
        'Từ kí hiệu ${}^{235}_{92}\\text{U}$: Số nucleon là $A = 235$; số proton là $Z = 92$; số neutron là $N = A - Z = 235 - 92 = 143$. Điện tích hạt nhân: $q = +Ze = +92 \\cdot (1,6 \\cdot 10^{-19}\\text{ C}) = +1,472 \\cdot 10^{-17}\\text{ C}$. Bán kính hạt nhân ước tính: $R = 1,2 \\cdot 10^{-15} \\cdot A^{1/3} = 1,2 \\cdot 10^{-15} \\cdot (235)^{1/3} \\approx 7,4 \\cdot 10^{-15}\\text{ m} = 7,4\\text{ fm}$.',
    },
  },
  {
    id: 2,
    code: 'Chuyên đề 02',
    title: 'Phản ứng Hạt nhân & Các Định luật Bảo toàn',
    subtitle: 'Thí nghiệm Blackett, 4 định luật bảo toàn tuyệt đối, phân hạch dây chuyền và nhiệt hạch',
    summaryPoints: [
      'Phản ứng hạt nhân là mọi quá trình dẫn đến sự biến đổi hạt nhân này thành hạt nhân khác, gồm: Phản ứng hạt nhân tự phát (phóng xạ) và Phản ứng hạt nhân kích thích (tương tác giữa các hạt nhân hoặc hạt nhân với nucleon).',
      'Thí nghiệm Blackett (1925): Patrick Blackett dùng buồng sương chụp lại được vết tương tác rẽ nhánh của phản ứng hạt nhân nhân tạo đầu tiên do Rutherford (1919) phát hiện: ${}^{4}_{2}\\text{He} + {}^{14}_{7}\\text{N} \\rightarrow {}^{17}_{8}\\text{O} + {}^{1}_{1}\\text{H}$. Vết sương chia 2 nhánh: nhánh mờ dài là proton (${}^{1}_{1}\\text{H}$), nhánh đậm ngắn là hạt nhân oxy (${}^{17}_{8}\\text{O}$).',
      'Bốn định luật bảo toàn luôn nghiệm đúng trong mọi phản ứng hạt nhân: (1) Bảo toàn số nucleon (số khối $A$), (2) Bảo toàn điện tích (nguyên tử số $Z$), (3) Bảo toàn năng lượng toàn phần, và (4) Bảo toàn động lượng $\\vec{p}$. KHÔNG có bảo toàn khối lượng nghỉ và KHÔNG có bảo toàn số proton/neutron riêng rẽ.',
      'Phân hạch dây chuyền: Mỗi hạt nhân ${}^{235}\\text{U}$ hấp thụ 1 neutron chậm vỡ thành 2 mảnh nhẹ hơn kèm 2-3 neutron nhanh và tỏa khoảng $200\\text{ MeV}$. Hệ số nhân neutron $k$: $k < 1$ (tắt dần); $k = 1$ (kiểm soát được trong nhà máy điện hạt nhân); $k > 1$ (bùng nổ không kiểm soát trong bom hạt nhân). Khối lượng tới hạn $m_{th}$ là khối lượng tối thiểu để duy trì phản ứng ($^{235}\\text{U}$ làm giàu 90% có $m_{th} \\approx 47\\text{ kg}$, $^{239}\\text{Pu}$ có $m_{th} \\approx 10\\text{ kg}$).',
      'Phản ứng tổng hợp nhiệt hạch: Hai hạt nhân rất nhẹ kết hợp tạo thành hạt nhân nặng hơn (${}^{2}_{1}\\text{H} + {}^{3}_{1}\\text{H} \\rightarrow {}^{4}_{2}\\text{He} + {}^{1}_{0}n + 17,6\\text{ MeV}$). Điều kiện xảy ra: nhiệt độ cực cao cỡ $10^7 - 10^8\\text{ K}$ để các hạt nhân có động năng thắng lực đẩy tĩnh điện Coulomb.',
    ],
    formulas: [
      {
        title: 'Định luật bảo toàn số nucleon & điện tích',
        latex: '\\begin{cases} A_1 + A_2 = A_3 + A_4 \\\\ Z_1 + Z_2 = Z_3 + Z_4 \\end{cases}',
        note: 'Xét cho phản ứng tổng quát: A₁Z₁X₁ + A₂Z₂X₂ → A₃Z₃X₃ + A₄Z₄X₄.',
      },
      {
        title: 'Hệ số nhân Neutron k & Phân hạch dây chuyền',
        latex: 'k = \\frac{\\text{Số neutron thế hệ n+1}}{\\text{Số neutron thế hệ n}} \\implies \\begin{cases} k < 1: \\text{Tắt dần} \\\\ k = 1: \\text{Lò phản ứng công suất ổn định} \\\\ k > 1: \\text{Phản ứng bùng nổ} \\end{cases}',
        note: 'Điều kiện xảy ra phân hạch dây chuyền: k ≥ 1 và khối lượng m ≥ m_th.',
      },
      {
        title: 'Năng lượng tỏa ra hoặc thu vào của phản ứng',
        latex: '\\Delta E = (m_{\\text{trước}} - m_{\\text{sau}})c^2 = (\\Delta m_{\\text{sau}} - \\Delta m_{\\text{trước}})c^2 = W_{\\text{lk sau}} - W_{\\text{lk trước}}',
        note: 'Khối lượng: Lấy TRƯỚC trừ SAU. Độ hụt khối & W_lk: Lấy SAU trừ TRƯỚC.',
      },
      {
        title: 'Bảo toàn năng lượng toàn phần qua động năng K',
        latex: 'm_{\\text{trước}}c^2 + K_{\\text{trước}} = m_{\\text{sau}}c^2 + K_{\\text{sau}} \\implies \\Delta E = K_{\\text{sau}} - K_{\\text{trước}}',
        note: 'Tổng động năng các hạt sau trừ trước bằng chính năng lượng tỏa ra ΔE.',
      },
    ],
    examTraps: [
      {
        trap: 'Khẳng định trong phản ứng hạt nhân có định luật bảo toàn khối lượng nghỉ hoặc bảo toàn số proton/neutron riêng biệt.',
        correction: 'Khối lượng nghỉ KHÔNG bảo toàn (vì chuyển hóa thành năng lượng ΔE). Số proton và neutron có thể biến đổi lẫn nhau (như n → p + e⁻ + ν̄ trong phóng xạ β⁻). Chỉ có TỔNG SỐ NUCLEON và ĐIỆN TÍCH được bảo toàn.',
      },
      {
        trap: 'Viết ngược dấu khi tính ΔE theo độ hụt khối: lấy Δm_trước trừ Δm_sau.',
        correction: 'Vì m_X = Z.m_p + N.m_n - Δm nên (m_trước - m_sau) = (Δm_sau - Δm_trước). Luôn nhớ: Khối lượng lấy TRƯỚC trừ SAU; Độ hụt khối & Năng lượng liên kết lấy SAU trừ TRƯỚC.',
      },
      {
        trap: 'Cho rằng phản ứng nhiệt hạch tỏa ra ít năng lượng hơn phản ứng phân hạch trên cùng một đơn vị khối lượng nhiên liệu.',
        correction: 'Mỗi phân hạch tỏa ~200 MeV, mỗi nhiệt hạch tỏa ~17.6 MeV. Tuy nhiên tính trên CÙNG MỘT ĐƠN VỊ KHỐI LƯỢNG (1 kg nhiên liệu) thì nhiệt hạch tỏa năng lượng lớn hơn phân hạch từ 3 đến 4 lần!',
      },
    ],
    workedExample: {
      question:
        'Cho phản ứng nhiệt hạch ${}^{2}_{1}\\text{H} + {}^{3}_{1}\\text{H} \\rightarrow {}^{4}_{2}\\text{He} + {}^{1}_{0}n$. Biết $m_D = 2,0136\\text{ amu}$, $m_T = 3,0160\\text{ amu}$, $m_{\\alpha} = 4,0015\\text{ amu}$, $m_n = 1,0087\\text{ amu}$. Tính năng lượng tỏa ra khi tổng hợp hoàn toàn $1\\text{ g}$ khí Helium.',
      solution:
        'Năng lượng tỏa ra của một phản ứng: $\\Delta E = (m_D + m_T - m_{\\alpha} - m_n) \\times 931,5 = (5,0296 - 5,0102) \\times 931,5 \\approx 18,07\\text{ MeV}$. Số hạt Helium trong 1 g là $N = \\frac{1}{4} \\cdot 6,022 \\cdot 10^{23} \\approx 1,5055 \\cdot 10^{23}$ hạt. Tổng năng lượng tỏa ra: $E_{\\text{tổng}} = N \\cdot \\Delta E \\approx 2,72 \\cdot 10^{24}\\text{ MeV} \\approx 4,35 \\cdot 10^{11}\\text{ J}$ (tương đương đốt cháy khoảng 10 tấn xăng dầu).',
    },
  },
  {
    id: 3,
    code: 'Chuyên đề 03',
    title: 'Độ hụt khối & Năng lượng Liên kết',
    subtitle: 'Lực hạt nhân, độ hụt khối Δm, năng lượng liên kết W_lk và liên kết riêng W_lkr',
    summaryPoints: [
      'Lực hạt nhân (lực tương tác mạnh) là lực hút rất mạnh giữa các nucleon trong hạt nhân, có bán kính tác dụng cực ngắn ($\\sim 10^{-15}\\text{ m}$), không phụ thuộc vào điện tích (lực hút $p-p$, $n-n$, $p-n$ như nhau).',
      'Tổng khối lượng của các nucleon riêng rẽ luôn lớn hơn khối lượng của hạt nhân tạo thành ($m_0 > m_X$). Độ chênh lệch đó gọi là độ hụt khối $\\Delta m$.',
      'Năng lượng liên kết $W_{\\text{lk}}$ là năng lượng tối thiểu cần cung cấp để tách toàn bộ hạt nhân thành các nucleon riêng lẻ (hoặc năng lượng tỏa ra khi các nucleon kết hợp tạo thành hạt nhân).',
      'Năng lượng liên kết riêng $W_{\\text{lkr}} = \\frac{W_{\\text{lk}}}{A}$ (tính cho 1 nucleon) đặc trưng cho mức độ bền vững của hạt nhân. Các hạt nhân có số khối trung bình ($50 < A < 95$, điển hình là ${}^{56}_{26}\\text{Fe}$ với $W_{\\text{lkr}} \\approx 8,8\\text{ MeV/nucleon}$) bền vững nhất.',
    ],
    formulas: [
      {
        title: 'Độ hụt khối của hạt nhân X',
        latex: '\\Delta m = Z \\cdot m_p + (A - Z) \\cdot m_n - m_X',
        note: 'Đơn vị thường dùng là amu. Hạt nhân ¹₁H có 1 proton duy nhất nên Δm = 0.',
      },
      {
        title: 'Năng lượng liên kết',
        latex: 'W_{\\text{lk}} = \\Delta m \\cdot c^2 = \\left[Z m_p + (A - Z)m_n - m_X\\right]c^2',
        note: 'Nếu Δm tính bằng amu thì W_lk (MeV) = Δm × 931,5.',
      },
      {
        title: 'Năng lượng liên kết riêng (Đặc trưng độ bền)',
        latex: 'W_{\\text{lkr}} = \\frac{W_{\\text{lk}}}{A}\\text{ (MeV/nucleon)}',
        note: 'Hạt nhân có W_lkr càng lớn thì càng bền vững.',
      },
    ],
    examTraps: [
      {
        trap: 'Kết luận hạt nhân có năng lượng liên kết W_lk lớn hơn thì bền vững hơn.',
        correction: 'Mức độ bền vững chỉ phụ thuộc vào năng lượng liên kết RIÊNG (W_lkr = W_lk / A). Một hạt nhân nặng như ²³⁸U có W_lk rất lớn nhưng W_lkr thấp nên kém bền hơn ⁵⁶Fe.',
      },
      {
        trap: 'Cho rằng lực hạt nhân có cùng bản chất với lực hút tĩnh điện hoặc lực vạn vật hấp dẫn.',
        correction: 'Lực hạt nhân là loại tương tác mạnh cơ bản hoàn toàn mới trong tự nhiên, không liên quan đến điện tích và có cường độ áp đảo lực đẩy Coulomb ở cự ly hạt nhân.',
      },
    ],
    workedExample: {
      question:
        'Cho khối lượng hạt nhân ${}^{4}_{2}\\text{He}$ là $m_{\\text{He}} = 4,0015\\text{ amu}$; $m_p = 1,00728\\text{ amu}$; $m_n = 1,00866\\text{ amu}$. Tính độ hụt khối $\\Delta m$, năng lượng liên kết và năng lượng liên kết riêng của hạt nhân Heli.',
      solution:
        'Hạt nhân Heli có $Z = 2$ proton và $N = 4 - 2 = 2$ neutron. Độ hụt khối: $\\Delta m = 2 \\cdot 1,00728 + 2 \\cdot 1,00866 - 4,0015 = 0,03038\\text{ amu}$. Năng lượng liên kết: $W_{\\text{lk}} = 0,03038 \\times 931,5 \\approx 28,30\\text{ MeV}$. Năng lượng liên kết riêng: $W_{\\text{lkr}} = \\frac{28,30}{4} \\approx 7,075\\text{ MeV/nucleon}$.',
    },
  },
  {
    id: 4,
    code: 'Chuyên đề 04',
    title: 'Hệ thức Einstein & Động học Tương đối tính',
    subtitle: 'Liên hệ giữa khối lượng và năng lượng E = mc², động năng và động lượng tương đối tính',
    summaryPoints: [
      'Theo thuyết tương đối hẹp của Einstein, một vật có khối lượng $m$ thì luôn mang một năng lượng toàn phần tương ứng $E = mc^2$ và ngược lại.',
      'Khi vật đứng yên ($v = 0$), vật có khối lượng nghỉ $m_0$ và năng lượng nghỉ $E_0 = m_0 c^2$.',
      'Khi chuyển động với tốc độ $v$, khối lượng của vật tăng lên thành khối lượng động $m = \\frac{m_0}{\\sqrt{1 - v^2/c^2}} = \\gamma m_0$ (với hệ số Lorentz $\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}} \\ge 1$).',
      'Năng lượng toàn phần của vật khi chuyển động: $E = E_0 + K = mc^2$, suy ra động năng tương đối tính $K = (m - m_0)c^2 = (\\gamma - 1)m_0 c^2$. Khi $v \\ll c$, biểu thức động năng thu về dạng cổ điển $K \\approx \\frac{1}{2}m_0 v^2$.',
    ],
    formulas: [
      {
        title: 'Hệ thức Einstein về năng lượng nghỉ và toàn phần',
        latex: 'E_0 = m_0 c^2; \\quad E = mc^2 = \\frac{m_0 c^2}{\\sqrt{1 - \\frac{v^2}{c^2}}}',
        note: 'm: khối lượng tương đối tính; m₀: khối lượng nghỉ.',
      },
      {
        title: 'Động năng tương đối tính',
        latex: 'K = E - E_0 = (m - m_0)c^2 = m_0 c^2 \\left(\\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}} - 1\\right)',
        note: 'Không được dùng K = 1/2 m v² khi v tiệm cận c (v > 0,1c).',
      },
      {
        title: 'Khối lượng động và Năng lượng toàn phần',
        latex: 'm = \\frac{m_0}{\\sqrt{1 - \\frac{v^2}{c^2}}} \\implies E = mc^2 = \\frac{m_0 c^2}{\\sqrt{1 - \\frac{v^2}{c^2}}} = E_0 + K',
        note: 'Khi tốc độ v tăng dần tiệm cận c thì khối lượng động m và năng lượng toàn phần E tăng rất lớn.',
      },
    ],
    examTraps: [
      {
        trap: 'Áp dụng công thức động năng cổ điển K = 1/2 m v² cho hạt chuyển động với tốc độ lớn (như hạt electron trong máy gia tốc hoặc tia beta có v = 0,8c).',
        correction: 'Khi tốc độ v lớn, bắt buộc dùng hệ thức tương đối tính K = (m - m₀)c² = m₀c²(1/√(1 - v²/c²) - 1).',
      },
      {
        trap: 'Cho rằng khối lượng của một vật là đại lượng bất biến không phụ thuộc vào tốc độ chuyển động.',
        correction: 'Theo thuyết tương đối của Einstein, khối lượng nghỉ m₀ xác định khi vật đứng yên; khi chuyển động với tốc độ v, khối lượng động tăng lên: m = m₀ / √(1 - v²/c²).',
      },
    ],
    workedExample: {
      question:
        'Một hạt proton có khối lượng nghỉ $m_0 = 938,3\\text{ MeV}/c^2$ chuyển động với tốc độ $v = 0,6c$. Tính năng lượng toàn phần $E$ và động năng $K$ của proton.',
      solution:
        'Hệ số Lorentz: $\\gamma = \\frac{1}{\\sqrt{1 - 0,6^2}} = \\frac{1}{0,8} = 1,25$. Năng lượng nghỉ $E_0 = m_0 c^2 = 938,3\\text{ MeV}$. Năng lượng toàn phần: $E = \\gamma E_0 = 1,25 \\times 938,3 = 1172,875\\text{ MeV}$. Động năng của hạt: $K = E - E_0 = 1172,875 - 938,3 = 234,575\\text{ MeV}$.',
    },
  },
  {
    id: 5,
    code: 'Chuyên đề 05',
    title: 'Bản chất Các loại Tia Phóng xạ (α, β⁻, β⁺, γ)',
    subtitle: 'Bản chất hạt, phương trình biến đổi hạt nhân, hạt neutrino và khả năng đâm xuyên',
    summaryPoints: [
      'Phóng xạ là quá trình phân rã tự phát của một hạt nhân không bền vững thành hạt nhân khác và phát ra các tia phóng xạ. Quá trình phóng xạ có tính ngẫu nhiên, không phụ thuộc vào các tác nhân vật lý và hóa học (áp suất, nhiệt độ, liên kết phân tử).',
      'Tia Alpha ($\\alpha$): Dòng hạt nhân Helium ${}^{4}_{2}\\text{He}$, mang điện tích $+2e$. Vận tốc phóng ra cỡ $2 \\cdot 10^7\\text{ m/s}$. Khả năng ion hóa chất khí cực mạnh nhưng khả năng đâm xuyên kém nhất (chỉ đi được vài cm trong không khí, bị chặn lại bởi tờ giấy mỏng). Lệch về bản âm của tụ điện.',
      'Tia Beta trừ ($\\beta^-$): Dòng electron ${}^{0}_{-1}e$, kèm phản neutrino $\\bar{\\nu}_e$. Vận tốc tiệm cận tốc độ ánh sáng ($> 0,9c$). Ion hóa yếu hơn tia $\\alpha$ nhưng đâm xuyên mạnh hơn (đi được vài mét trong không khí, bị chặn bởi tấm nhôm dày vài milimét). Lệch mạnh về bản dương của tụ điện.',
      'Tia Beta cộng ($\\beta^+$): Dòng positron ${}^{0}_{+1}e$ (phản hạt của electron mang điện $+e$), kèm neutrino $\\nu_e$. Lệch về bản âm tụ điện cùng phía với hạt $\\alpha$ nhưng góc lệch lớn hơn rất nhiều do khối lượng electron cực nhỏ.',
      'Tia Gamma ($\\gamma$): Sóng điện từ bước sóng cực ngắn ($\\lambda < 10^{-11}\\text{ m}$), photon năng lượng rất cao. Không mang điện nên KHÔNG bị lệch trong điện trường và từ trường. Khả năng đâm xuyên mạnh nhất (xuyên qua lớp bê tông dày hoặc tấm chì hàng chục centimet).',
    ],
    formulas: [
      {
        title: 'Phương trình phóng xạ Alpha (α)',
        latex: '{}^{A}_{Z}\\text{X} \\rightarrow {}^{A-4}_{Z-2}\\text{Y} + {}^{4}_{2}\\text{He}',
        note: 'Hạt nhân con lùi 2 ô trong bảng tuần hoàn Mendeleev, số khối giảm 4 đơn vị.',
      },
      {
        title: 'Phương trình phóng xạ Beta trừ (β⁻) & Beta cộng (β⁺)',
        latex: '\\begin{cases} {}^{A}_{Z}\\text{X} \\rightarrow {}^{A}_{Z+1}\\text{Y} + {}^{0}_{-1}e + \\bar{\\nu}_e & (n \\rightarrow p + e^- + \\bar{\\nu}_e) \\\\ {}^{A}_{Z}\\text{X} \\rightarrow {}^{A}_{Z-1}\\text{Y} + {}^{0}_{+1}e + \\nu_e & (p \\rightarrow n + e^+ + \\nu_e) \\end{cases}',
        note: 'Số khối A không đổi. Phóng xạ β⁻ kèm phản neutrino ν̄; Phóng xạ β⁺ kèm neutrino ν.',
      },
      {
        title: 'Phóng xạ Gamma (γ)',
        latex: '{}^{A}_{Z}\\text{X}^* \\rightarrow {}^{A}_{Z}\\text{X} + \\gamma',
        note: 'Hạt nhân từ trạng thái kích thích chuyển về trạng thái cơ bản, A và Z không đổi.',
      },
    ],
    examTraps: [
      {
        trap: 'Nghĩ rằng tia gamma bị lệch trong điện trường hoặc từ trường giống tia alpha và beta.',
        correction: 'Tia gamma là sóng điện từ (photon), hạt không mang điện nên truyền thẳng qua điện trường và từ trường.',
      },
      {
        trap: 'Cho rằng có thể tăng tốc hoặc làm chậm tốc độ phóng xạ của quặng Uranium bằng cách đốt nóng hoặc nung chảy.',
        correction: 'Hiện tượng phóng xạ diễn ra hoàn toàn từ trong nhân nguyên tử, mang tính tự phát và ngẫu nhiên, không thể can thiệp bởi bất kì tác nhân nhiệt độ, áp suất hay phản ứng hóa học nào.',
      },
    ],
    workedExample: {
      question:
        'Hạt nhân Uranium ${}^{238}_{92}\\text{U}$ sau một chuỗi phân rã gồm $x$ lần phóng xạ $\\alpha$ và $y$ lần phóng xạ $\\beta^-$ biến đổi thành hạt nhân chì bền ${}^{206}_{82}\\text{Pb}$. Tìm $x$ và $y$.',
      solution:
        'Phương trình tổng quát: ${}^{238}_{92}\\text{U} \\rightarrow {}^{206}_{82}\\text{Pb} + x\\,{}^{4}_{2}\\text{He} + y\\,{}^{0}_{-1}e + y\\,\\bar{\\nu}_e$. Bảo toàn số khối $A$: $238 = 206 + 4x \\implies 4x = 32 \\implies x = 8$. Bảo toàn điện tích $Z$: $92 = 82 + 2x - y \\implies 92 = 82 + 2(8) - y \\implies y = 6$. Vậy có 8 lần phân rã $\\alpha$ và 6 lần phân rã $\\beta^-$.',
    },
  },
  {
    id: 6,
    code: 'Chuyên đề 06',
    title: 'Định luật Phóng xạ & Chu kì Bán rã T',
    subtitle: 'Quy luật giảm hàm mũ của số hạt N(t), khối lượng m(t) và khối lượng hạt nhân con sinh ra',
    summaryPoints: [
      'Định luật phóng xạ: Trong quá trình phân rã, số lượng hạt nhân phóng xạ chưa phân rã giảm theo thời gian theo hàm số mũ: $N(t) = N_0 \\cdot 2^{-t/T} = N_0 \\cdot e^{-\\lambda t}$.',
      'Chu kì bán rã $T$ là khoảng thời gian sau đó một nửa số hạt nhân của chất phóng xạ bị phân rã, biến thành hạt nhân khác. Chu kì $T$ chỉ phụ thuộc bản chất chất phóng xạ, không phụ thuộc khối lượng mẫu.',
      'Hằng số phóng xạ $\\lambda = \\frac{\\ln 2}{T} \\approx \\frac{0,693}{T}$ đặc trưng cho tốc độ phân rã của đồng vị phóng xạ.',
      'Số hạt nhân con tạo thành bằng đúng số hạt nhân mẹ đã phân rã: $N_{\\text{con}} = \\Delta N = N_0 (1 - 2^{-t/T})$. Khối lượng con sinh ra: $m_{\\text{con}} = \\frac{\\Delta N}{N_A} \\cdot A_{\\text{con}} = m_0 \\cdot \\frac{A_{\\text{con}}}{A_{\\text{mẹ}}} (1 - 2^{-t/T})$.',
    ],
    formulas: [
      {
        title: 'Số hạt nhân mẹ & Khối lượng mẹ còn lại tại thời điểm t',
        latex: 'N(t) = N_0 \\cdot 2^{-\\frac{t}{T}} = N_0 e^{-\\lambda t}; \\quad m(t) = m_0 \\cdot 2^{-\\frac{t}{T}} = m_0 e^{-\\lambda t}',
        note: 'N₀, m₀: số hạt và khối lượng ban đầu; T: chu kì bán rã; t: thời gian trôi qua.',
      },
      {
        title: 'Số hạt bị phân rã (= Số hạt nhân con tạo thành)',
        latex: '\\Delta N = N_0 - N(t) = N_0 \\left(1 - 2^{-\\frac{t}{T}}\\right); \\quad \\Delta m = m_0 \\left(1 - 2^{-\\frac{t}{T}}\\right)',
        note: 'Chú ý: Δm là khối lượng MẸ bị phân rã, KHÔNG bằng khối lượng con sinh ra!',
      },
      {
        title: 'Khối lượng hạt nhân con Y tạo thành',
        latex: 'm_Y = m_0 \\cdot \\frac{A_Y}{A_X} \\left(1 - 2^{-\\frac{t}{T}}\\right) \\implies \\frac{m_Y}{m_X(t)} = \\frac{A_Y}{A_X} \\left(2^{\\frac{t}{T}} - 1\\right)',
        note: 'Tỉ số khối lượng con/mẹ có nhân thêm hệ số tỉ lệ số khối A_Y / A_X.',
      },
    ],
    examTraps: [
      {
        trap: 'Đồng nhất khối lượng hạt nhân con sinh ra bằng độ giảm khối lượng của hạt nhân mẹ: m_con = Δm.',
        correction: 'Số HẠT con bằng số hạt mẹ phân rã (N_con = ΔN), nhưng KHỐI LƯỢNG thì khác vì số khối hai hạt khác nhau: m_con = ΔN.(A_con / N_A) = Δm_mẹ.(A_con / A_mẹ).',
      },
      {
        trap: 'Sau 2 chu kì bán rã (t = 2T), nghĩ rằng chất phóng xạ đã phân rã hết 100%.',
        correction: 'Sau t = 1T còn 50%; sau t = 2T còn 25%; sau t = 3T còn 12,5%... Theo lý thuyết hàm số mũ, số hạt mẹ tiến về 0 ở vô cực chứ không biến mất hoàn toàn sau 2T.',
      },
    ],
    workedExample: {
      question:
        'Ban đầu có $m_0 = 210\\text{ g}$ chất phóng xạ ${}^{210}_{84}\\text{Po}$ có chu kì bán rã $T = 138\\text{ ngày}$, phóng xạ $\\alpha$ tạo thành chì ${}^{206}_{82}\\text{Pb}$. Tính khối lượng chì tạo thành sau $276\\text{ ngày}$.',
      solution:
        'Thời gian $t = 276\\text{ ngày} = 2T$. Số hạt mẹ phân rã chiếm: $1 - 2^{-2} = \\frac{3}{4} = 75\\%$. Khối lượng Po bị phân rã: $\\Delta m_{\\text{Po}} = 210 \\times 0,75 = 157,5\\text{ g}$. Khối lượng chì sinh ra là: $m_{\\text{Pb}} = \\Delta m_{\\text{Po}} \\cdot \\frac{A_{\\text{Pb}}}{A_{\\text{Po}}} = 157,5 \\cdot \\frac{206}{210} = 154,5\\text{ g}$.',
    },
  },
  {
    id: 7,
    code: 'Chuyên đề 07',
    title: 'Độ Phóng xạ (Hoạt độ Phóng xạ H)',
    subtitle: 'Tốc độ phân rã tức thời, đơn vị Becquerel (Bq), Curie (Ci) và bài toán máy đếm xung',
    summaryPoints: [
      'Độ phóng xạ (hay hoạt độ phóng xạ) $H$ của một mẫu chất phóng xạ là đại lượng đặc trưng cho tính phóng xạ mạnh hay yếu, có giá trị bằng số hạt nhân phân rã trong một đơn vị thời gian (1 giây): $H(t) = -\\frac{dN}{dt} = \\lambda N(t)$.',
      'Đơn vị đo độ phóng xạ trong hệ SI là Becquerel ($1\\text{ Bq} = 1\\text{ phân rã/giây}$). Đơn vị truyền thống là Curie: $1\\text{ Ci} = 3,7 \\cdot 10^{10}\\text{ Bq}$ (xấp xỉ độ phóng xạ của 1 gam Radium-226). Các ước số hay gặp: $1\\text{ mCi} = 10^{-3}\\text{ Ci} = 3,7 \\cdot 10^7\\text{ Bq}$; $1\\text{ }\\mu\\text{Ci} = 3,7 \\cdot 10^4\\text{ Bq}$.',
      'Độ phóng xạ giảm theo thời gian cùng quy luật hàm số mũ với số hạt: $H(t) = H_0 \\cdot 2^{-t/T} = H_0 \\cdot e^{-\\lambda t}$.',
      'Khi tính độ phóng xạ $H = \\lambda N$, bắt buộc hằng số phóng xạ $\\lambda$ phải đổi ra đơn vị giây mũ trừ một ($\\text{s}^{-1}$).',
    ],
    formulas: [
      {
        title: 'Biểu thức Độ phóng xạ (Hoạt độ phóng xạ)',
        latex: 'H(t) = \\lambda N(t) = \\frac{\\ln 2}{T} N_0 \\cdot 2^{-\\frac{t}{T}} = H_0 \\cdot 2^{-\\frac{t}{T}}',
        note: 'Bắt buộc đổi chu kì T ra giây (s) khi tính H theo Bq!',
      },
      {
        title: 'Quy đổi đơn vị Curie (Ci) và Becquerel (Bq)',
        latex: '1\\text{ Ci} = 3,7 \\cdot 10^{10}\\text{ Bq}; \\quad 1\\text{ mCi} = 3,7 \\cdot 10^7\\text{ Bq}; \\quad 1\\text{ }\\mu\\text{Ci} = 3,7 \\cdot 10^4\\text{ Bq}',
        note: '1 Bq = 1 phân rã trong 1 giây.',
      },
      {
        title: 'Số hạt phân rã trong khoảng thời gian ngắn Δt ≪ T',
        latex: '\\Delta N \\approx H(t) \\cdot \\Delta t',
        note: 'Công thức giải nhanh khi thời gian đo xung Δt rất nhỏ so với chu kì T.',
      },
    ],
    examTraps: [
      {
        trap: 'Để nguyên chu kì T ở đơn vị ngày, năm hoặc giờ khi tính độ phóng xạ H = (ln2 / T) . N.',
        correction: 'Đơn vị SI của H là Bq (phân rã/giây), do đó T BẮT BUỘC phải quy đổi sang GIÂY (s) trước khi thế số.',
      },
      {
        trap: 'Nhầm lẫn độ phóng xạ H tỉ lệ nghịch với khối lượng m.',
        correction: 'Độ phóng xạ H = λ.N = (ln2 / T) . (m / A) . N_A, do đó với một chất phóng xạ xác định, H tỉ lệ THUẬN với khối lượng m.',
      },
    ],
    workedExample: {
      question:
        'Một liều dược chất phóng xạ ${}^{131}_{53}\\text{I}$ điều trị tuyến giáp có khối lượng $m_0 = 1,0\\text{ }\\mu\\text{g}$ ($10^{-6}\\text{ g}$) và chu kì bán rã $T = 8,02\\text{ ngày}$. Tính độ phóng xạ ban đầu $H_0$ theo đơn vị Curi ($\\text{Ci}$).',
      solution:
        'Đổi chu kì: $T = 8,02 \\times 86400 \\approx 692928\\text{ s}$. Số hạt ban đầu: $N_0 = \\frac{10^{-6}}{131} \\times 6,022 \\cdot 10^{23} \\approx 4,597 \\cdot 10^{15}$ hạt. Độ phóng xạ ban đầu: $H_0 = \\frac{\\ln 2}{T} N_0 = \\frac{0,69315}{692928} \\times 4,597 \\cdot 10^{15} \\approx 4,60 \\cdot 10^9\\text{ Bq}$. Đổi sang Curi: $H_0 = \\frac{4,60 \\cdot 10^9}{3,7 \\cdot 10^{10}} \\approx 0,124\\text{ Ci} = 124\\text{ mCi}$.',
    },
  },
  {
    id: 8,
    code: 'Chuyên đề 08',
    title: 'Phân tích Đồ thị Phóng xạ',
    subtitle: 'Đọc đồ thị hàm mũ N(t), ΔN(t), giao điểm k.T và đồ thị tuyến tính hóa ln N theo t',
    summaryPoints: [
      'Đồ thị phân rã phóng xạ thể hiện sự phụ thuộc của số hạt còn lại $N(t)$, số hạt bị phân rã $\\Delta N(t)$ hoặc độ phóng xạ $H(t)$ theo thời gian.',
      'Giao điểm đặc biệt: Tại thời điểm $t = T$, đường cong $N(t)$ (hạt mẹ) cắt đường cong $\\Delta N(t)$ (hạt con) tại tung độ $y = \\frac{N_0}{2}$. Đây là dấu hiệu nhận biết chu kì $T$ cực nhanh trên đồ thị.',
      'Bảo toàn tổng số hạt: Tại bất kì thời điểm nào trên đồ thị, tổng tung độ của hạt mẹ và hạt con luôn là hằng số: $N(t) + \\Delta N(t) = N_0$.',
      'Tuyến tính hóa đồ thị: Lấy logarit tự nhiên hai vế: $\\ln N(t) = \\ln N_0 - \\lambda t$. Đồ thị $\\ln N$ theo $t$ là một đường thẳng dốc xuống có hệ số góc bằng âm hằng số phóng xạ ($-\\lambda$).',
    ],
    formulas: [
      {
        title: 'Bảo toàn tổng tung độ trên đồ thị số hạt',
        latex: 'N_{\\text{mẹ}}(t) + N_{\\text{con}}(t) = N_0 = \\text{const}',
        note: 'Tại t = T: N_mẹ = N_con = N₀/2 (hai đường cong cắt nhau).',
      },
      {
        title: 'Phương trình đồ thị tuyến tính hóa ln N (hoặc ln H) theo t',
        latex: 'y = a \\cdot t + b \\quad \\text{với } y = \\ln N(t), \\; a = -\\lambda = -\\frac{\\ln 2}{T}, \\; b = \\ln N_0',
        note: 'Độ dốc càng dốc thì hằng số phóng xạ λ càng lớn (chu kì T càng ngắn).',
      },
      {
        title: 'Đồ thị khối lượng m_mẹ(t) và m_con(t)',
        latex: 'm_{\\text{con}}(t) = m_0 \\cdot \\frac{A_{\\text{con}}}{A_{\\text{mẹ}}} \\left(1 - 2^{-\\frac{t}{T}}\\right)',
        note: 'Đường cong m_con tiệm cận đường ngang m_max = m₀.(A_con / A_mẹ).',
      },
    ],
    examTraps: [
      {
        trap: 'Nghĩ rằng giao điểm giữa đồ thị khối lượng m_mẹ(t) và m_con(t) luôn luôn nằm tại thời điểm t = T.',
        correction: 'Chỉ có đồ thị SỐ HẠT cắt nhau tại t = T (vì N = ΔN = N₀/2). Đồ thị KHỐI LƯỢNG cắt nhau khi m_mẹ = m_con, tức A_mẹ . 2^(-t/T) = A_con .(1 - 2^(-t/T)), thời điểm này khác T nếu A_mẹ ≠ A_con!',
      },
    ],
    workedExample: {
      question:
        'Thực nghiệm đo độ phóng xạ của một mẫu chất theo thời gian thu được đồ thị $\\ln H$ ($\\text{Bq}$) phụ thuộc tuyến tính vào thời gian $t$ (ngày) là đường thẳng đi qua hai điểm $(t_1 = 0; \\ln H = 16,12)$ và $(t_2 = 40\\text{ ngày}; \\ln H = 12,65)$. Tìm chu kì bán rã $T$ của mẫu chất.',
      solution:
        'Độ dốc của đường thẳng: $-\\lambda = \\frac{12,65 - 16,12}{40 - 0} = \\frac{-3,47}{40} \\approx -0,08675\\text{ ngày}^{-1}$. Suy ra hằng số phóng xạ $\\lambda \\approx 0,08675\\text{ ngày}^{-1}$. Chu kì bán rã: $T = \\frac{\\ln 2}{\\lambda} = \\frac{0,69315}{0,08675} \\approx 7,99\\text{ ngày} \\approx 8\\text{ ngày}$.',
    },
  },
  {
    id: 9,
    code: 'Chuyên đề 09',
    title: 'Ứng dụng: Định tuổi Cổ vật ¹⁴C, Đo Máu ²⁴Na & Mẫu đá U-Pb',
    subtitle: 'Phương pháp nguyên tử đánh dấu và định tuổi địa chất/khảo cổ trong chương trình GDPT mới',
    summaryPoints: [
      'Định tuổi cổ vật có nguồn gốc sinh vật bằng Carbon-14 ($T = 5730\\text{ năm}$): Trong khí quyển và cơ thể sống, tỉ lệ giữa đồng vị phóng xạ ${}^{14}_{6}\\text{C}$ và đồng vị bền ${}^{12}_{6}\\text{C}$ là không đổi ($10^{-12}$). Khi sinh vật chết, quá trình trao đổi chất dừng lại, ${}^{14}\\text{C}$ giảm dần theo định luật phóng xạ. Đo độ phóng xạ hoặc tỉ lệ ${}^{14}\\text{C}$ còn lại trong mẫu khảo cổ cho phép xác định chính xác tuổi của cổ vật.',
      'Đo thể tích máu bằng phương pháp pha loãng Sodium-24 ($T = 15\\text{ giờ}$): Tiêm vào tĩnh mạch một thể tích nhỏ $V_0$ dung dịch chứa ${}^{24}_{11}\\text{Na}$ có độ phóng xạ $H_0$. Sau thời gian $t$ để chất phóng xạ phân bố đều khắp hệ tuần hoàn, rút một lượng mẫu máu thể tích $V_m$ và đo độ phóng xạ $H_m$. Thể tích máu toàn phần: $V = V_m \\cdot \\frac{H_0 \\cdot 2^{-t/T}}{H_m}$.',
      'Định tuổi mẫu đá cổ và thiên thể bằng chuỗi phân rã Uranium - Chì (${}^{238}\\text{U} \\rightarrow {}^{206}\\text{Pb}$, $T = 4,5 \\cdot 10^9\\text{ năm}$): Giả sử ban đầu đá chỉ có ${}^{238}\\text{U}$, mỗi phân rã tạo ra một hạt ${}^{206}\\text{Pb}$. Tỉ lệ số hạt: $\\frac{N_{\\text{Pb}}}{N_{\\text{U}}} = 2^{t/T} - 1$. Tỉ lệ khối lượng: $\\frac{m_{\\text{Pb}}}{m_{\\text{U}}} = \\frac{206}{238}(2^{t/T} - 1)$.',
      'Ứng dụng trong nông nghiệp và công nghiệp: Chiếu xạ tia gamma để bảo quản nông sản, ức chế nảy mầm của khoai tây, hành tỏi, diệt vi sinh vật gây hại; Sử dụng máy đếm hạt beta/gamma để tự động kiểm soát bề dày màng nilông, tấm thép trong nhà máy luyện kim; Thăm dò khuyết tật mối hàn.',
    ],
    formulas: [
      {
        title: 'Công thức xác định niên đại cổ vật (Carbon-14)',
        latex: 't = \\frac{T}{\\ln 2} \\ln\\left(\\frac{H_0}{H}\\right) = T \\cdot \\log_2\\left(\\frac{H_0}{H}\\right)',
        note: 'T = 5730 năm; H₀: độ phóng xạ mẫu sống cùng khối lượng; H: độ phóng xạ mẫu cổ.',
      },
      {
        title: 'Công thức đo thể tích máu V (Sodium-24)',
        latex: 'V = V_m \\cdot \\frac{H_0 \\cdot 2^{-\\frac{t}{T}}}{H_m} = V_m \\cdot \\frac{H(t)}{H_m}',
        note: 'V_m, H_m: thể tích và độ phóng xạ mẫu máu rút ra sau thời gian t (T = 15h).',
      },
      {
        title: 'Công thức định tuổi mẫu đá Uranium-Chì',
        latex: 't = T \\cdot \\log_2\\left(1 + \\frac{238}{206} \\frac{m_{\\text{Pb}}}{m_{\\text{U}}}\\right) = \\frac{T}{\\ln 2} \\ln\\left(1 + \\frac{N_{\\text{Pb}}}{N_{\\text{U}}}\\right)',
        note: 'T = 4,5 tỉ năm; m_Pb/m_U: tỉ số khối lượng chì và uranium đo được trong đá.',
      },
    ],
    examTraps: [
      {
        trap: 'Quên trừ hao độ phóng xạ suy giảm của ²⁴Na theo thời gian t khi tính thể tích máu.',
        correction: 'Trong thời gian hòa tan t (thường từ 2h đến 6h), hoạt độ của Na-24 đã giảm theo e^(-λt) = 2^(-t/15). Bắt buộc phải nhân thêm 2^(-t/T) trong công thức tính.',
      },
      {
        trap: 'Dùng đồng vị Carbon-14 để định tuổi cho mẫu hóa thạch khủng long hay mẫu đá hàng trăm triệu năm.',
        correction: 'Vì chu kì T của ¹⁴C chỉ là 5730 năm, sau khoảng 50.000 năm (khoảng 9-10 chu kì) lượng ¹⁴C còn lại quá nhỏ để đo chính xác. Để định tuổi triệu năm, tỉ năm bắt buộc dùng chuỗi ²³⁸U → ²⁰⁶Pb hoặc ⁴⁰K → ⁴⁰Ar.',
      },
    ],
    workedExample: {
      question:
        'Người ta tiêm $V_0 = 10\\text{ cm}^3$ dung dịch chứa ${}^{24}\\text{Na}$ ($T = 15\\text{ giờ}$) có độ phóng xạ $H_0 = 2,0 \\cdot 10^4\\text{ Bq}$ vào máu một bệnh nhân. Sau 6 giờ, người ta lấy $V_m = 10\\text{ cm}^3$ máu của bệnh nhân thì đo được độ phóng xạ $H_m = 30,3\\text{ Bq}$. Tính thể tích máu $V$ của bệnh nhân.',
      solution:
        'Sau 6 giờ, độ phóng xạ còn lại của lượng thuốc tiêm trong cơ thể: $H(6) = H_0 \\cdot 2^{-6/15} = 20000 \\cdot 2^{-0,4} \\approx 15157\\text{ Bq}$. Vì thuốc đã hòa tan đều vào máu, nồng độ phóng xạ trong mẫu máu rút ra bằng nồng độ trong toàn cơ thể: $\\frac{H_m}{V_m} = \\frac{H(6)}{V} \\implies V = V_m \\cdot \\frac{H(6)}{H_m} = 10 \\cdot \\frac{15157}{30,3} \\approx 5002\\text{ cm}^3 \\approx 5,0\\text{ lít}$.',
    },
  },
  {
    id: 10,
    code: 'Chuyên đề 10',
    title: 'Ảnh hưởng và An toàn Phóng xạ',
    subtitle: 'Tác hại bức xạ, so sánh mức độ nguy hại của tia α, β, γ, biển cảnh báo và 3 quy tắc an toàn',
    summaryPoints: [
      'Ảnh hưởng của tia phóng xạ: Các tia phóng xạ có thể gây tác động mạnh tới tế bào của con người cũng như sinh vật. Khi bị phơi nhiễm phóng xạ với liều lượng lớn trong một khoảng thời gian dài có thể ảnh hưởng nghiêm trọng tới sức khỏe, gây suy nhược thần kinh, ung thư và đột biến trong di truyền. Với nguồn phóng xạ mạnh dù chỉ tiếp xúc thời gian ngắn nhưng cảm giác bỏng rát xuất hiện ngay (bỏng phóng xạ), sau đó xuất hiện triệu chứng buồn nôn, nôn mửa (nhiễm độc phóng xạ).',
      'Mức độ nguy hại phụ thuộc vào từng loại tia: Tia $\\alpha$ ít gây nguy hại khi nguồn phóng xạ ở bên ngoài cơ thể, nhưng với khả năng ion hóa rất mạnh, các hạt $\\alpha$ vô cùng nguy hiểm và có thể gây ung thư nếu chất phóng xạ thâm nhập vào cơ thể qua con đường ăn uống, hít thở. Tia $\\beta$ cường độ lớn có thể gây bỏng da, tác hại khi vào cơ thể không lớn bằng tia $\\alpha$. Tia $\\gamma$ không mang điện nhưng có khả năng đâm xuyên rất lớn, gây tổn hại nguy hiểm cho tất cả các mô cơ thể ngay cả ở khoảng cách tương đối xa nguồn.',
      'Biển cảnh báo phóng xạ: Đặt tại khu vực lắp đặt thiết bị phát tia phóng xạ, nguồn phóng xạ hoặc trên vật chứa của nguồn phóng xạ để cảnh báo mọi người không tiếp cận hoặc làm hỏng thiết bị, vật chứa. Có biển cảnh báo cơ bản (hình tam giác nền vàng, viền đen, biểu tượng 3 cánh quạt trefoil màu đen) và biển cảnh báo nguồn nguy hiểm cao (nền đỏ gồm 3 lá cánh quạt phát tia, đầu lâu xương chéo và người đang bỏ chạy).',
      'Ba quy tắc an toàn phóng xạ cơ bản: (1) Giữ khoảng cách đủ xa đối với nguồn phóng xạ; (2) Sử dụng các tấm chắn nguồn phóng xạ đủ tốt (như màn chắn chì, tường bê tông dày có độ dày cần thiết, trang phục bảo hộ có chì như mắt kính, găng tay, áo chì); (3) Giảm thiểu thời gian phơi nhiễm phóng xạ (bố trí thời lượng công việc phù hợp, dùng kẹp dài khi thao tác).',
      'Xử lý chất thải và nhiễm bẩn phóng xạ: Cách an toàn nhất để xử lý một lượng lớn chất thải có tính phóng xạ cao là đóng gói kiên cố và chôn sâu dưới lòng đất ở vùng có thềm đá khô cằn ổn định. Khi bị nhiễm bẩn phóng xạ, việc cởi bỏ trang phục đang mặc có khả năng làm giảm bớt khả năng bị nhiễm xạ, đồng thời phải tẩy xạ theo quy định và báo cho người phụ trách an toàn phóng xạ hoặc chính quyền địa phương.',
    ],
    formulas: [
      {
        title: 'Mức độ nguy hại theo từng loại tia (Chủ đề 10)',
        latex: '\\text{Tia } \\alpha: \\text{Nguy hiểm nhất khi hít/nuốt (ion hóa mạnh)}; \\quad \\text{Tia } \\gamma: \\text{Nguy hiểm nhất từ xa (đâm xuyên sâu)}',
        note: 'Tia beta cường độ lớn gây bỏng; tia gamma cần chì dày hoặc bê tông dày để che chắn.',
      },
      {
        title: 'Ba quy tắc an toàn phóng xạ',
        latex: '\\text{Quy tắc 1: Khoảng cách (càng xa càng tốt)} \\quad \\longleftrightarrow \\quad \\text{Quy tắc 2: Tấm che chắn (chì, bê tông)} \\quad \\longleftrightarrow \\quad \\text{Quy tắc 3: Giảm thời gian}',
        note: 'Ba nguyên tắc cốt lõi giúp bảo vệ an toàn cho người làm việc và cộng đồng.',
      },
      {
        title: 'Vật liệu che chắn & Xử lý chất thải phóng xạ',
        latex: '\\text{Vật liệu cản phóng xạ: Chì (Pb), Tường bê tông dày} \\quad \\implies \\quad \\text{Chất thải cao: Chôn sâu thềm đá khô cằn}',
        note: 'Chì là kim loại có khả năng cản các tia phóng xạ; tuyệt đối không thiêu đốt chất phóng xạ.',
      },
    ],
    examTraps: [
      {
        trap: 'Cho rằng tia alpha có tầm bay ngắn trong không khí nên không bao giờ nguy hiểm đối với con người.',
        correction: 'Tia alpha ít nguy hại khi ở ngoài da, nhưng lại vô cùng nguy hiểm và có khả năng gây ung thư cao nhất nếu thâm nhập vào cơ thể qua đường ăn uống hoặc hô hấp do khả năng ion hóa cực mạnh của hạt He-4!',
      },
      {
        trap: 'Nghĩ rằng có thể xử lý chất thải phóng xạ nguy hại cao bằng cách thiêu đốt trên ngọn lửa hoặc xả loãng ra sông hồ.',
        correction: 'Thiêu đốt sẽ phát tán bụi phóng xạ vào bầu khí quyển, còn xả ra nguồn nước sẽ gây ô nhiễm môi trường nghiêm trọng. Cách an toàn nhất là đóng gói tiêu chuẩn và chôn sâu dưới lòng đất ở vùng thềm đá khô cằn ổn định địa chất.',
      },
    ],
    workedExample: {
      question:
        'Nêu ba quy tắc an toàn cơ bản khi làm việc với nguồn phát tia phóng xạ gamma và giải thích tại sao nhân viên y tế cần mặc áo chì, dùng kẹp dài và luân phiên ca làm việc.',
      solution:
        'Ba quy tắc an toàn phóng xạ gồm: (1) Giữ khoảng cách đủ xa; (2) Sử dụng màn chắn đủ tốt; (3) Giảm thiểu thời gian phơi nhiễm. Giải thích thực tế: Nhân viên y tế mặc áo chì là áp dụng quy tắc che chắn (chì có khả năng cản mạnh tia gamma); dùng kẹp dài khi thao tác nguồn phóng xạ là áp dụng quy tắc khoảng cách (tăng khoảng cách từ nguồn tới cơ thể); luân phiên ca trực nhằm áp dụng quy tắc giảm thiểu thời gian phơi nhiễm trực tiếp với nguồn.',
    },
  },
  {
    id: 11,
    code: 'Chuyên đề 11',
    title: 'Bài toán Chấm sáng Màn huỳnh quang ZnS',
    subtitle: 'Thí nghiệm Rutherford, góc không gian phát xạ đẳng hướng và đếm xung màn huỳnh quang',
    summaryPoints: [
      'Trong thí nghiệm lịch sử của Rutherford hoặc các máy đếm hạt phóng xạ, nguồn phóng xạ điểm phát các hạt ($\\alpha$) đẳng hướng theo mọi hướng trong không gian $4\\pi$ steradian.',
      'Một màn huỳnh quang diện tích $S$ (phủ chất ZnS) đặt cách nguồn phóng xạ một khoảng $R$. Vì $R$ rất lớn so với kích thước màn nên diện tích chỏm cầu chắn chùm tia xấp xỉ bằng $S$.',
      'Tỉ lệ số hạt phóng xạ đập vào màn so với tổng số hạt nguồn phát ra đúng bằng tỉ số giữa diện tích màn và diện tích mặt cầu bán kính $R$: $\\frac{n}{\\Delta N} = \\frac{S}{4\\pi R^2}$.',
      'Số chấm sáng quan sát được trên màn trong khoảng thời gian $t$ chính là số hạt đập vào màn: $n = \\Delta N \\cdot \\frac{S}{4\\pi R^2} = N_0 \\left(1 - 2^{-t/T}\\right) \\frac{S}{4\\pi R^2}$. Khi $t \\ll T$, có thể dùng xấp xỉ $1 - 2^{-t/T} \\approx \\frac{t \\ln 2}{T}$ để tính nhanh: $n \\approx \\frac{N_0 \\ln 2 \\cdot t}{T} \\cdot \\frac{S}{4\\pi R^2}$.',
    ],
    formulas: [
      {
        title: 'Tỉ lệ hạt α đập vào màn huỳnh quang diện tích S cách nguồn đoạn R',
        latex: 'n = \\Delta N \\cdot \\frac{S}{4\\pi R^2} = N_0 \\left(1 - 2^{-\\frac{t}{T}}\\right) \\frac{S}{4\\pi R^2}',
        note: 'S và R phải cùng đơn vị đo độ dài (cm² và cm, hoặc m² và m).',
      },
      {
        title: 'Liên hệ số chấm sáng khi t ≪ T (xấp xỉ tuyến tính)',
        latex: 'n \\approx \\frac{N_0 \\ln 2 \\cdot t}{T} \\cdot \\frac{S}{4\\pi R^2} \\implies \\frac{n_1}{n_2} = \\frac{t_1}{t_2}',
        note: 'Khi thời gian quan sát rất ngắn so với chu kì, số chấm sáng tỉ lệ thuận với thời gian.',
      },
    ],
    examTraps: [
      {
        trap: 'Quên chia cho diện tích mặt cầu toàn phần 4πR² mà chia cho diện tích hình tròn πR².',
        correction: 'Nguồn phóng xạ điểm bức xạ ĐẲNG HƯỚNG RA TOÀN BỘ KHÔNG GIAN 3D (mặt cầu 4πR²), chứ không phải trong mặt phẳng 2D.',
      },
    ],
    workedExample: {
      question:
        'Một nguồn phóng xạ $\\alpha$ điểm đặt cách màn huỳnh quang tròn bán kính $r = 1\\text{ cm}$ một khoảng $R = 10\\text{ cm}$. Chu kì bán rã của nguồn là $T = 138\\text{ ngày}$. Ban đầu có $N_0 = 10^{14}$ hạt. Tính số chấm sáng xuất hiện trên màn trong ngày đầu tiên ($t = 1\\text{ ngày}$).',
      solution:
        'Diện tích màn huỳnh quang: $S = \\pi r^2 = \\pi \\cdot 1^2 = \\pi\\text{ cm}^2$. Diện tích mặt cầu bao quanh cự ly $R = 10\\text{ cm}$: $S_{\\text{cầu}} = 4\\pi R^2 = 4\\pi \\cdot 10^2 = 400\\pi\\text{ cm}^2$. Tỉ lệ góc khối: $\\frac{S}{S_{\\text{cầu}}} = \\frac{\\pi}{400\\pi} = \\frac{1}{400}$. Số phân rã trong ngày đầu: $\\Delta N = N_0(1 - 2^{-1/138}) \\approx 10^{14} \\times (1 - 0,995) = 5,011 \\cdot 10^{11}$ hạt. Số chấm sáng đập vào màn: $n = \\Delta N \\times \\frac{1}{400} \\approx 1,253 \\cdot 10^9$ chấm sáng.',
    },
  },
  {
    id: 12,
    code: 'Chuyên đề 12',
    title: 'Động học Phóng xạ Hạt nhân Mẹ đứng yên',
    subtitle: 'Bảo toàn động lượng trong phân rã X → α + Y, tỉ số động năng giật lùi và góc bay',
    summaryPoints: [
      'Xét hạt nhân mẹ $X$ đang đứng yên ($\\vec{p}_X = \\vec{0}$) tự phát phân rã phóng xạ: $X \\rightarrow \\alpha + Y$.',
      'Áp dụng định luật bảo toàn động lượng: $\\vec{p}_\\alpha + \\vec{p}_Y = \\vec{0} \\implies \\vec{p}_Y = -\\vec{p}_\\alpha$. Hai hạt sinh ra luôn chuyển động theo hai hướng ngược chiều nhau với độ lớn động lượng bằng nhau: $p_\\alpha = p_Y$.',
      'Liên hệ giữa động lượng và động năng: Với tốc độ phi tương đối tính, $p^2 = 2mK$. Vì $p_\\alpha = p_Y$ nên $2m_\\alpha K_\\alpha = 2m_Y K_Y \\implies \\frac{K_\\alpha}{K_Y} = \\frac{m_Y}{m_\\alpha} \\approx \\frac{A_Y}{A_\\alpha}$. Động năng tỉ lệ nghịch với khối lượng!',
      'Hạt $\\alpha$ có khối lượng nhỏ hơn nhiều so với hạt nhân con $Y$ ($A_Y \\gg A_\\alpha = 4$) nên hạt $\\alpha$ nhận phần lớn năng lượng tỏa ra của phản ứng: $K_\\alpha = \\frac{m_Y}{m_\\alpha + m_Y} \\Delta E = \\frac{A_Y}{A_X} \\Delta E$. Hạt nhân con $Y$ bị giật lùi (recoil) chỉ nhận một phần nhỏ năng lượng.',
    ],
    formulas: [
      {
        title: 'Liên hệ Động lượng và Động năng (p² = 2mK)',
        latex: 'p_\\alpha = p_Y \\implies m_\\alpha K_\\alpha = m_Y K_Y \\implies \\frac{K_\\alpha}{K_Y} = \\frac{m_Y}{m_\\alpha} \\approx \\frac{A_Y}{A_\\alpha}',
        note: 'Hạt nào nhẹ hơn thì bay nhanh hơn và chiếm phần lớn động năng.',
      },
      {
        title: 'Tính Động năng K_α và K_Y theo năng lượng tỏa ra ΔE',
        latex: 'K_\\alpha = \\frac{m_Y}{m_\\alpha + m_Y} \\Delta E \\approx \\frac{A_Y}{A_X} \\Delta E; \\quad K_Y = \\frac{m_\\alpha}{m_\\alpha + m_Y} \\Delta E \\approx \\frac{A_\\alpha}{A_X} \\Delta E',
        note: 'Bỏ qua bức xạ photon gamma kèm theo: ΔE = K_α + K_Y.',
      },
      {
        title: 'Năng lượng tỏa ra khi khối lượng m chất phóng xạ phân rã hoàn toàn',
        latex: 'E_{\\text{tỏa}} = N \\cdot \\Delta E = \\frac{m}{A_{\\text{mẹ}}} N_A \\cdot \\Delta E',
        note: 'N = (m/A)·NA là số phân rã; ΔE = (m_mẹ - m_con - m_α)c² là năng lượng một phân rã tỏa ra.',
      },
    ],
    examTraps: [
      {
        trap: 'Nghĩ rằng hai hạt sinh ra chia đều năng lượng tỏa ra: K_α = K_Y = ΔE / 2.',
        correction: 'Động lượng bằng nhau nhưng động năng TỈ LỆ NGHỊCH với khối lượng: Hạt alpha rất nhẹ (A = 4) so với hạt chì (A = 206) nên hạt alpha chiếm tới 206/210 ≈ 98% năng lượng tỏa ra!',
      },
    ],
    workedExample: {
      question:
        'Hạt nhân ${}^{210}_{84}\\text{Po}$ đang đứng yên thì phóng xạ $\\alpha$ tạo thành hạt nhân chì ${}^{206}_{82}\\text{Pb}$, phản ứng tỏa ra năng lượng $\\Delta E = 5,40\\text{ MeV}$. Giả sử không kèm bức xạ gamma và lấy khối lượng các hạt bằng số khối tính theo amu. Tính động năng của hạt $\\alpha$ và hạt nhân chì.',
      solution:
        'Bảo toàn động lượng: $p_\\alpha = p_{\\text{Pb}} \\implies \\frac{K_\\alpha}{K_{\\text{Pb}}} = \\frac{A_{\\text{Pb}}}{A_\\alpha} = \\frac{206}{4} = 51,5$. Năng lượng tỏa ra: $K_\\alpha + K_{\\text{Pb}} = \\Delta E = 5,40\\text{ MeV}$. Suy ra: Động năng hạt $\\alpha$: $K_\\alpha = \\frac{206}{210} \\times 5,40 \\approx 5,297\\text{ MeV}$ (chiếm $98,1\\% $ tổng năng lượng). Động năng hạt nhân chì giật lùi: $K_{\\text{Pb}} = \\frac{4}{210} \\times 5,40 \\approx 0,103\\text{ MeV}$ (chiếm $1,9\\% $ tổng năng lượng).',
    },
  },
];
