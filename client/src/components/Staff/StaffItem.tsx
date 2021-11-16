import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IStaff } from "../../interfaces/IStaff";

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
            src={`https://localhost:5001/images/${image}`}
            className="img-fluid"
          />
        </div>
        <Card.Title className="Staff-card-name">{name}</Card.Title>
      </Card>
    </Link>
  );
};

export default StaffItem;
