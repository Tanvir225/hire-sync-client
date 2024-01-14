import { useState } from "react";
import Banner from "../../Components/Header/Banner/Banner";
import postBanner from "../../assets/images/postBanner.jpg"
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {AiOutlineFileAdd} from "react-icons/ai"
import { Helmet } from "react-helmet-async";


const PostJob = () => {

    //state
    const [startDate, setStartDate] = useState(new Date());

    //handleSubmit
    const handleSubmit = (event)=>{
        event.preventDefault()
        const forms = event.target
        const title = forms.title.value
        const photo = forms.photo.value
        const salary = forms.salary.value
        const keyword = forms.keyword.value
        const description = forms.description.value
        console.log(title,photo,salary,keyword,description);
    }


    return (
        <div className="h-screen bg-base-100 bg-opacity-70">

            {/* helmet */}
            <Helmet>
                <title>Hire Sync | Post Job</title>
            </Helmet>

            <Banner bannerImg={postBanner} text={"Post a Job"} desc={"If opportunity doesn't knock, build a door."}></Banner>
            <div className="max-w-6xl mt-16 mx-auto border-2 p-5 ">
                <h3 className="text-3xl border-b-2 font-bold text-blue-600">Post a Job!</h3>
                <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" defaultValue={"Tanvir"} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" defaultValue={"t@gmail.com"} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Job title</span>
                        </label>
                        <input type="text" placeholder="ex:Sr Software Engg" className="input input-bordered" name="title" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Company Image URL</span>
                        </label>
                        <input type="text" name="photo" className="input input-bordered" required />
                    </div>

                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Salary Range</span>
                        </label>
                        <input type="text" placeholder="ex : 10000 - 15000 $" className="input input-bordered" name="salary" required />
                    </div>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Select  category</span>
                        </label>
                        <select required name="" id="" className="border-2 w-full rounded-lg input input-bordered">
                            <option value="" >Hybrid</option>
                            <option value="" >Part Time</option>
                            <option value="" >Full Time</option>
                            <option value="" >Remote</option>
                        </select>
                    </div>

                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Keyword <span className="text-red-600">(*don't use comma and take spaces)</span></span>
                        </label>
                        <input type="text" name="keyword" placeholder="ex : c++ python marketing" className="input input-bordered" required />
                    </div>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Application Deadline </span>
                        </label>
                        <DatePicker  className="w-full input input-bordered" selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>

                    <div className="form-control col-span-full">
                        <label className="label">
                            <span className="label-text"> Job Description</span>
                        </label>
                       <textarea name="description" className="border-2 p-5 rounded-lg" placeholder="description goes here..." rows={5} cols={12}></textarea>
                    </div>

                    <div className="text-center col-span-full">
                        <button className="btn btn-outline w-full lg:w-72 text-blue-600"><AiOutlineFileAdd className="text-2xl"></AiOutlineFileAdd> Post a job</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;