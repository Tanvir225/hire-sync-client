import { Helmet } from "react-helmet-async";
import postBanner from "../../../assets/images/postBanner.jpg"
import Banner from "../../../Components/Header/Banner/Banner";
import PostForm from "../../../Components/PostForm/PostForm";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../Hook/useAxios";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateJob = () => {

    //useparams
    const {id} = useParams()
  

    //state
  
    const [appDeadline, setappDeadline] = useState(new Date());
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState('');
    const [photo, setPhoto] = useState('');
    const [salary, setSalary] = useState('');
    const [keyword, setKeyword] = useState('');
    const [description, setDescription] = useState('');
    const [exp, setExp] = useState();
    const [name, setName] = useState('');
    const [vacancy, setVacancy] = useState();

    //useNavigate
    const navigate = useNavigate()

    //useAxios hook
    const axios = useAxios()

    useEffect(()=>{
        axios.get(`jobs/${id}`)
        .then((res) => {
            const {title,photo,salary,keyword,description,exp,name} = res?.data || {}
            setTitle(title)
            setPhoto(photo)
            setSalary(salary)
            setKeyword(keyword)
            setDescription(description)
            setExp(exp)
            setName(name)
            setVacancy(vacancy)
        })
    },[])
  

    //tenstack query mutation -> update
    const { mutate } = useMutation({
        mutationKey: ["jobs"],
        mutationFn: async (job) => {
            return await axios.patch(`/jobs/update/${id}`, job)
        },
        onSuccess:()=>{
            toast.success("job hase been updated")
            navigate("/my-jobs")
        }
    })

 

  
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
                    category={category}
                    setCategory={setCategory}
                    mutate={mutate}
                    appDeadline={appDeadline}
                    setappDeadline={setappDeadline}
                    exp={exp}
                    setExp={setExp}
                    salary={salary}
                    setSalary={setSalary}
                    vacancy={vacancy}
                    setVacancy={setVacancy}
                ></PostForm>
            </div>
        </div>
    );
};

export default UpdateJob;