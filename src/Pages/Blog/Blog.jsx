import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../../Components/Loading";
import Heading from "../../Components/Heading";
import BlogCard from "../Dashboard/ContentManagement/BlogCard";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";


const ContentManagement = () => {
    const axiosPublic = useAxiosPublic()
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // const { data: blogs, isLoading, refetch } = useQuery({
    //     queryKey: ['published-blog'],
    //     queryFn: async () => {
    //         let res = await axiosPublic.get('/api/v1/all-published-blog')
    //         return res.data
    //     }
    // })

    useEffect(() => {
        axiosPublic.get('/api/v1/all-published-blog')
            .then(res => {
                setBlogs(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [axiosPublic])

    function handleSearch(e) {
        e.preventDefault()
        setIsLoading(true)
        const title = e.target.title.value
        axiosPublic.get(`/api/v1/search-blog?title=${title}`)
            .then(res => {
                setBlogs(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    function fakeRefetch() {
        return
    }

    if (isLoading) { return <Loading></Loading> }

    return (
        <section className="pt-12">
            <Heading>Blogs</Heading>

            <form onSubmit={handleSearch} className="w-1/3 flex gap-1 mx-auto mb-8">
                <input type="text" required name="title" id="title" placeholder="Search by title (the bigger text)"
                    className="" />
                <button type="submit" className="btn px-4 bg-prim rounded-md">
                    <FaSearch></FaSearch>
                </button>
            </form>
            {blogs.length === 0 ? <h2 className="text-center">No blogs found...</h2> : <></>}

            {
                blogs?.map(obj => <BlogCard
                    key={obj._id}
                    blog={obj}
                    refetch={fakeRefetch}
                ></BlogCard>)
            }

        </section >
    );
};

export default ContentManagement;