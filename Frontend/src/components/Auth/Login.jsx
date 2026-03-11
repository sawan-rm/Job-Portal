import NavBar from "../shared/NavBar";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const chageEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
  };
  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center max-w-7xl mx-auto m-10">
        <form onSubmit={SubmitHandler} className="w-1/3 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-6">
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
          </div>
          <Button
            type="submit"
            className="w-full my-4 bg-black text-white hover:opacity-80"
          >
            Login
          </Button>
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
