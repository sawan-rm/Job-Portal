import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
// import store from "@/redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "@/Utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setopen }) => {
  const [loading, setloading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setinput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // setloading(true);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setloading(true);
      const res = await axios.put(
        `${USER_API_END_POINT}/updateProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        if (res.data.user) {
          dispatch(setUser(res.data.user));
        }
        toast.success(res.data.message);
        // setopen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setopen(false);
      // console.log(input);
    }
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setinput({ ...input, file });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setopen}>
        <DialogContent
          className="sm:max-w-[425px] bg-white"
          onInteractOutside={() => setopen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>
              Update your personal information, skills, and resume.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="name">
                  Name
                </Label>
                <Input
                  value={input.fullname}
                  onChange={changeEventHandler}
                  id="name"
                  type="text"
                  name="fullname"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="email">
                  Email
                </Label>
                <Input
                  value={input.email}
                  onChange={changeEventHandler}
                  type="email"
                  id="email"
                  name="email"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="number">
                  Number
                </Label>
                <Input
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  id="number"
                  name="phoneNumber"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="bio">
                  Bio
                </Label>
                <Input
                  value={input.bio}
                  onChange={changeEventHandler}
                  id="bio"
                  name="bio"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="skills">
                  Skills
                </Label>
                <Input
                  value={input.skills}
                  onChange={changeEventHandler}
                  id="skills"
                  name="skills"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="file">
                  Resume
                </Label>
                <Input
                  id="file"
                  onChange={fileChangeHandler}
                  name="file"
                  type="file"
                  accept="application/pdf"
                  className="col-span-3 cursor-pointer"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4  bg-black text-white hover:opacity-80">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-black text-white hover:opacity-80"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
// 7:9
export default UpdateProfileDialog;
