"use client";
import Github from "@/assets/images/github.svg";
import Google from "@/assets/images/google.svg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { APIURL, getErrorMessage, getSuccessMessage } from "@/constant";
import { cn } from "@/lib/utils";
import { signInApi } from "@/services/api";
import { useAuthStore, useModalStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(10, { message: "Password must contain minimum 10 charecters." }),
});

const SignIn = () => {
  const { onOpen } = useModalStore();
  const { setIsAuthenticated, setUser, setUserId, isAuthenticated } =
    useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmitLogin = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    signInApi(values)
      .then((res) => {
        if (res?.data?.data) {
          toast({
            description: getSuccessMessage(res.data?.status_code),
          });
          const data = res?.data?.data;
          setIsAuthenticated(true);
          setUserId(data?.id);
          setUser(data);
          router.push("/");
          console.log(data);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.status_code) {
          toast({
            variant: "destructive",
            description: getErrorMessage(err?.response?.data?.status_code),
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onSubmitForgetPassword = (e: any) => {
    e.preventDefault();
    onOpen("forgetPassword");
  };
  if (isAuthenticated) return router.push("/");
  return (
    <Card className="w-[450px] bg-white text-black p-0 overflow-hidden">
      <CardHeader className="text-center space-y-1 pb-3">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="text-zinc-500">
          Please enter your details to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-4">
          <Link
            href={`${APIURL}/oauth2/authorization/google`}
            className={cn(isLoading && "pointer-events-none")}
          >
            <Button className="flex items-center gap-2 bg-transparent border-2 border-zinc-300 focus-visible:ring-0 text-black focus-visible:ring-offset-0 hover:bg-slate-300/35 ">
              <Image alt="Google" src={Google} className="w-6 h-6" />
              <p>Google</p>
            </Button>
          </Link>

          <Link
            href={`${APIURL}/oauth2/authorization/github`}
            className={cn(isLoading && "pointer-events-none")}
          >
            <Button className="flex items-center gap-2 bg-transparent border-2 border-zinc-300  focus-visible:ring-0 text-black focus-visible:ring-offset-0 hover:bg-slate-300/35">
              <Image alt="Github" src={Github} className="w-6 h-6" />
              <p>Github</p>
            </Button>
          </Link>
        </div>
        <div className="flex items-center py-2">
          <Separator className="flex-1 bg-zinc-300" />
          <span className="px-2 text-sm text-zinc-700">Or</span>
          <Separator className="flex-1 bg-zinc-300" />
        </div>

        <div className="pt-2">
          <Form {...form}>
            <form onSubmit={() => {}}>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-transparent border-2 border-zinc-300 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-transparent border-2 border-zinc-300 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row-reverse">
                <Button
                  variant={"link"}
                  className="text-xs text-zinc-700 font-semibold p-0"
                  onClick={onSubmitForgetPassword}
                  disabled={isLoading}
                >
                  Forget your password?
                </Button>
              </div>
              <div>
                <Button
                  onClick={form.handleSubmit(onSubmitLogin)}
                  disabled={isLoading}
                  variant={"outline"}
                  className="text-white w-full disabled:bg-gray-900"
                >
                  {!isLoading ? (
                    "Sign in"
                  ) : (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={"/sign-up"} className="m-auto text-sm text-zinc-500">
          {"Don't have any account yet? "}{" "}
          <span className=" text-zinc-700 font-semibold">Sign Up</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
