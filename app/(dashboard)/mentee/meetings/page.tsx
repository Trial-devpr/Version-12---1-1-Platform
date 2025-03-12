"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Clock, Filter, Search, XCircle, RefreshCw, Video, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Mock data for meetings
const meetings = [
  {
    id: 1,
    mentor: "John Smith",
    mentorTitle: "Senior Software Engineer at Tech Corp",
    date: "2025-03-10T10:00:00",
    duration: 30,
    status: "completed",
    topic: "Career guidance in software development",
    feedback: true,
    meetingLink: "https://meet.google.com/abc-defg-hij",
    notes:
      "Discussed career paths in frontend vs backend development. Alex is interested in pursuing frontend development with React.",
    resources: [
      { name: "Frontend Roadmap", url: "https://roadmap.sh/frontend" },
      { name: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
    ],
  },
  {
    id: 2,
    mentor: "Sarah Johnson",
    mentorTitle: "Product Manager at Product Inc",
    date: "2025-03-15T14:00:00",
    duration: 45,
    status: "scheduled",
    topic: "Product management career path",
    feedback: false,
    meetingLink: "https://meet.google.com/klm-nopq-rst",
    notes: "",
    resources: [],
  },
  {
    id: 3,
    mentor: "Michael Chen",
    mentorTitle: "Data Scientist at Data Analytics Co",
    date: "2025-03-20T11:00:00",
    duration: 30,
    status: "scheduled",
    topic: "Machine learning project review",
    feedback: false,
    meetingLink: "https://meet.google.com/uvw-xyz-123",
    notes: "",
    resources: [],
  },
  {
    id: 4,
    mentor: "Emily Davis",
    mentorTitle: "UX Designer at Design Studio",
    date: "2025-03-05T15:30:00",
    duration: 60,
    status: "completed",
    topic: "UI/UX portfolio review",
    feedback: true,
    meetingLink: "https://meet.google.com/456-789-abc",
    notes:
      "Reviewed portfolio and provided feedback on UI/UX design principles. Suggested improvements for user flow and visual hierarchy.",
    resources: [
      { name: "UI/UX Best Practices", url: "https://www.nngroup.com/articles/ten-usability-heuristics/" },
      { name: "Design Systems Guide", url: "https://www.designsystems.com/" },
    ],
  },
  {
    id: 5,
    mentor: "David Brown",
    mentorTitle: "Backend Engineer at Server Systems",
    date: "2025-02-28T13:00:00",
    duration: 30,
    status: "cancelled",
    topic: "Database optimization strategies",
    feedback: false,
    meetingLink: "https://meet.google.com/def-ghi-jkl",
    notes: "Cancelled due to scheduling conflict.",
    resources: [],
  },
]

export default function MenteeMeetingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackRating, setFeedbackRating] = useState("5")
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
  }

  // Filter meetings based on search term and filters
  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.topic.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || meeting.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Format date for display
  const formatDate = (dateString) => {
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

  // Get meeting by ID
  const getMeetingById = (id) => {
    return meetings.find((meeting) => meeting.id === id) || null
  }

  // Handle join meeting
  const handleJoinMeeting = (meetingLink) => {
    window.open(meetingLink, "_blank")
  }

  // Handle reschedule meeting
  const handleRescheduleMeeting = (id) => {
    toast({
      title: "Reschedule requested",
      description: "Your request to reschedule this meeting has been sent to the mentor.",
    })
  }

  // Handle cancel meeting
  const handleCancelMeeting = (id) => {
    toast({
      title: "Meeting cancelled",
      description: "The meeting has been cancelled successfully.",
    })
  }

  // Handle submit feedback
  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    })
    setShowFeedbackDialog(false)
  }

  // Separate meetings by status
  const upcomingMeetings = filteredMeetings.filter((meeting) => meeting.status === "scheduled")
  const pastMeetings = filteredMeetings.filter(
    (meeting) => meeting.status === "completed" || meeting.status === "cancelled",
  )

  return (
    <div className="space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Meetings</h1>
        <p className="text-muted-foreground">Manage your mentoring sessions and view meeting history</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Meetings</TabsTrigger>
          <TabsTrigger value="past">Past Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>View and manage your scheduled mentoring sessions</CardDescription>
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
                        <TableHead>Mentor</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Topic</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingMeetings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No upcoming meetings found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        upcomingMeetings.map((meeting) => (
                          <TableRow key={meeting.id}>
                            <TableCell>
                              <div className="font-medium">{meeting.mentor}</div>
                              <div className="text-sm text-muted-foreground">{meeting.mentorTitle}</div>
                            </TableCell>
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
                              <div className="flex items-center text-blue-500">
                                <Clock className="mr-1 h-4 w-4" />
                                <span>Scheduled</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
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
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() => handleCancelMeeting(meeting.id)}
                                >
                                  Cancel
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
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Past Meetings</CardTitle>
              <CardDescription>View your completed and cancelled meetings</CardDescription>
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
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
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
                        <TableHead>Mentor</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Topic</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastMeetings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No past meetings found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        pastMeetings.map((meeting) => (
                          <TableRow key={meeting.id}>
                            <TableCell>
                              <div className="font-medium">{meeting.mentor}</div>
                              <div className="text-sm text-muted-foreground">{meeting.mentorTitle}</div>
                            </TableCell>
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
                              {meeting.status === "completed" ? (
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
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedMeeting(meeting.id)
                                    // Open the dialog
                                    const dialog = document.getElementById("view-notes-dialog")
                                    if (dialog) {
                                      ;(dialog as any).showModal()
                                    }
                                  }}
                                >
                                  <FileText className="h-4 w-4 mr-1" />
                                  View Notes
                                </Button>

                                {meeting.status === "completed" && !meeting.feedback && (
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      setSelectedMeeting(meeting.id)
                                      setShowFeedbackDialog(true)
                                    }}
                                  >
                                    Provide Feedback
                                  </Button>
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
        </TabsContent>
      </Tabs>

      {/* Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
            <DialogDescription>
              Share your thoughts about your session with{" "}
              {selectedMeeting ? getMeetingById(selectedMeeting)?.mentor : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="rating" className="text-sm font-medium">
                How would you rate this session? (1-5)
              </label>
              <Select value={feedbackRating} onValueChange={setFeedbackRating}>
                <SelectTrigger id="rating">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Poor</SelectItem>
                  <SelectItem value="2">2 - Below Average</SelectItem>
                  <SelectItem value="3">3 - Average</SelectItem>
                  <SelectItem value="4">4 - Good</SelectItem>
                  <SelectItem value="5">5 - Excellent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="feedback" className="text-sm font-medium">
                Your feedback
              </label>
              <textarea
                id="feedback"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full min-h-[100px] p-2 border rounded-md"
                placeholder="Share your thoughts about the session..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* View Notes Dialog */}
      <dialog
        id="view-notes-dialog"
        className="modal p-0 rounded-lg shadow-lg max-w-2xl w-full bg-white dark:bg-gray-800"
      >
        <div className="p-6">
          {selectedMeeting && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Meeting Notes & Resources</h3>
                <button
                  onClick={() => {
                    const dialog = document.getElementById("view-notes-dialog")
                    if (dialog) {
                      ;(dialog as any).close()
                    }
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="grid gap-4">
                <div>
                  <h4 className="font-medium mb-2">Meeting Details</h4>
                  <p className="text-sm">
                    <strong>Date:</strong> {formatDate(getMeetingById(selectedMeeting)?.date)}
                  </p>
                  <p className="text-sm">
                    <strong>Duration:</strong> {getMeetingById(selectedMeeting)?.duration} minutes
                  </p>
                  <p className="text-sm">
                    <strong>Topic:</strong> {getMeetingById(selectedMeeting)?.topic}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Mentor Notes</h4>
                  <p className="text-sm whitespace-pre-line">
                    {getMeetingById(selectedMeeting)?.notes || "No notes provided for this meeting."}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Resources Shared</h4>
                  {getMeetingById(selectedMeeting)?.resources.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {getMeetingById(selectedMeeting)?.resources.map((resource, index) => (
                        <li key={index} className="text-sm">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {resource.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No resources were shared for this meeting.</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => {
                    const dialog = document.getElementById("view-notes-dialog")
                    if (dialog) {
                      ;(dialog as any).close()
                    }
                  }}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  )
}

