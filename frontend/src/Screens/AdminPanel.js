import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useHistory } from "react-router";

import Moment from "react-moment";
export default function AdminPanel() {
  const history = useHistory();
  const user = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(user);
  useEffect(() => {
    if (!user) {
      history.push("/login");
      window.location.replace("/login");
    }
  }, [history]);

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await axios.get("/api/users", config);
      setAllUsers(res.data);
    }

    fetchUsers();
  }, []);

  let count = 1;
  return (
    <div>
      <Container style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Date of Birth</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((e) => (
              <tr key={e._id}>
                <td>{count++}</td>
                <td>{e.fullName}</td>
                <td>{e.username}</td>
                <td>
                  <Moment format="DD-MM-YYYY" date={e.dob} />
                </td>
                <td>{e.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
