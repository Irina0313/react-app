import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { fieldsSchema } from '../../utils/yupSchema';
import { FormData } from './types';
import { FormState } from '../../store/formSlice';
import styles from './form.module.css';
import AutocompleteCountry from '../autocompleteCountry';
import { addResults } from '../../store/formSlice';
import { convertFileToBase64 } from '../../utils/convertFileToBase64';
import ProgressBar from '../progressBar';
import { getProgress } from '../../utils/getProgressBarLevel';

const ControllForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(-1);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    trigger,
    control,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(fieldsSchema),
  });

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const newPassword = e.target.value;
    setPasswordStrength(getProgress(newPassword));
  };

  const onSubmit = async (data: FormData) => {
    const picture = data.picture;

    const pictureToBase64 =
      picture instanceof File ? await convertFileToBase64(picture) : '';
    console.log(data);
    const formData: FormState = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword,
      gender: data.gender,
      acceptTC: data.acceptTC,
      picture: pictureToBase64,
      country: data.country,
    };
    dispatch(addResults(formData));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input {...register('name')} />
        <p className={styles.errorText}>{errors.name?.message}</p>
      </label>

      <label>
        Age:
        <input
          {...register('age')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.value) {
              setError('age', {
                message: 'Field is required',
                type: 'typeError',
              });
            }
            if (isNaN(Number(e.target.value))) {
              setError('age', {
                message: 'Must be a number',
                type: 'typeError',
              });
            }
            if (!isNaN(Number(e.target.value)) && e.target.value !== '') {
              setValue('age', Number(e.target.value));
              trigger('age');
            }
          }}
        />
        <p className={styles.errorText}>{errors.age?.message}</p>
      </label>

      <label>
        Email:
        <input {...register('email')} />
        <p className={styles.errorText}>{errors.email?.message}</p>
      </label>

      <label>
        Password:
        <div className={styles.progressBarContainer}>
          <input
            {...register('password')}
            type="password"
            className={`${styles.passwordInput} ${
              errors.password && styles.errorInput
            }`}
            onChange={handlePasswordChange}
          />
          <ProgressBar strength={passwordStrength} />
        </div>
        <p className={styles.errorText}>{errors.password?.message}</p>
      </label>

      <label>
        Repeat password:
        <input {...register('repeatPassword')} type="password" />
        <p className={styles.errorText}>{errors.repeatPassword?.message}</p>
      </label>

      <label>
        Genger:
        <input type="radio" id="male" value="male" {...register('gender')} />
        <label htmlFor="male">Male</label>
        <input type="radio" id="male" value="male" {...register('gender')} />
        <label htmlFor="female">Female</label>
        <p className={styles.errorText}>{errors.gender?.message}</p>
      </label>

      <label>
        <div>
          <Controller
            control={control}
            name={'acceptTC'}
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <input
                  {...field}
                  type="checkbox"
                  onChange={(event) => {
                    if (event.target.checked) {
                      onChange(true);
                    } else {
                      onChange(false);
                    }
                  }}
                  id="acceptTC"
                />
              );
            }}
          />
          Accept Terms & Conditions:
        </div>

        <p className={styles.errorText}>{errors.acceptTC?.message}</p>
      </label>

      <label>
        <Controller
          control={control}
          name={'picture'}
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <input
                {...field}
                type="file"
                onChange={(event) => {
                  if (event.target.files) {
                    onChange(event.target.files[0]);
                  }
                }}
                id="picture"
              />
            );
          }}
        />
        <p className={styles.errorText}>{errors.picture?.message}</p>
      </label>

      <label htmlFor="country">
        <div>Country:</div>
        <input
          id="country"
          type="text"
          list="countryList"
          placeholder="Type to search"
          autoComplete="false"
          className={errors.country && styles.errorInput}
          {...register('country')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue('country', e.target.value);
            trigger('country');
          }}
        />
        <AutocompleteCountry />
        <p className={styles.errorText}>{errors.country?.message}</p>
      </label>
      <input type="submit" />
    </form>
  );
};

export default ControllForm;
