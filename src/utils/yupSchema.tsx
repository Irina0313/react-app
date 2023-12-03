import { object, string, number, mixed, boolean } from 'yup';

const passwordStrengthRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/;

export const fieldsSchema = object()
  .shape({
    name: string()
      .required('Field is required')
      .matches(/^[A-Z][a-z]*$/, 'Name must start with an uppercase letter'),
    age: number()
      .transform((originalValue) => {
        const parsedValue = Number(originalValue);
        return isNaN(parsedValue) ? undefined : parsedValue;
      })
      .typeError('Must be a number')
      .required('Field is required')
      .positive('Must be a positive number')
      .integer('Must be a positive integer'),
    email: string()
      .email('Must be a valid email')
      .required('Field is required'),
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
    acceptTC: boolean()
      .test('not-false', 'Field is required', function (value) {
        return value !== false;
      })
      .required('Field is required'),
    picture: mixed<File | object>()
      .test('file-type', '.jpeg and .png files are required', function (value) {
        const validTypes = ['image/jpeg', 'image/png'];
        if (Array.isArray(value)) {
          for (const file of value) {
            if (!(file instanceof File)) {
              return validTypes.includes(value[0].type);
            }
          }
        } else if (value && value instanceof File) {
          return validTypes.includes(value.type);
        }
      })
      .test(
        'file-size',
        'File size is too large, it chould be less than 5mb',
        function (value) {
          const maxSize = 5 * 1024 * 1024;

          if (Array.isArray(value)) {
            for (const file of value) {
              if (!(file instanceof File)) {
                console.log('value[0].size', value[0].size);
                return value[0].size <= maxSize;
              }
            }
          } else if (value && value instanceof File) {
            return value.size <= maxSize;
          }
        }
      ),

    country: string().required('Field is required'),
  })
  .defined();
