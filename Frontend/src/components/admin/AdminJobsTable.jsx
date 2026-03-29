import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setfilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    if (!allAdminJobs) return;

    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      const search = searchJobByText.toLowerCase();

      return (
        job?.title?.toLowerCase().includes(search) ||
        job?.company?.name?.toLowerCase().includes(search)
      );
    });

    setfilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <Table>
        <TableCaption className="text-gray-500">
          A list of your recent posted jobs companies
        </TableCaption>

        {/* HEADER */}
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {!allAdminJobs || allAdminJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                You haven't added any company yet.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id} className="hover:bg-gray-50 transition">
                <TableCell className="font-mono">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="font-mono">{job?.title}</TableCell>

                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>

                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32 p-2">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded transition"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default AdminJobsTable;
