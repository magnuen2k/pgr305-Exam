import React, { FC } from "react";
import { Container } from "react-bootstrap";
import AdminAddStaffForm from "../../components/Admin/AdminAddStaffForm";

const AdminAddStaff: FC = () => {
  return (
    <Container>
      <p>Add a staff</p>
      <AdminAddStaffForm />
    </Container>
  );
};

export default AdminAddStaff;
