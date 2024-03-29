import { useState } from "react";
import Banner from "../../Components/Header/Banner/Banner";
import postBanner from "../../assets/images/postBanner.jpg";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import toast from "react-hot-toast";
import PostForm from "../../Components/PostForm/PostForm";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  //state
  const [appDeadline, setappDeadline] = useState(new Date());
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [salary, setSalary] = useState("");
  const [keyword, setKeyword] = useState("");
  const [description, setDescription] = useState("");
  const [exp, setExp] = useState(0);
  const [name, setName] = useState('');
  const[vacancy,setVacancy] = useState(0)






  //useAxios hooks
  const axios = useAxios();

  //useNaviagate
  const navigate = useNavigate()


  const { mutate } = useMutation({
    mutationKey: ["jobs"],
    mutationFn: async (job) => {
      return await axios.post("/jobs", job);
    },
    onSuccess: () => {
      toast.success("job posted successfully");
      navigate("/my-jobs")
    },
  });

  console.log(title);
  return (
    <div className="h-fit bg-blue-100 bg-opacity-95">
      {/* helmet */}
      <Helmet>
        <title>Hire Sync | Post Job</title>
      </Helmet>

      <Banner
        bannerImg={postBanner}
        text={"Post a Job"}
        desc={"If opportunity doesn't knock, build a door."}
      ></Banner>
      <div>
        <PostForm
          text={"Post a job"}
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
          mutate={mutate } 
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

export default PostJob;
