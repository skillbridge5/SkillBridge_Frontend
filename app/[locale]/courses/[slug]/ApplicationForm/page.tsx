'use client';


import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const ApplicationForm = () => {
  const t = useTranslations('applicationForm')
  const f = t.raw('fields')
  const pathname = usePathname()
  const slug = decodeURIComponent(pathname.split('/').slice(-2, -1)[0])
  const router = useRouter()
// import { ArrowLeft, Upload } from "lucide-react";
// import { courses } from "@/lib/course-data";

// const ApplicationForm = () => {
//   const router = useRouter();
//   const params = useParams();
//   const slug = decodeURIComponent(params.slug as string);

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
        alert(`${t('alert.required')}${field}`)
        return;
<!--         alert(`Please fill in: ${field}`);
        return; -->
      }
    }
    if (!form.receipt) {
      alert("Please upload a receipt.");
      return;
    }
    if (!form.agreeTerms || !form.confirmAccuracy) {
      alert(t('alert.terms'))
      return
    }

    console.log(form)
    alert(t('alert.success'))
  }
<!--       alert("You must agree to the terms and confirm accuracy.");
      return;
    }

    alert("Application Submitted!");
    console.log(form);
  }; -->


  const handleReset = () => {
    router.back();
  };

  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-[#eaf4ff] p-10 rounded-xl shadow-lg border">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8">{t('title')}</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{t('userInfo')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">{f.name.label}</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder={f.name.placeholder} className="w-full p-3 border rounded-md shadow-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{f.dob.label}</label>
                <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{f.gender.label}</label>
                <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white">
                  <option value="">Select</option>
                  <option value="Male">{f.gender.options.male}</option>
                  <option value="Female">{f.gender.options.female}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{f.nationality.label}</label>
                <input name="nationality" value={form.nationality} onChange={handleChange} placeholder={f.nationality.placeholder} className="w-full p-3 border rounded-md shadow-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{f.email.label}</label>
                <input name="email" value={form.email} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{f.phone.label}</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder={f.phone.placeholder} className="w-full p-3 border rounded-md shadow-sm bg-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">{f.telegram.label}</label>
                <input name="telegram" value={form.telegram} onChange={handleChange} placeholder={f.telegram.placeholder} className="w-full p-3 border rounded-md shadow-sm bg-white" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{t('billingInfo')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">{f.course.label}</label>
                <input name="course" value={form.course} readOnly className="w-full p-3 border rounded-md bg-gray-100 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{f.paymentMethod.label}</label>
                <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white">
                  <option value="">Select payment method</option>
                  <option value="telebirr">{f.paymentMethod.options.telebirr}</option>
                  <option value="cbe">{f.paymentMethod.options.cbe}</option>
                  <option value="boa">{f.paymentMethod.options.boa}</option>
                  <option value="awash">{f.paymentMethod.options.awash}</option>
                </select>
                {form.paymentMethod && (
                  <p className="mt-2 text-sm text-gray-700 whitespace-pre-line bg-white border p-3 rounded shadow-sm">
                    {f.paymentMethod.details[form.paymentMethod as keyof typeof f.paymentMethod.details]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{f.paymentOption.label}</label>
                <select name="paymentOption" value={form.paymentOption} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white">
                  <option value="">Select</option>
                  <option value="one-time">{f.paymentOption.options["one-time"]}</option>
                  <option value="monthly">{f.paymentOption.options.monthly}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{f.receipt.label}</label>
                <input type="file" name="receipt" onChange={handleChange} className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{f.transactionId.label}</label>
                <input name="transactionId" value={form.transactionId} onChange={handleChange} placeholder={f.transactionId.placeholder} className="w-full p-3 border rounded-md shadow-sm bg-white" />
              </div>
            </div>

            <label className="block text-sm font-medium mb-1 mt-6">{f.referral.label}</label>
            <select name="referral" value={form.referral} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white">
              <option value="">Choose</option>
              <option value="facebook">{f.referral.options.facebook}</option>
              <option value="telegram">{f.referral.options.telegram}</option>
              <option value="friend">{f.referral.options.friend}</option>
              <option value="search">{f.referral.options.search}</option>
            </select>

            <div className="space-y-2 mt-4">
              <label className="flex items-start gap-2">
                <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} className="mt-1" />
                <span className="text-sm">{f.agreeTerms}</span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" name="confirmAccuracy" checked={form.confirmAccuracy} onChange={handleChange} className="mt-1" />
                <span className="text-sm">{f.confirmAccuracy}</span>
              </label>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button type="button" onClick={handleReset} className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400">{t('reset')}</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">{t('submit')}</button>
          </div>
<!--   const paymentOptions = {
    telebirr: "to: Ibrahim Ghazali\n0960171717",
    cbe: "to: Ibrahim Ghazali\n100041753914",
    boa: "to: Ibrahim Ghazali\nXXXXXXXXXXX",
    awash: "to: Ibrahim Ghazali\nXXXXXXXXXXX",
  };

  const isStepOneValid =
    form.name &&
    form.email &&
    form.phone &&
    form.telegram; -->

  
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
