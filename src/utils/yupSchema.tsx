import { object, string, number, mixed, boolean } from 'yup';

const passwordStrengthRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/;

export const fieldsSchema = object({
  name: string()
    .required('Field is required')
    .matches(/^[A-Z][a-z]*$/, 'Name must start with an uppercase letter'),
  age: number()
    .required('Field is required')
    .positive('Must be a positive number')
    .integer('Must be a positive integer'),
  email: string().email('Must be a valid email').required('Field is required'),
  password: string()
    .required('Field is required')
    .matches(
      passwordStrengthRegex,
      'Password must have at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
    ),
  repeatPassword: string()
    .required('Field is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return value === this.parent.password;
    }),
  gender: string().required('Field is required'),
  acceptTC: boolean().isTrue('Field is required'),
  picture: mixed()
    .test('file-required', 'This fiesd is required', function (value) {
      if (!value || !(value instanceof File)) {
        return false;
      }
      return true;
    })
    .test(
      'file-type',
      'Invalid file type, only .jpeg and .png are alloved',
      function (value) {
        if (value && value instanceof File) {
          const validTypes = ['image/jpeg', 'image/png'];
          return validTypes.includes(value.type);
        }
      }
    )
    .test(
      'file-size',
      'File size is too large, it chould be less than 5mb',
      function (value) {
        if (value && value instanceof File) {
          const maxSize = 5 * 1024 * 1024;

          return value.size <= maxSize;
        }
      }
    ),
  country: string().required('Field is required'),
});
