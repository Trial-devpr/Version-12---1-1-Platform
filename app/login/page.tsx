"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<string>("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would validate credentials with your backend
    // For demo purposes, we'll just redirect based on role
    if (role === "admin") {
      router.push("/admin/dashboard")
    } else if (role === "mentor") {
      router.push("/mentor/dashboard")
    } else if (role === "mentee") {
      router.push("/mentee/dashboard")
    } else if (role === "pc") {
      router.push("/pc/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GEC_logo.jpg-40dETDc3SwS8JGnzsxqC4rJ8W3yw8H.jpeg"
              alt="GEC Logo"
              width={40}
              height={40}
              className="dark:invert"
            />
            <span className="font-bold text-xl">Menter-Tgthr</span>
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="mentor">Mentor</SelectItem>
                    <SelectItem value="mentee">Mentee</SelectItem>
                    <SelectItem value="pc">College PC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary underline-offset-4 hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground">Made with ❤️ by GEC</p>
        </div>
      </footer>
    </div>
  )
}

