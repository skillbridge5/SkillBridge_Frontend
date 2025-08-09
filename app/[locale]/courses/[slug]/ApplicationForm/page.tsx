'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { UploadCloud, ArrowLeft, ArrowRight, CheckCircle, ArrowDown } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslations } from 'next-intl'
import { Navbar } from '@/app/[locale]/components/navbar'
import Footer from '@/app/[locale]/components/footer'

const ApplicationForm = () => {
  const t = useTranslations('applicationForm')
  const f = t.raw('fields')
  const pathname = usePathname()
  const slug = decodeURIComponent(pathname.split('/').slice(-2, -1)[0])
  const router = useRouter()

  const mockUser = { fullName: 'John Doe', email: 'john.doe@example.com', loggedIn: true }

  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    email: '',
    phone: '',
    telegramHandle: '',
    university: '',
    address: '',
    courseId: slug,
    paymentMethod: '',
    paymentOption: '',
    receipt: null as File | null,
    paymentReference: '',
    marketingSource: '',
    agreeTerms: false,
    confirmAccuracy: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm((prev) => ({ ...prev, courseId: slug }))
  }, [slug])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const validateStep1 = () => {
    const errors: string[] = [];
    if (!form.fullName) errors.push('Full Name is required.');
    if (!form.email) errors.push('Email Address is required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.push('Invalid Email Address.');
    if (!form.phone) errors.push('Phone Number is required.');
    if (!form.telegramHandle) errors.push('Telegram Handle is required.');
    if (!form.university) errors.push('University is required.');
    if (!form.address) errors.push('Address is required.');

    if (errors.length > 0) {
      toast.error(errors.join(' '));
      return false;
    }
    return true;
  };
  const validateStep2 = () => {
    const errors: string[] = [];
    if (!form.courseId) errors.push('Course is not selected.');
    if (!form.paymentMethod) errors.push('Payment Method is required.');
    if (!form.paymentOption) errors.push('Payment Option is required.');
    if (!form.paymentReference) errors.push('Payment Reference (Transaction ID) is required.');
    if (form.paymentMethod !== 'cash' && !form.receipt) errors.push('Payment Receipt is required for the selected method. If paying cash, select "Cash Payment".');

    if (!form.agreeTerms) errors.push('You must agree to the Terms and Conditions.');
    if (!form.confirmAccuracy) errors.push('You must confirm the accuracy of the information.');

    if (errors.length > 0) {
      toast.error(errors.join(' '));
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

    setIsSubmitting(true);

    try {
      const applicationPayload = {
        courseId: form.courseId,
        paymentMethod: form.paymentMethod,
        paymentReference: form.paymentReference,
        marketingSource: form.marketingSource || 'Direct',
        fullName: form.fullName,
        dateOfBirth: form.dateOfBirth ? new Date(form.dateOfBirth).toISOString() : undefined,
        gender: form.gender || undefined,
        university: form.university,
        email: form.email,
        phone: form.phone,
        telegramHandle: form.telegramHandle,
        address: form.address,
        paymentOption: form.paymentOption,
      };

      const appCreationResponse = await fetch('https://skillbridge-backend-w2s4.onrender.com/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(applicationPayload),
      });

      const appCreationData = await appCreationResponse.json();

      if (!appCreationResponse.ok) {
        throw new Error(appCreationData.message || 'Failed to create application.');

      }

      const applicationId = appCreationData.id;
      if (!applicationId) {
        throw new Error('Application created, but no ID received for receipt upload.');
      }

      if (form.receipt && form.paymentMethod !== 'cash') {
        const formData = new FormData();
        formData.append('receipt', form.receipt);

        const receiptUploadResponse = await fetch(`YOUR_RENDER_BACKEND_BASE_URL/api/applications/${applicationId}/receipt`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: formData,
        });

        if (!receiptUploadResponse.ok) {
          const receiptErrorData = await receiptUploadResponse.json();
          console.error("Receipt upload failed:", receiptErrorData);
          toast.error('Application created, but receipt upload failed: ' + (receiptErrorData.message || 'Unknown error.'));
        } else {
          toast.success('Application & Receipt Submitted Successfully!');
        }
      } else if (!form.receipt && form.paymentMethod !== 'cash') {
        toast('Application submitted, but no receipt was uploaded. Please upload it later if required.');
      } else {
        toast.success('Application Submitted Successfully!');
      }

      console.log("Application Process Completed:", appCreationData);
      handleReset();
      router.push('/applications/success');

    } catch (error: any) {
      console.error("Application submission error:", error);
      toast.error(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      fullName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      email: '',
      phone: '',
      telegramHandle: '',
      university: '',
      address: '',
      courseId: slug,
      paymentMethod: '',
      paymentOption: '',
      receipt: null,
      paymentReference: '',
      marketingSource: '',
      agreeTerms: false,
      confirmAccuracy: false,
    });
    setCurrentStep(1);
  };


  const paymentOptions = {
    telebirr: 'to: Ibrahim Ghazali\n0960171717',
    cbe: 'to: Ibrahim Ghazali\n100041753914',
    boa: 'to: Ibrahim Ghazali\nXXXXXXXXXXX',
    awash: 'to: Ibrahim Ghazali\nXXXXXXXXXXX',
    cash: 'Pay at our office. No receipt upload required for this method.'
  }

  return (
   
    <> 
      <Navbar /> 
      <div className="bg-white dark:bg-gray-900 min-h-screen py-10 px-4 transition-colors duration-300">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="max-w-4xl mx-auto bg-[#eaf4ff] dark:bg-gray-800 p-10 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 relative transition-colors duration-300">

          {currentStep === 2 && (
        <button
          type="button"
          onClick={handleBack}
          className="absolute top-6 left-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Go back to previous step"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
          )}

          <h2 className="text-3xl font-extrabold text-center text-blue-800 dark:text-blue-300 mb-8 mt-4">
        Application Form
          </h2>
          <h4 className="text-center text-blue-800 dark:text-blue-300 mb-8 mt-4">Step {currentStep} of 2</h4>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">

        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">User Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1 dark:text-gray-200">Full Name*</label>
            <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1 dark:text-gray-200">Date of Birth</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300" />
          </div>

          <div className="relative">
            <label htmlFor="gender" className="block text-sm font-medium mb-1 dark:text-gray-200">Gender</label>
            <select id="gender" name="gender" value={form.gender} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 dark:text-gray-100 appearance-none pr-12 transition-colors duration-300">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 dark:text-gray-500 pointer-events-none w-5 h-5" />
          </div>
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium mb-1 dark:text-gray-200">Nationality</label>
            <input id="nationality" name="nationality" value={form.nationality} onChange={handleChange} placeholder="Ethiopian" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 dark:text-gray-200">Email Address*</label>
            <input id="email" name="email" value={form.email} onChange={handleChange} placeholder="john.doe@example.com" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1 dark:text-gray-200">Phone Number*</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+251 9XX XXX XXX" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="telegramHandle" className="block text-sm font-medium mb-1 dark:text-gray-200">Telegram Handle*</label>
            <input id="telegramHandle" name="telegramHandle" value={form.telegramHandle} onChange={handleChange} placeholder="@username" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300" />
          </div>
          <div>
            <label htmlFor="university" className="block text-sm font-medium mb-1 dark:text-gray-200">University*</label>
            <input id="university" name="university" value={form.university} onChange={handleChange} placeholder="Addis Ababa University" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium mb-1 dark:text-gray-200">Address*</label>
            <textarea id="address" name="address" value={form.address} onChange={handleChange} placeholder="123 Main St, City, Country" rows={3} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300"></textarea>
          </div>
            </div>
            <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Next <ArrowRight className="ml-2 w-5 h-5" />
          </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Billing / Service Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="courseId" className="block text-sm font-medium mb-1 dark:text-gray-200">Selected Course*</label>
            <input id="courseId" name="courseId" value={form.courseId} readOnly className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-700 shadow-sm dark:text-gray-100 transition-colors duration-300" />
          </div>
          <div className="relative">
            <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1 dark:text-gray-200">Payment Method Preference*</label>
            <select id="paymentMethod" name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 dark:text-gray-100 appearance-none pr-12 transition-colors duration-300">
              <option value="">Select payment method</option>
              <option value="telebirr">Telebirr</option>
              <option value="cbe">Commercial Bank of Ethiopia</option>
              <option value="boa">Bank of Abyssinia</option>
              <option value="awash">Awash Bank</option>
              <option value="cash">Cash Payment</option>
            </select>
            <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 dark:text-gray-500 pointer-events-none w-5 h-5" />
            {form.paymentMethod && (
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 rounded shadow-sm transition-colors duration-300">
            {paymentOptions[form.paymentMethod as keyof typeof paymentOptions]}
              </p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="paymentOption" className="block text-sm font-medium mb-1 dark:text-gray-200">Payment Option*</label>
            <select id="paymentOption" name="paymentOption" value={form.paymentOption} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 dark:text-gray-100 appearance-none pr-12 transition-colors duration-300">
              <option value="">Select</option>
              <option value="one-time">One-time Payment</option>
              <option value="installment">Installment</option>
            </select>
            <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 dark:text-gray-500 pointer-events-none w-5 h-5" />
          </div>

          <div>
            <label htmlFor="uploadReceipt" className="block text-sm font-medium mb-1 dark:text-gray-200">Upload Receipt*</label>
            <div className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 flex items-center gap-2 overflow-hidden transition-colors duration-300">
              <input
            type="file"
            id="uploadReceipt"
            name="receipt"
            onChange={handleChange}
            className="hidden"
            accept="image/*,application/pdf"
              />
              <label
            htmlFor="uploadReceipt"
            className="inline-flex items-center justify-center px-4 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
              >
            <UploadCloud className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-300" />
            Choose File
              </label>
              {form.receipt ? (
            <span className="text-sm text-gray-600 dark:text-gray-200 truncate flex-grow">
              {form.receipt.name}
              {form.receipt.size > 0 && ` (${(form.receipt.size / 1024 / 1024).toFixed(2)} MB)`}
            </span>
              ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400 flex-grow">No file chosen</span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="paymentReference" className="block text-sm font-medium mb-1 dark:text-gray-200">Payment Reference (Transaction ID)*</label>
            <input id="paymentReference" name="paymentReference" value={form.paymentReference} onChange={handleChange} placeholder="TRX123456" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300" />
          </div>
            </div>

            <div className="relative mt-6">
          <label htmlFor="marketingSource" className="block text-sm font-medium mb-1 dark:text-gray-200">How did you hear about us?</label>
          <select id="marketingSource" name="marketingSource" value={form.marketingSource} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 dark:text-gray-100 appearance-none pr-12 transition-colors duration-300">
            <option value="">Choose</option>
            <option value="facebook">Facebook</option>
            <option value="telegram">Telegram</option>
            <option value="friend">Friend</option>
            <option value="search">Google Search</option>
            <option value="instagram">Instagram</option>
            <option value="other">Other</option>
          </select>
          <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 dark:text-gray-500 pointer-events-none w-5 h-5" />
            </div>

            <div className="space-y-2 mt-4">
          <label className="flex items-start gap-2">
            <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} className="mt-1 accent-blue-600 dark:accent-blue-400" />
            <span className="text-sm dark:text-gray-200">
              I agree to the <a className="text-blue-600 dark:text-blue-400 underline" href="#" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> and Privacy Policy.
            </span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" name="confirmAccuracy" checked={form.confirmAccuracy} onChange={handleChange} className="mt-1 accent-blue-600 dark:accent-blue-400" />
            <span className="text-sm dark:text-gray-200">I confirm all information is accurate and true.</span>
          </label>
            </div>

            <div className="flex justify-between mt-8 space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-md shadow-md hover:bg-blue-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Reset Form
          </button>
          <button
            type="submit"
            onClick={handleSubmitApplication}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
            Submitting...
              </>
            ) : (
              <>
            Submit Application <CheckCircle className="ml-2 w-5 h-5" />
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
  )
}

export default ApplicationForm