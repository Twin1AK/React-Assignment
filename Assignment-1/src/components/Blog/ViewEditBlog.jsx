import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Labels from "../../Shared/Labels";
import { useFormik } from 'formik';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useSelector } from 'react-redux';
import { apiCall } from '../../services/apiCall';
import { BACKEND_URL } from '../../Shared/BackendUrls';

const ViewEditBlog = (props) => {

    let selectedBlog = useSelector(state => state.blogs.selectedBlog.selectedBlog);
    let loggedInUser = useSelector(state => state.users.loggedInUser.loggedInUser) || null;

    const validate = values => {
        const errors = {};
        if (!values.title) {
            errors.title = Labels.FieldRequired;
        }
        if (!values.author) {
            errors.author = Labels.FieldRequired;
        }
        return errors;
    };
    const { values, errors, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            id: selectedBlog._id, title: selectedBlog.title, subtitle: selectedBlog.subtitle, author: selectedBlog.author
        },
        validate,
        onSubmit: values => {
            console.log("form values => ", values);
            updateBlog(values);
        },
    });
    const updateBlog = async(blog) => {
        blog['userId'] = loggedInUser.id || "";
        try {
            const response = await apiCall(BACKEND_URL.UPDATE_BLOG, "POST", {blog});
            updateAllBlogs(response.updatedUserBlogs);
        } catch (error) {
            console.error(error);
        }
       
    }
    const updateAllBlogs = (updatedUserBlogs) => {
        props.updateAllBlogs(updatedUserBlogs);
        props.handleClose();
    }

    const deleteBlog = async (id) => {
        const blog = {
            id: id,
            userId: loggedInUser.id || ""
        }
        try {
            const response = await apiCall(BACKEND_URL.DELETE_BLOG, "POST", { blog });
            updateAllBlogs(response.updatedUserBlogs);
        } catch (error) {
            console.error(error);
        }
      
    }

    return (
        <>
            {
                props.view === 'view' || props.view === 'edit' ?
                    <Modal show={props.show} onHide={props.handleClose} backdrop='static'>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {
                                    props?.view === 'view' ? Labels.ViewBlogDetails :
                                        props?.view === 'edit' ? Labels.EditBlogDetails :
                                            props?.view === 'delete' ? Labels.Delete : Labels.Blog
                                }
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmit}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Blog Id"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="John"
                                        name="id"
                                        onChange={handleChange}
                                        value={values.id}
                                        onBlur={handleBlur}
                                    />
                                </FloatingLabel>

                                <FloatingLabel
                                    controlId="title"
                                    label="Title"
                                    className="mb-3"
                                >
                                    <Form.Control type="title" placeholder="title"
                                        name="title"
                                        onChange={handleChange}
                                        value={values.title}
                                        onBlur={handleBlur}
                                    />
                                </FloatingLabel>
                                <div className="errorMsg">
                                    {errors.title ? <div>{errors.title}</div> : null}
                                </div>

                                <FloatingLabel
                                    controlId="subtitle"
                                    label="Sub Title"
                                    className="mb-3"

                                >
                                    <Form.Control type="subtitle" placeholder="subtitle"
                                        name="subtitle"
                                        onChange={handleChange}
                                        value={values.subtitle}
                                        onBlur={handleBlur}
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="author"
                                    label="Author"
                                    className="mb-3"

                                >
                                    <Form.Control type="author" placeholder="author"
                                        name="author"
                                        onChange={handleChange}
                                        value={values.author}
                                        onBlur={handleBlur}
                                    />
                                </FloatingLabel>
                                <div className="errorMsg">
                                    {errors.author ? <div>{errors.author}</div> : null}
                                </div>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={props.handleClose}>
                                        {Labels.Close}
                                    </Button>
                                    {
                                        props.view === 'edit' || props.view === 'delete' ?
                                            <Button variant={props.view === 'edit' ? 'primary' : 'danger'} type="submit">
                                                {
                                                    props.view === 'edit' ? Labels.SaveChanges :
                                                        props.view === 'delete' ? Labels.Confirm :Labels.Save
                                                }
                                            </Button>
                                            : null
                                    }

                                </Modal.Footer>

                            </form>
                        </Modal.Body>

                    </Modal>
                    :
                    <Modal show={props.show} onHide={props.handleClose} backdrop='static'>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {Labels.Delete}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {Labels.SureToDelete}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.handleClose}>
                                {Labels.Close}
                            </Button>
                            <Button variant='danger' onClick={() => {deleteBlog(selectedBlog._id) }}>
                                {Labels.Confirm}
                            </Button>
                        </Modal.Footer>
                    </Modal>
            
            }
        </>
    );
}

export default ViewEditBlog;