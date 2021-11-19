import React, { FC, useContext, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { StaffContext } from "../../contexts/StaffContext";
import { IResponse } from "../../interfaces/IResponse";
import { IStaff } from "../../interfaces/IStaff";
import { StaffContextType } from "../../types/StaffContextType";
import { handleError, handleImageUpload } from "../../utils";
import { STAFF_ROLES } from "../../utils/Constants";
import FilterOptions from "../shared/FilterOptions";
import Loading from "../shared/Loading";
import ResponseView from "../shared/ResponseView";

interface AdminEditStaffProps {
  staff: IStaff;
}

const AdminEditStaffForm: FC<AdminEditStaffProps> = ({ staff }) => {
  const { editStaff } = useContext(StaffContext) as StaffContextType;

  const [editedStaff, setEditedStaff] = useState<IStaff>(staff);
  const [newImage, setNewImage] = useState<File>();
  const [response, setResponse] = useState<IResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRole = (e: any) => {
    setEditedStaff({ ...editedStaff, role: e.target.value });
  };

  // Upload image to server, if successful, add edited player to database
  const editNewStaff = async () => {
    let imgRes;
    if (newImage) {
      imgRes = await handleImageUpload(newImage, setIsLoading, setResponse);
    }

    let staffRes;

    // Try to POST edited player, else handle error
    try {
      staffRes = await editStaff(editedStaff);
      setIsLoading(true);
    } catch (e: any) {
      handleError(e, setIsLoading, setResponse);
    }

    // If POST successful, display message in popup
    if (staffRes && staffRes.status === 204) {
      setIsLoading(false);
      setResponse({
        message: `Staff edited successfully${
          imgRes === 201 ? ", with new image" : ", without new image"
        }`,
        statusCode: staffRes.status,
      });
    }
  };

  return (
    <div className="mb-2 mt-5">
      <Form>
        <Form.Group>
          <FormControl
            placeholder="Name"
            value={editedStaff.name}
            onChange={(e) =>
              setEditedStaff({ ...editedStaff, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <FormControl
            placeholder="Nationality"
            value={editedStaff.nationality}
            onChange={(e) =>
              setEditedStaff({ ...editedStaff, nationality: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <FormControl
            type="date"
            onChange={(e) =>
              setEditedStaff({
                ...editedStaff,
                dateOfBirth: new Date(e.target.value),
              })
            }
          />
        </Form.Group>
        <Form.Group>
          <FilterOptions handleChange={handleRole} options={STAFF_ROLES} />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="file"
            onChange={(e: any) => {
              setEditedStaff({
                ...editedStaff,
                image: e.target.files[0].name,
              });
              setNewImage(e.target.files[0]);
            }}
          />
        </Form.Group>
        <Button onClick={editNewStaff}>Edit player</Button>
      </Form>
      {isLoading && <Loading />}
      {response && (
        <ResponseView
          message={response.message}
          statusCode={response.statusCode}
        />
      )}
    </div>
  );
};

export default AdminEditStaffForm;
