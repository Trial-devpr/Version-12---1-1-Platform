"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, CheckCircle, Clock, Filter, Search, XCircle, RefreshCw, Video } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for meetings
const meetings = [
  {
    id: 1,
    mentee: "Alex Johnson",
    college: "PESCE Mandya",
    date: "2025-03-10T10:00:00",
    duration: 30,
    status: "completed",
    topic: "Career guidance in software development",
    feedback: true,
    meetingLink: "https://meet.google.com/abc-defg-hij",
    notes:
      "Discussed career paths in frontend vs backend development. Alex is interested in pursuing frontend development with React.",
  },
  {
    id: 2,
    mentee: "Jessica Williams",
    college: "VVCE Mys",
    date: "2025-03-10T14:00:00",
    duration: 45,
    status: "scheduled",
    topic: "Product management career path",
    feedback: false,
    meetingLink: "https://meet.google.com/klm-nopq-rst",
    notes: "Will discuss product management roles and necessary skills to transition from engineering to PM.",
  },
  {
    id: 3,
    mentee: "Emma Martinez",
    college: "MSRIT Banglore",
    date: "2025-03-11T11:00:00",
    duration: 30,
    status: "scheduled",
    topic: "Machine learning project review",
    feedback: false,
    meetingLink: "https://meet.google.com/uvw-xyz-123",
    notes: "Emma will present her ML project for feedback before final submission.",
  },
  {
    id: 4,
    mentee: "Tyler Brown",
    college: "VVCE Mys",
    date: "2025-03-09T15:30:00",
    duration: 60,
    status: "cancelled",
    topic: "UI/UX portfolio review",
    feedback: false,
    meetingLink: "https://meet.google.com/456-789-abc",
    notes: "Cancelled due to scheduling conflict. Will reschedule for next week.",
  },
  {
    id: 5,
    mentee: "Ryan Davis",
    college: "PESCE Mandya",
    date: "2025-03-12T16:00:00",
    duration: 30,
    status: "scheduled",
    topic: "Interview preparation",
    feedback: false,
    meetingLink: "https://meet.google.com/vwx-yz1-234",
    notes: "Mock interview session to prepare Ryan for upcoming software engineering interviews.",
  },
]

export default function MentorMeetingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedMeeting, setSelectedMeeting] = useState<number | null>(null)

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setDateFilter("all")
  }

  // Filter meetings based on search term and filters
  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.mentee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.college.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || meeting.status === statusFilter

    // Date filtering
    const meetingDate = new Date(meeting.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    let matchesDate = true
    if (dateFilter === "today") {
      const meetingDay = new Date(meetingDate)
      meetingDay.setHours(0, 0, 0, 0)
      matchesDate = meetingDay.getTime() === today.getTime()
    } else if (dateFilter === "tomorrow") {
      const meetingDay = new Date(meetingDate)
      meetingDay.setHours(0, 0, 0, 0)
      matchesDate = meetingDay.getTime() === tomorrow.getTime()
    } else if (dateFilter === "week") {
      matchesDate = meetingDate >= today && meetingDate < nextWeek
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  // Format date for display
  const formatDate = (dateString: string) => {
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

  // Get meeting details by ID
  const getMeetingById = (id: number) => {
    return meetings.find((meeting) => meeting.id === id) || null
  }

  // Handle join meeting
  const handleJoinMeeting = (meetingLink: string) => {
    window.open(meetingLink, "_blank")
  }

  // Handle reschedule meeting
  const handleRescheduleMeeting = (id: number) => {
    console.log(`Reschedule meeting with ID: ${id}`)
    // In a real app, you would open a dialog to reschedule the meeting
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Meetings</h1>
        <p className="text-muted-foreground">Manage your mentoring sessions with mentees</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Meetings</CardTitle>
          <CardDescription>View, filter, and manage your mentoring sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search meetings..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="w-[150px]">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-[150px]">
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="week">Next 7 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" onClick={resetFilters} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mentee</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMeetings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No meetings found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMeetings.map((meeting) => (
                      <TableRow key={meeting.id}>
                        <TableCell className="font-medium">{meeting.mentee}</TableCell>
                        <TableCell>{meeting.college}</TableCell>
                        <TableCell>
                          <div>{formatDate(meeting.date)}</div>
                          <div className="text-sm text-muted-foreground">{meeting.duration} minutes</div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate" title={meeting.topic}>
                            {meeting.topic}
                          </div>
                        </TableCell>
                        <TableCell>
                          {meeting.status === "scheduled" ? (
                            <div className="flex items-center text-blue-500">
                              <Clock className="mr-1 h-4 w-4" />
                              <span>Scheduled</span>
                            </div>
                          ) : meeting.status === "completed" ? (
                            <div className="flex items-center text-green-500">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              <span>Completed</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-500">
                              <XCircle className="mr-1 h-4 w-4" />
                              <span>Cancelled</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setSelectedMeeting(meeting.id)}>
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                {selectedMeeting && (
                                  <>
                                    <DialogHeader>
                                      <DialogTitle>Meeting Details</DialogTitle>
                                      <DialogDescription>Detailed information about the meeting</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="font-medium">Mentee</h4>
                                          <p className="text-sm">{getMeetingById(selectedMeeting)?.mentee}</p>
                                        </div>
                                        <div>
                                          <h4 className="font-medium">College</h4>
                                          <p className="text-sm">{getMeetingById(selectedMeeting)?.college}</p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="font-medium">Date & Time</h4>
                                          <p className="text-sm">
                                            {formatDate(getMeetingById(selectedMeeting)?.date || "")}
                                          </p>
                                        </div>
                                        <div>
                                          <h4 className="font-medium">Duration</h4>
                                          <p className="text-sm">{getMeetingById(selectedMeeting)?.duration} minutes</p>
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="font-medium">Status</h4>
                                        <p className="text-sm capitalize">{getMeetingById(selectedMeeting)?.status}</p>
                                      </div>

                                      <div>
                                        <h4 className="font-medium">Topic</h4>
                                        <p className="text-sm">{getMeetingById(selectedMeeting)?.topic}</p>
                                      </div>

                                      <div>
                                        <h4 className="font-medium">Meeting Link</h4>
                                        <a
                                          href={getMeetingById(selectedMeeting)?.meetingLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-blue-500 hover:underline"
                                        >
                                          {getMeetingById(selectedMeeting)?.meetingLink}
                                        </a>
                                      </div>

                                      <div>
                                        <h4 className="font-medium">Notes</h4>
                                        <p className="text-sm">{getMeetingById(selectedMeeting)?.notes}</p>
                                      </div>

                                      <div>
                                        <h4 className="font-medium">Feedback</h4>
                                        <p className="text-sm">
                                          {getMeetingById(selectedMeeting)?.feedback
                                            ? "Feedback has been submitted"
                                            : "No feedback submitted yet"}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </DialogContent>
                            </Dialog>

                            {meeting.status === "scheduled" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleJoinMeeting(meeting.meetingLink)}
                                  className="gap-1"
                                >
                                  <Video className="h-4 w-4" />
                                  Join
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleRescheduleMeeting(meeting.id)}>
                                  Reschedule
                                </Button>
                              </>
                            )}
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

