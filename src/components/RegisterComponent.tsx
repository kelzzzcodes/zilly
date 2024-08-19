import { useFormik, FormikHelpers } from 'formik'
import { registerSchema } from '../FormSchemas/index'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

interface FormValues {
  email: string
  confirmPassword: string
  phone: string
  name: string
  password: string
  avatar: null
  localityId: string
  last_ip: string
  device_type: string
}

const RegisterComponent = () => {
  const navigate = useNavigate()

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      const formData = new FormData()
      formData.append('email', values.email)
      formData.append('password_confirmation', values.confirmPassword)
      formData.append('phone', values.phone)
      formData.append('name', values.name)
      formData.append('password', values.password)
      formData.append('avatar', values.avatar as File)
      formData.append('', values.avatar as File)
      formData.append('locality_id', values.localityId)
      formData.append('device_type', values.device_type)
      formData.append('last_ip', values.last_ip)

      console.log('FormData Entries:')
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`)
      })
      const apiUrl = import.meta.env.VITE_API_URL

      console.log(apiUrl)

      const response = await axios.post(`${apiUrl}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      alert(`Success: ${response.data.message || 'Registration successful!'}`)
      navigate('/signin')
      resetForm()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(`Error: ${error.response.data.message || 'An error occurred.'}`)
        } else {
          alert(`Error: ${error.message}`)
        }
      } else {
        alert(`Error: ${(error as Error).message}`)
      }
    } finally {
      setSubmitting(false)
    }
  }
  const {
    values,
    handleChange,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    handleSubmit,
  } = useFormik<FormValues>({
    initialValues: {
      email: '',
      confirmPassword: '',
      phone: '',
      name: '',
      password: '',
      avatar: null,
      localityId: '25',
      last_ip: '192.0.0.7',
      device_type: 'android',
    },
    validationSchema: registerSchema,
    onSubmit,
  })
  console.log(errors)

  return (
    <div className="flex  flex-col gap-4 items-center justify-center h-screen">
      <p>
        Already have an account{' '}
        <Link className="text-blue-500 ml-2" to={'/signin'}>
          Log In
        </Link>
      </p>
      <form
        onSubmit={handleSubmit}
        className=" border-2  border-white p-4 rounded-lg  min-w-[20%] flex flex-col "
      >
        <div className="flex flex-col gap-2 mb-2 ">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email}
            className={`border-b-2 ${
              errors.email && touched.email ? 'border-red-500' : 'border-black'
            } bg-transparent py-1 outline-none`}
          />
          {errors.email && touched.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Phone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={handleChange}
            value={values.phone}
            className={`border-b-2 ${
              errors.phone && touched.phone ? 'border-red-500' : 'border-black'
            } bg-transparent py-1 outline-none`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={values.name}
            className={`border-b-2 ${
              errors.name && touched.name ? 'border-red-500' : 'border-black'
            } bg-transparent py-1 outline-none`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            className={`border-b-2 ${
              errors.password && touched.password
                ? 'border-red-500'
                : 'border-black'
            } bg-transparent py-1 outline-none`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={values.confirmPassword}
            className={`border-b-2 ${
              errors.confirmPassword && touched.confirmPassword
                ? 'border-red-500'
                : 'border-black'
            } bg-transparent py-1 outline-none`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="file">Upload File</label>
          <input
            id="file"
            name="avatar"
            type="file"
            onChange={(event) => {
              if (event.currentTarget.files && event.currentTarget.files[0]) {
                setFieldValue('avatar', event.currentTarget.files[0])
              }
            }}
            className="hidden"
          />
          <label
            htmlFor="file"
            className={`block cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-lg border-2 border-gray-300 hover:bg-gray-300 ${
              errors.avatar && touched.avatar ? 'border-red-500' : ''
            }`}
          >
            {values.avatar ? `File: ${values.avatar.name}` : 'Choose File'}
          </label>
          {errors.avatar && touched.avatar && (
            <p className="text-red-500">{errors.file}</p>
          )}
        </div>

        <button
          className={`${
            isSubmitting && 'opacity-5'
          } px-4 py-2 bg-[#8d447b] text-white rounded-md w-[50%] items-center justify-center mx-auto mt-4`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default RegisterComponent
