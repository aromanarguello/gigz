import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="border rounded-md justify-center flex flex-col">
        <p>Welcome, {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
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
