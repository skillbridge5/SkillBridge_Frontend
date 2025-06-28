'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const ApplicationForm = () => {
  const pathname = usePathname()
  const slug = decodeURIComponent(pathname.split('/').slice(-2, -1)[0])
  const router = useRouter()

  const mockUser = { name: 'John Doe', email: 'john.doe@example.com', loggedIn: true }

  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    nationality: '',
    email: '',
    phone: '',
    telegram: '',
    course: slug,
    paymentMethod: '',
    paymentOption: '',
    receipt: null as File | null,
    transactionId: '',
    referral: '',
    agreeTerms: false,
    confirmAccuracy: false,
  })

  useEffect(() => {
    if (mockUser.loggedIn) {
      setForm((prev) => ({
        ...prev,
        name: mockUser.name,
        email: mockUser.email,
        course: slug,
      }))
    } else {
      setForm((prev) => ({ ...prev, course: slug }))
    }
  }, [slug])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else if (type === 'file') {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).files?.[0] || null,
      }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const requiredFields = [
      'name', 'email', 'phone', 'telegram', 'course', 'paymentMethod', 'paymentOption', 'transactionId'
    ]

    for (const field of requiredFields) {
      if (!form[field as keyof typeof form]) {
        alert(`Please fill in the required field: ${field}`)
        return
      }
    }

    if (!form.agreeTerms || !form.confirmAccuracy) {
      alert('Please agree to the terms and confirm the accuracy.')
      return
    }

    console.log(form)
    alert('Application Submitted!')
  }

  const handleReset = () => {
    router.back()
  }

  const paymentOptions = {
    telebirr: 'to: Ibrahim Ghazali\n0960171717',
    cbe: 'to: Ibrahim Ghazali\n100041753914',
    boa: 'to: Ibrahim Ghazali\nXXXXXXXXXXX',
    awash: 'to: Ibrahim Ghazali\nXXXXXXXXXXX',
  }

  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-[#eaf4ff] p-10 rounded-xl shadow-lg border">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-8">Application Form</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">User Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name*</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="w-full p-3 border rounded-md shadow-sm bg-white" />
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
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Billing / Service Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Selected Course*</label>
                <input name="course" value={form.course} readOnly className="w-full p-3 border rounded-md bg-gray-100 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Payment Method Preference*</label>
                <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white">
                  <option value="">Select payment method</option>
                  <option value="telebirr">Telebirr</option>
                  <option value="cbe">Commercial Bank of Ethiopia</option>
                  <option value="boa">Bank of Abyssinia</option>
                  <option value="awash">Awash Bank</option>
                </select>
                {form.paymentMethod && (
                  <p className="mt-2 text-sm text-gray-700 whitespace-pre-line bg-white border p-3 rounded shadow-sm">
                    {paymentOptions[form.paymentMethod as keyof typeof paymentOptions]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Payment Option*</label>
                <select name="paymentOption" value={form.paymentOption} onChange={handleChange} className="w-full p-3 border rounded-md shadow-sm bg-white">
                  <option value="">Select</option>
                  <option value="one-time">One-time Payment</option>
                  <option value="monthly">Monthly Subscription</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload Receipt*</label>
                <div className="w-full flex items-center gap-4">
                  <input type="file" name="receipt" onChange={handleChange} className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Transaction ID*</label>
                <input name="transactionId" value={form.transactionId} onChange={handleChange} placeholder="Transaction reference" className="w-full p-3 border rounded-md shadow-sm bg-white" />
              </div>
            </div>

            <label className="block text-sm font-medium mb-1 mt-6">How did you hear about us?</label>
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
                  I agree to the <a className="text-blue-600 underline" href="#">Terms and Conditions</a> and Privacy Policy.
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" name="confirmAccuracy" checked={form.confirmAccuracy} onChange={handleChange} className="mt-1" />
                <span className="text-sm">I confirm all information is accurate and true.</span>
              </label>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button type="button" onClick={handleReset} className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400">Reset Form</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Submit Application</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplicationForm
