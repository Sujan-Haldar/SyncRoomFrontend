import Link from "next/link";

const Login = () => {
  return (
    <div>
      <Link href={"http://localhost:8080/oauth2/authorization/github"}>
        Github{" "}
      </Link>
      <br />
      <Link href={"http://localhost:8080/oauth2/authorization/google"}>
        Google{" "}
      </Link>
    </div>
  );
};

export default Login;
