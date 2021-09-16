import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Table } from "react-bootstrap";
import CustomButton from "../../Components/CustomButton";

export default function Users() {
  var history = useHistory();
  var user_list = JSON.parse(localStorage.getItem("user_list"));

  React.useEffect(() => {
    let isLoggedIn = localStorage.getItem("is_login");
    if (isLoggedIn !== "yes") {
      history.push("/login");
    }

    return () => {};
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    localStorage.removeItem("is_login");
    history.push("/login");
  };

  const tableData = Object.keys(user_list).map((data, index) => {
    return (
      <tr key={"user-"+index}>
        <td>{user_list[data].name}</td>
        <td>{user_list[data].email}</td>
        <td>{user_list[data].mobile}</td>
      </tr>
    );
  });

  return (
    <Row>
      <Col md={12} className="mb-3" style={{ textAlign: "end" }}>
        <CustomButton onClick={() => onLogout()} className="mb-2">
          Logout
        </CustomButton>
      </Col>
      <Col>
        <Table responsive size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </Table>
      </Col>
    </Row>
  );
}
