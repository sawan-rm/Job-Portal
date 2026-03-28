import React, { useState } from "react";
import NavBar from "./shared/NavBar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const isResume = true;

const Profile = () => {
  const [open, setopen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  // console.log(user?.profile?.resume);

  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto || "/default-avatar.png"} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setopen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 text-sm my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm my-2">
            <Contact />            
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="font-semibold mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2 ">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-orange-100 text-orange-600 rounded-full"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              href={`https://docs.google.com/gview?url=${encodeURIComponent(user?.profile?.resume)}&embedded=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Application Jobs</h1>
        {/* Applied Table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setopen={setopen} />
    </div>
  );
};
export default Profile;
