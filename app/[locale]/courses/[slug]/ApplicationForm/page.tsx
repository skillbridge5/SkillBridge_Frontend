'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import { courses } from "@/lib/course-data";

const ApplicationForm = () => {
  const router = useRouter();
  const params = useParams();
  const slug = decodeURIComponent(params.slug as string);

  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    loggedIn: true,
  };

  const course = courses.find((c) => c.slug === slug);
  const coursePrice = course?.discount ?? 0;

  const [step, setStep] = useState<1 | 2>(1);

  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    nationality: "",
    email: "",
    phone: "",
    telegram: "",
    course: slug,
    paymentMethod: "",
    paymentOption: "",
    receipt: null as File | null,
    transactionId: "",
    referral: "",
    agreeTerms: false,
    confirmAccuracy: false,
  });

  useEffect(() => {
    if (mockUser.loggedIn) {
      setForm((prev) => ({
        ...prev,
        name: mockUser.name,
        email: mockUser.email,
        course: slug,
      }));
    }
  }, [slug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (type === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).files?.[0] || null,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = [
      "name", "email", "phone", "telegram", "course", "paymentMethod", "paymentOption"
    ];
    for (const field of requiredFields) {
      if (!form[field as keyof typeof form]) {
        alert(`Please fill in: ${field}`);
        return;
      }
    }
    if (!form.receipt) {
      alert("Please upload a receipt.");
      return;
    }
    if (!form.agreeTerms || !form.confirmAccuracy) {
      alert("You must agree to the terms and confirm accuracy.");
      return;
    }

    alert("Application Submitted!");
    console.log(form);
  };

  const handleReset = () => {
    router.back();
  };

  const paymentOptions = {
    telebirr: "to: Ibrahim Ghazali\n0960171717",
    cbe: "to: Ibrahim Ghazali\n100041753914",
    boa: "to: Ibrahim Ghazali\nXXXXXXXXXXX",
    awash: "to: Ibrahim Ghazali\nXXXXXXXXXXX",
  };

  const isStepOneValid =
    form.name &&
    form.email &&
    form.phone &&
    form.telegram;

  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-[#eaf4ff] p-10 rounded-xl shadow-lg border relative">
        <button
          onClick={() => (step === 1 ? router.back() : setStep(1))}
          className="absolute left-6 top-6 flex items-center text-blue-700 hover:text-blue-900"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </button>

        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8">Application Form</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <>
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">User Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name*</label>
                  <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nationality</label>
                  <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="Ethiopian" className="w-full p-3 border rounded-md shadow-sm bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address*</label>
                  <input name="email" value={form.email} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number*</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+251 9XX XXX XXX" className="w-full p-3 border rounded-md shadow-sm bg-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Telegram Handle*</label>
                  <input name="telegram" value={form.telegram} onChange={handleChange} placeholder="@username" className="w-full p-3 border rounded-md shadow-sm bg-white" />
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!isStepOneValid}
                  className={`px-6 py-2 rounded text-white transition ${isStepOneValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Billing / Service Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Selected Course*</label>
                  <input name="course" value={form.course} readOnly className="w-full p-3 border rounded-md bg-gray-100 shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Course Price</label>
                  <input value={`$${coursePrice}`} readOnly className="w-full p-3 border rounded-md bg-gray-100 shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Payment Method*</label>
                  <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white">
                    <option value="">Select method</option>
                    <option value="telebirr">Telebirr</option>
                    <option value="cbe">CBE</option>
                    <option value="boa">Bank of Abyssinia</option>
                    <option value="awash">Awash Bank</option>
                  </select>
                  {form.paymentMethod && (
                    <p className="mt-2 text-sm whitespace-pre-line text-gray-700 bg-white border p-3 rounded shadow-sm">
                      {paymentOptions[form.paymentMethod as keyof typeof paymentOptions]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Payment Option*</label>
                  <select name="paymentOption" value={form.paymentOption} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white">
                    <option value="">Select</option>
                    <option value="one-time">One-time</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Upload Receipt*</label>
                  <div className="flex items-center gap-4 flex-wrap">
                    <label
                      htmlFor="receipt"
                      className="cursor-pointer flex items-center gap-2 bg-blue-50 hover:bg-blue-100 p-3 rounded border border-blue-300 w-fit"
                    >
                      <Upload className="text-blue-700" size={20} />
                      <span className="text-sm text-blue-700">Choose File</span>
                    </label>
                    <input
                      id="receipt"
                      type="file"
                      name="receipt"
                      onChange={handleChange}
                      className="hidden"
                      accept="image/*,application/pdf"
                    />
                    {form.receipt && (
                      <div className="flex items-center bg-white border px-3 py-2 rounded shadow-sm max-w-xs">
                        <a
                          href={URL.createObjectURL(form.receipt)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-700 underline truncate max-w-[90%]"
                          title="Click to preview file"
                        >
                          {form.receipt.name}
                        </a>
                        <button
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, receipt: null }))}
                          className="text-red-600 ml-2 hover:text-red-800"
                          title="Remove file"
                        >
                          ❌
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Transaction ID (optional)</label>
                  <input name="transactionId" value={form.transactionId} onChange={handleChange} placeholder="Transaction ref" className="w-full p-3 border rounded-md shadow-sm bg-white" />
                </div>
              </div>

              <label className="block text-sm font-medium mt-6 mb-1">How did you hear about us?</label>
              <select name="referral" value={form.referral} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white">
                <option value="">Choose</option>
                <option value="facebook">Facebook</option>
                <option value="telegram">Telegram</option>
                <option value="friend">Friend</option>
                <option value="search">Google Search</option>
              </select>

              <div className="space-y-2 mt-4">
                <label className="flex items-start gap-2">
                  <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} className="mt-1" />
                  <span className="text-sm">
                    I agree to the <a className="text-blue-600 underline" href="#">Terms</a> and Privacy Policy.
                  </span>
                </label>
                <label className="flex items-start gap-2">
                  <input type="checkbox" name="confirmAccuracy" checked={form.confirmAccuracy} onChange={handleChange} className="mt-1" />
                  <span className="text-sm">I confirm the information is accurate.</span>
                </label>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-between mt-6">
                <button type="button" onClick={handleReset} className="w-full md:w-1/2 bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition">
                  Reset Form
                </button>
                <button type="submit" className="w-full md:w-1/2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                  Submit Application
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
