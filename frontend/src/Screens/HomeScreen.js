import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
export default function HomeScreen() {
  const history = useHistory();
  const user = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(user);
  useEffect(() => {
    if (!user) {
      history.push("/login");
      window.location.replace("/login");
    } else if (userInfo.isAdmin) {
      window.location.replace("/adminPanel");
    }
  }, [history]);

  const [text, setText] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const post = {
        text,
        user: userInfo._id,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const res = await axios.post("/api/post", post, config);
      window.location.reload();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const [myPost, setMyPost] = useState([]);
  useEffect(() => {
    async function fetchPost() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.get("/api/post", config);

      setMyPost(res.data);
    }

    fetchPost();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.delete(`/api/post/${id}`, config);
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  let count = 1;
  return (
    <div>
      <Container style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <h3>Add an activity</h3>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button type="submit" variant="success">
                Add
              </Button>
            </Col>
          </Row>
        </Form>

        <div>
          {myPost.length === 0 ? (
            <h5 style={{ textAlign: "center", padding: "50px" }}>No Posts!</h5>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>My Activities</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myPost.map((e) => (
                  <tr key={e._id}>
                    <td>{count++}</td>
                    <td>{e.text}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(e._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Container>
    </div>
  );
}
