import React, { useState } from "react";
import NavBar from "../shared/NavBar";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { COMPANY_API_END_POINT } from "@/Utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setcompanyName] = useState();
  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if(res?.data?.success){
            dispatch(setSingleCompany(res.data.company));
            toast.success(res.data.message);
            const companyId = res?.data?.company?._id
            navigate(`/admin/companies/${companyId}`)
        }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />

      <div className="max-w-4xl mx-auto px-4">
        <div className="my-10">
          <h1 className="text-2xl font-semibold text-gray-900">
            Your Company Name
          </h1>
          <p className="text-gray-500 mt-2">
            What would you like to give your company name? you can change this
            later
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <Label className="text-gray-700">Company Name</Label>

          <Input
            type="text"
            className="my-3 focus-visible:ring-2 focus-visible:ring-gray-400 transition"
            placeholder="Google, Microsoft, etc."
            onChange={(e) => setcompanyName(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              className="cursor-pointer border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition-all duration-200 ease-out rounded-xl px-5 py-2"
            >
              Cancel
            </Button>

            <Button
              onClick={registerNewCompany}
              className="cursor-pointer bg-gradient-to-r from-black to-gray-800 text-white shadow-md hover:shadow-xl transition-all duration-200 ease-out hover:scale-105 active:scale-95 active:opacity-80 rounded-xl px-6 py-2"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
