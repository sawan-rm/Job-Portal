import { Variable } from "lucide-react";
import { Badge } from "./ui/badge";
import React from "react";

const latestJobCards = ({ job }) => {
    return (
        <div
            className="p-5 rounded-xl bg-white border border-gray-100 cursor-pointer
            transition-all duration-300 ease-out
            hover:shadow-md hover:-translate-y-1 hover:scale-[1.01]"
        >
            <div>
                <h1 className="font-medium text-lg text-gray-800">
                    {job?.company?.name}
                </h1>
                <p className="text-sm text-gray-500">India</p>
            </div>

            <div>
                <h1 className="font-semibold text-lg my-2 text-gray-900 transition-colors duration-200 hover:text-gray-700">
                    {job?.title}
                </h1>
                <p className="text-sm text-gray-600 line-clamp-2">
                    {job?.description}
                </p>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <Badge className="bg-blue-50 text-blue-700 font-medium px-3 py-1 rounded-full">
                    {job?.position}
                </Badge>

                <Badge className="bg-orange-50 text-orange-600 font-medium px-3 py-1 rounded-full">
                    {job?.jobType}
                </Badge>

                <Badge className="bg-green-50 text-green-700 font-medium px-3 py-1 rounded-full">
                    {job?.salary}
                </Badge>
            </div>
        </div>
    );
};

export default latestJobCards;