"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Search, Filter, RefreshCw } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Mock data for mentors
const mentors = [
  {
    id: 1,
    name: "John Smith",
    title: "Senior Software Engineer",
    company: "Tech Corp",
    expertise: ["Web Development", "Machine Learning", "Mobile Apps"],
    availability: [
      { date: "2025-03-15", slots: ["10:00", "14:00", "16:00"] },
      { date: "2025-03-16", slots: ["09:00", "11:00", "15:00"] },
      { date: "2025-03-17", slots: ["10:00", "13:00", "17:00"] },
    ],
    rating: 4.8,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Product Manager",
    company: "Product Inc",
    expertise: ["Product Management", "UX Design", "Agile Methodologies"],
    availability: [
      { date: "2025-03-15", slots: ["09:00", "13:00", "15:00"] },
      { date: "2025-03-16", slots: ["10:00", "14:00", "16:00"] },
      { date: "2025-03-17", slots: ["11:00", "15:00", "17:00"] },
    ],
    rating: 4.9,
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "Data Scientist",
    company: "Data Analytics Co",
    expertise: ["Data Science", "AI", "Machine Learning"],
    availability: [
      { date: "2025-03-15", slots: ["11:00", "15:00", "17:00"] },
      { date: "2025-03-16", slots: ["09:00", "13:00", "16:00"] },
      { date: "2025-03-17", slots: ["10:00", "14:00", "16:00"] },
    ],
    rating: 4.7,
  },
  {
    id: 4,
    name: "Emily Davis",
    title: "UX Designer",
    company: "Design Studio",
    expertise: ["UI/UX", "Graphic Design", "User Research"],
    availability: [
      { date: "2025-03-15", slots: ["09:00", "12:00", "16:00"] },
      { date: "2025-03-16", slots: ["10:00", "14:00", "17:00"] },
      { date: "2025-03-17", slots: ["11:00", "15:00", "18:00"] },
    ],
    rating: 4.9,
  },
]

export default function BookSessionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expertiseFilter, setExpertiseFilter] = useState("all")
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [sessionTopic, setSessionTopic] = useState("")
  const [sessionNotes, setSessionNotes] = useState("")
  const [sessionDuration, setSessionDuration] = useState("30")
  const [step, setStep] = useState(1)

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setExpertiseFilter("all")
  }

  // Get all unique expertise areas
  const allExpertise = new Set<string>()
  mentors.forEach((mentor) => {
    mentor.expertise.forEach((exp) => allExpertise.add(exp))
  })
  const expertiseOptions = Array.from(allExpertise)

  // Filter mentors based on search term and filters
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesExpertise = expertiseFilter === "all" || mentor.expertise.includes(expertiseFilter)

    return matchesSearch && matchesExpertise
  })

  // Get mentor by ID
  const getMentorById = (id) => {
    return mentors.find((mentor) => mentor.id === id) || null
  }

  // Get available dates for selected mentor
  const getAvailableDates = () => {
    if (!selectedMentor) return []
    const mentor = getMentorById(selectedMentor)
    return mentor ? mentor.availability.map((a) => a.date) : []
  }

  // Get available time slots for selected mentor and date
  const getAvailableTimeSlots = () => {
    if (!selectedMentor || !selectedDate) return []
    const mentor = getMentorById(selectedMentor)
    if (!mentor) return []

    const dateAvailability = mentor.availability.find((a) => a.date === selectedDate)
    return dateAvailability ? dateAvailability.slots : []
  }

  // Handle mentor selection
  const handleSelectMentor = (id) => {
    setSelectedMentor(id)
    setSelectedDate("")
    setSelectedTime("")
    setStep(2)
  }

  // Handle date selection
  const handleSelectDate = (date) => {
    setSelectedDate(date)
    setSelectedTime("")
  }

  // Handle time selection
  const handleSelectTime = (time) => {
    setSelectedTime(time)
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Handle book session
  const handleBookSession = () => {
    // In a real app, you would send the booking request to your backend
    toast({
      title: "Session booked",
      description: `Your session with ${getMentorById(selectedMentor)?.name} has been booked successfully.`,
    })

    // Reset form and go back to step 1
    setSelectedMentor(null)
    setSelectedDate("")
    setSelectedTime("")
    setSessionTopic("")
    setSessionNotes("")
    setSessionDuration("30")
    setStep(1)
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Book a Session</h1>
        <p className="text-muted-foreground">Schedule a mentoring session with one of our mentors</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Step 1: Select Mentor */}
        <Card className={`md:col-span-3 ${step !== 1 ? "hidden" : ""}`}>
          <CardHeader>
            <CardTitle>Step 1: Select a Mentor</CardTitle>
            <CardDescription>Choose a mentor to book a session with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search mentors..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="w-[200px]">
                    <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                      <SelectTrigger>
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Expertise</SelectItem>
                        {expertiseOptions.map((expertise) => (
                          <SelectItem key={expertise} value={expertise}>
                            {expertise}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="outline" onClick={resetFilters} className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Reset Filters
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredMentors.length === 0 ? (
                  <div className="md:col-span-2 lg:col-span-3 text-center py-10">
                    <p className="text-muted-foreground">No mentors found matching your filters.</p>
                  </div>
                ) : (
                  filteredMentors.map((mentor) => (
                    <Card
                      key={mentor.id}
                      className={`overflow-hidden ${selectedMentor === mentor.id ? "border-primary" : ""}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" alt={mentor.name} />
                            <AvatarFallback>
                              {mentor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{mentor.name}</CardTitle>
                            <CardDescription>
                              {mentor.title} at {mentor.company}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-1">
                          {mentor.expertise.map((exp) => (
                            <Badge key={exp} variant="secondary" className="text-xs">
                              {exp}
                            </Badge>
                          ))}
                        </div>

                        <div className="text-sm space-y-1">
                          <p>
                            <span className="font-medium">Rating:</span> {mentor.rating}/5
                          </p>
                          <p>
                            <span className="font-medium">Available Dates:</span> {mentor.availability.length}
                          </p>
                        </div>

                        <Button className="w-full" onClick={() => handleSelectMentor(mentor.id)}>
                          Select Mentor
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Select Date and Time */}
        <Card className={`md:col-span-2 ${step !== 2 ? "hidden" : ""}`}>
          <CardHeader>
            <CardTitle>Step 2: Select Date and Time</CardTitle>
            <CardDescription>Choose an available slot for your session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {selectedMentor && (
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt={getMentorById(selectedMentor)?.name} />
                    <AvatarFallback>
                      {getMentorById(selectedMentor)
                        ?.name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{getMentorById(selectedMentor)?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {getMentorById(selectedMentor)?.title} at {getMentorById(selectedMentor)?.company}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Available Dates
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {getAvailableDates().map((date) => (
                      <Button
                        key={date}
                        variant={selectedDate === date ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => handleSelectDate(date)}
                      >
                        {formatDate(date)}
                      </Button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Available Time Slots
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {getAvailableTimeSlots().map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => handleSelectTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime}>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Session Details */}
        <Card className={`md:col-span-2 ${step !== 3 ? "hidden" : ""}`}>
          <CardHeader>
            <CardTitle>Step 3: Session Details</CardTitle>
            <CardDescription>Provide details for your mentoring session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {selectedMentor && selectedDate && selectedTime && (
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="font-medium">Session with {getMentorById(selectedMentor)?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(selectedDate)} at {selectedTime}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="topic" className="text-sm font-medium">
                    Session Topic
                  </label>
                  <Input
                    id="topic"
                    placeholder="What would you like to discuss?"
                    value={sessionTopic}
                    onChange={(e) => setSessionTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">
                    Additional Notes
                  </label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific questions or topics you'd like to cover?"
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="duration" className="text-sm font-medium">
                    Session Duration
                  </label>
                  <Select value={sessionDuration} onValueChange={setSessionDuration}>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleBookSession} disabled={!sessionTopic}>
                  Book Session
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar - only visible in steps 2 and 3 */}
        <Card className={`md:col-span-1 ${step === 1 ? "hidden" : ""}`}>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedMentor && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Mentor</h3>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt={getMentorById(selectedMentor)?.name}
                      />
                      <AvatarFallback>
                        {getMentorById(selectedMentor)
                          ?.name.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{getMentorById(selectedMentor)?.name}</span>
                  </div>
                </div>
              )}

              {selectedDate && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Date</h3>
                  <p>{formatDate(selectedDate)}</p>
                </div>
              )}

              {selectedTime && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Time</h3>
                  <p>{selectedTime}</p>
                </div>
              )}

              {step === 3 && (
                <>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Duration</h3>
                    <p>{sessionDuration} minutes</p>
                  </div>

                  {sessionTopic && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Topic</h3>
                      <p>{sessionTopic}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

