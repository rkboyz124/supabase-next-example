import React from 'react';
import BoothCard from '../components/BoothCard';

interface IProps {}

const Booths: React.FC<IProps> = ({}) => {
  return (
    <div className="px-8">
      <h1 className="text-2xl font-bold">Booths</h1>

      <div className="grid grid-cols-4 gap-8 pt-10">
        <BoothCard />
        <BoothCard />
        <BoothCard />
        <BoothCard />
        <BoothCard />
      </div>
    </div>
  );
};

export default Booths;
