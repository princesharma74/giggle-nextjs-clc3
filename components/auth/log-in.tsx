import { signIn } from "@/auth"
import { CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
 
export function LoginBox() {
  return (
    <>
    <DialogHeader>
      <DialogTitle className="text-2xl text-center">Login</DialogTitle>
      <DialogDescription className="text-center">
        Sign in with Github to login or sign up
      </DialogDescription>
    </DialogHeader>
    <CardContent>
      <div className="flex flex-col gap-2">
          <div>
            <form
              action={async () => {
                "use server"
                await signIn("github")
              }}
            >
              <Button variant="outline" className="w-full" type="submit">
                Continue with Github
              </Button>
            </form>
          </div>
        <div>
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
              <Button variant="outline" className="w-full" type="submit">
                Continue with Google
              </Button>
          </form>
      </div>
    </div>
    </CardContent>
    </>
  )
} 