/* eslint-disable no-unused-vars */
// src/components/UsersTable.jsx
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Container,
  Card,
  Badge,
  Spinner,
} from "react-bootstrap";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../store/slice/userSlice";
import UserForm from "./UserForm";
import "./UsersTable.css";
import { motion } from "framer-motion";

const EditIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" className="edit-icon">
    <path d="M16.474,5.408l2.118,2.118L7.67,18.447l-2.118-2.118L16.474,5.408z M19.386,4.511l0.578-0.578 c0.585-0.585,0.585-1.535,0-2.121l0,0c-0.585-0.585-1.535-0.585-2.121,0l-0.578,0.578L19.386,4.511z M5,18.5l-0.5,2.5l2.5-0.5L5,18.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" className="delete-icon">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const AddIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" className="add-icon">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" className="location-icon">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const UsersTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleShowModal = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleSubmit = (userData) => {
    if (editingUser) {
      dispatch(updateUser({ ...userData, id: editingUser.id }));
    } else {
      dispatch(addUser(userData));
    }
  };

  if (status === "loading") {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <p>Loading users...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="error-container">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Data</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Container className=" py-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="shadow-lg border-0 rounded custom-animated-card">
          <Card.Header className="bg-white border-0 py-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="mb-0">Users Management</h2>
                <p className="text-muted mb-0">
                  Total Users: <Badge bg="primary">{users.length}</Badge>
                </p>
              </div>
              <Button
                variant="primary"
                onClick={handleShowModal}
                className="add-user-btn"
              >
                <AddIcon />
                <span className="ms-2">Add New User</span>
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="custom-table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Name</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">Phone</th>
                    <th className="border-0">Location</th>
                    <th className="border-0 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="align-middle">
                      <td>#{index + 1}</td>
                      <td className="user-name">{user.name}</td>
                      <td>
                        <a
                          href={`mailto:${user.email}`}
                          className="text-decoration-none"
                        >
                          {user.email}
                        </a>
                      </td>
                      <td>{user.phone}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <LocationIcon />
                          <span className="ms-2">
                            {user.address.city}
                            <small className="text-muted ms-2">
                              ({user.address.zipcode})
                            </small>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-3">
                          <button
                            className="btn-action btn-edit"
                            onClick={() => handleEdit(user)}
                            title="Edit User"
                          >
                            <EditIcon />
                          </button>
                          <button
                            className="btn-action btn-delete"
                            onClick={() => handleDelete(user.id)}
                            title="Delete User"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
      <UserForm
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        initialData={editingUser}
      />
    </Container>
  );
};

export default UsersTable;
