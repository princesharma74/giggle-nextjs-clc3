"use server";
import { signIn, signOut } from "@/auth"

export async function handleSignInGoogle() {
  await signIn("google");
}

export async function handleSignInGithub() {
  await signIn("github");
}

export async function handleSignOut(){
  await signOut({ redirectTo: "/" })
}
