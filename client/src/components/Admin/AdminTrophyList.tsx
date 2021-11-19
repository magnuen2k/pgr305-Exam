import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TrophyContext } from "../../contexts/TrophyContext";
import { ITrophy } from "../../interfaces/ITrophy";
import { TrophyContextType } from "../../types/TrophyContextType";
import Loading from "../shared/Loading";
import AdminTrophyItem from "./AdminTrophyItem";

const AdminTrophyList = () => {
  const { trophies } = useContext(TrophyContext) as TrophyContextType;

  const createTrophyList = () => {
    return trophies.map((trophy: ITrophy, key: number) => {
      return (
        <Col md={6} lg={4} xl={3} className="mt-5" key={key}>
          <AdminTrophyItem
            id={trophy.id}
            tournamentName={trophy.tournamentName}
            yearsWon={trophy.yearsWon}
            image={trophy.image}
          />
        </Col>
      );
    });
  };

  return (
    <Container className="pt-5" id="trophies">
      <h3 className="mb-3">Manage trophies</h3>
      {trophies.length <= 0 ? <Loading /> : <Row>{createTrophyList()}</Row>}
    </Container>
  );
};

export default AdminTrophyList;
