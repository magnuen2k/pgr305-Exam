import React, { FC, useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { StaffContext } from "../../contexts/StaffContext";
import { IStaff } from "../../interfaces/IStaff";
import { StaffContextType } from "../../types/StaffContextType";
import Loading from "../shared/Loading";
import StaffItem from "./StaffItem";

const StaffList: FC = () => {
  const { staff } = useContext(StaffContext) as StaffContextType;

  const createStaffList = () => {
    return staff.map((s: IStaff, key: number) => {
      return (
        <Col md={6} lg={4} xl={3} className="mt-5" key={key}>
          <StaffItem
            id={s.id}
            name={s.name}
            club={s.club}
            image={s.image}
            nationality={s.nationality}
            dateOfBirth={s.dateOfBirth}
            role={s.role}
          />
        </Col>
      );
    });
  };

  if (staff.length <= 0) {
    return <Loading />;
  }

  return (
    <Container className="pt-5">
      <h3 className="mb-3">Our staff</h3>
      <Row>{createStaffList()}</Row>
    </Container>
  );
};

export default StaffList;
