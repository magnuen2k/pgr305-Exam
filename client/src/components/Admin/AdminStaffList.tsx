import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { StaffContext } from "../../contexts/StaffContext";
import { IStaff } from "../../interfaces/IStaff";
import { StaffContextType } from "../../types/StaffContextType";
import Loading from "../shared/Loading";
import AdminStaffItem from "./AdminStaffItem";

const AdminStaffList = () => {
  const { staff } = useContext(StaffContext) as StaffContextType;

  const createStaffList = () => {
    return staff.map((staff: IStaff, key: number) => {
      return (
        <Col md={6} lg={4} xl={3} className="mt-5" key={key}>
          <AdminStaffItem
            id={staff.id}
            name={staff.name}
            club={staff.club}
            image={staff.image}
            nationality={staff.nationality}
            dateOfBirth={staff.dateOfBirth}
            role={staff.role}
          />
        </Col>
      );
    });
  };

  return (
    <Container className="pt-5" id="players">
      <h3 className="mb-3">Manage staff</h3>
      {staff.length <= 0 ? <Loading /> : <Row>{createStaffList()}</Row>}
    </Container>
  );
};

export default AdminStaffList;
