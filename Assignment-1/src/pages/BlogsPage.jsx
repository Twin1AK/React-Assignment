import Blog from "../components/Blog/Blog";
import '../Shared/Styles/Blogs.scss';
import Table from 'react-bootstrap/Table';
import Labels from "../Shared/Labels";
import { useEffect, useState, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React from 'react';
import { BACKEND_URL } from '../Shared/BackendUrls';
import Spinner from 'react-bootstrap/Spinner';
import '../Shared/Styles/Coins.scss';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall } from '../services/apiCall';
import { setUserBlogs } from "../redux/Actions/blogsActions";

const BlogsPage = () => {

    const [allBlogs, setAllBlogs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loader, setLoader] = useState(true);
    let loggedInUser = useSelector(state => state.users.loggedInUser.loggedInUser) || null;
    let dispatch = useDispatch();
    if (!loggedInUser) {
        loggedInUser = {};
        loggedInUser['id'] = '';
    }
    const fetchUserBlogs = useCallback(async () => {
        try {
            const response = await apiCall(`${BACKEND_URL.GET_USER_BLOGS}?userId=${loggedInUser.id}`, "GET");
            setAllBlogs(response.data);
            dispatch(setUserBlogs(response.data));
        } catch (error) {
            console.error(error);
        }
    }, [setAllBlogs, loggedInUser.id, dispatch]);
    useEffect(() => {
        const fetchData = async () => {
            await fetchUserBlogs();
            setLoader(false);
        }
        fetchData();
    }, [fetchUserBlogs]);

    const updateAllBlogs = data => {
        console.log(data);
        setAllBlogs(data)
    }
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
    const { values, errors, handleChange, handleSubmit, resetForm, handleBlur } = useFormik({
        initialValues: {
            title: '', subtitle: '', author: ''
        },
        validate,
        onSubmit: values => {
            console.log("form values => ", values);
            addBlog(values);
            resetForm();
        },
    });
    const addBlog = async () => {
        setLoader(true);
        let blog = { ...values };
        blog['userId'] = loggedInUser.id || "";
        try {
            const response = await apiCall(`${BACKEND_URL.ADD_NEW_BLOG}`, "POST", { blog });
            setAllBlogs(response.updatedUserBlogs);
        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
        setLoader(false);
    }
    
    return (
        <>
            {
                
                    <div className="container mt-5">
                        <div className="row mt-5">
                            <div className="col-md-12 mt-5">


                                <div className="row">
                                    <div className="col-md-11">
                                        <div className="Blogs-heading">
                                            <h1>{Labels.Blogs}</h1>
                                        </div>
                                    </div>
                                    <div className="col-md-1 add-Blog-wrapper">
                                        <div className="add-blog">
                                            <span onClick={setShowModal}><i className="bi bi-plus-circle-fill"></i></span>
                                        </div>
                                    </div>
                                </div>
                            {
                                loader ?
                                    <Spinner animation="grow" variant="dark" className="loader"
                                        style={{ zIndex: 999, position: 'absolute', top: '50%', left: '50%' }} />

                                    :
                                    allBlogs?.length > 0 ? <>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>{Labels.BlogId}</th>
                                                    <th>{Labels.Title}</th>
                                                    <th>{Labels.SubTitle}</th>
                                                    <th>{Labels.Author}</th>
                                                    <th>{Labels.Action}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allBlogs.map((blog) => {
                                                        return <Blog
                                                            blogData={blog}
                                                            key={blog._id}
                                                            allBlogs={allBlogs}
                                                            updateAllBlogs={updateAllBlogs}
                                                        ></Blog>
                                                    })
                                                }

                                            </tbody>
                                        </Table>
                                    </>
                                        : <h4>{Labels.NoRecords}</h4>
                                }

                            </div>
                        </div>
                    </div>

            }
            


            <Modal show={showModal} onHide={ () => {setShowModal(false)}} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {Labels.CreateNewBlog}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
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
                            <Button variant="secondary" onClick={() => {setShowModal(false)}}>
                                {Labels.Cancel}
                            </Button>
                            <Button variant='primary' type="submit">
                                {Labels.Save}
                            </Button>

                        </Modal.Footer>

                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default BlogsPage;