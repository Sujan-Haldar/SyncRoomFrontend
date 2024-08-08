import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SignIn = () => {
  return (
    <Card className="w-[450px] bg-white text-black p-0 overflow-hidden">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="text-zinc-500">
          Please enter your details to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <Button></Button>
          <Button></Button>
        </div>
        <div className="flex items-center">
          <Separator className="flex-1 bg-zinc-300" />
          <span className="px-2 text-sm text-zinc-700">Or</span>
          <Separator className="flex-1 bg-zinc-300" />
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>

    // <div>
    //   <Link href={"http://localhost:8080/oauth2/authorization/github"}>
    //     Github{" "}
    //   </Link>
    //   <br />
    //   <Link href={"http://localhost:8080/oauth2/authorization/google"}>
    //     Google{" "}
    //   </Link>
    // </div>
  );
};

export default SignIn;
