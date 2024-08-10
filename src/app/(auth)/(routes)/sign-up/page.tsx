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
import { getOtpApi, signUpApi } from "@/services/api";
import { OtpType } from "@/services/interface";
import { useAuthStore } from "@/store";
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
  name: z.string().min(1, { message: "Name is required." }),
  password: z
    .string()
    .min(10, { message: "Password must contain minimum 10 charecters." }),
  otp: z.string().length(6, { message: "Invalid OTP" }),
});
const emailSchema = formSchema.pick({ email: true });
const SignUp = () => {
  const [otpRequestLoading, setOtpRequestLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setIsAuthenticated, setUser, setUserId, isAuthenticated } =
    useAuthStore();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      otp: "",
    },
  });
  const onSubmitSignUp = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    signUpApi(values)
      .then((res) => {
        if (res?.data?.data) {
          toast({
            description: getSuccessMessage(res.data?.status_code),
          });
          const data = res?.data?.data;
          setIsAuthenticated(true);
          setUserId(data?.id);
          setUser(data);
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
  const requestOtp = (e: any) => {
    e.preventDefault();
    const result = emailSchema.safeParse({ email: form.getValues().email });
    if (result.error) {
      form.setError("email", { message: result.error.issues[0].message });
      return;
    }
    form.setError("email", { message: "" });
    const email = form.getValues().email;
    setOtpRequestLoading(true);
    getOtpApi({ email, type: OtpType.SIGNUP })
      .then((res) => {
        toast({
          description: getSuccessMessage(res.data?.status_code),
        });
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
        setOtpRequestLoading(false);
      });
  };
  if (isAuthenticated) return router.push("/");
  return (
    <Card className="w-[450px] bg-white text-black p-0 overflow-hidden">
      <CardHeader className="text-center space-y-1 pb-3">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="text-zinc-500">
          Please enter your details to sign up.
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
            <form onSubmit={form.handleSubmit(onSubmitSignUp)}>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isLoading || otpRequestLoading}
                          className="bg-transparent border-2 border-zinc-300 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-transparent border-2 border-zinc-300 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter your name"
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
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-transparent border-2 border-zinc-300 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            placeholder="Enter OTP"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    onClick={requestOtp}
                    disabled={isLoading || otpRequestLoading}
                    variant={"outline"}
                    className="text-white  disabled:bg-gray-900"
                  >
                    {!otpRequestLoading ? (
                      "Get OTP"
                    ) : (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="pt-3">
                <Button
                  disabled={isLoading || otpRequestLoading}
                  variant={"outline"}
                  className="text-white w-full disabled:bg-gray-900"
                >
                  {!isLoading ? (
                    "Create new account"
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
        <Link href={"/sign-in"} className="m-auto text-sm text-zinc-500">
          {"Already have an account. "}{" "}
          <span className=" text-zinc-700 font-semibold">Sign in</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
