import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { IStaff } from "../../interfaces/IStaff";
import { API_URL, getAge, getSimpleBirthOfDate } from "../../utils";

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
    <Card className="card-container Staff-card">
      <div className="card-image-container img-responsive">
        <Card.Img
          variant="top"
          src={`${API_URL}/images/${image}`}
          className="img-fluid"
        />
      </div>
      <Card.Body>
        <Card.Text>Name: {name}</Card.Text>
        <Card.Text>Club: {club}</Card.Text>
        <Card.Text>
          Date of birth: {getSimpleBirthOfDate(dateOfBirth)} (age{" "}
          {getAge(dateOfBirth)})
        </Card.Text>
        <Card.Text>Place of birth: {nationality}</Card.Text>

        <Card.Text>Role: {role}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StaffItem;
