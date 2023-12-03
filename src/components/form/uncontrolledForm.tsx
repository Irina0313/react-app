import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addResults } from '../../store/formSlice';
import styles from './form.module.css';
import { FormState } from '../../store/formSlice';
import AutocompleteCountry from '../autocompleteCountry';
import { fieldsSchema } from '../../utils/yupSchema';
import ProgressBar from '../progressBar';
import { FormFields, FormData } from './types';
import { convertFileToBase64 } from '../../utils/convertFileToBase64';
import { getProgress } from '../../utils/getProgressBarLevel';

const Form = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});
  const [passwordStrength, setPasswordStrength] = useState(-1);

  const handleSubmit: React.FormEventHandler<
    HTMLFormElement & FormFields
  > = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const {
      name,
      age,
      email,
      password,
      repeatPassword,
      gender,
      acceptTC,
      country,
      picture,
    } = form;

    const selectedFile = picture.files ? picture.files[0] : undefined;

    const data: FormData = {
      name: name.value,
      age: Number(age.value),
      email: email.value,
      password: password.value,
      repeatPassword: repeatPassword.value,
      gender: gender.value,
      acceptTC: acceptTC.checked,
      country: country.value,
      picture: selectedFile,
    };

    setPasswordStrength(getProgress(password.value));

    try {
      await fieldsSchema.validate(data, { abortEarly: false });

      const pictureToBase64 =
        data.picture &&
        data.picture instanceof File &&
        (await convertFileToBase64(data.picture));

      const formData: FormState = {
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        repeatPassword: data.repeatPassword,
        gender: data.gender,
        acceptTC: data.acceptTC,
        picture: pictureToBase64 ? pictureToBase64 : '',
        country: data.country,
      };

      dispatch(addResults(formData));
      navigate('/');
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: { [key: string]: string[] } = {};

        error.inner.forEach((err) => {
          const path = err.path!;
          if (!newErrors[path]) {
            newErrors[path] = [];
          }
          newErrors[path].push(err.message);
        });

        setFormErrors(newErrors);
      }
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            className={formErrors.name && styles.errorInput}
          />
          <div className={styles.errorContainer}>
            {formErrors.name &&
              formErrors.name.map((error, index) => (
                <span key={index} className={styles.errorText}>
                  {error}
                </span>
              ))}
          </div>
        </label>
        <label className={styles.label}>
          Age:
          <input
            type="number"
            name="age"
            className={formErrors.age && styles.errorInput}
          />
          <div className={styles.errorContainer}>
            {formErrors.age &&
              formErrors.age.map((error, index) => (
                <span key={index} className={styles.errorText}>
                  {error}
                </span>
              ))}
          </div>
        </label>
        <label className={styles.label}>
          Email:
          <input
            type="email"
            autoComplete="off"
            name="email"
            className={formErrors.email && styles.errorInput}
          />
          <div className={styles.errorContainer}>
            {formErrors.email &&
              formErrors.email.map((error, index) => (
                <span key={index} className={styles.errorText}>
                  {error}
                </span>
              ))}
          </div>
        </label>
        <label className={styles.label}>
          Password:
          <div className={styles.progressBarContainer}>
            <input
              type="password"
              autoComplete="true"
              name="password"
              className={`${styles.passwordInput} ${
                formErrors.password && styles.errorInput
              }`}
            />

            <ProgressBar strength={passwordStrength} />
          </div>
          <div className={styles.errorContainer}>
            {formErrors.password &&
              formErrors.password.map((error, index) => (
                <span key={index} className={styles.errorText}>
                  {error}
                </span>
              ))}
          </div>
        </label>
        <label className={styles.label}>
          Repeat password:
          <input
            type="password"
            autoComplete="true"
            name="repeatPassword"
            className={`${styles.passwordInput} ${
              formErrors.repeatPassword && styles.errorInput
            }`}
          />
          <div className={styles.errorContainer}>
            {formErrors.repeatPassword &&
              formErrors.repeatPassword.map((error, index) => (
                <span key={index} className={styles.errorText}>
                  {error}
                </span>
              ))}
          </div>
        </label>
        <div className={styles.label}>
          Genger:
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              className={formErrors.gender && styles.errorRadio}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              className={formErrors.gender && styles.errorRadio}
            />
            <label htmlFor="female">Female</label>
            <div className={styles.errorContainer}>
              {formErrors.gender &&
                formErrors.gender.map((error, index) => (
                  <span key={index} className={styles.errorText}>
                    {error}
                  </span>
                ))}
            </div>
          </div>
        </div>
        <label className={`${styles.label} ${styles.labelNarrow} `}>
          <div>
            <input
              type="checkbox"
              name="acceptTC"
              className={formErrors.acceptTC && styles.errorCheckbox}
            />
            Accept Terms & Conditions:
          </div>
          <div className={styles.errorContainer}>
            {formErrors.acceptTC &&
              formErrors.acceptTC.map((error, index) => (
                <span key={index} className={styles.errorText}>
                  {error}
                </span>
              ))}
          </div>
        </label>
        <label htmlFor="country" className={styles.label}>
          <div>Country:</div>
          <input
            id="country"
            type="text"
            list="countryList"
            placeholder="Type to search"
            name="country"
            autoComplete="false"
            className={formErrors.country && styles.errorInput}
          />
          <AutocompleteCountry />
          <div className={styles.errorContainer}>
            {formErrors.country &&
              formErrors.country.map((error, index) => (
                <span key={index} className={styles.errorText}>
                  {error}
                </span>
              ))}
          </div>
        </label>

        <label className={styles.label}>
          Upload picture:
          <input
            type="file"
            name="picture"
            className={formErrors.picture && styles.errorInput}
          />
          <div className={styles.errorContainer}>
            {formErrors.picture &&
              formErrors.picture.map((error, index) => (
                <span key={index} className={styles.errorText}>
                  {error}
                </span>
              ))}
          </div>
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
