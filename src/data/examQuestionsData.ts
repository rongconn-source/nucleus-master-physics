export interface Part1Question {
  id: string;
  number: number;
  topicId?: number;
  topicTag: string;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface Part2Statement {
  key: 'a' | 'b' | 'c' | 'd';
  text: string;
  isTrue: boolean;
  explanation: string;
}

export interface Part2Question {
  id: string;
  number: number;
  topicId?: number;
  topicTag: string;
  stem: string;
  statements: Part2Statement[];
}

export interface Part3Question {
  id: string;
  number: number;
  topicId?: number;
  topicTag: string;
  question: string;
  unit: string;
  correctValue: number;
  tolerance: number;
  displayAnswer: string;
  explanation: string;
}

export const PART1_QUESTIONS: Part1Question[] = [
  {
    id: 'p1-1',
    number: 1,
    topicTag: 'Cấu trúc hạt nhân',
    question:
      'Hạt nhân nguyên tử Polonium ${}^{210}_{84}\\text{Po}$ có cấu tạo gồm bao nhiêu hạt proton và neutron?',
    options: [
      { key: 'A', text: '$84$ proton và $210$ neutron.' },
      { key: 'B', text: '$84$ proton và $126$ neutron.' },
      { key: 'C', text: '$126$ proton và $84$ neutron.' },
      { key: 'D', text: '$210$ proton và $84$ neutron.' },
    ],
    correctKey: 'B',
    explanation:
      'Hạt nhân ${}^{210}_{84}\\text{Po}$ có nguyên tử số $Z = 84$ (số proton) và số khối $A = 210$. Số hạt neutron là $N = A - Z = 210 - 84 = 126$ hạt.',
  },
  {
    id: 'p1-2',
    number: 2,
    topicTag: 'Năng lượng liên kết',
    question:
      'Đại lượng nào sau đây đặc trưng cho mức độ bền vững của một hạt nhân nguyên tử?',
    options: [
      { key: 'A', text: 'Số khối $A$ của hạt nhân.' },
      { key: 'B', text: 'Độ hụt khối $\\Delta m$ của hạt nhân.' },
      { key: 'C', text: 'Năng lượng liên kết $W_{\\text{lk}}$ của hạt nhân.' },
      { key: 'D', text: 'Năng lượng liên kết riêng $W_{\\text{lkr}} = \\frac{W_{\\text{lk}}}{A}$ của hạt nhân.' },
    ],
    correctKey: 'D',
    explanation:
      'Mức độ bền vững của hạt nhân được đặc trưng bởi năng lượng liên kết riêng $W_{\\text{lkr}} = \\frac{W_{\\text{lk}}}{A}$ (năng lượng liên kết tính trung bình cho $1$ nucleon). Hạt nhân có $W_{\\text{lkr}}$ càng lớn thì càng bền vững.',
  },
  {
    id: 'p1-3',
    number: 3,
    topicTag: 'Các tia phóng xạ',
    question:
      'Khi đi qua miền có điện trường đều hoặc từ trường đều, tia phóng xạ nào sau đây hoàn toàn KHÔNG bị lệch hướng truyền?',
    options: [
      { key: 'A', text: 'Tia alpha ($\\alpha$).' },
      { key: 'B', text: 'Tia beta trừ ($\\beta^-$).' },
      { key: 'C', text: 'Tia beta cộng ($\\beta^+$).' },
      { key: 'D', text: 'Tia gamma ($\\gamma$).' },
    ],
    correctKey: 'D',
    explanation:
      'Tia gamma ($\\gamma$) có bản chất là sóng điện từ bước sóng cực ngắn (chùm hạt photon không mang điện tích), nên không chịu tác dụng của lực điện hay lực từ Lorentz và truyền thẳng.',
  },
  {
    id: 'p1-4',
    number: 4,
    topicTag: 'Phản ứng hạt nhân',
    question:
      'Cho phản ứng hạt nhân kích thích: ${}^{4}_{2}\\text{He} + {}^{14}_{7}\\text{N} \\rightarrow {}^{17}_{8}\\text{O} + X$. Hạt nhân $X$ trong phản ứng trên là:',
    options: [
      { key: 'A', text: 'Proton (${}^{1}_{1}p$).' },
      { key: 'B', text: 'Neutron (${}^{1}_{0}n$).' },
      { key: 'C', text: 'Deuterium (${}^{2}_{1}\\text{H}$).' },
      { key: 'D', text: 'Positron (${}^{0}_{+1}e$).' },
    ],
    correctKey: 'A',
    explanation:
      'Áp dụng định luật bảo toàn số nucleon ($A$): $4 + 14 = 17 + A_X \\implies A_X = 1$. Bảo toàn điện tích ($Z$): $2 + 7 = 8 + Z_X \\implies Z_X = 1$. Vậy $X$ là hạt proton (${}^{1}_{1}p$ hay ${}^{1}_{1}\\text{H}$).',
  },
  {
    id: 'p1-5',
    number: 5,
    topicTag: 'Định luật phóng xạ',
    question:
      'Một chất phóng xạ có chu kì bán rã là $T$. Ban đầu có $N_0$ hạt nhân nguyên chất. Sau khoảng thời gian $t = 3T$, tỉ số giữa số hạt nhân con được tạo thành và số hạt nhân mẹ còn lại là:',
    options: [
      { key: 'A', text: '$\\frac{1}{8}$.' },
      { key: 'B', text: '$\\frac{7}{8}$.' },
      { key: 'C', text: '$7$.' },
      { key: 'D', text: '$8$.' },
    ],
    correctKey: 'C',
    explanation:
      'Áp dụng công thức tỉ số hạt nhân con và hạt nhân mẹ tại thời điểm $t$: $\\frac{N_{\\text{con}}}{N_{\\text{mẹ}}} = \\frac{\\Delta N(t)}{N(t)} = 2^{t/T} - 1 = 2^3 - 1 = 8 - 1 = 7$.',
  },
  {
    id: 'p1-6',
    number: 6,
    topicTag: 'Độ hụt khối & W_lk',
    question:
      'Cho khối lượng của hạt nhân ${}^{12}_{6}\\text{C}$ là $11,9967\\text{ amu}$, $m_p = 1,0073\\text{ amu}$, $m_n = 1,0087\\text{ amu}$ và $1\\text{ amu}\\cdot c^2 = 931,5\\text{ MeV}$. Năng lượng liên kết của hạt nhân ${}^{12}_{6}\\text{C}$ bằng:',
    options: [
      { key: 'A', text: '$92,498\\text{ MeV}$.' },
      { key: 'B', text: '$7,708\\text{ MeV}$.' },
      { key: 'C', text: '$85,620\\text{ MeV}$.' },
      { key: 'D', text: '$99,300\\text{ MeV}$.' },
    ],
    correctKey: 'A',
    explanation:
      'Độ hụt khối của ${}^{12}_{6}\\text{C}$ là: $\\Delta m = 6 \\times 1,0073 + 6 \\times 1,0087 - 11,9967 = 0,0993\\text{ amu}$. Năng lượng liên kết: $W_{\\text{lk}} = \\Delta m \\times 931,5 = 0,0993 \\times 931,5 \\approx 92,498\\text{ MeV}$.',
  },
  {
    id: 'p1-7',
    number: 7,
    topicTag: 'Hoạt độ phóng xạ H',
    question:
      'Đơn vị đo độ phóng xạ (hoạt độ phóng xạ) chuẩn trong hệ SI là Becquerel ($\\text{Bq}$). Mối liên hệ giữa đơn vị Curie ($\\text{Ci}$) và Becquerel ($\\text{Bq}$) là:',
    options: [
      { key: 'A', text: '$1\\text{ Ci} = 3,7 \\cdot 10^{7}\\text{ Bq}$.' },
      { key: 'B', text: '$1\\text{ Ci} = 3,7 \\cdot 10^{10}\\text{ Bq}$.' },
      { key: 'C', text: '$1\\text{ Ci} = 6,022 \\cdot 10^{23}\\text{ Bq}$.' },
      { key: 'D', text: '$1\\text{ Ci} = 931,5 \\cdot 10^{6}\\text{ Bq}$.' },
    ],
    correctKey: 'B',
    explanation:
      'Theo định nghĩa chuẩn SGK: $1\\text{ Bq} = 1\\text{ phân rã/giây}$ và $1\\text{ Ci} = 3,7 \\cdot 10^{10}\\text{ Bq}$.',
  },
  {
    id: 'p1-8',
    number: 8,
    topicTag: 'Định tuổi C-14',
    question:
      'Một mẫu gỗ cổ được tìm thấy trong di chỉ khảo cổ có độ phóng xạ của đồng vị ${}^{14}_{6}\\text{C}$ ($T = 5730\\text{ năm}$) bằng $25\\%$ độ phóng xạ của một mẫu gỗ tươi cùng loại và cùng khối lượng. Tuổi của mẫu gỗ cổ đó là:',
    options: [
      { key: 'A', text: '$2865\\text{ năm}$.' },
      { key: 'B', text: '$5730\\text{ năm}$.' },
      { key: 'C', text: '$11460\\text{ năm}$.' },
      { key: 'D', text: '$17190\\text{ năm}$.' },
    ],
    correctKey: 'C',
    explanation:
      'Ta có $\\frac{H}{H_0} = 2^{-t/T} = 0,25 = \\frac{1}{4} = 2^{-2} \\implies \\frac{t}{T} = 2 \\implies t = 2T = 2 \\times 5730 = 11460\\text{ năm}$.',
  },
  {
    id: 'p1-9',
    number: 9,
    topicTag: 'Thuyết tương đối',
    question:
      'Theo thuyết tương đối của Einstein, một hạt có khối lượng nghỉ $m_0$ chuyển động với tốc độ $v = 0,8c$ ($c$ là tốc độ ánh sáng trong chân không) thì có động năng tương đối tính $W_đ$ bằng:',
    options: [
      { key: 'A', text: '$\\frac{5}{3} m_0 c^2$.' },
      { key: 'B', text: '$\\frac{2}{3} m_0 c^2$.' },
      { key: 'C', text: '$0,32 m_0 c^2$.' },
      { key: 'D', text: '$\\frac{3}{5} m_0 c^2$.' },
    ],
    correctKey: 'B',
    explanation:
      'Ta có $\\sqrt{1 - v^2/c^2} = \\sqrt{1 - 0,8^2} = 0,6 = \\frac{3}{5}$. Năng lượng toàn phần $E = \\frac{m_0 c^2}{0,6} = \\frac{5}{3} m_0 c^2$. Động năng của hạt là $W_đ = E - E_0 = \\frac{5}{3} m_0 c^2 - m_0 c^2 = \\frac{2}{3} m_0 c^2$.',
  },
  {
    id: 'p1-10',
    number: 10,
    topicTag: 'Động học phóng xạ',
    question:
      'Hạt nhân mẹ $X$ đứng yên phóng xạ $\\alpha$ biến đổi thành hạt nhân con $Y$: $X \\rightarrow \\alpha + Y$. Gọi $m_{\\alpha}, m_Y$ và $K_{\\alpha}, K_Y$ lần lượt là khối lượng và động năng của hạt $\\alpha$ và hạt nhân con $Y$. Hệ thức nào sau đây ĐÚNG?',
    options: [
      { key: 'A', text: '$\\frac{K_{\\alpha}}{K_Y} = \\frac{m_{\\alpha}}{m_Y}$.' },
      { key: 'B', text: '$\\frac{K_{\\alpha}}{K_Y} = \\frac{m_Y}{m_{\\alpha}}$.' },
      { key: 'C', text: '$\\frac{K_{\\alpha}}{K_Y} = \\left(\\frac{m_Y}{m_{\\alpha}}\\right)^2$.' },
      { key: 'D', text: '$K_{\\alpha} = K_Y$.' },
    ],
    correctKey: 'B',
    explanation:
      'Do hạt nhân mẹ đứng yên nên $\\vec{p}_{\\alpha} + \\vec{p}_Y = \\vec{0} \\implies p_{\\alpha}^2 = p_Y^2 \\iff 2 m_{\\alpha} K_{\\alpha} = 2 m_Y K_Y \\implies \\frac{K_{\\alpha}}{K_Y} = \\frac{m_Y}{m_{\\alpha}}$.',
  },
  {
    id: 'p1-11',
    number: 11,
    topicTag: 'Màn huỳnh quang ZnS',
    question:
      'Một nguồn phóng xạ $\\alpha$ điểm phát đẳng hướng đặt cách một màn huỳnh quang nhỏ một khoảng $R$. Nếu dịch chuyển màn huỳnh quang ra xa nguồn sao cho khoảng cách tăng gấp $3$ lần ($R\' = 3R$, coi trong thời gian thí nghiệm độ phóng xạ của nguồn chưa đổi), số chấm sáng quan sát được trên màn trong mỗi phút sẽ:',
    options: [
      { key: 'A', text: 'Giảm đi $3$ lần.' },
      { key: 'B', text: 'Giảm đi $9$ lần.' },
      { key: 'C', text: 'Tăng lên $3$ lần.' },
      { key: 'D', text: 'Giảm đi $6$ lần.' },
    ],
    correctKey: 'B',
    explanation:
      'Số hạt $\\alpha$ đập vào màn diện tích $S$ tỉ lệ với góc không gian $\\frac{S}{4\\pi R^2}$, nghĩa là tỉ lệ nghịch với bình phương khoảng cách $R^2$. Khi $R$ tăng $3$ lần thì số chấm sáng giảm $3^2 = 9$ lần.',
  },
  {
    id: 'p1-12',
    number: 12,
    topicTag: 'Phân hạch & Nhiệt hạch',
    question:
      'Trong lò phản ứng của nhà máy điện hạt nhân, để duy trì phản ứng phân hạch dây chuyền ở trạng thái tới hạn ổn định và kiểm soát được, hệ số nhân neutron $k$ phải thỏa mãn điều kiện nào?',
    options: [
      { key: 'A', text: '$k < 1$.' },
      { key: 'B', text: '$k = 1$.' },
      { key: 'C', text: '$k > 1$.' },
      { key: 'D', text: '$k = 0$.' },
    ],
    correctKey: 'B',
    explanation:
      'Khi $k = 1$, số phân hạch xảy ra trong mỗi thế hệ không đổi theo thời gian, công suất tỏa nhiệt của lò phản ứng duy trì ổn định và kiểm soát được.',
  },
  {
    id: 'p1-13',
    number: 13,
    topicId: 1,
    topicTag: 'Thí nghiệm tán xạ Rutherford',
    question:
      'Thí nghiệm tán xạ hạt alpha vào lá vàng mỏng của Rutherford (1911) đã chứng minh rằng:',
    options: [
      {
        key: 'A',
        text: 'Các điện tích dương của nguyên tử tập trung ở một không gian rất nhỏ ở trung tâm nguyên tử.',
      },
      {
        key: 'B',
        text: 'Các điện tích dương của nguyên tử phân bố đều trong toàn bộ không gian nguyên tử.',
      },
      {
        key: 'C',
        text: 'Hạt electron phân bố tập trung ở tâm của nguyên tử.',
      },
      {
        key: 'D',
        text: 'Khối lượng và điện tích âm phân bố đều khắp mọi nơi trong nguyên tử.',
      },
    ],
    correctKey: 'A',
    explanation:
      'Thí nghiệm tán xạ alpha của Rutherford (1911) chứng minh: Hầu hết hạt alpha đi thẳng, chỉ một tỉ lệ rất nhỏ bị tán xạ với góc lớn hơn 90°, chứng tỏ nguyên tử có cấu tạo rỗng, các điện tích dương và phần lớn khối lượng tập trung ở một thể tích cực nhỏ ở tâm gọi là hạt nhân nguyên tử.',
  },
  {
    id: 'p1-14',
    number: 14,
    topicId: 2,
    topicTag: 'Thí nghiệm Blackett',
    question:
      'Năm 1925, Patrick Blackett đã sử dụng buồng sương để chụp lại vết tương tác của phản ứng hạt nhân nhân tạo đầu tiên do Rutherford thực hiện: ${}^{4}_{2}\text{He} + {}^{14}_{7}\text{N} \rightarrow {}^{A}_{Z}\text{X} + {}^{1}_{1}p$. Hạt nhân ${}^{A}_{Z}\text{X}$ được tạo thành trong phản ứng này là:',
    options: [
      { key: 'A', text: '${}^{16}_{8}\text{O}$.' },
      { key: 'B', text: '${}^{17}_{8}\text{O}$.' },
      { key: 'C', text: '${}^{18}_{8}\text{O}$.' },
      { key: 'D', text: '${}^{17}_{9}\text{F}$.' },
    ],
    correctKey: 'B',
    explanation:
      'Áp dụng định luật bảo toàn số nucleon: $4 + 14 = A + 1 \implies A = 17$. Bảo toàn điện tích: $2 + 7 = Z + 1 \implies Z = 8$. Hạt nhân tạo thành là đồng vị Oxy ${}^{17}_{8}\text{O}$.',
  },
  {
    id: 'p1-15',
    number: 15,
    topicId: 5,
    topicTag: 'Phóng xạ β & Hạt Neutrino',
    question:
      'Trong hiện tượng phóng xạ $\beta^-$, một neutron trong hạt nhân biến đổi thành một proton, đồng thời phát ra một electron kèm theo hạt nào sau đây?',
    options: [
      { key: 'A', text: 'Hạt neutrino ($\nu_e$).' },
      { key: 'B', text: 'Hạt phản neutrino ($\bar{\nu}_e$).' },
      { key: 'C', text: 'Hạt photon gamma ($\gamma$).' },
      { key: 'D', text: 'Hạt positron ($e^+$).' },
    ],
    correctKey: 'B',
    explanation:
      'Phương trình biến đổi: $n \rightarrow p + e^- + \bar{\nu}_e$. Phóng xạ $\beta^-$ luôn đi kèm hạt phản neutrino $\bar{\nu}_e$ (trong khi phóng xạ $\beta^+$ đi kèm neutrino $\nu_e$).',
  },
  {
    id: 'p1-16',
    number: 16,
    topicId: 9,
    topicTag: 'Định tuổi mẫu đá U-Pb',
    question:
      'Một mẫu đá cổ chứa đồng vị phóng xạ ${}^{238}_{92}\text{U}$ ($T = 4,5 \cdot 10^9\text{ năm}$) và đồng vị chì bền ${}^{206}_{82}\text{Pb}$. Giả sử khi mới hình thành mẫu đá chỉ chứa ${}^{238}\text{U}$ và toàn bộ chì ${}^{206}\text{Pb}$ trong mẫu đều là sản phẩm phân rã. Phép đo khối phổ cho thấy tỉ số giữa số hạt ${}^{206}\text{Pb}$ và số hạt ${}^{238}\text{U}$ trong mẫu bằng $1$. Tuổi của mẫu đá đó là:',
    options: [
      { key: 'A', text: '$2,25 \cdot 10^9\text{ năm}$.' },
      { key: 'B', text: '$4,50 \cdot 10^9\text{ năm}$.' },
      { key: 'C', text: '$9,00 \cdot 10^9\text{ năm}$.' },
      { key: 'D', text: '$1,50 \cdot 10^9\text{ năm}$.' },
    ],
    correctKey: 'B',
    explanation:
      'Tỉ số số hạt con/mẹ: $\frac{N_{\text{Pb}}}{N_{\text{U}}} = 2^{t/T} - 1 = 1 \implies 2^{t/T} = 2 \implies t = T = 4,50 \cdot 10^9\text{ năm}$ (4,5 tỉ năm).',
  },
  {
    id: 'p1-17',
    number: 17,
    topicId: 10,
    topicTag: 'Y học hạt nhân PET',
    question:
      'Kỹ thuật ghi hình chụp cắt lớp PET (Positron Emission Tomography) trong y học hạt nhân hiện đại sử dụng dược chất phóng xạ phát hạt nào sau đây, dẫn đến hiện tượng hủy cặp tạo ra hai photon gamma truyền ngược chiều nhau?',
    options: [
      { key: 'A', text: 'Hạt alpha ($\alpha$).' },
      { key: 'B', text: 'Hạt electron ($\beta^-$).' },
      { key: 'C', text: 'Hạt positron ($\beta^+$).' },
      { key: 'D', text: 'Hạt neutron ($n$).' },
    ],
    correctKey: 'C',
    explanation:
      'Kỹ thuật PET sử dụng đồng vị phóng xạ phát positron $\beta^+$ (như ${}^{18}\text{F}$). Positron khi gặp electron trong mô cơ thể sẽ xảy ra hiện tượng hủy cặp ($e^+ + e^- \rightarrow 2\gamma$), tạo ra hai photon gamma năng lượng $511\text{ keV}$ bay ngược chiều nhau $180^\circ$.',
  },
  {
    id: 'p1-18',
    number: 18,
    topicId: 10,
    topicTag: 'Quy tắc an toàn phóng xạ',
    question:
      'Theo quy tắc an toàn phóng xạ, ba biện pháp cơ bản để bảo đảm an toàn cho con người khi làm việc trực tiếp với nguồn phóng xạ là:',
    options: [
      { key: 'A', text: 'Tăng áp suất không khí, hạ nhiệt độ phòng và mang khẩu trang y tế thông thường.' },
      { key: 'B', text: 'Giữ khoảng cách đủ xa đối với nguồn, sử dụng các tấm chắn đủ tốt (chì, bê tông) và giảm thiểu thời gian phơi nhiễm.' },
      { key: 'C', text: 'Tăng từ trường phòng thí nghiệm, giảm cường độ ánh sáng và dùng găng tay vải mỏng.' },
      { key: 'D', text: 'Đặt chất phóng xạ trong hộp nhôm mỏng và thiêu hủy chất thải phóng xạ trên ngọn lửa.' },
    ],
    correctKey: 'B',
    explanation:
      'Theo quy tắc an toàn phóng xạ (Chủ đề 10), ba biện pháp cơ bản bảo vệ an toàn là: (1) Giữ khoảng cách đủ xa đối với nguồn phóng xạ; (2) Sử dụng các tấm chắn nguồn phóng xạ đủ tốt (màn chắn chì, tường bê tông dày, trang phục có chì); (3) Giảm thiểu thời gian phơi nhiễm phóng xạ.',
  },
];

export const PART2_QUESTIONS: Part2Question[] = [
  {
    id: 'p2-1',
    number: 1,
    topicTag: 'Phóng xạ α & Động học Polonium-210',
    stem: 'Đồng vị Polonium ${}^{210}_{84}\\text{Po}$ là một chất phóng xạ $\\alpha$ có chu kì bán rã $T = 138\\text{ ngày}$ và biến đổi thành hạt nhân chì bền ${}^{206}_{82}\\text{Pb}$. Ban đầu có một mẫu ${}^{210}_{84}\\text{Po}$ nguyên chất có khối lượng $m_0 = 42,0\\text{ g}$. Lấy $N_A = 6,022 \\cdot 10^{23}\\text{ mol}^{-1}$, khối lượng mol bằng số khối.',
    statements: [
      {
        key: 'a',
        text: 'Phương trình phân rã là ${}^{210}_{84}\\text{Po} \\rightarrow {}^{4}_{2}\\text{He} + {}^{206}_{82}\\text{Pb}$, trong đó hạt nhân con có $82$ proton và $124$ neutron.',
        isTrue: true,
        explanation:
          'Đúng. Hạt nhân ${}^{206}_{82}\\text{Pb}$ có $Z = 82$ proton và $N = 206 - 82 = 124$ neutron.',
      },
      {
        key: 'b',
        text: 'Khi hạt nhân ${}^{210}_{84}\\text{Po}$ đứng yên phóng xạ $\\alpha$, động năng của hạt $\\alpha$ gấp $51,5$ lần động năng giật lùi của hạt nhân ${}^{206}_{82}\\text{Pb}$ (lấy khối lượng hạt nhân xấp xỉ số khối).',
        isTrue: true,
        explanation:
          'Đúng. Theo bảo toàn động lượng cho hạt mẹ đứng yên: $\\frac{K_{\\alpha}}{K_{\\text{Pb}}} = \\frac{m_{\\text{Pb}}}{m_{\\alpha}} \\approx \\frac{206}{4} = 51,5$.',
      },
      {
        key: 'c',
        text: 'Sau thời gian $t = 276\\text{ ngày}$, khối lượng Polonium còn lại là $10,5\\text{ g}$ và khối lượng Chì ${}^{206}\\text{Pb}$ tạo thành là $31,5\\text{ g}$.',
        isTrue: false,
        explanation:
          'Sai! Đây là bẫy kinh điển: Sau $t = 276\\text{ ngày} = 2T$, khối lượng Po còn lại đúng là $m_{\\text{Po}} = 42 \\cdot 2^{-2} = 10,5\\text{ g}$, nhưng khối lượng chì tạo thành là $m_{\\text{Pb}} = \\Delta m_{\\text{Po}} \\cdot \\frac{206}{210} = 31,5 \\times \\frac{206}{210} = 30,9\\text{ g}$ (chứ không phải $31,5\\text{ g}$, vì có $0,6\\text{ g}$ khí Helium thoát ra!).',
      },
      {
        key: 'd',
        text: 'Tại thời điểm mà tỉ số khối lượng giữa hạt nhân ${}^{206}\\text{Pb}$ và hạt nhân ${}^{210}\\text{Po}$ còn lại bằng $\\frac{103}{35}$ thì mẫu chất đã phân rã được $276\\text{ ngày}$.',
        isTrue: true,
        explanation:
          'Đúng. Ta có $\\frac{m_{\\text{Pb}}}{m_{\\text{Po}}} = \\frac{206}{210}(2^{t/T} - 1) = \\frac{103}{105}(2^{t/T} - 1) = \\frac{103}{35} \\implies 2^{t/T} - 1 = 3 \\implies 2^{t/T} = 4 \\implies t = 2T = 276\\text{ ngày}$.',
      },
    ],
  },
  {
    id: 'p2-2',
    number: 2,
    topicTag: 'Y học hạt nhân: Dược chất ¹³¹I và ²⁴Na',
    stem: 'Trong y học hạt nhân, đồng vị phóng xạ ${}^{131}_{53}\\text{I}$ ($T_1 = 8,0\\text{ ngày}$, phóng xạ $\\beta^-$) dùng điều trị ung thư tuyến giáp, và đồng vị ${}^{24}_{11}\\text{Na}$ ($T_2 = 15,0\\text{ giờ}$, phóng xạ $\\beta^-$) dùng làm chất đánh dấu đo thể tích máu.',
    statements: [
      {
        key: 'a',
        text: 'Khi hạt nhân ${}^{131}_{53}\\text{I}$ phóng xạ $\\beta^-$, hạt nhân con tạo thành là Xenon ${}^{131}_{54}\\text{Xe}$ có cùng số khối $A = 131$ với hạt nhân mẹ.',
        isTrue: true,
        explanation:
          'Đúng. Trong phóng xạ $\\beta^-$: ${}^{131}_{53}\\text{I} \\rightarrow {}^{0}_{-1}e + {}^{131}_{54}\\text{Xe} + \\tilde{\\nu}_e$, số khối $A = 131$ giữ nguyên và $Z$ tăng từ $53$ lên $54$.',
      },
      {
        key: 'b',
        text: 'Một bệnh nhân uống một liều ${}^{131}_{53}\\text{I}$ có độ phóng xạ ban đầu $H_0 = 3,7 \\cdot 10^8\\text{ Bq}$ ($10\\text{ mCi}$). Sau $24\\text{ ngày}$ (giả sử chỉ tính sự suy giảm do phân rã vật lý), độ phóng xạ trong cơ thể còn lại là $4,625 \\cdot 10^7\\text{ Bq}$.',
        isTrue: true,
        explanation:
          'Đúng. Sau $t = 24\\text{ ngày} = 3T_1$, độ phóng xạ còn lại là $H = H_0 \\cdot 2^{-3} = \\frac{3,7 \\cdot 10^8}{8} = 4,625 \\cdot 10^7\\text{ Bq}$.',
      },
      {
        key: 'c',
        text: 'Hằng số phóng xạ của đồng vị ${}^{131}_{53}\\text{I}$ tính trong hệ SI có giá trị bằng $\\lambda_1 = \\frac{\\ln 2}{8} \\approx 0,0866\\text{ s}^{-1}$.',
        isTrue: false,
        explanation:
          'Sai! $0,0866$ là đơn vị $\\text{ngày}^{-1}$. Trong hệ SI ($\\text{s}^{-1}$), phải đổi $T_1 = 8 \\times 86400\\text{ s}$, nên $\\lambda_1 = \\frac{\\ln 2}{8 \\times 86400} \\approx 1,003 \\cdot 10^{-6}\\text{ s}^{-1}$.',
      },
      {
        key: 'd',
        text: 'Tiêm $10\\text{ cm}^3$ dung dịch ${}^{24}\\text{Na}$ có độ phóng xạ $H_0 = 1,6 \\cdot 10^4\\text{ Bq}$ vào máu bệnh nhân. Sau $t = 7,5\\text{ giờ}$, lấy ra $10\\text{ cm}^3$ máu đo được độ phóng xạ $H_m = 20\\sqrt{2}\\text{ Bq}$. Thể tích máu của bệnh nhân là $4,0\\text{ lít}$.',
        isTrue: true,
        explanation:
          'Đúng. Sau $t = 7,5\\text{ giờ} = 0,5 T_2$, tổng độ phóng xạ trong máu còn $H(t) = 1,6 \\cdot 10^4 \\cdot 2^{-0,5} = 8000\\sqrt{2}\\text{ Bq}$. Thể tích máu là $V = V_m \\cdot \\frac{H(t)}{H_m} = 10 \\times \\frac{8000\\sqrt{2}}{20\\sqrt{2}} = 4000\\text{ cm}^3 = 4,0\\text{ lít}$.',
      },
    ],
  },
  {
    id: 'p2-3',
    number: 3,
    topicTag: 'Màn huỳnh quang ZnS & Thí nghiệm Rutherford',
    stem: 'Một nguồn phóng xạ $\\alpha$ điểm đặt tại tâm $O$, phát tia $\\alpha$ đẳng hướng ra không gian xung quanh. Một màn huỳnh quang phẳng nhỏ có diện tích $S = 1,0\\text{ cm}^2$ đặt vuông góc với chùm tia ở khoảng cách $R_1 = 20\\text{ cm}$ tính từ nguồn $O$. Biết mọi hạt $\\alpha$ đập vào màn đều gây ra một chấm sáng nhấp nháy và chu kì bán rã của nguồn rất lớn so với thời gian làm thí nghiệm.',
    statements: [
      {
        key: 'a',
        text: 'Tỉ số giữa số hạt $\\alpha$ đập vào màn huỳnh quang và tổng số hạt $\\alpha$ do nguồn phát ra trong cùng một khoảng thời gian bằng $\\frac{1}{1600\\pi}$.',
        isTrue: true,
        explanation:
          'Đúng. Diện tích mặt cầu bán kính $R_1 = 20\\text{ cm}$ là $S_{\\text{cầu}} = 4\\pi R_1^2 = 4\\pi \\cdot 20^2 = 1600\\pi\\text{ cm}^2$. Tỉ số là $\\frac{S}{S_{\\text{cầu}}} = \\frac{1}{1600\\pi}$.',
      },
      {
        key: 'b',
        text: 'Nếu tại vị trí $R_1 = 20\\text{ cm}$, người ta đếm được trung bình $30$ chấm sáng trong mỗi phút thì độ phóng xạ $H$ của nguồn xấp xỉ bằng $2513\\text{ Bq}$.',
        isTrue: true,
        explanation:
          'Đúng. Trong $1\\text{ giây}$ có $\\frac{30}{60} = 0,5$ hạt đập vào màn. Độ phóng xạ của nguồn là $H = 0,5 \\times 1600\\pi = 800\\pi \\approx 2513,27\\text{ Bq}$.',
      },
      {
        key: 'c',
        text: 'Nếu dịch chuyển màn huỳnh quang lại gần nguồn đến vị trí $R_2 = 10\\text{ cm}$, số chấm sáng đếm được trong mỗi phút sẽ là $60$ chấm sáng.',
        isTrue: false,
        explanation:
          'Sai! Khi khoảng cách giảm $2$ lần ($R_2 = R_1 / 2$), số hạt đập vào màn tỉ lệ nghịch với $R^2$ nên phải tăng $2^2 = 4$ lần, tức là $30 \\times 4 = 120$ chấm sáng/phút (chứ không phải $60$).',
      },
      {
        key: 'd',
        text: 'Nếu nguồn phóng xạ là ${}^{210}\\text{Po}$ ($T = 138\\text{ ngày}$) và giữ nguyên khoảng cách $R_1 = 20\\text{ cm}$, thì sau $276\\text{ ngày}$ số chấm sáng đếm được trong $2\\text{ phút}$ là $15$ chấm sáng.',
        isTrue: true,
        explanation:
          'Đúng. Sau $276\\text{ ngày} = 2T$, tốc độ đếm giảm $4$ lần: từ $30\\text{ chấm/phút}$ xuống còn $7,5\\text{ chấm/phút}$. Do đó trong $2\\text{ phút}$ đếm được $7,5 \\times 2 = 15$ chấm sáng.',
      },
    ],
  },
  {
    id: 'p2-4',
    number: 4,
    topicTag: 'Độ hụt khối, Phân hạch & Nhiệt hạch',
    stem: 'Cho biết khối lượng của các hạt nhân: $m({}^{4}_{2}\\text{He}) = 4,0015\\text{ amu}$; $m({}^{56}_{26}\\text{Fe}) = 55,9207\\text{ amu}$; $m({}^{235}_{92}\\text{U}) = 234,9934\\text{ amu}$; khối lượng các nucleon riêng rẽ $m_p = 1,00728\\text{ amu}$, $m_n = 1,00866\\text{ amu}$ và $1\\text{ amu}\\cdot c^2 = 931,5\\text{ MeV}$.',
    statements: [
      {
        key: 'a',
        text: 'Độ hụt khối của hạt nhân ${}^{56}_{26}\\text{Fe}$ là $\\Delta m_{\\text{Fe}} = 0,52838\\text{ amu}$.',
        isTrue: true,
        explanation:
          'Đúng. Hạt nhân ${}^{56}_{26}\\text{Fe}$ có $Z = 26$ proton và $N = 30$ neutron. $\\Delta m_{\\text{Fe}} = 26 \\times 1,00728 + 30 \\times 1,00866 - 55,9207 = 56,44908 - 55,9207 = 0,52838\\text{ amu}$.',
      },
      {
        key: 'b',
        text: 'Năng lượng liên kết riêng của hạt nhân ${}^{56}_{26}\\text{Fe}$ xấp xỉ bằng $8,79\\text{ MeV/nucleon}$.',
        isTrue: true,
        explanation:
          'Đúng. $W_{\\text{lk}} = 0,52838 \\times 931,5 \\approx 492,186\\text{ MeV}$. Năng lượng liên kết riêng: $W_{\\text{lkr}} = \\frac{492,186}{56} \\approx 8,789\\text{ MeV/nucleon}$.',
      },
      {
        key: 'c',
        text: 'Vì năng lượng liên kết $W_{\\text{lk}}$ của hạt nhân ${}^{235}_{92}\\text{U}$ ($\\approx 1786\\text{ MeV}$) lớn hơn của ${}^{56}_{26}\\text{Fe}$ ($\\approx 492\\text{ MeV}$) nên hạt nhân ${}^{235}_{92}\\text{U}$ bền vững hơn hạt nhân ${}^{56}_{26}\\text{Fe}$.',
        isTrue: false,
        explanation:
          'Sai! Độ bền vững phụ thuộc vào năng lượng liên kết RIÊNG $W_{\\text{lkr}} = W_{\\text{lk}}/A$. Với ${}^{235}\\text{U}$, $W_{\\text{lkr}} \\approx \\frac{1786}{235} \\approx 7,60\\text{ MeV/nucleon} < 8,79\\text{ MeV/nucleon}$ của ${}^{56}\\text{Fe}$, nên ${}^{56}\\text{Fe}$ bền vững hơn nhiều.',
      },
      {
        key: 'd',
        text: 'Các phản ứng phân hạch hạt nhân nặng (như ${}^{235}\\text{U}$) và nhiệt hạch hạt nhân nhẹ (như tổng hợp ${}^{4}\\text{He}$) đều tạo ra các hạt nhân mới có năng lượng liên kết riêng lớn hơn ban đầu nên đều tỏa năng lượng.',
        isTrue: true,
        explanation:
          'Đúng. Vì $\\Delta E = W_{\\text{lk sau}} - W_{\\text{lk trước}} > 0$ khi chuyển từ vùng $W_{\\text{lkr}}$ thấp về phía đỉnh bền vững trung bình.',
      },
    ],
  },
];

export const PART3_QUESTIONS: Part3Question[] = [
  {
    id: 'p3-1',
    number: 1,
    topicTag: 'Năng lượng liên kết riêng',
    question:
      'Tính năng lượng liên kết riêng của hạt nhân Aluminium ${}^{27}_{13}\\text{Al}$ theo đơn vị $\\text{MeV/nucleon}$ (làm tròn kết quả đến chữ số thập phân thứ hai). Biết $m_{\\text{Al}} = 26,9744\\text{ amu}$, $m_p = 1,0073\\text{ amu}$, $m_n = 1,0087\\text{ amu}$ và $1\\text{ amu}\\cdot c^2 = 931,5\\text{ MeV}$.',
    unit: 'MeV/nucleon',
    correctValue: 8.36,
    tolerance: 0.03,
    displayAnswer: '8,36',
    explanation:
      'Độ hụt khối của ${}^{27}_{13}\\text{Al}$ ($Z=13, N=14$): $\\Delta m = 13 \\times 1,0073 + 14 \\times 1,0087 - 26,9744 = 27,2167 - 26,9744 = 0,2423\\text{ amu}$. Năng lượng liên kết: $W_{\\text{lk}} = 0,2423 \\times 931,5 \\approx 225,702\\text{ MeV}$. Năng lượng liên kết riêng: $W_{\\text{lkr}} = \\frac{225,702}{27} \\approx 8,36\\text{ MeV/nucleon}$.',
  },
  {
    id: 'p3-2',
    number: 2,
    topicTag: 'Khối lượng hạt nhân con ²⁰⁶Pb',
    question:
      'Ban đầu có $m_0 = 105\\text{ g}$ chất phóng xạ ${}^{210}_{84}\\text{Po}$ nguyên chất ($T = 138\\text{ ngày}$), phân rã $\\alpha$ tạo thành chì ${}^{206}_{82}\\text{Pb}$. Sau thời gian $t = 414\\text{ ngày}$, khối lượng chì ${}^{206}_{82}\\text{Pb}$ được tạo thành trong mẫu bằng bao nhiêu gam (làm tròn đến chữ số thập phân thứ hai)?',
    unit: 'gam',
    correctValue: 90.13,
    tolerance: 0.05,
    displayAnswer: '90,13',
    explanation:
      'Số chu kì bán rã: $\\frac{t}{T} = \\frac{414}{138} = 3$. Khối lượng chì ${}^{206}\\text{Pb}$ tạo thành là: $m_{\\text{Pb}} = m_0 \\cdot \\frac{206}{210} \\cdot (1 - 2^{-3}) = 105 \\times \\frac{206}{210} \\times \\frac{7}{8} = 103 \\times \\frac{7}{8} = 90,125\\text{ g} \\approx 90,13\\text{ g}$.',
  },
  {
    id: 'p3-3',
    number: 3,
    topicTag: 'Năng lượng tỏa ra của phản ứng',
    question:
      'Dùng hạt proton bắn phá hạt nhân Lithium đứng yên theo phản ứng: ${}^{1}_{1}p + {}^{7}_{3}\\text{Li} \\rightarrow 2\\,{}^{4}_{2}\\text{He}$. Biết $m_p = 1,0073\\text{ amu}$, $m_{\\text{Li}} = 7,0144\\text{ amu}$, $m_{\\text{He}} = 4,0015\\text{ amu}$, $1\\text{ amu}\\cdot c^2 = 931,5\\text{ MeV}$. Năng lượng tỏa ra của một phản ứng bằng bao nhiêu $\\text{MeV}$ (làm tròn đến chữ số thập phân thứ hai)?',
    unit: 'MeV',
    correctValue: 17.42,
    tolerance: 0.05,
    displayAnswer: '17,42',
    explanation:
      'Tổng khối lượng trước phản ứng: $m_{\\text{trước}} = 1,0073 + 7,0144 = 8,0217\\text{ amu}$. Tổng khối lượng sau phản ứng: $m_{\\text{sau}} = 2 \\times 4,0015 = 8,0030\\text{ amu}$. Năng lượng tỏa ra: $\\Delta E = (8,0217 - 8,0030) \\times 931,5 = 0,0187 \\times 931,5 \\approx 17,42\\text{ MeV}$.',
  },
  {
    id: 'p3-4',
    number: 4,
    topicTag: 'Đo thể tích máu bằng ²⁴Na',
    question:
      'Để đo thể tích máu của một bệnh nhân, bác sĩ tiêm vào mạch máu $V_0 = 10\\text{ cm}^3$ dung dịch chứa ${}^{24}_{11}\\text{Na}$ ($T = 15\\text{ giờ}$) có độ phóng xạ $H_0 = 2,4 \\cdot 10^4\\text{ Bq}$. Sau $t = 5,0\\text{ giờ}$ để chất phóng xạ khuếch tán đều, bác sĩ rút ra $V_m = 10\\text{ cm}^3$ máu thì đo được độ phóng xạ $H_m = 38,1\\text{ Bq}$. Thể tích máu của bệnh nhân bằng bao nhiêu lít (làm tròn đến chữ số thập phân thứ nhất)?',
    unit: 'lít',
    correctValue: 5.0,
    tolerance: 0.1,
    displayAnswer: '5,0',
    explanation:
      'Sau $t = 5\\text{ giờ}$, tổng độ phóng xạ của ${}^{24}\\text{Na}$ còn lại trong máu là $H(t) = 2,4 \\cdot 10^4 \\times 2^{-5/15} \\approx 19048,8\\text{ Bq}$. Thể tích máu của bệnh nhân: $V = V_m \\cdot \\frac{H(t)}{H_m} = 10 \\times \\frac{19048,8}{38,1} \\approx 5000\\text{ cm}^3 = 5,0\\text{ lít}$.',
  },
  {
    id: 'p3-5',
    number: 5,
    topicTag: 'Định tuổi cổ vật bằng ¹⁴C',
    question:
      'Một mảnh thuyền gỗ cổ tìm thấy dưới đáy sông có độ phóng xạ của đồng vị ${}^{14}_{6}\\text{C}$ ($T = 5730\\text{ năm}$) bằng $70,71\\%$ ($\\approx \\frac{1}{\\sqrt{2}}$) so với độ phóng xạ của một mảnh gỗ mới chặt cùng loại và cùng khối lượng. Tính tuổi của mảnh thuyền gỗ cổ đó theo đơn vị năm (làm tròn đến hàng đơn vị).',
    unit: 'năm',
    correctValue: 2865,
    tolerance: 5,
    displayAnswer: '2865',
    explanation:
      'Ta có $\\frac{H}{H_0} = 2^{-t/T} = \\frac{1}{\\sqrt{2}} = 2^{-0,5} \\implies \\frac{t}{T} = 0,5 \\implies t = 0,5 \\times 5730 = 2865\\text{ năm}$.',
  },
  {
    id: 'p3-6',
    number: 6,
    topicTag: 'Động năng hạt α từ hạt mẹ đứng yên',
    question:
      'Hạt nhân Radium ${}^{226}_{88}\\text{Ra}$ đang đứng yên thì phóng xạ $\\alpha$ và biến đổi thành hạt nhân Radon ${}^{222}_{86}\\text{Rn}$. Biết năng lượng tỏa ra của phân rã là $\\Delta E = 4,87\\text{ MeV}$. Lấy khối lượng các hạt nhân tính theo $\\text{amu}$ bằng số khối của chúng. Động năng của hạt $\\alpha$ bay ra bằng bao nhiêu $\\text{MeV}$ (làm tròn đến chữ số thập phân thứ hai)?',
    unit: 'MeV',
    correctValue: 4.78,
    tolerance: 0.02,
    displayAnswer: '4,78',
    explanation:
      'Áp dụng bảo toàn động lượng cho hạt nhân mẹ đứng yên: $K_{\\alpha} = \\frac{A_{\\text{Rn}}}{A_{\\text{Rn}} + A_{\\alpha}} \\cdot \\Delta E = \\frac{222}{222 + 4} \\times 4,87 = \\frac{222}{226} \\times 4,87 \\approx 4,78\\text{ MeV}$.',
  },
];
