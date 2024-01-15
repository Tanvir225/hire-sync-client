import { Helmet } from "react-helmet-async";
import postBanner from "../../../assets/images/postBanner.jpg"
import { useEffect, useState } from "react";

import Banner from "../../../Components/Header/Banner/Banner";
import PostForm from "../../../Components/PostForm/PostForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hook/useAxios";
import { useParams } from "react-router-dom";

const UpdateJob = () => {

    //useparams
    const { id } = useParams()
    //console.log(id);

    //state
    const [categories, setCategories] = useState()
    const [appDeadline, setappDeadline] = useState(new Date());
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [photo, setPhoto] = useState("");
    const [salary, setSalary] = useState("");
    const [keyword, setKeyword] = useState("");
    const [description, setDescription] = useState("");
    const [exp, setExp] = useState(0);
    const [name, setName] = useState('');

    //useAxios hook
    const axios = useAxios()

    //testack userQuery 
    const { data } = useQuery({
        queryKey: ["jobs"],
        queryFn: async () => {
            return await axios.get("/category")
        }
    })
    useEffect(()=>{
        setCategories(data?.data)
    },[data?.data])
   
    //tenstack query mutation
    const { mutate } = useMutation({
        mutationKey: ["jobs"],
        mutationFn: async (job) => {
            return await axios.patch(`/jobs/update/${id}`, job)
        }
    })

 

    console.log(data?.data);
    return (
        <div className="h-screen bg-base-100 bg-opacity-70">
            {/* helmet */}
            <Helmet>
                <title>Hire Sync | Update Job</title>
            </Helmet>

            <Banner
                bannerImg={postBanner}
                text={"Update a Job"}
                desc={"If opportunity doesn't knock, build a door."}
            ></Banner>
            <div>
                <PostForm
                    text={"Update a job"}
                    name={name}
                    setName={setName}
                    title={title}
                    setTitle={setTitle}
                    photo={photo}
                    setPhoto={setPhoto}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    description={description}
                    setDescription={setDescription}
                    categories={categories}
                    category={category}
                    setCategory={setCategory}
                    mutate={mutate}
                    appDeadline={appDeadline}
                    setappDeadline={setappDeadline}
                    exp={exp}
                    setExp={setExp}
                    salary={salary}
                    setSalary={setSalary
                    }
                ></PostForm>
            </div>
        </div>
    );
};

export default UpdateJob;