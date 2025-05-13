import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWeeks } from '../../store/lifeSlice';
import { generateWeeks } from '../../utils/generateWeeks';
import LifeStageBlock from '../../components/LifeStageBlock/LifeStageBlock';

const LifeCalendar = () => {
  const dispatch = useDispatch();
  const { lifeExpectancy, age, weeks } = useSelector((state) => state.life);

  useEffect(() => {
    const generated = generateWeeks(lifeExpectancy, age);
    dispatch(setWeeks(generated));
  }, [dispatch, lifeExpectancy, age]);

  // Группируем недели по стадии жизни
  const grouped = weeks.reduce((acc, week) => {
    if (!acc[week.stage]) acc[week.stage] = [];
    acc[week.stage].push(week);
    return acc;
  }, {});

  return (
    <div className="life-calendar">
      {Object.entries(grouped).map(([stage, weeks]) => (
        <LifeStageBlock key={stage} title={stage} weeks={weeks} />
      ))}
    </div>
  );
};

export default LifeCalendar;
