import React from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';


const FlipClock = () => {
  return (
    <>
      <div>
        <FlipClockCountdown
          className='flip-clock'
          to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
          renderMap={[false, true, true, true]}
        />
      </div>
    </>
  );
};

export default FlipClock;