"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle, Clock, Eye, Users, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function AdminDashboard() {
  // Mock data for mentor applications
  const [mentorApplications, setMentorApplications] = useState([
    {
      id: 1,
      name: "John Smith",
      job: "Senior Developer at Tech Company",
      email: "john.smith@example.com",
      experience: "8 years",
      interests: ["Web Development", "Machine Learning", "Mobile Apps"],
      bio: "Experienced software developer with a passion for mentoring junior developers and helping them grow in their careers.",
      linkedin: "https://linkedin.com/in/johnsmith",
      github: "https://github.com/johnsmith",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      job: "Product Manager at Product Inc",
      email: "sarah.j@example.com",
      experience: "6 years",
      interests: ["Product Management", "UX Design", "Agile Methodologies"],
      bio: "Product manager with experience in both startups and enterprise companies. Passionate about helping others navigate the product management career path.",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahj",
    },
    {
      id: 3,
      name: "Michael Chen",
      job: "Data Scientist at Data Analytics Co",
      email: "m.chen@example.com",
      experience: "5 years",
      interests: ["Data Science", "AI", "Machine Learning"],
      bio: "Data scientist with a background in machine learning and AI. Eager to share knowledge and help students break into the field.",
      linkedin: "https://linkedin.com/in/michaelchen",
      github: "https://github.com/mchen",
    },
  ])

  // Mock data for approved mentors
  const [approvedMentors, setApprovedMentors] = useState([])

  // Mock data for rejected mentors
  const [rejectedMentors, setRejectedMentors] = useState([])

  // Mock data for recent meetings
  const recentMeetings = [
    {
      id: 1,
      mentor: "John Smith",
      mentee: "Alex Johnson",
      college: "PESCE Mandya",
      date: new Date(Date.now() - 1 * 86400000),
      duration: 30,
      status: "completed",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      notes:
        "Discussed career paths in frontend vs backend development. Alex is interested in pursuing frontend development with React.",
    },
    {
      id: 2,
      mentor: "Sarah Johnson",
      mentee: "Jessica Williams",
      college: "VVCE Mys",
      date: new Date(Date.now() - 2 * 86400000),
      duration: 45,
      status: "cancelled",
      meetingLink: "https://meet.google.com/klm-nopq-rst",
      notes: "Cancelled due to scheduling conflict. Will reschedule for next week.",
    },
    {
      id: 3,
      mentor: "Michael Chen",
      mentee: "Emma Martinez",
      college: "MSRIT Banglore",
      date: new Date(Date.now() - 3 * 86400000),
      duration: 30,
      status: "pending",
      meetingLink: "https://meet.google.com/uvw-xyz-123",
      notes: "Will discuss machine learning project and provide feedback.",
    },
    {
      id: 4,
      mentor: "Emily Davis",
      mentee: "Tyler Brown",
      college: "PESCE Mandya",
      date: new Date(Date.now() - 4 * 86400000),
      duration: 60,
      status: "completed",
      meetingLink: "https://meet.google.com/456-789-abc",
      notes: "Reviewed portfolio and provided feedback on UI/UX design principles.",
    },
    {
      id: 5,
      mentor: "Jennifer Lee",
      mentee: "Sophia Garcia",
      college: "VVCE Mys",
      date: new Date(Date.now() - 5 * 86400000),
      duration: 30,
      status: "completed",
      meetingLink: "https://meet.google.com/def-ghi-jkl",
      notes: "Discussed frontend development best practices and React component structure.",
    },
  ]

  const [selectedMentor, setSelectedMentor] = useState(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  const handleApprove = (id) => {
    // Find the mentor to approve
    const mentorToApprove = mentorApplications.find((mentor) => mentor.id === id)

    if (mentorToApprove) {
      // Add to approved mentors
      setApprovedMentors((prev) => [...prev, mentorToApprove])

      // Remove from pending applications
      setMentorApplications((prev) => prev.filter((mentor) => mentor.id !== id))

      // Show success toast
      toast({
        title: "Mentor Approved",
        description: `${mentorToApprove.name} has been approved as a mentor.`,
      })
    }
  }

  const handleReject = (id) => {
    // Find the mentor to reject
    const mentorToReject = mentorApplications.find((mentor) => mentor.id === id)

    if (mentorToReject) {
      // Add to rejected mentors
      setRejectedMentors((prev) => [...prev, mentorToReject])

      // Remove from pending applications
      setMentorApplications((prev) => prev.filter((mentor) => mentor.id !== id))

      // Show success toast
      toast({
        title: "Mentor Rejected",
        description: `${mentorToReject.name}'s application has been rejected.`,
      })
    }
  }

  const handleViewMentor = (mentor) => {
    setSelectedMentor(mentor)
    setViewDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of the platform and key metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedMentors.length}</div>
            <p className="text-xs text-muted-foreground">Approved mentors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mentees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mentorApplications.length}</div>
            <p className="text-xs text-muted-foreground">Mentor applications awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="meetings">
        <TabsList>
          <TabsTrigger value="meetings">Recent Meetings</TabsTrigger>
          <TabsTrigger value="mentors">Mentor Applications</TabsTrigger>
          <TabsTrigger value="approved">Approved Mentors</TabsTrigger>
          <TabsTrigger value="rejected">Rejected Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="meetings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Meetings</CardTitle>
              <CardDescription>Overview of recent mentor-mentee sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="font-medium">
                        Meeting with {meeting.mentor} and {meeting.mentee}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {meeting.date.toLocaleDateString()} - {meeting.duration} minutes
                      </div>
                      <div className="text-sm text-muted-foreground">
                        College: {meeting.college} |{" "}
                        <a
                          href={meeting.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Meeting Link
                        </a>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <strong>Notes:</strong> {meeting.notes}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {meeting.status === "pending" ? (
                        <div className="flex items-center text-yellow-500">
                          <Clock className="mr-1 h-4 w-4" />
                          <span className="text-sm">Pending</span>
                        </div>
                      ) : meeting.status === "completed" ? (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          <span className="text-sm">Completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-500">
                          <XCircle className="mr-1 h-4 w-4" />
                          <span className="text-sm">Cancelled</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Mentor Applications</CardTitle>
              <CardDescription>Review and approve mentor applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentorApplications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No pending applications</p>
                ) : (
                  mentorApplications.map((mentor) => (
                    <div key={mentor.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium">{mentor.name}</div>
                        <div className="text-sm text-muted-foreground">{mentor.job}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewMentor(mentor)}>
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                          onClick={() => handleApprove(mentor.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                          onClick={() => handleReject(mentor.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approved Mentors</CardTitle>
              <CardDescription>List of approved mentors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvedMentors.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No approved mentors yet</p>
                ) : (
                  approvedMentors.map((mentor) => (
                    <div key={mentor.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium">{mentor.name}</div>
                        <div className="text-sm text-muted-foreground">{mentor.job}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewMentor(mentor)}>
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Applications</CardTitle>
              <CardDescription>List of rejected mentor applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rejectedMentors.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No rejected applications</p>
                ) : (
                  rejectedMentors.map((mentor) => (
                    <div key={mentor.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <div className="font-medium">{mentor.name}</div>
                        <div className="text-sm text-muted-foreground">{mentor.job}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewMentor(mentor)}>
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mentor View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedMentor && (
            <>
              <DialogHeader>
                <DialogTitle>Mentor Profile</DialogTitle>
                <DialogDescription>Review mentor application details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt={selectedMentor.name} />
                    <AvatarFallback>
                      {selectedMentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{selectedMentor.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedMentor.job}</p>
                    <p className="text-sm text-muted-foreground">{selectedMentor.email}</p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-medium">Bio</h4>
                  <p className="text-sm">{selectedMentor.bio}</p>
                </div>

                <div>
                  <h4 className="mb-2 font-medium">Experience</h4>
                  <p className="text-sm">{selectedMentor.experience} of professional experience</p>
                </div>

                <div>
                  <h4 className="mb-2 font-medium">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-medium">Social Links</h4>
                  <div className="flex gap-2">
                    {selectedMentor.linkedin && (
                      <a
                        href={selectedMentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {selectedMentor.github && (
                      <a
                        href={selectedMentor.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {selectedMentor.twitter && (
                      <a
                        href={selectedMentor.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  {mentorApplications.some((m) => m.id === selectedMentor.id) && (
                    <>
                      <Button variant="outline" onClick={() => handleReject(selectedMentor.id)}>
                        Reject
                      </Button>
                      <Button onClick={() => handleApprove(selectedMentor.id)}>Approve</Button>
                    </>
                  )}
                </DialogFooter>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

