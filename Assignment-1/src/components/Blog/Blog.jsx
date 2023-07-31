import Button from 'react-bootstrap/Button';
import '../../Shared/Styles/Blogs.scss';
import { useState } from 'react';
import ViewEditBlog from './ViewEditBlog';
import { useDispatch } from 'react-redux';
import { setSelectedBlog } from '../../redux/Actions/blogsActions';

const Blog = (props) => {

    const [view, setView] = useState('');
    const [showModal, setShowModal] = useState(false);

    let dispatch = useDispatch();
    const viewBlog = async(view) => {
        await dispatch(setSelectedBlog(props.blogData));
        setView(view)
        setShowModal(true);

    }
    const updateAllBlogs = (data) => {
        props.updateAllBlogs(data);
    }
   
    return (
        <>
            <tr >
                <td>{props.blogData._id}</td>
                <td>{props.blogData.title}</td>
                <td>{props.blogData.subtitle}</td>
                <td>{props.blogData.author}</td>
                <td>
                    <Button variant="outline-dark" className="action-btn"
                        onClick={() => viewBlog('view')}>View</Button>
                    <Button variant="outline-primary" className="action-btn"
                        onClick={() => viewBlog('edit')}>Edit</Button>
                    <Button variant="outline-danger" className="action-btn"
                        onClick={() => viewBlog('delete')}>Delete</Button>
                </td>
            </tr>
            {
                showModal ?
                    <ViewEditBlog
                        show={showModal}
                        handleClose={() => { setShowModal(false) }}
                        view={view}
                        updateAllBlogs={updateAllBlogs}>
                    </ViewEditBlog> : null
            }
        </>

    );
}

export default Blog;