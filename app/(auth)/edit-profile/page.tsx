"use client"
import Link from "next/link"
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

const basicUserSchema = z.object({
  username: z.string().min(1, 'Username must be at least 1 character'),
  bio: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  email: z.string().email(),
})

type BasicUser = z.infer<typeof basicUserSchema>


export default function Dashboard() {

  const form = useForm<BasicUser>({
    resolver: zodResolver(basicUserSchema),
    defaultValues: {
      username: 'username123',
      bio: 'Hello, I am a software engineer',
      email: 'princesharma2899@gmail.com'
    }
  })

  const onSubmit = (data: BasicUser) => {
    console.log(data)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#">Security</Link>
          </nav>
          <div className="grid gap-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Card x-chunk="dashboard-04-chunk-1">
                    <CardHeader>
                      <CardTitle>Update Your Info</CardTitle>
                      <CardDescription>Set a username and add your leetcode, codeforces and codechef IDs</CardDescription>
                    </CardHeader>
                    <CardContent>
                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-semibold text-1xl">Username</FormLabel>
                                <FormControl>
                                  <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
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
                                  <Input disabled={true} {...field}/>
                                </FormControl>
                                <FormMessage/>
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
                                  <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem>
                              <FormLabel className="font-semibold text-1xl">Gender</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button type="submit">Save</Button>
                    </CardFooter>
                  </Card>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  )
}
