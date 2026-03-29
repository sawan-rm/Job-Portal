import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { AvatarImage, Avatar } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/Utils/constant";
import { setUser } from "@/redux/authSlice";

const NavBar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("Redux User:", user);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-lg">
            Job <span className="text-orange-500">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role == "Recruiter" ? (
              <>
                <li className="cursor-pointer hover:text-orange-600 transition-colors duration-200">
                  <Link to="/admin/Companies">Companies</Link>
                </li>
                <li className="cursor-pointer hover:text-orange-600 transition-colors duration-200">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="cursor-pointer hover:text-orange-600 transition-colors duration-200">
                  <Link to="/">Home</Link>
                </li>
                <li className="cursor-pointer hover:text-orange-600 transition-colors duration-200">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="cursor-pointer hover:text-orange-600 transition-colors duration-200">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-gray-100"
                >
                  Login
                </Button>
              </Link>
              <Link to="/SignUp">
                <Button className="bg-orange-500 text-white hover:bg-orange-600 transition duration-200">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer rounded-full hover:scale-105 transition">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "/default-avatar.png"}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-orange-50 shadow-lg border-0 p-4">
                <div className="">
                  <div className="flex gap-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto || "/default-avatar.png"
                        }
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div className="flex flex-col">
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role == "student" && (
                      <div className="flex w-fit my-1 items-center gap-2 cursor-pointer">
                        <User2 size={17} />
                        <Button variant="link">
                          <Link to="/profile">View profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit my-1 items-center gap-2 cursor-pointer">
                      <LogOut size={17} />
                      <Button onClick={logoutHandler} variant="link">
                        LogOut
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
// 7:46
