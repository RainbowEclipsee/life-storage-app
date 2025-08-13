import WeekDetailClient from '../../../components/WeekDetail/WeekDetailClient';

export default function WeekDetailPage({ params }) {
  const { startDate } = params;
  return <WeekDetailClient startDate={startDate} />;
}
