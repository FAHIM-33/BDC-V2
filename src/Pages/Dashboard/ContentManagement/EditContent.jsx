import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Heading from "../../../Components/Heading";
import JoditEditor from "jodit-react";
import { useCallback, useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const AddBlog = () => {
    const { register, handleSubmit } = useForm()
    const axiosSecure = useAxiosSecure()
    const [content, setContent] = useState("");
    const [logs, setLogs] = useState([]);
    const { id } = useParams()
    const [post, setPost] = useState({})
    const nav = useNavigate()

    useEffect(() => {
        axiosSecure.get(`/api/v1/a-blog/${id}`)
            .then(res => {
                setPost(res.data)
                setContent(res.data.content)
            })
            .catch(err => console.log(err))
    }, [id, axiosSecure])


    const htmlToText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        return doc.body.textContent || "";
    }

    function onSubmit(data) {
        data.content = htmlToText(content)
        let toastID = toast.loading("Uploading Post")
        axiosSecure.put(`/api/v1/update-blog/${id}`, data)
            .then(() => {
                toast.success('Posted', { id: toastID })
                nav(-1)
            })
            .catch(err => {
                console.log(err)
                toast.error('Could not post', { id: toastID })
            })

    }

    const appendLog = useCallback(
        (message) => {
            const newLogs = [...logs, message];
            setLogs(newLogs);
        },
        [logs, setLogs]
    );

    const config = useMemo(
        () => ({
            readonly: false
        }),
        []
    );

    const onChange = useCallback(
        (newContent) => {
            appendLog(`onChange triggered with ${newContent}`);
        },
        [appendLog]
    );

    const onBlur = useCallback(
        (newContent) => {
            appendLog(`onBlur triggered with ${newContent}`);
            setContent(newContent);
        },
        [appendLog, setContent]
    );

    console.log(content)
    return (
        <section className="">
            <Heading>Edit blog</Heading>
            <div className="p-4">
                <form onSubmit={handleSubmit(onSubmit)} className=" md:mx-auto p-4 border border-low rounded-lg">

                    <div className=''>
                        <label htmlFor="title"
                            className=''
                        >Title:</label>
                        <br />
                        <input type="text" defaultValue={post?.title} {...register("title")} name="title" id="title" placeholder="Title" />
                    </div>

                    <div className="mt-8 text-black">
                        <label className="text-high">Content:</label>
                        <JoditEditor
                            value={content}
                            config={config}
                            tabIndex={1}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn py-3 bg-sec text-black rounded-md w-3/5 mx-auto block text-xl font-semibold mt-8">
                        Update
                    </button>

                </form>
            </div>
        </section>
    );
};

export default AddBlog;