/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import "./UserForm.css";

const UserForm = ({ show, handleClose, handleSubmit, initialData }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
    .required("Phone number is required"),
    address: Yup.object({
      city: Yup.string().required("City is required"),
      zipcode: Yup.string()
      .required("Zip Code is required"),
    }),
  });

  const initialValues = initialData || {
    name: "",
    email: "",
    phone: "",
    address: {
      city: "",
      zipcode: "",
    },
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-primary">
            {initialData ? "Edit User" : "Add New User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
              handleClose();
            }}
          >
            {({ handleChange, handleBlur, values }) => (
              <FormikForm>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>
                        Full Name <span className="error-text">*</span>
                      </Form.Label>
                      <Field
                        type="text"
                        name="name"
                        className="form-control custom-input"
                        placeholder="Enter full name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error-text"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>
                        Email <span className="error-text">*</span>
                      </Form.Label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control custom-input"
                        placeholder="Enter email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-text"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>
                        Phone <span className="error-text">*</span>
                      </Form.Label>
                      <Field
                        type="text"
                        name="phone"
                        className="form-control custom-input"
                        placeholder="Enter phone number"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="error-text"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>
                        City <span className="error-text">*</span>
                      </Form.Label>
                      <Field
                        type="text"
                        name="address.city"
                        className="form-control custom-input"
                        placeholder="Enter city"
                      />
                      <ErrorMessage
                        name="address.city"
                        component="div"
                        className="error-text"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>
                        Zip Code <span className="error-text">*</span>
                      </Form.Label>
                      <Field
                        type="text"
                        name="address.zipcode"
                        className="form-control custom-input"
                        placeholder="Enter zip code"
                      />
                      <ErrorMessage
                        name="address.zipcode"
                        component="div"
                        className="error-text"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button variant="light" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    {initialData ? "Update" : "Add"} User
                  </Button>
                </div>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </motion.div>
    </Modal>
  );
};

export default UserForm;
