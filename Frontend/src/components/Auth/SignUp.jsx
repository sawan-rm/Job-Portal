import NavBar from "../shared/NavBar";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/Utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const [input, setinput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
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
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
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
      toast.error(error.response.data.message)
    }finally{
      dispatch(setLoading(false));
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
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={chageEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
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
          {loading ? (
            <Button className="w-full my-4  bg-black text-white hover:opacity-80"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Please Wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-black text-white hover:opacity-80"
            >
              SignUp
            </Button>
          )}
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