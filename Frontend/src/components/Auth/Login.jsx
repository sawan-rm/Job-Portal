import NavBar from "../shared/NavBar";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/Utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader, Loader2 } from "lucide-react";

const Login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const chageEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.message));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Inrernal server Error: ", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center max-w-7xl mx-auto m-10">
        <form
          onSubmit={SubmitHandler}
          className="w-1/3 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-6">
            <Label htmlFor="email" className="m-2">
              Email
            </Label>
            <input
              type="email"
              value={input.email}
              name="email"
              onChange={chageEventHandler}
              id="email"
className="w-full mt-1 px-1 py-2 border-b border-gray-300 focus:outline-none focus:border-black"              placeholder="user@gmail.com"
            />
          </div>

          <div className="my-1">
            <Label htmlFor="password" className="m-2">
              Password
            </Label>
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={chageEventHandler}
              id="password"
              className="w-full mt-1 px-1 py-2 border-b border-gray-300 focus:outline-none focus:border-black"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <input
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
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/SignUp" className="text-blue-600">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
