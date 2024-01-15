import { AiOutlineClockCircle, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { formatDistance } from 'date-fns';
import { Link } from "react-router-dom";
import useAxios from "../../Hook/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import swal from "sweetalert";


const PostedJobCard = ({ job }) => {

  //queryClient
  const queryClient = useQueryClient()

  //useAxios
  const axios = useAxios()
  //destructure obj
  const { title, photo, category, applyDate, name, salary } = job || {};

  //timeStamp
  const timeStamp = formatDistance(new Date(applyDate), new Date(), { addSuffix: true })
  //console.log(timeStamp);

  //tenstack query mutation for delete
  const { mutate } = useMutation({
    mutationKey: ["jobs"],
    mutationFn: async (id) => {
      return await axios.delete(`/jobs/delete/${id}`);
    },
    onSuccess: () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this job!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
            queryClient.invalidateQueries({queryKey:["jobs"]})
          } 
        });
    }
  })


  return (
    <div className="bg-base-100 flex flex-col md:flex-row  p-5 items-center shadow-xl rounded-lg space-y-5 md:space-y-0 mt-5">
      <div className="flex items-center flex-1  gap-5">
        <div className="w-24 rounded">
          <img src={photo} alt={title} />
        </div>
        <h2 className="text-xl flex-1 font-bold">{title}</h2>
      </div>

      <div className="flex flex-1 justify-between items-center gap-16">
        <div className="flex flex-col items-center  gap-2">
          <p className="w-24 text-blue-600 font-semibold border p-1 text-center bg-blue-100 rounded-lg">{category}</p>
          <p className="flex items-center gap-2 text-gray-500 font-semibold"><AiOutlineClockCircle className="text-gray-600 text-lg"></AiOutlineClockCircle>{timeStamp}</p>
        </div>
        <div className="flex flex-1 flex-col  items-center  gap-2">
          <p className="w-28 text-white font-semibold border p-1 text-center bg-blue-600 rounded-lg">{name}</p>
          <p className="flex items-center gap-2 font-semibold text-gray-700">{salary} $/mo</p>
        </div>
      </div>
      <div className="flex items-center justify-between lg:justify-center gap-48 md:gap-4">
        <Link to={`/update-job/${job._id}`} className="btn btn-outline btn-sm text-white bg-green-600 text-xl  font-semibold"><AiOutlineEdit></AiOutlineEdit></Link>
        <button onClick={() => mutate(job._id)} className="btn btn-outline btn-sm text-white bg-red-600 text-xl  font-semibold"><AiOutlineDelete></AiOutlineDelete></button>
      </div>

      <div>

      </div>
    </div>
  );
};

export default PostedJobCard;
