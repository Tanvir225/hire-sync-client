import { AiOutlineFileAdd } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import useAuth from "../../Hook/useAuth";

const PostForm = ({ text, name, setName, title, setTitle, photo, setPhoto, salary, setSalary, exp, setExp, category, setCategory, categories, keyword, setKeyword, appDeadline, setappDeadline, description, setDescription, mutate }) => {

    //useAuth hooks
    const { user } = useAuth()
    const userName = user?.displayName;
    const email = user?.email;

    //application date
    const applyDate = new Date()
    //applicantNumber
    const applicantNumber = 0


    return (
        <div className="max-w-6xl mt-16 mx-auto border-2 p-5 ">
            <h3 className="text-3xl border-b-2 font-bold text-blue-600">
                {text}!
            </h3>
            <form className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={user?.displayName}
                        readOnly
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
                        readOnly
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
                        onChange={(e) => setName(e.target.value)}
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
                        required
                        onChange={(date) => setappDeadline(date)}
                    />
                </div>

                <div className="form-control col-span-full">
                    <label className="label">
                        <span className="label-text"> Job Description</span>
                    </label>
                    <textarea
                        required
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
    );
};

export default PostForm;