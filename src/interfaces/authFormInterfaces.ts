export interface AuthFormProps {
  title: string;
  onSubmit: (email: string, password: string, username?: string) => void;
}

export interface SignInInputs {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
}

export interface SignUpInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
