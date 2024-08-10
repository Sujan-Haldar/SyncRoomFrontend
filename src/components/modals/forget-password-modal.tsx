"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { getErrorMessage, getSuccessMessage } from "@/constant";
import { forgetPasswordApi, getOtpApi } from "@/services/api";
import { OtpType } from "@/services/interface";
import { useModalStore } from "@/store";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(10, { message: "Password must contain minimum 10 charecters." }),
  otp: z.string().length(6, { message: "Invalid OTP" }),
});
const emailSchema = formSchema.pick({ email: true });
export const ForgetPasswordModal = () => {
  const { isOpen, type, onClose } = useModalStore();
  const [otpRequestLoading, setOtpRequestLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const isModalOPen = isOpen && type === "forgetPassword";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      otp: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    forgetPasswordApi(values)
      .then((res) => {
        toast({
          description: getSuccessMessage(res.data?.status_code),
        });
        handleClose();
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
    getOtpApi({ email, type: OtpType.FORGETPASSWORD })
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
  const handleClose: any = () => {
    form.reset();
    onClose();
  };
  return (
    <Dialog open={isModalOPen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden sm:max-w-[450px]">
        <DialogHeader className="pt-8 px-6 text-start">
          <DialogTitle className="font-bold ">Forget password</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Forget your last password.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3 px-6">
              <div className=" flex gap-2 items-center">
                <Label htmlFor="email" className="text-right">
                  Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Label>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          disabled={isLoading || otpRequestLoading}
                          className="bg-transparent border-2 border-zinc-300 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" flex gap-2 items-center">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-transparent border-2 border-zinc-300 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 items-center">
                <Label htmlFor="otp" className="text-right">
                  OTP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Label>
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
            <DialogFooter className="bg-grey-100 px-6 pb-4 pt-3">
              <Button
                disabled={isLoading || otpRequestLoading}
                variant={"primary"}
              >
                {!isLoading ? (
                  "Forget password"
                ) : (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
