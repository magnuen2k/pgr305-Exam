import React, { FC, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TrophyContext } from "../../contexts/TrophyContext";
import { ITrophy } from "../../interfaces/ITrophy";
import { TrophyContextType } from "../../types/TrophyContextType";
import Loading from "../shared/Loading";
import TrophyItem from "./TrophyItem";

const TrophyList: FC = () => {
  const { trophies } = useContext(TrophyContext) as TrophyContextType;

  const createTrophyList = () => {
    return trophies.map((t: ITrophy, key: number) => {
      return (
        <Col md={6} lg={4} xl={3} className="mt-5" key={key}>
          <TrophyItem
            id={t.id}
            tournamentName={t.tournamentName}
            image={t.image}
            yearsWon={t.yearsWon}
          />
        </Col>
      );
    });
  };

  return (
    <Container className="pt-5">
      <h3 className="mb-3">Our trophies</h3>
      {trophies.length <= 0 ? <Loading /> : <Row>{createTrophyList()}</Row>}
    </Container>
  );
};

export default TrophyList;
