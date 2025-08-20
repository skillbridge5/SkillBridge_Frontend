"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  UploadCloud,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ArrowDown,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { Navbar } from "@/app/[locale]/components/navbar";
import Footer from "@/app/[locale]/components/footer";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

const ApplicationForm = () => {
  const t = useTranslations("applicationForm");
  const f = t.raw("fields");
  const pathname = usePathname();
  const slug = decodeURIComponent(pathname.split("/").slice(-2, -1)[0]);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    email: "",
    phone: "",
    telegramHandle: "",
    university: "",
    address: "",
    courseId: slug ? slug : "",
    paymentMethod: "",
    paymentOption: "",
    receipt: null as File | null,
    paymentReference: "",
    marketingSource: "",
    agreeTerms: false,
    confirmAccuracy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coursePrice, setCoursePrice] = useState<number | null>(null);
  const [courseName, setCourseName] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUserString = sessionStorage.getItem("currentUser");
      if (currentUserString) {
        try {
          const currentUser = JSON.parse(currentUserString);
          setForm((prev) => ({
            ...prev,
            fullName: currentUser.name || prev.fullName,
            email: currentUser.email || prev.email,
          }));
        } catch (error) {
          console.error(
            "Failed to parse currentUser from sessionStorage:",
            error
          );
        }
      }
    }
  }, []);
  useEffect(() => {
    const fetchCourseDetailsBySlug = async () => {
      if (!slug || !API_BASE_URL) return;

      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        toast.error(
          "Authentication required to load course details. Please log in."
        );
        setCoursePrice(null);
        return;
      }

      try {
        console.log("Attempting to fetch all courses for URL slug:", slug);
        const response = await fetch(`${API_BASE_URL}/courses`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          let errorMessage = "Failed to fetch all courses.";
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {
            errorMessage = `Failed to fetch all courses: ${response.status} ${response.statusText}`;
          }

          if (response.status === 401) {
            toast.error(
              `Session expired or unauthorized: ${errorMessage}. Please log in again.`
            );
          } else {
            toast.error(errorMessage);
          }
          throw new Error(errorMessage);
        }

        const allCourses = await response.json();
        console.log("Fetched all courses:", allCourses);

        let foundCourse = null;
        for (const course of allCourses) {
          const generatedSlug = slugify(course.id);
          console.log(
            `Comparing URL slug "${slug}" with generated slug "${generatedSlug}" from title "${course.title}"`
          );
          if (generatedSlug === slug) {
            foundCourse = course;
            break;
          }
        }

        if (foundCourse) {
          const priceToUse =
            foundCourse.priceDiscounted > 0
              ? foundCourse.priceDiscounted
              : foundCourse.priceOriginal;
          setCoursePrice(priceToUse);
          setForm((prev) => ({ ...prev, courseId: foundCourse.id }));
          setCourseName(foundCourse.title);
          console.log(
            `Course found! ID: ${foundCourse.id}, Price: ${priceToUse}`
          );
        } else {
          toast.error(
            `Course with slug "${slug}" not found. Please ensure the course exists.`
          );
          setCoursePrice(null);
          setForm((prev) => ({ ...prev, courseId: "" }));
          console.warn(
            `Course with slug "${slug}" not found in fetched courses.`
          );
        }
      } catch (error: any) {
        console.error("Error fetching course details by slug:", error);
        toast.error(
          error.message ||
            "An unexpected error occurred while loading course details."
        );
      }
    };
    fetchCourseDetailsBySlug();
  }, [slug, API_BASE_URL]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep1 = () => {
    const errors: string[] = [];

    if (!form.fullName) errors.push("Full Name is required.");
    if (!form.email) errors.push("Email Address is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.push("Invalid Email Address.");
    if (!form.phone) errors.push("Phone Number is required.");
    if (!form.telegramHandle) errors.push("Telegram Handle is required.");
    if (!form.university) errors.push("University is required.");
    if (!form.address) errors.push("Address is required.");
    if (!form.dateOfBirth) errors.push("Date of Birth is required.");
    if (!form.gender) errors.push("Gender is required.");

    if (errors.length > 0) {
      toast.error(errors.join(" "));
      return false;
    }
    return true;
  };
  const validateStep2 = () => {
    const errors: string[] = [];

    if (!form.courseId) errors.push("Course is not selected.");
    if (!form.paymentMethod) errors.push("Payment Method is required.");
    if (!form.paymentOption) errors.push("Payment Option is required.");
    if (!form.paymentReference)
      errors.push("Payment Reference (Transaction ID) is required.");
    if (form.paymentMethod !== "cash" && !form.receipt)
      errors.push(
        'Payment Receipt is required for the selected method. If paying cash, select "Cash Payment".'
      );

    if (!form.agreeTerms)
      errors.push("You must agree to the Terms and Conditions.");
    if (!form.confirmAccuracy)
      errors.push("You must confirm the accuracy of the information.");

    if (errors.length > 0) {
      toast.error(errors.join(" "));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) {
      return;
    }

     // Store course data before submission
  if (form.courseId && courseName) {
    const basicCourseInfo = {
      id: form.courseId,
      title: courseName,
      price: coursePrice,
      // Add other basic info you want to preserve
    };
    
    sessionStorage.setItem('lastEnrolledCourse', JSON.stringify(basicCourseInfo));
    localStorage.setItem(`course-${form.courseId}`, JSON.stringify(basicCourseInfo));
  }
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("courseId", form.courseId);
      formData.append("paymentMethod", form.paymentMethod);
      formData.append("paymentReference", form.paymentReference);
      formData.append("marketingSource", form.marketingSource || "Direct");
      formData.append("fullName", form.fullName);
      if (form.dateOfBirth) {
        formData.append(
          "dateOfBirth",
          new Date(form.dateOfBirth).toISOString()
        );
      }
      if (form.gender) {
        formData.append("gender", form.gender);
      }
      if (form.nationality) {
        formData.append("nationality", form.nationality);
      }
      formData.append("university", form.university);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("telegramHandle", form.telegramHandle);
      formData.append("address", form.address);
      formData.append("paymentOption", form.paymentOption);

      if (form.receipt) {
        formData.append("receipt", form.receipt);
      } else {
        toast.error("Payment receipt is required.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/applications/with-receipt`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          body: formData,
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Application submission failed:", responseData);
        throw new Error(
          responseData.message ||
            "Failed to submit application. Please check your inputs."
        );
      }

      toast.success("Application Submitted Successfully!");
      console.log("Application Process Completed:", responseData);
      handleReset();


      // Redirect with proper parameters
      const params = new URLSearchParams();
      params.set("courseId", form.courseId);
      if (responseData.id) {
        params.set("applicationId", responseData.id);
      }

      router.push(`/applications/success?${params.toString()}`);
    } catch (error: any) {
      console.error("Application submission error:", error);
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      fullName: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      email: "",
      phone: "",
      telegramHandle: "",
      university: "",
      address: "",
      courseId: "",
      paymentMethod: "",
      paymentOption: "",
      receipt: null,
      paymentReference: "",
      marketingSource: "",
      agreeTerms: false,
      confirmAccuracy: false,
    });
    setCourseName("");
    setCurrentStep(1);
  };

  const paymentOptions = {
    telebirr: "to: Ibrahim Ghazali\n0960171717",
    cbe: "to: Ibrahim Ghazali\n100041753914",
    boa: "to: Ibrahim Ghazali\nXXXXXXXXXXX",
    awash: "to: Ibrahim Ghazali\nXXXXXXXXXXX",
    cash: "Pay at our office. No receipt upload required for this method.",
  };

  return (
    <>
      <Navbar />
      <div className='bg-white dark:bg-gray-900 min-h-screen py-10 px-4 transition-colors duration-300'>
        <Toaster position='top-right' reverseOrder={false} />
        <div className='max-w-4xl mx-auto bg-[#eaf4ff] dark:bg-gray-800 p-10 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 relative transition-colors duration-300'>
          {currentStep === 2 && (
            <button
              type='button'
              onClick={handleBack}
              className='absolute top-6 left-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'
              aria-label={t("backButton")}
            >
              <ArrowLeft className='w-6 h-6' />
            </button>
          )}

          <h2 className='text-3xl font-extrabold text-center text-blue-800 dark:text-blue-300 mb-8 mt-4'>
            {t("title")}
          </h2>
          <h4 className='text-center text-blue-800 dark:text-blue-300 mb-8 mt-4'>
            {t("step", { current: currentStep, total: 2 })}
          </h4>

          <form onSubmit={(e) => e.preventDefault()} className='space-y-8'>
            {currentStep === 1 && (
              <div>
                <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2'>
                  {t("userInfo")}
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='fullName'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.name.label")}
                    </label>
                    <input
                      id='fullName'
                      name='fullName'
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder={t("fields.name.placeholder")}
                      className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='dateOfBirth'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.dob.label")}
                    </label>
                    <input
                      type='date'
                      id='dateOfBirth'
                      name='dateOfBirth'
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300'
                    />
                  </div>

                  <div className='relative'>
                    <label
                      htmlFor='gender'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.gender.label")}
                    </label>
                    <select
                      id='gender'
                      name='gender'
                      value={form.gender}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 dark:text-gray-100 appearance-none pr-12 transition-colors duration-300'
                    >
                      <option value=''>{t("select")}</option>
                      <option value='Male'>
                        {t("fields.gender.options.male")}
                      </option>
                      <option value='Female'>
                        {t("fields.gender.options.female")}
                      </option>
                      <option value='Other'>{t("other")}</option>
                    </select>
                    <ArrowDown className='absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 dark:text-gray-500 pointer-events-none w-5 h-5' />
                  </div>
                  <div>
                    <label
                      htmlFor='nationality'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.nationality.label")}
                    </label>
                    <input
                      id='nationality'
                      name='nationality'
                      value={form.nationality}
                      onChange={handleChange}
                      placeholder={t("fields.nationality.placeholder")}
                      className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.email.label")}
                    </label>
                    <input
                      id='email'
                      name='email'
                      value={form.email}
                      onChange={handleChange}
                      placeholder='john.doe@example.com'
                      className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.phone.label")}
                    </label>
                    <input
                      id='phone'
                      name='phone'
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t("fields.phone.placeholder")}
                      className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='telegramHandle'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.telegram.label")}
                    </label>
                    <input
                      id='telegramHandle'
                      name='telegramHandle'
                      value={form.telegramHandle}
                      onChange={handleChange}
                      placeholder={t("fields.telegram.placeholder")}
                      className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='university'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.university.label")}
                    </label>
                    <input
                      id='university'
                      name='university'
                      value={form.university}
                      onChange={handleChange}
                      placeholder='Addis Ababa University'
                      className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300'
                    />
                  </div>
                  <div className='md:col-span-2'>
                    <label
                      htmlFor='address'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.address.label")}
                    </label>
                    <textarea
                      id='address'
                      name='address'
                      value={form.address}
                      onChange={handleChange}
                      placeholder='123 Main St, City, Country'
                      rows={3}
                      className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300'
                    ></textarea>
                  </div>
                </div>
                <div className='flex justify-end mt-6'>
                  <button
                    type='button'
                    onClick={handleNext}
                    className='inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200'
                  >
                    {t("next")} <ArrowRight className='ml-2 w-5 h-5' />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2'>
                  {t("billingInfo")}
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='courseId'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      Selected Course*
                    </label>
                    <input
                      id='courseId'
                      name='courseId'
                      value={courseName || "Loading course..."}
                      readOnly
                      className={`w-full p-3 border rounded-md bg-gray-100 dark:bg-gray-700 shadow-sm dark:text-gray-100 transition-colors duration-300 ${
                        courseName
                          ? "border-green-500 dark:border-green-400"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    />
                    {coursePrice && courseName && (
                      <p className='mt-1 text-sm text-green-600 dark:text-green-400 font-medium'>
                        Price: ${coursePrice}
                      </p>
                    )}
                  </div>
                  <div className='relative'>
                    <label
                      htmlFor='paymentMethod'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.paymentMethod.label")}
                    </label>
                    <select
                      id='paymentMethod'
                      name='paymentMethod'
                      value={form.paymentMethod}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 dark:text-gray-100 appearance-none pr-12 transition-colors duration-300'
                    >
                      <option value=''>{t("selectPaymentMethod")}</option>
                      <option value='telebirr'>
                        {t("fields.paymentMethod.options.telebirr")}
                      </option>
                      <option value='cbe'>
                        {t("fields.paymentMethod.options.cbe")}
                      </option>
                      <option value='boa'>
                        {t("fields.paymentMethod.options.boa")}
                      </option>
                      <option value='awash'>
                        {t("fields.paymentMethod.options.awash")}
                      </option>
                      <option value='cash'>{t("cashPayment")}</option>
                    </select>
                    <ArrowDown className='absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 dark:text-gray-500 pointer-events-none w-5 h-5' />
                    {form.paymentMethod && (
                      <p className='mt-2 text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded shadow-sm transition-colors duration-300'>
                        {
                          paymentOptions[
                            form.paymentMethod as keyof typeof paymentOptions
                          ]
                        }
                      </p>
                    )}
                  </div>
                  <div className='relative'>
                    <label
                      htmlFor='paymentOption'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.paymentOption.label")}
                    </label>
                    <select
                      id='paymentOption'
                      name='paymentOption'
                      value={form.paymentOption}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 dark:text-gray-100 appearance-none pr-12 transition-colors duration-300'
                    >
                      <option value=''>{t("select")}</option>
                      <option value='one-time'>
                        {t("fields.paymentOption.options.one-time")}
                      </option>
                      <option value='installment'>{t("installment")}</option>
                    </select>
                    <ArrowDown className='absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 dark:text-gray-500 pointer-events-none w-5 h-5' />
                  </div>

                  <div>
                    <label
                      htmlFor='uploadReceipt'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.receipt.label")}
                    </label>
                    <div className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 flex items-center gap-2 overflow-hidden transition-colors duration-300'>
                      <input
                        type='file'
                        id='uploadReceipt'
                        name='receipt'
                        onChange={handleChange}
                        className='hidden'
                        accept='image/*,application/pdf'
                      />
                      <label
                        htmlFor='uploadReceipt'
                        className='inline-flex items-center justify-center px-4 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200'
                      >
                        <UploadCloud className='mr-2 h-5 w-5 text-blue-600 dark:text-blue-300' />
                        {t("chooseFile")}
                      </label>
                      {form.receipt ? (
                        <span className='text-sm text-gray-600 dark:text-gray-200 truncate flex-grow'>
                          {form.receipt.name}
                          {form.receipt.size > 0 &&
                            ` (${(form.receipt.size / 1024 / 1024).toFixed(
                              2
                            )} MB)`}
                        </span>
                      ) : (
                        <span className='text-sm text-gray-500 dark:text-gray-400 flex-grow'>
                          {t("noFileChosen")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='paymentReference'
                      className='block text-sm font-medium mb-1 dark:text-gray-200'
                    >
                      {t("fields.transactionId.label")}
                    </label>
                    <input
                      id='paymentReference'
                      name='paymentReference'
                      value={form.paymentReference}
                      onChange={handleChange}
                      placeholder={t("fields.transactionId.placeholder")}
                      className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300'
                    />
                  </div>
                </div>

                <div className='relative mt-6'>
                  <label
                    htmlFor='marketingSource'
                    className='block text-sm font-medium mb-1 dark:text-gray-200'
                  >
                    {t("fields.referral.label")}
                  </label>
                  <select
                    id='marketingSource'
                    name='marketingSource'
                    value={form.marketingSource}
                    onChange={handleChange}
                    className='w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 dark:text-gray-100 appearance-none pr-12 transition-colors duration-300'
                  >
                    <option value=''>{t("choose")}</option>
                    <option value='facebook'>
                      {t("fields.referral.options.facebook")}
                    </option>
                    <option value='telegram'>
                      {t("fields.referral.options.telegram")}
                    </option>
                    <option value='friend'>
                      {t("fields.referral.options.friend")}
                    </option>
                    <option value='search'>
                      {t("fields.referral.options.search")}
                    </option>
                    <option value='instagram'>{t("instagram")}</option>
                    <option value='other'>{t("other")}</option>
                  </select>
                  <ArrowDown className='absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 dark:text-gray-500 pointer-events-none w-5 h-5' />
                </div>

                <div className='space-y-2 mt-4'>
                  <label className='flex items-start gap-2'>
                    <input
                      type='checkbox'
                      name='agreeTerms'
                      checked={form.agreeTerms}
                      onChange={handleChange}
                      className='mt-1 accent-blue-600 dark:accent-blue-400'
                    />
                    <span className='text-sm dark:text-gray-200'>
                      {t("fields.agreeTermsfirst")}{" "}
                      <a
                        href='/terms'
                        className='text-blue-600 dark:text-blue-400 hover:underline'
                      >
                        {t("fields.terms")}{" "}
                      </a>
                      {t("fields.agreeTermslast")}
                    </span>
                  </label>
                  <label className='flex items-start gap-2'>
                    <input
                      type='checkbox'
                      name='confirmAccuracy'
                      checked={form.confirmAccuracy}
                      onChange={handleChange}
                      className='mt-1 accent-blue-600 dark:accent-blue-400'
                    />
                    <span className='text-sm dark:text-gray-200'>
                      {t("fields.confirmAccuracy")}
                    </span>
                  </label>
                </div>

                <div className='flex justify-between mt-8 space-x-4'>
                  <button
                    type='button'
                    onClick={handleReset}
                    className='inline-flex items-center justify-center bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-md shadow-md hover:bg-blue-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200'
                  >
                    {t("reset")}
                  </button>
                  <button
                    type='submit'
                    onClick={handleSubmitApplication}
                    className='inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      t("submitting")
                    ) : (
                      <>
                        {t("submit")} <CheckCircle className='ml-2 w-5 h-5' />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplicationForm;
