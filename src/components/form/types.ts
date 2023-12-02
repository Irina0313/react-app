export type FormFields = {
  name: HTMLInputElement;
  age: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  repeatPassword: HTMLInputElement;
  gender: HTMLInputElement;
  acceptTC: HTMLInputElement;
  country: HTMLInputElement;
  picture: HTMLInputElement;
};

export type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  acceptTC: boolean;
  picture: false | File | null;
  country: string;
};
