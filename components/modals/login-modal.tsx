"use client"

import * as z from "zod";
import { useLoginModal } from "@/hooks/use-login-modal";
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button";
import { handleSignInGithub, handleSignInGoogle } from "@/components/auth/server-actions";

const formSchema = z.object({
    name: z.string().min(1)
})

export const LoginModal = () => {
    const loginModal = useLoginModal();

    return (
        <Modal
            title="Login"
            description="Sign with any of the following providers below."
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
        >
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
        </Modal>
    )
}