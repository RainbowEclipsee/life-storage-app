// Модуль для расчета цвета исходя из оценки настроения 
export function getColorByMood(mood) {
  switch (mood) {
    case 1:
      return '#ff4d4f'; // красный
    case 2:
      return '#ff7a45'; // оранжевый
    case 3:
      return '#faad14'; // жёлтый
    case 4:
      return '#a0d911'; // светло-зеленый
    case 5:
      return '#52c41a'; // зелёный
    default:
      return null;
  }
}

export function getAverageMoodColor(weekData) {
  if (!weekData || typeof weekData.days !== 'object' || Array.isArray(weekData.days))
    return null;

  const moods = Object.values(weekData.days)
    .map((d) => d.mood)
    .filter((m) => typeof m === 'number');

  if (moods.length === 0)
    return null;

  const avg = moods.reduce((sum, m) => sum + m, 0) / moods.length;
  const rounded = Math.round(avg);

  return getColorByMood(rounded);
}
