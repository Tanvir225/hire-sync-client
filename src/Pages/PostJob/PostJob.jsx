import { useState } from "react";
import Banner from "../../Components/Header/Banner/Banner";
import postBanner from "../../assets/images/postBanner.jpg";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import toast from "react-hot-toast";

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

  //application date
  const applyDate = new Date()


  //applicantNumber
  const applicantNumber = 0

  //loader data
  const categories = useLoaderData();
  console.log(categories);

  //useAuth hooks
  const { user } = useAuth();
  const userName = user?.displayName;
  const email = user?.email;

  //useAxios hooks
  const axios = useAxios();



  //handleSubmit
  // const handleSubmit = (event)=>{
  //     event.preventDefault()
  //     const forms = event.target
  //     const title = forms.title.value
  //     const photo = forms.photo.value
  //     const salary = forms.salary.value
  //     const keyword = forms.keyword.value
  //     const description = forms.description.value
  //     console.log(title,photo,salary,keyword,description);
  // }

  const { mutate } = useMutation({
    mutationKey: ["jobs"],
    mutationFn: async (job) => {
      return await axios.post("/jobs", job);
    },
    onSuccess: () => {
      setCategory("");
      setDescription("");
      setTitle("");
      setKeyword("");
      setPhoto("");
      setSalary("");
      toast.success("job posted successfully");
    },
  });

  console.log(title);
  return (
    <div className="h-screen bg-base-100 bg-opacity-70">
      {/* helmet */}
      <Helmet>
        <title>Hire Sync | Post Job</title>
      </Helmet>

      <Banner
        bannerImg={postBanner}
        text={"Post a Job"}
        desc={"If opportunity doesn't knock, build a door."}
      ></Banner>
      <div className="max-w-6xl mt-16 mx-auto border-2 p-5 ">
        <h3 className="text-3xl border-b-2 font-bold text-blue-600">
          Post a Job!
        </h3>
        <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              defaultValue={user?.email}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Company Name</span>
            </label>
            <input
              type="text"
              onChange={(e)=> setName(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Job title</span>
            </label>
            <input
              type="text"
              placeholder="ex:Sr Software Engg"
              className="input input-bordered"
              onBlur={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Company logo URL</span>
            </label>
            <input
              type="text"
              onBlur={(e) => setPhoto(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
         

          <div className="form-control ">
            <label className="label">
              <span className="label-text">Salary Range</span>
            </label>
            <input
              type="text"
              placeholder="ex : 10000 - 15000 $"
              className="input input-bordered"
              onBlur={(e) => setSalary(e.target.value)}
              required
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Minimum Experience<span className="text-red-500">(* years)</span></span>
            </label>
            <input
              type="number"
              placeholder="ex : 2"
              className="input input-bordered"
              onBlur={(e) => setExp(e.target.value)}
              required
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Select category</span>
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-2 w-full rounded-lg input input-bordered"
            >
              {categories.map((cat) => (
                <option value={cat.name} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control ">
            <label className="label">
              <span className="label-text">
                Keyword{" "}
                <span className="text-red-600">
                  (*don't use comma and take spaces)
                </span>
              </span>
            </label>
            <input
              type="text"
              onBlur={(e) => setKeyword(e.target.value)}
              placeholder="ex : c++ python marketing"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Application Deadline </span>
            </label>
            <DatePicker
              className="w-full input input-bordered"
              selected={appDeadline}
              onChange={(date) => setappDeadline(date)}
            />
          </div>

          <div className="form-control col-span-full">
            <label className="label">
              <span className="label-text"> Job Description</span>
            </label>
            <textarea
              onBlur={(e) => setDescription(e.target.value)}
              className="border-2 p-5 rounded-lg"
              placeholder="description goes here..."
              rows={5}
              cols={12}
            ></textarea>
          </div>

          <div className="text-center col-span-full">
            <button
              type="button"
              onClick={() =>
                mutate({
                  userName,
                  email,
                  name,
                  title,
                  photo,
                  category,
                  salary,
                  exp,
                  keyword,
                  description,
                  applyDate,
                  appDeadline,
                  applicantNumber
                })
              }
              className="btn btn-outline w-full lg:w-72 text-blue-600"
            >
              <AiOutlineFileAdd className="text-2xl"></AiOutlineFileAdd> Post a
              job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
