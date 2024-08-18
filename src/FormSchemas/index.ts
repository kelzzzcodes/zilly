import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

const phoneRegex = /^\+234\d{10}$/

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\.com$/

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .matches(emailRegex, 'Email must include "@" and  end with ".com"')
    .required('Required'),
  phone: yup
    .string()
    .matches(phoneRegex, {
      message:
        'Phone number must start with +234 and be exactly 14 digits long',
    })
    .required('Required'),
  name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        'Password must contain one upper case letter, one lower case letter and one numeric digit.',
    })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  file: yup
    .mixed()
    .required('A file is required')
    .test('fileSize', 'File size is too large', (value) => {
      // Ensure value is a File object
      return value && value instanceof File && value.size <= 1024 * 1024 // 1MB
    })
    .test('fileFormat', 'Unsupported format', (value) => {
      return (
        value &&
        value instanceof File &&
        ['image/jpeg', 'image/png'].includes(value.type)
      )
    }),
})
