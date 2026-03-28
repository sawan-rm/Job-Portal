import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

const AppliedJobTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>List of your applied jobs</TableCaption>

                {/* FIXED PART */}
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {[1, 2, 3, 4].map((item, index) => (
                        <TableRow key={index}
                        className="transition-colors duration-200 hover:bg-gray-200"
                        >
                            <TableCell>19-03-2026</TableCell>
                            <TableCell>Frontend Developer</TableCell>
                            <TableCell>Google</TableCell>
                            <TableCell className="text-right">
                                <Badge className="bg-green-500 text-white hover:bg-green-600 rounded-md ">
                                    Selected
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;