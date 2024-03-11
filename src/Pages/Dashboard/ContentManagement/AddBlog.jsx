import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Heading from "../../../Components/Heading";
import JoditEditor from "jodit-react";
import { useCallback, useState, useMemo } from "react";
import { hostImage } from "../../../Utility/hostImg";
import toast from "react-hot-toast";

const AddBlog = () => {
    const { register, handleSubmit } = useForm()
    const axiosSecure = useAxiosSecure()
    const [content, setContent] = useState("");
    const [logs, setLogs] = useState([]);

    const htmlToText = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        return doc.body.textContent || "";
    }

    function onSubmit(data) {
        data.content = htmlToText(content)
        let toastID = toast.loading("Uploading Post")
        hostImage(data.imageFile)
            .then(url => {
                delete data.imageFile
                data.img = url
                axiosSecure.post('/api/v1/add-blog', data)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.insertedId) {
                            toast.success('Posted', { id: toastID })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        toast.error('Could not post', { id: toastID })
                    })
            })
    }

    const appendLog = useCallback(
        (message) => {
            // console.log("logs = ", logs);
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
            <Heading>Create a blog</Heading>
            <div className="p-4">
                <form onSubmit={handleSubmit(onSubmit)} className=" md:mx-auto p-4 border border-low rounded-lg">

                    <div className=''>
                        <label htmlFor="title"
                            className=''
                        >Title:</label>
                        <br />
                        <input type="text" {...register("title", { required: true })} name="title" id="title" placeholder="Title"
                            className="" />
                    </div>

                    <div className='md:mt-8 mt-4'>
                        <label htmlFor="imageFile"
                        >Choose Thumbnail:</label>
                        <br />
                        <input type="file" {...register("imageFile", { required: true })} name="imageFile" id="imageFile" placeholder="Choose file" />
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
                        Create
                    </button>

                </form>
            </div>
        </section>
    );
};

export default AddBlog;