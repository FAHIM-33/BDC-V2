import toast from 'react-hot-toast';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useRole from '../../../Hooks/useRole';
import { Link } from 'react-router-dom';

const BlogActions = ({ refetch, blog }) => {
    const axiosSecure = useAxiosSecure()
    const { admin, volunteer } = useRole()

    let hasAccess = false
    if (admin || volunteer) { hasAccess = true }

    function handleDelete() {
        let toastId = toast.loading('Deleting donation request..')
        axiosSecure.delete(`/api/v1/delete-blog/${blog._id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success('Deleted successfully', { id: toastId })
                    refetch()
                }
            })
            .catch(err => {
                console.log(err)
                toast.error('Failed to delete blog', { id: toastId })
            })
    }

    function handlePublish() {
        let newStat = blog.blogStatus === 'pending' ? "published" : "pending"
        let toastId = toast.loading('Updating donation request..')
        axiosSecure.patch(`/api/v1/publish-blog/${blog._id}?blogStatus=${newStat}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Updated successfully', { id: toastId })
                    refetch()
                }
            })
            .catch(err => {
                console.log(err)
                toast.error('Failed to update blog', { id: toastId })
            })
    }

    return (
        <div className='flex justify-end gap-2 p-1'>
            {
                hasAccess ?
                    <Link to={`/dashboard/edit-content/${blog._id}`}>
                        <button className='border border-low text-high rounded-md btn px-2 py-1'>
                            <FaPen></FaPen>
                        </button>
                    </Link>
                    :
                    <></>
            }
            {
                admin &&
                <>
                    <button
                        onClick={handlePublish}
                        className={`border ${blog.blogStatus == 'pending' ? 'border-sec text-sec' : 'border-amber-400 text-amber-400'} rounded-md btn px-2 py-1`}>
                        {blog.blogStatus === 'pending' ? "Publish" : "Unpublish"}
                    </button>
                    <button
                        onClick={handleDelete}
                        className='border border-red-600 text-red-600 rounded-md btn px-2 py-1'>
                        <FaTrashAlt></FaTrashAlt>
                    </button>
                </>
            }
        </div>
    );
};

export default BlogActions;