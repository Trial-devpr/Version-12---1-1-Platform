"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Calendar, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for mentees
const mentees = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@college1.edu",
    college: "PESCE Mandya",
    program: "Computer Science",
    year: "3rd Year",
    interests: ["Web Development", "Mobile Apps"],
    sessions: 5,
    nextSession: "2025-03-10T10:00:00",
    bio: "Computer Science student passionate about web development and machine learning. Looking for guidance to navigate the tech industry.",
    github: "https://github.com/alexj",
  },
  {
    id: 2,
    name: "Jessica Williams",
    email: "j.williams@college2.edu",
    college: "VVCE Mys",
    program: "Information Technology",
    year: "2nd Year",
    interests: ["Data Science", "Cloud Computing"],
    sessions: 3,
    nextSession: "2025-03-10T14:00:00",
    bio: "IT student interested in data science and cloud computing. Seeking mentorship to develop skills in these areas.",
    github: "https://github.com/jwilliams",
  },
  {
    id: 3,
    name: "Emma Martinez",
    email: "e.martinez@college3.edu",
    college: "MSRIT Banglore",
    program: "Software Engineering",
    year: "3rd Year",
    interests: ["AI", "Machine Learning"],
    sessions: 4,
    nextSession: "2025-03-11T11:00:00",
    bio: "Software engineering student with a focus on AI and machine learning. Working on several ML projects and seeking guidance.",
    github: "https://github.com/emartinez",
  },
  {
    id: 4,
    name: "Tyler Brown",
    email: "t.brown@college2.edu",
    college: "VVCE Mys",
    program: "Computer Science",
    year: "1st Year",
    interests: ["Game Development", "AR/VR"],
    sessions: 2,
    nextSession: null,
    bio: "First-year CS student interested in game development and AR/VR technologies. Looking to learn more about these fields.",
    github: "https://github.com/tbrown",
  },
  {
    id: 5,
    name: "Ryan Davis",
    email: "r.davis@college1.edu",
    college: "PESCE Mandya",
    program: "Computer Engineering",
    year: "4th Year",
    interests: ["Embedded Systems", "IoT"],
    sessions: 6,
    nextSession: "2025-03-12T16:00:00",
    bio: "Final year computer engineering student specializing in embedded systems and IoT. Working on a smart home project for final year thesis.",
    github: "https://github.com/rdavis",
  },
]

export default function MentorMenteesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMentee, setSelectedMentee] = useState<number | null>(null)

  // Filter mentees based on search term
  const filteredMentees = mentees.filter(
    (mentee) =>
      mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.interests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No session scheduled"

    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Get mentee by ID
  const getMenteeById = (id: number) => {
    return mentees.find((mentee) => mentee.id === id) || null
  }

  // Handle book session
  const handleBookSession = (menteeId: number) => {
    console.log(`Book session with mentee ID: ${menteeId}`)
    // In a real app, you would navigate to a booking page or open a booking dialog
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Mentees</h1>
        <p className="text-muted-foreground">Manage your assigned mentees and their sessions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Mentees</CardTitle>
          <CardDescription>View and manage your mentees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mentees..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Interests</TableHead>
                    <TableHead>Sessions</TableHead>
                    <TableHead>Next Session</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMentees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No mentees found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMentees.map((mentee) => (
                      <TableRow key={mentee.id}>
                        <TableCell className="font-medium">
                          <div>{mentee.name}</div>
                          <div className="text-sm text-muted-foreground">{mentee.email}</div>
                        </TableCell>
                        <TableCell>{mentee.college}</TableCell>
                        <TableCell>
                          <div>{mentee.program}</div>
                          <div className="text-sm text-muted-foreground">{mentee.year}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {mentee.interests.map((interest) => (
                              <Badge key={interest} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{mentee.sessions}</TableCell>
                        <TableCell>{formatDate(mentee.nextSession)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setSelectedMentee(mentee.id)}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                {selectedMentee && (
                                  <>
                                    <DialogHeader>
                                      <DialogTitle>Mentee Profile</DialogTitle>
                                      <DialogDescription>Detailed information about the mentee</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-6 py-4">
                                      <div className="flex items-start gap-4">
                                        <Avatar className="h-16 w-16">
                                          <AvatarImage
                                            src="/placeholder.svg?height=64&width=64"
                                            alt={getMenteeById(selectedMentee)?.name}
                                          />
                                          <AvatarFallback>
                                            {getMenteeById(selectedMentee)
                                              ?.name.split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h3 className="text-lg font-medium">{getMenteeById(selectedMentee)?.name}</h3>
                                          <p className="text-sm text-muted-foreground">
                                            {getMenteeById(selectedMentee)?.email}
                                          </p>
                                          <p className="text-sm text-muted-foreground">
                                            {getMenteeById(selectedMentee)?.program},{" "}
                                            {getMenteeById(selectedMentee)?.year}
                                          </p>
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="mb-2 font-medium">Bio</h4>
                                        <p className="text-sm">{getMenteeById(selectedMentee)?.bio}</p>
                                      </div>

                                      <div>
                                        <h4 className="mb-2 font-medium">College</h4>
                                        <p className="text-sm">{getMenteeById(selectedMentee)?.college}</p>
                                      </div>

                                      <div>
                                        <h4 className="mb-2 font-medium">Areas of Interest</h4>
                                        <div className="flex flex-wrap gap-2">
                                          {getMenteeById(selectedMentee)?.interests.map((interest) => (
                                            <Badge key={interest} variant="secondary">
                                              {interest}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="mb-2 font-medium">Session History</h4>
                                        <p className="text-sm">
                                          Completed {getMenteeById(selectedMentee)?.sessions} sessions
                                        </p>
                                      </div>

                                      <div>
                                        <h4 className="mb-2 font-medium">Next Session</h4>
                                        <p className="text-sm">
                                          {formatDate(getMenteeById(selectedMentee)?.nextSession)}
                                        </p>
                                      </div>

                                      <div>
                                        <h4 className="mb-2 font-medium">GitHub</h4>
                                        <a
                                          href={getMenteeById(selectedMentee)?.github}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-blue-500 hover:underline"
                                        >
                                          {getMenteeById(selectedMentee)?.github}
                                        </a>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </DialogContent>
                            </Dialog>

                            <Button size="sm" onClick={() => handleBookSession(mentee.id)} className="gap-1">
                              <Calendar className="h-4 w-4" />
                              Book Session
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

