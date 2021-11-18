import React, { FC } from "react";
import { ITrophy } from "../../interfaces/ITrophy";
import { Accordion, Card } from "react-bootstrap";
import { API_URL } from "../../utils/Constants";

const TrophyItem: FC<ITrophy> = ({ id, image, tournamentName, yearsWon }) => {
  return (
    <Card className="card-container Staff-card">
      <div className="card-image-container img-responsive">
        <Card.Img
          variant="top"
          src={`${API_URL}/images/${image}`}
          className="img-fluid"
        />
      </div>
      <Card.Body>
        <Card.Text>Tournament: {tournamentName}</Card.Text>
        <Card.Text>Victories: {yearsWon.length}</Card.Text>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>See years won</Accordion.Header>
            <Accordion.Body>
              {yearsWon.map((y, key) => {
                if (key === 0) return <span key={key}>{y}</span>;
                return <span key={key}>, {y}</span>;
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default TrophyItem;
