"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, RefreshCw, Star } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for past sessions
const pastSessions = [
  {
    id: 1,
    mentor: "John Smith",
    mentorTitle: "Senior Software Engineer at Tech Corp",
    date: "2025-03-01T10:00:00",
    duration: 30,
    topic: "Career guidance in software development",
    feedback: {
      submitted: true,
      rating: 5,
      comments:
        "John was extremely helpful and provided great insights into the software development career path. I now have a much clearer understanding of what I need to focus on.",
    },
  },
  {
    id: 2,
    mentor: "Sarah Johnson",
    mentorTitle: "Product Manager at Product Inc",
    date: "2025-03-05T14:00:00",
    duration: 45,
    topic: "Product management career path",
    feedback: {
      submitted: false,
      rating: null,
      comments: "",
    },
  },
  {
    id: 3,
    mentor: "Michael Chen",
    mentorTitle: "Data Scientist at Data Analytics Co",
    date: "2025-02-25T11:00:00",
    duration: 30,
    topic: "Machine learning project review",
    feedback: {
      submitted: true,
      rating: 4,
      comments:
        "Michael provided valuable feedback on my machine learning project. His suggestions helped me improve the model accuracy significantly.",
    },
  },
  {
    id: 4,
    mentor: "Emily Davis",
    mentorTitle: "UX Designer at Design Studio",
    date: "2025-02-20T15:30:00",
    duration: 60,
    topic: "UI/UX portfolio review",
    feedback: {
      submitted: false,
      rating: null,
      comments: "",
    },
  },
]

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [feedbackFilter, setFeedbackFilter] = useState("all")
  const [selectedSession, setSelectedSession] = useState(null)
  const [feedbackRating, setFeedbackRating] = useState("5")
  const [feedbackComments, setFeedbackComments] = useState("")
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setFeedbackFilter("all")
  }

  // Filter sessions based on search term and filters
  const filteredSessions = pastSessions.filter((session) => {
    const matchesSearch =
      session.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.topic.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFeedback =
      feedbackFilter === "all" ||
      (feedbackFilter === "submitted" && session.feedback.submitted) ||
      (feedbackFilter === "pending" && !session.feedback.submitted)

    return matchesSearch && matchesFeedback
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

  // Get session by ID
  const getSessionById = (id) => {
    return pastSessions.find((session) => session.id === id) || null
  }

  // Handle submit feedback
  const handleSubmitFeedback = () => {
    // In a real app, you would send the feedback to your backend
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    })

    setShowFeedbackDialog(false)

    // Reset form
    setFeedbackRating("5")
    setFeedbackComments("")
  }

  // Render stars for rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Session Feedback</h1>
        <p className="text-muted-foreground">Provide feedback for your mentoring sessions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Past Sessions</CardTitle>
          <CardDescription>View and provide feedback for your past mentoring sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sessions..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="w-[180px]">
                  <Select value={feedbackFilter} onValueChange={setFeedbackFilter}>
                    <SelectTrigger>
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Feedback Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sessions</SelectItem>
                      <SelectItem value="submitted">Feedback Submitted</SelectItem>
                      <SelectItem value="pending">Feedback Pending</SelectItem>
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
                    <TableHead>Feedback Status</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No sessions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <div className="font-medium">{session.mentor}</div>
                          <div className="text-sm text-muted-foreground">{session.mentorTitle}</div>
                        </TableCell>
                        <TableCell>
                          <div>{formatDate(session.date)}</div>
                          <div className="text-sm text-muted-foreground">{session.duration} minutes</div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate" title={session.topic}>
                            {session.topic}
                          </div>
                        </TableCell>
                        <TableCell>
                          {session.feedback.submitted ? (
                            <span className="text-green-600">Submitted</span>
                          ) : (
                            <span className="text-yellow-600">Pending</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {session.feedback.submitted ? (
                            <div className="flex">{renderStars(session.feedback.rating)}</div>
                          ) : (
                            <span className="text-muted-foreground">Not rated</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {session.feedback.submitted ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedSession(session.id)
                                setShowFeedbackDialog(false) // Don't show the feedback form
                                // Instead, open a dialog to view the feedback
                                const dialog = document.getElementById("view-feedback-dialog")
                                if (dialog) {
                                  ;(dialog as any).showModal()
                                }
                              }}
                            >
                              View Feedback
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedSession(session.id)
                                setShowFeedbackDialog(true)
                              }}
                            >
                              Provide Feedback
                            </Button>
                          )}
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

      {/* Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
            <DialogDescription>
              Share your thoughts about your session with{" "}
              {selectedSession ? getSessionById(selectedSession)?.mentor : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Session Details</h4>
              {selectedSession && (
                <p className="text-sm">
                  {formatDate(getSessionById(selectedSession)?.date)} - {getSessionById(selectedSession)?.topic}
                </p>
              )}
            </div>
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
              <label htmlFor="comments" className="text-sm font-medium">
                Your feedback
              </label>
              <Textarea
                id="comments"
                value={feedbackComments}
                onChange={(e) => setFeedbackComments(e.target.value)}
                placeholder="Share your thoughts about the session..."
                rows={4}
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
      {/* View Feedback Dialog */}
      <dialog
        id="view-feedback-dialog"
        className="modal p-0 rounded-lg shadow-lg max-w-md w-full bg-white dark:bg-gray-800"
      >
        <div className="p-6">
          {selectedSession && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Your Feedback</h3>
                <button
                  onClick={() => {
                    const dialog = document.getElementById("view-feedback-dialog")
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
                  <h4 className="text-sm font-medium mb-1">Session Details</h4>
                  <p className="text-sm">
                    {formatDate(getSessionById(selectedSession)?.date)} - {getSessionById(selectedSession)?.topic}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Rating</h4>
                  <div className="flex">{renderStars(getSessionById(selectedSession)?.feedback.rating)}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Comments</h4>
                  <p className="text-sm whitespace-pre-line">{getSessionById(selectedSession)?.feedback.comments}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => {
                    const dialog = document.getElementById("view-feedback-dialog")
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

