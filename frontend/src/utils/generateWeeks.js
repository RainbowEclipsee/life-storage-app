const WEEKS_IN_YEAR = 52;

// Этапы жизни с возрастными границами
const lifeStages = [
  { label: 'Неосознанное детство', from: 0, to: 4 },
  { label: 'Детство', from: 4, to: 14 },
  { label: 'Подростковый период', from: 14, to: 18 },
  { label: 'Молодость', from: 18, to: 35 },
  { label: 'Зрелость', from: 35, to: 60 },
  { label: 'Старость', from: 60, to: Infinity },
];

// Функция, возвращающая массив всех недель
export function generateWeeks(lifeExpectancy, currentAge) {
  const totalWeeks = lifeExpectancy * WEEKS_IN_YEAR;
  const weeks = [];

  for (let i = 0; i < totalWeeks; i++) {
    const age = i / WEEKS_IN_YEAR;
    const week = {
      id: i,
      isPast: age < currentAge,
      stage: getStageLabel(age),
    };
    weeks.push(week);
  }

  return weeks;
}

function getStageLabel(age) {
  const stage = lifeStages.find((stage) => age >= stage.from && age < stage.to);
  return stage ? stage.label : 'Неизвестно';
}
