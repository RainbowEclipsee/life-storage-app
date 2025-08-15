import WeekDetail from '../../../components/WeekDetail/WeekDetail';

export default async function WeekDetailPage({ params }) {
  const { startDate } = await params;
  return <WeekDetail startDate={startDate} />;
}
