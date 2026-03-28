import React, { useEffect, useState } from "react";
import NavBar from "../shared/NavBar";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/Utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/Hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params?.id);
  const [input, setinput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const changefileHandler = (e) => {
    const file = e.target.files?.[0];
    setinput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setloading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    if (singleCompany) {
      setinput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />

      <div className="max-w-xl mx-auto my-10 bg-white p-6 rounded-2xl shadow-md">
        <form onSubmit={submitHandler}>
          {/* Header */}
          <div className="flex items-center gap-5 mb-6">
            <Button
              onClick={() => navigate("/admin/companies")}
              type="button"
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold hover:text-black transition-all duration-200 ease-out hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>

            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                value={input.name}
                name="name"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="text"
                value={input.description}
                name="description"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                type="text"
                value={input.website}
                name="website"
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                value={input.location}
                name="location"
                onChange={changeEventHandler}
              />
            </div>

            <div className="col-span-2">
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changefileHandler}
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button
              disabled={loading}
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-black to-gray-800 text-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 active:opacity-80 rounded-xl py-2"
            >
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button
              disabled={loading}
              type="submit"
              className="w-full my-4 bg-black text-white hover:opacity-80"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
