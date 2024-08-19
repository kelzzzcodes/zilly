import { useFormik, FormikHelpers } from 'formik'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { signInSchema } from '../FormSchemas'

interface FormValues {
  email: string
  password: string
  device_name: string
}

const SignInComponent = () => {
  const navigate = useNavigate()

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      const formData = new FormData()
      formData.append('username', values.email)

      formData.append('password', values.password)
      formData.append('device_name', values.device_name)

      const apiUrl = import.meta.env.VITE_API_URL

      const response = await axios.post(`${apiUrl}/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      alert(`Success: ${response.data.message || 'successful!'}`)
      console.log(response.data.data.user.email)

      localStorage.setItem('userEmail', response.data.data.user.email)
      localStorage.setItem('userToken', response.data.data.token)

      navigate('/dashboard')
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

    handleSubmit,
  } = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
      device_name: 'android',
    },
    validationSchema: signInSchema,
    onSubmit,
  })
  console.log(errors)

  return (
    <div className="flex  flex-col gap-4 items-center justify-center h-screen">
      <p>
        Don't have an account{' '}
        <Link className="text-blue-500 ml-2" to={'/register'}>
          Sign up
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

export default SignInComponent
