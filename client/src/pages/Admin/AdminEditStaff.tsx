import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AdminEditStaffForm from "../../components/Admin/AdminEditStaffForm";
import { StaffContext } from "../../contexts/StaffContext";
import { IStaff } from "../../interfaces/IStaff";
import { StaffContextType } from "../../types/StaffContextType";

const AdminEditStaff = () => {
  const { id } = useParams();

  const { getStaffById } = useContext(StaffContext) as StaffContextType;
  const [staff, SetStaff] = useState<IStaff>();

  useEffect(() => {
    getStaffFromContext();
  }, []);

  const getStaffFromContext = () => {
    if (id) {
      const _staff = getStaffById(id);
      SetStaff(_staff);
    }
  };

  return staff ? (
    <Container>
      <AdminEditStaffForm staff={staff} />
    </Container>
  ) : (
    <div>Unable to edit staff</div>
  );
};

export default AdminEditStaff;
