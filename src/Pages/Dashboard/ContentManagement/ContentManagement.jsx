import { Link } from "react-router-dom";
import Heading from "../../../Components/Heading";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../Components/Loading";
import useRole from "../../../Hooks/useRole";
import BlogCard from "./BlogCard";
import FilterContent from "./FilterContent";
import { useEffect, useState } from "react";

const ContentManagement = () => {
    const axiosPublic = useAxiosPublic()
    const { admin, volunteer } = useRole()
    const [blogs, setBlogs] = useState([])

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['all-blog'],
        queryFn: async () => {
            let res = await axiosPublic.get('/api/v1/all-blog')
            return res.data
        }
    })

    useEffect(() => {
        setBlogs(data)
    }, [data])

    function handleFilter(str) {
        if (!str) { return setBlogs(data) }
        let filteredBlogs = data?.filter(obj => obj.blogStatus === str)
        console.log(filteredBlogs)
        setBlogs(filteredBlogs)
    }

    if (isLoading || !blogs) { return <Loading></Loading> } 


    return (
        <section className="mb-48">
            <Heading>Content Management</Heading>
            {
                (admin || volunteer) &&
                <div className="flex justify-end">
                    <Link to='/dashboard/content-management/add-blog'>
                        <button className="mr-4 btn border-2 border-high rounded-md px-2 py-1">+ Add blog</button>
                    </Link>
                    <FilterContent handleFilter={handleFilter}></FilterContent>
                </div>
            }

            {
                blogs?.map(obj => <BlogCard
                    key={obj._id}
                    blog={obj}
                    refetch={refetch}
                ></BlogCard>)
            }

        </section >
    );
};

export default ContentManagement;