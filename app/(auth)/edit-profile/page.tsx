"use client"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import ImageUpload from "@/components/ui/image-upload"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Gender, Platform } from "@prisma/client"
import VerifyUserId from "./components/verification-dialog"
import { useVerifyModal } from "@/hooks/use-verify-modal"
import { Badge } from "@/components/ui/badge"
const { v4 } = require('uuid');

const basicUserSchema = z
  .object({
    first_name: z.string().min(2).max(50).optional(),
    last_name: z.string().optional(),
    bio: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    avatar: z.string().optional(),
    username: z.string().min(2).max(50),
    email: z.string().email(),
    codeforces: z.object({
      codeforces_id: z.string().optional(),
      verified: z.boolean().default(false)
    }).optional(),
    codechef: z.object({
      codechef_id: z.string().optional(),
      verified: z.boolean().default(false)
    }).optional(),
    leetcode: z.object({
      leetcode_id: z.string().optional(),
      verified: z.boolean().default(false)
    }).optional()
  })

type BasicUser = z.infer<typeof basicUserSchema>


export default function Dashboard() {
  const user = useSession().data?.user
  const router = useRouter();
  // for complete form submission
  const [loading, setLoading] = useState(false);

  const form = useForm<BasicUser>({
    resolver: zodResolver(basicUserSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      bio: '',
      gender: undefined,
      username: '',
      email: '',
      avatar: '',
      codeforces: {
        codeforces_id: '',
        verified: false
      },
      codechef: {
        codechef_id: '',
        verified: false
      },
      leetcode: {
        leetcode_id: '',
        verified: false
      }
    }
  })

  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        bio: user?.bio || '',
        gender: user?.gender || undefined,
        username: user?.username || '',
        email: user?.email || '',
        avatar: user?.image || '',
        codeforces: {
          codeforces_id: user?.codeforces_id || '',
          verified: user?.codeforces_verified || false
        },
        codechef: {
          codechef_id: user?.codechef_id || '',
          verified: user?.codechef_verified || false
        },
        leetcode: {
          leetcode_id: user?.leetcode_id || '',
          verified: user?.leetcode_verified || false
        }
      })
    }
  }, [user, form])

  const onSubmit = async (data: BasicUser) => {
    // reset verified status of each platform if the id is changed
    if(data.codeforces && data.codeforces?.codeforces_id !== user?.codeforces_id){
      data.codeforces.verified = false;
    }
    if(data.codechef && data.codechef?.codechef_id !== user?.codechef_id){
      data.codechef.verified = false;
    }
    if(data.leetcode && data.leetcode?.leetcode_id !== user?.leetcode_id){
      data.leetcode.verified = false;
    }
    console.log(data)
    try{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`
      }
      setLoading(true);
      const response = await axios.patch(`/api/users/${data.email}/update`, data, {headers});
      toast({
        title: "Updated",
        description: "Your profile has been updated",
      })
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    }
    catch(e : any){
      // check if e has status code 409
      if(e.response.status === 409){
        toast({
          title: "Error",
          description: "This usernamme is already taken.",
        })
      }
      else{
      toast({
        title: "Error",
        description: "An error occurred while updating your profile",
      })
    }
    }
    finally{
      setLoading(false);
    }
  }

  // for verification dialog
  const verifyModalState = useVerifyModal()

  return (
    <>
    <VerifyUserId
      platform={verifyModalState.platform}
      isOpen={verifyModalState.isOpen}
      loading={verifyModalState.loading}
      uuid={verifyModalState.uuid}
      onLoading={verifyModalState.onLoading}
      onStopLoading={verifyModalState.onStopLoading}
      onClose={verifyModalState.onClose}
    />

    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2"> <h1 className="text-3xl font-semibold">Settings</h1> </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
          <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                  <CardTitle>Update Your Info</CardTitle>
                  <CardDescription>Enter the following and click save</CardDescription>
                </CardHeader>
                <CardContent>
                      <FormField
                          control={form.control}
                          name="avatar"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Profile Picture</FormLabel>
                                  <FormControl>
                                      <ImageUpload
                                          value={field.value ? [field.value] : []}
                                          disabled={loading}
                                          onChange={(url) => field.onChange(url)}
                                          onRemove={() => field.onChange("")}
                                      />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                    />
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-1xl">First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-1xl">Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-1xl">Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-1xl">Email</FormLabel>
                        <FormControl>
                          <Input disabled={true} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-1xl">Bio</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-1xl">Gender</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="codeforces.codeforces_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-1xl">Codeforces ID</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input {...field} />
                            {user?.codeforces_verified ? <Badge variant={"secondary"} className="text-green-500">Verified</Badge> :
                              <Badge 
                                className="cursor-pointer"
                                onClick={() => {
                                verifyModalState.setUUID(v4().slice(0,8))
                                verifyModalState.setPlatform(Platform.codeforces)
                                if(field.value === '') {
                                    toast({
                                        title: "Verification Failed",
                                        description: "Codeforces ID not found",
                                    });
                                }
                                else if(user?.codeforces_id === ''){
                                    toast({
                                        title: "Verification Failed",
                                        description: "Click save to update your Codeforces ID",
                                    });
                                }
                                else{
                                  verifyModalState.onOpen()
                                }
                              }}>
                                Verify
                              </Badge>
                             }
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="codechef.codechef_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-1xl">CodeChef ID</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input {...field} />
                            {user?.codechef_verified ? <Badge variant={"secondary"} className="text-green-500">Verified</Badge> :
                              <Badge 
                                className="cursor-pointer"
                                onClick={() => {
                                verifyModalState.setUUID(v4().slice(0,8))
                                verifyModalState.setPlatform(Platform.codechef)
                                if(field.value === '') {
                                    toast({
                                        title: "Verification Failed",
                                        description: "Codechef ID not found",
                                    });
                                }
                                else if(user?.codechef_id === ''){
                                    toast({
                                        title: "Verification Failed",
                                        description: "Click save to update your Codechef ID",
                                    });
                                }
                                else{
                                  verifyModalState.onOpen()
                                }
                              }}>
                                Verify
                              </Badge>
                             }
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="leetcode.leetcode_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-1xl">LeetCode ID</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input {...field} />
                            {user?.leetcode_verified ? <Badge variant={"secondary"} className="text-green-500">Verified</Badge> :
                              <Badge 
                                className="cursor-pointer"
                                onClick={() => {
                                  verifyModalState.setUUID(v4().slice(0,8))
                                  verifyModalState.setPlatform(Platform.leetcode)
                                  if(field.value === '') {
                                    toast({
                                        title: "Verification Failed",
                                        description: "Leetcode ID not found",
                                    });
                                  }
                                  else if(user?.leetcode_id === ''){
                                      toast({
                                        title: "Verification Failed",
                                        description: "Click save to update your Leetcode ID",
                                    });
                                  }
                                  else{
                                    verifyModalState.onOpen()
                                  }
                                }}>
                                Verify
                              </Badge>
                             }
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button disabled={loading} type="submit">Save</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
          </div>
        </div>
      </main>
    </div>
  </>
  )
}
