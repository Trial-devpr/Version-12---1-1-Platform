"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole] = useState<string>("mentee")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [otherInterest, setOtherInterest] = useState("")
  const [showOtherInterest, setShowOtherInterest] = useState(false)
  const [adminCode, setAdminCode] = useState("")
  const [adminCodeError, setAdminCodeError] = useState("")

  // Available interests for mentors
  const availableInterests = [
    "Software Development",
    "Data Science",
    "UI/UX Design",
    "Product Management",
    "Machine Learning",
    "Cloud Computing",
    "Cybersecurity",
    "Mobile Development",
    "DevOps",
    "Blockchain",
    "Other",
  ]

  const handleInterestChange = (interest: string) => {
    if (interest === "Other") {
      setShowOtherInterest(true)
      return
    }

    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((i) => i !== interest)
      } else {
        return [...prev, interest]
      }
    })
  }

  const addOtherInterest = () => {
    if (otherInterest.trim() && !selectedInterests.includes(otherInterest.trim())) {
      setSelectedInterests((prev) => [...prev, otherInterest.trim()])
      setOtherInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setSelectedInterests((prev) => prev.filter((i) => i !== interest))
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate admin code if role is admin
    if (role === "admin") {
      if (adminCode !== "GEC2025$%") {
        setAdminCodeError("Invalid admin code. Please enter the correct code.")
        return
      }
    }

    // In a real app, you would send registration data to your backend

    // For demo purposes, if it's a mentor, redirect to pending approval page
    if (role === "mentor") {
      router.push("/pending-approval")
    } else {
      // Otherwise redirect to login
      router.push("/login")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">Register as a mentor or mentee to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="mentee" onValueChange={setRole}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="mentee">Mentee</TabsTrigger>
                <TabsTrigger value="mentor">Mentor</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="mentee">
                <form onSubmit={handleRegister} className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="college">College</Label>
                    <Select>
                      <SelectTrigger id="college">
                        <SelectValue placeholder="Select your college" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pesce">PESCE Mandya</SelectItem>
                        <SelectItem value="vvce">VVCE Mys</SelectItem>
                        <SelectItem value="msrit">MSRIT Banglore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Areas of Interest</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableInterests.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={`interest-${interest}`}
                            checked={
                              selectedInterests.includes(interest) || (interest === "Other" && showOtherInterest)
                            }
                            onCheckedChange={() => handleInterestChange(interest)}
                          />
                          <Label htmlFor={`interest-${interest}`} className="text-sm font-normal">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>

                    {showOtherInterest && (
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Enter your interest"
                          value={otherInterest}
                          onChange={(e) => setOtherInterest(e.target.value)}
                        />
                        <Button type="button" onClick={addOtherInterest} size="sm">
                          Add
                        </Button>
                      </div>
                    )}

                    {selectedInterests.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedInterests.map((interest) => (
                          <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                            {interest}
                            <button
                              type="button"
                              onClick={() => removeInterest(interest)}
                              className="rounded-full h-4 w-4 inline-flex items-center justify-center text-xs hover:bg-muted"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="verification-code">Verification Code</Label>
                    <Input id="verification-code" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required />
                  </div>

                  <Button type="submit" className="w-full">
                    Register as Mentee
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="mentor">
                <form onSubmit={handleRegister} className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Areas of Expertise</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableInterests.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={`expertise-${interest}`}
                            checked={
                              selectedInterests.includes(interest) || (interest === "Other" && showOtherInterest)
                            }
                            onCheckedChange={() => handleInterestChange(interest)}
                          />
                          <Label htmlFor={`expertise-${interest}`} className="text-sm font-normal">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>

                    {showOtherInterest && (
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Enter your expertise"
                          value={otherInterest}
                          onChange={(e) => setOtherInterest(e.target.value)}
                        />
                        <Button type="button" onClick={addOtherInterest} size="sm">
                          Add
                        </Button>
                      </div>
                    )}

                    {selectedInterests.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedInterests.map((interest) => (
                          <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                            {interest}
                            <button
                              type="button"
                              onClick={() => removeInterest(interest)}
                              className="rounded-full h-4 w-4 inline-flex items-center justify-center text-xs hover:bg-muted"
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" type="number" min="0" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself and your experience" rows={3} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/username" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required />
                  </div>

                  <Button type="submit" className="w-full">
                    Register as Mentor
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleRegister} className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-code">Admin Registration Code</Label>
                    <Input
                      id="admin-code"
                      value={adminCode}
                      onChange={(e) => {
                        setAdminCode(e.target.value)
                        setAdminCodeError("")
                      }}
                      required
                    />
                    {adminCodeError && <p className="text-sm text-red-500 mt-1">{adminCodeError}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required />
                  </div>

                  <Button type="submit" className="w-full">
                    Register as Admin
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

