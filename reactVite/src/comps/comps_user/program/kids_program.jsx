import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const levels = ['Beginners', 'Advanced', 'Experts'];

const CardComponent = ({ level, onJoinClick  }) => {
  return (
    <div className="mt-4"> 
    <Card style={{ width: '25rem', height: '20rem'}}>
      <Card.Body>
        <Card.Title><h2>{level}</h2></Card.Title>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque magni aspernatur enim, natus ut exercitationem tenetur voluptates! Libero suscipit, asperiores laboriosam voluptatibus quibusdam ducimus delectus commodi ipsam. Sapiente, corporis perferendis.
        <Button variant="primary" className="mx-2"
         onClick={onJoinClick}
         >Join</Button>
      </Card.Body>
    </Card>
  </div>
  );
};

const KidsProgram = () => {
  const nav = useNavigate();

  const handleJoinClick = () => {
   
    nav('/signUp')
  };
  return (
    <div className="d-flex justify-content-around">
    {levels.map((level, index) => (
      <CardComponent key={index} level={level} 
      onJoinClick={() => handleJoinClick()} 
      />
    ))}
  </div>
  );
};

export default KidsProgram;
