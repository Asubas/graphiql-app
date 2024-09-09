'use client';
import AuthForm from '@/src/components/AuthForm/AuthForm';
import Loader from '@/src/components/Loader/Loader';
import { useAuth } from '@/src/hooks/useAuthRedirect';

const SignIn: React.FC = () => {
  const { loading, signIn } = useAuth();

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
  };

  return (
    <>
      {loading && <Loader />}
      <AuthForm title="Sign In" onSubmit={handleSignIn} />
    </>
  );
};

export default SignIn;
