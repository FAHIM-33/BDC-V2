import BlogActions from "./BlogActions";

const BlogCard = ({ blog, refetch }) => {
    

    return (
        <section className="w-[35vw] rounded-md overflow-hidden  bg-fadegray my-4 mx-auto">
    
                <BlogActions
                    refetch={refetch}
                    blog={blog}
                ></BlogActions>
            <h3 className="text-2xl py-4 px-2">{blog.title}</h3>
            <p className="px-2">{blog.content}</p>
            <figure className="w-full h-fit">
                <img src={blog.img} alt="" className="w-full h-full object-contain" />
            </figure>
        </section>
    );
};

export default BlogCard;