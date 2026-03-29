import React, { useEffect, useState } from "react";
import NavBar from "../shared/NavBar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/Hooks/useGetAllAdminJobs";
import { setsearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setinput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setsearchJobByText(input));
  }, [input, dispatch]);
  return (
    <div>
      <NavBar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setinput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-gradient-to-r from-black to-gray-800 text-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 active:opacity-80 rounded-xl px-5 py-2"
          >
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
