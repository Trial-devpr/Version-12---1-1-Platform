"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function MentorProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  // Mock mentor data - in a real app, this would come from your database
  const [mentorData, setMentorData] = useState({
    name: "Dr. Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Senior Data Scientist",
    company: "Tech Analytics Co",
    experience: "8 years",
    bio: "Experienced data scientist with a passion for mentoring junior developers and helping them grow in their careers.",
    interests: ["Data Science", "Machine Learning", "AI"],
    linkedin: "https://linkedin.com/in/michaelchen",
    github: "https://github.com/mchen",
    joinDate: "January 15, 2023",
  })

  const handleSave = () => {
    // In a real app, you would save the data to your database
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and profile information</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={mentorData.name} />
                    <AvatarFallback className="text-lg">
                      {mentorData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={mentorData.name}
                        onChange={(e) => setMentorData({ ...mentorData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={mentorData.email}
                        onChange={(e) => setMentorData({ ...mentorData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={mentorData.phone}
                        onChange={(e) => setMentorData({ ...mentorData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={mentorData.jobTitle}
                        onChange={(e) => setMentorData({ ...mentorData, jobTitle: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={mentorData.company}
                        onChange={(e) => setMentorData({ ...mentorData, company: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience</Label>
                      <Input
                        id="experience"
                        value={mentorData.experience}
                        onChange={(e) => setMentorData({ ...mentorData, experience: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={mentorData.bio}
                      onChange={(e) => setMentorData({ ...mentorData, bio: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Areas of Expertise</Label>
                    <div className="flex flex-wrap gap-2">
                      {mentorData.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={mentorData.linkedin}
                        onChange={(e) => setMentorData({ ...mentorData, linkedin: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={mentorData.github}
                        onChange={(e) => setMentorData({ ...mentorData, github: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>View your account details and membership information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">{mentorData.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Account Type</p>
                  <p className="text-sm text-muted-foreground">Mentor</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Account Status</p>
                  <p className="text-sm text-green-600">Active</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Login</p>
                  <p className="text-sm text-muted-foreground">Today at 10:30 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Protect your account with 2FA</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email notifications for important events</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive alerts about system updates and maintenance</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Meeting Reminders</p>
                  <p className="text-sm text-muted-foreground">Receive reminders about upcoming meetings</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

