import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IStaff } from "../../interfaces/IStaff";
import { API_URL } from "../../utils/Constants";

const StaffItem: FC<IStaff> = ({
  id,
  name,
  club,
  image,
  nationality,
  dateOfBirth,
  role,
}) => {
  return (
    <Link to={`/staff-details/${id}`}>
      <Card className="card-container Staff-card">
        <div className="card-image-container img-responsive">
          <Card.Img
            variant="top"
            src={`${API_URL}/images/${image}`}
            className="img-fluid"
          />
        </div>
        <Card.Title className="Staff-card-name">{name}</Card.Title>
      </Card>
    </Link>
  );
};

export default StaffItem;
