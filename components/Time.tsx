import { numberFormat, useTime } from '@/hooks/useTime';
import clsx from 'clsx';
import SafeNumberFlow from './SafeNumberFlow';

const Time = ({ isDark = false }: { isDark?: boolean }) => {
  const { hours, minutes, period } = useTime();

  return (
    <p className={clsx(isDark ? 'text-white' : 'text-black')}>
      <SafeNumberFlow format={numberFormat} value={Number(hours)} />
      :
      <SafeNumberFlow format={numberFormat} value={Number(minutes)} />
      <span className={clsx('uppercase', isDark ? 'text-white-30' : 'text-black-30')}>
        {period}
      </span>
    </p>
  );
};

export default Time;
