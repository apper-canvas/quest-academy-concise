import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorldCard from '@/components/molecules/WorldCard';

const HomeWorldSelection = ({ worlds }) => {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {worlds.map((world, index) => (
        <WorldCard
          key={world.id}
          world={world}
          index={index}
          onClick={() => navigate(world.path)}
        />
      ))}
    </div>
  );
};

export default HomeWorldSelection;