"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { handleSignInGithub, handleSignInGoogle } from "@/components/auth/server-actions";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface LoginBoxProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

export function LoginBox({
  className,
  ...props
}: LoginBoxProps) {
  return (
    <Dialog>
      <DialogTrigger className={cn(className)}>
        Login
      </DialogTrigger>
      <DialogContent>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Sign in with Github to login or sign up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div>
                <form
                  action={handleSignInGithub}
                  method="post"
                >
                  <Button variant="outline" className="w-full" type="submit">
                    Continue with Github
                  </Button>
                </form>
              </div>
              <div>
                <form
                  action={handleSignInGoogle}
                  method="post"
                >
                  <Button variant="outline" className="w-full" type="submit">
                    Continue with Google
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
