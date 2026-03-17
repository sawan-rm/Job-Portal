import React from "react";
import NavBar from "./shared/NavBar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

const skills = ["HTML", "CSS", "JAVASCRIPT", "REACT"];
const Profile = () => {
  const isResume = true;

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Architecto, aliquid? Nobis, itaque!
              </p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 text-sm my-2">
            <Mail />
            <span>User@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm my-2">
            <Contact />
            <span>+91 **********</span>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="font-semibold mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2 ">
            {skills.length !== 0 ? (
              skills.map((item, index) => (
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
            <a target="blank" href="https://youtube.com/" className="text-blue-500 w-full hover:underline cursor-pointer">
              Youtube
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
          <h1>Application Jobs</h1>
        </div>
      </div>
    </div>
  );
};
// 6:16
export default Profile;
