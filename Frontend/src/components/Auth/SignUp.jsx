import NavBar from "../shared/NavBar";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const SignUp = () => {
  const [input, setinput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();

  const chageEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const chageFileHandler = (e) => {
    setinput({ ...input, file: e.target.file?.[0] });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formData  = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("password", input.password);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if(input.file){
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(`{USER_API_END_POINT}/register`, formData, {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
      });
      if(res.data.success){
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Inrernal server Error: ", error);
    }
  };
  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-1/2 border border-gray-200 rounded-md p-4 m-5"
          onSubmit={SubmitHandler}
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-1">
            <Label htmlFor="name" className="m-2">
              Full Name
            </Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={chageEventHandler}
              id="name"
              placeholder="User"
            />
          </div>

          <div className="my-1">
            <Label htmlFor="email" className="m-2">
              Email
            </Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={chageEventHandler}
              id="email"
              placeholder="user@gmail.com"
            />
          </div>

          <div className="my-1">
            <Label htmlFor="phone" className="m-2">
              Phone Number
            </Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={chageEventHandler}
              id="phone"
              placeholder="+91-0000000000"
            />
          </div>

          <div className="my-1">
            <Label htmlFor="password" className="m-2">
              Password
            </Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={chageEventHandler}
              id="password"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={chageEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={chageEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={chageFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full my-4 bg-black text-white hover:opacity-80"
          >
            SignUp
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
//4:21