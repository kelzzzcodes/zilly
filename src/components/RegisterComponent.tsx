import { useFormik, FormikHelpers } from 'formik'
import { registerSchema } from '../FormSchemas/index'
import axios from 'axios'

interface FormValues {
  email: string
  confirmPassword: string
  phone: string
  name: string
  password: string
  file: File | null
}

const onSubmit = async (
  values: FormValues,
  { setSubmitting, resetForm }: FormikHelpers<FormValues>,
) => {
  try {
    // Make the API call
    const response = await axios.post(
      'https://za.t.com/api/v1/register',
      values,
    )

    // Display success message
    alert(`Success: ${response.data.message || 'Registration successful!'}`)

    // Reset the form
    resetForm()
  } catch (error) {
    // Type narrowing for error
    if (axios.isAxiosError(error)) {
      // Check if there is a response from the server
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'An error occurred.'}`)
      } else if (error.request) {
        alert('Error: No response received from the server.')
      } else {
        alert(`Error: ${error.message}`)
      }
    } else {
      // If the error is not an AxiosError, handle it as a general error
      alert(`Error: ${(error as Error).message}`)
    }
  } finally {
    setSubmitting(false)
  }
}

const RegisterComponent = () => {
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
      file: null,
    },
    validationSchema: registerSchema,
    onSubmit,
  })
  console.log(errors)

  return (
    <div className="flex items-center justify-center h-screen">
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
            type="phone"
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
            type="confirmPassword"
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
            name="file"
            type="file"
            onChange={(event) => {
              if (event.currentTarget.files && event.currentTarget.files[0]) {
                setFieldValue('file', event.currentTarget.files[0])
              }
            }}
            className={`border-b-2 ${
              errors.file && touched.file ? 'border-red-500' : 'border-black'
            } bg-transparent py-1 outline-none`}
          />
          {errors.file && touched.file && (
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
