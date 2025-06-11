// Модуль для расчета цвета исходя из оценки настроения 
export function getColorByMood(mood) {
  switch (mood) {
    case 1:
      return '#f5d20b'; // желтый
    case 2:
      return '#e4c30a'; // насыщенный жёлтый
    case 3:
      return '#b2c921'; // переходно зеленый
    case 4:
      return '#7cb342'; // светло-зеленый
    case 5:
      return '#4caf50'; // зелёный
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
