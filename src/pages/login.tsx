import { Spinner } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/dashboard');
    return (
      <div className="border rounded-md justify-center flex flex-col">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div>
        <p>Please sign in:</p>
        <button onClick={() => signIn()}>Sign in with Gmail</button>
      </div>
    );
  }
};

export default Login;
