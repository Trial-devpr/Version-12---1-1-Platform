"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Calendar, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for assigned mentors
const assignedMentors = [
  {
    id: 1,
    name: "John Smith",
    title: "Senior Software Engineer",
    company: "Tech Corp",
    experience: "8 years",
    expertise: ["Web Development", "Machine Learning", "Mobile Apps"],
    bio: "Experienced software developer with a passion for mentoring junior developers and helping them grow in their careers.",
    linkedin: "https://linkedin.com/in/johnsmith",
    github: "https://github.com/johnsmith",
    sessions: 5,
    nextSession: "2025-03-10T10:00:00",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Product Manager",
    company: "Product Inc",
    experience: "6 years",
    expertise: ["Product Management", "UX Design", "Agile Methodologies"],
    bio: "Product manager with experience in both startups and enterprise companies. Passionate about helping others navigate the product management career path.",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    twitter: "https://twitter.com/sarahj",
    sessions: 3,
    nextSession: "2025-03-15T14:00:00",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "Data Scientist",
    company: "Data Analytics Co",
    experience: "5 years",
    expertise: ["Data Science", "AI", "Machine Learning"],
    bio: "Data scientist with a background in machine learning and AI. Eager to share knowledge and help students break into the field.",
    linkedin: "https://linkedin.com/in/michaelchen",
    github: "https://github.com/mchen",
    sessions: 4,
    nextSession: "2025-03-20T11:00:00",
    rating: 4.7,
  },
]

// Mock data for recommended mentors
const recommendedMentors = [
  {
    id: 4,
    name: "Emily Davis",
    title: "UX Designer",
    company: "Design Studio",
    experience: "7 years",
    expertise: ["UI/UX", "Graphic Design", "User Research"],
    bio: "UX designer with a focus on creating intuitive and accessible user experiences. Passionate about mentoring the next generation of designers.",
    linkedin: "https://linkedin.com/in/emilydavis",
    sessions: 0,
    nextSession: null,
    rating: 4.9,
  },
  {
    id: 5,
    name: "Robert Wilson",
    title: "CTO",
    company: "Startup XYZ",
    experience: "12 years",
    expertise: ["Entrepreneurship", "Tech Leadership", "System Architecture"],
    bio: "Experienced CTO with a background in startups and enterprise companies. Passionate about helping others grow their technical leadership skills.",
    linkedin: "https://linkedin.com/in/robertwilson",
    sessions: 0,
    nextSession: null,
    rating: 4.8,
  },
  {
    id: 6,
    name: "Jennifer Lee",
    title: "Frontend Developer",
    company: "Web Solutions",
    experience: "4 years",
    expertise: ["React", "JavaScript", "Web Development"],
    bio: "Frontend developer specializing in React and modern JavaScript. Enjoys helping others learn web development fundamentals and best practices.",
    linkedin: "https://linkedin.com/in/jenniferlee",
    github: "https://github.com/jlee",
    sessions: 0,
    nextSession: null,
    rating: 4.6,
  },
  {
    id: 7,
    name: "David Brown",
    title: "Backend Engineer",
    company: "Server Systems",
    experience: "9 years",
    expertise: ["Node.js", "Databases", "System Design"],
    bio: "Backend engineer with expertise in scalable systems and database optimization. Enjoys mentoring on system design and backend architecture.",
    linkedin: "https://linkedin.com/in/davidbrown",
    github: "https://github.com/dbrown",
    sessions: 0,
    nextSession: null,
    rating: 4.7,
  },
]

export default function MenteeMentorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expertiseFilter, setExpertiseFilter] = useState("all")
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [bookingDate, setBookingDate] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [bookingTopic, setBookingTopic] = useState("")

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setExpertiseFilter("all")
  }

  // Get all unique expertise areas
  const allExpertise = new Set<string>()

  // Add expertise from assigned mentors
  assignedMentors.forEach((mentor) => {
    mentor.expertise.forEach((exp) => allExpertise.add(exp))
  })

  // Add expertise from recommended mentors
  recommendedMentors.forEach((mentor) => {
    mentor.expertise.forEach((exp) => allExpertise.add(exp))
  })

  const expertiseOptions = Array.from(allExpertise)

  // Filter mentors based on search term and filters
  const filterMentors = (mentors) => {
    return mentors.filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.expertise.some((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesExpertise = expertiseFilter === "all" || mentor.expertise.includes(expertiseFilter)

      return matchesSearch && matchesExpertise
    })
  }

  const filteredAssignedMentors = filterMentors(assignedMentors)
  const filteredRecommendedMentors = filterMentors(recommendedMentors)

  // Format date for display
  const formatDate = (dateString) => {
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

  // Get mentor by ID
  const getMentorById = (id) => {
    return [...assignedMentors, ...recommendedMentors].find((mentor) => mentor.id === id) || null
  }

  // Handle book session
  const handleBookSession = () => {
    setShowBookingDialog(false)
    // In a real app, you would send the booking request to your backend
    alert(`Booking request sent for ${getMentorById(selectedMentor)?.name} on ${bookingDate} at ${bookingTime}`)

    // Reset form
    setBookingDate("")
    setBookingTime("")
    setBookingTopic("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Mentors</h1>
        <p className="text-muted-foreground">View your assigned mentors and find new ones</p>
      </div>

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

      <Tabs defaultValue="assigned" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assigned">My Assigned Mentors</TabsTrigger>
          <TabsTrigger value="recommended">Recommended Mentors</TabsTrigger>
        </TabsList>

        <TabsContent value="assigned">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAssignedMentors.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-10">
                <p className="text-muted-foreground">No assigned mentors found matching your filters.</p>
              </div>
            ) : (
              filteredAssignedMentors.map((mentor) => (
                <Card key={mentor.id} className="overflow-hidden">
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

                    <div className="text-sm">
                      <p className="line-clamp-3">{mentor.bio}</p>
                    </div>

                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Experience:</span> {mentor.experience}
                      </p>
                      <p>
                        <span className="font-medium">Rating:</span> {mentor.rating}/5
                      </p>
                      <p>
                        <span className="font-medium">Sessions:</span> {mentor.sessions} completed
                      </p>
                      <p>
                        <span className="font-medium">Next Session:</span> {formatDate(mentor.nextSession)}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSelectedMentor(mentor.id)
                          setShowBookingDialog(true)
                        }}
                      >
                        View Profile
                      </Button>

                      <Button
                        className="flex-1 gap-1"
                        onClick={() => {
                          setSelectedMentor(mentor.id)
                          setShowBookingDialog(true)
                        }}
                      >
                        <Calendar className="h-4 w-4" />
                        Book Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecommendedMentors.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-10">
                <p className="text-muted-foreground">No recommended mentors found matching your filters.</p>
              </div>
            ) : (
              filteredRecommendedMentors.map((mentor) => (
                <Card key={mentor.id} className="overflow-hidden">
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

                    <div className="text-sm">
                      <p className="line-clamp-3">{mentor.bio}</p>
                    </div>

                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Experience:</span> {mentor.experience}
                      </p>
                      <p>
                        <span className="font-medium">Rating:</span> {mentor.rating}/5
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSelectedMentor(mentor.id)
                          setShowBookingDialog(false)
                        }}
                      >
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book a Session</DialogTitle>
            <DialogDescription>
              Schedule a mentoring session with {selectedMentor ? getMentorById(selectedMentor)?.name : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <Input
                id="date"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium">
                Time
              </label>
              <Input id="time" type="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label htmlFor="topic" className="text-sm font-medium">
                Session Topic
              </label>
              <Input
                id="topic"
                placeholder="What would you like to discuss?"
                value={bookingTopic}
                onChange={(e) => setBookingTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="duration" className="text-sm font-medium">
                Duration
              </label>
              <Select defaultValue="30">
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
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleBookSession}>Book Session</Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Mentor Profile Dialog */}
      <Dialog
        open={selectedMentor !== null && !showBookingDialog}
        onOpenChange={(open) => {
          if (!open) setSelectedMentor(null)
        }}
      >
        <DialogContent className="max-w-2xl">
          {selectedMentor && (
            <>
              <DialogHeader>
                <DialogTitle>Mentor Profile</DialogTitle>
                <DialogDescription>Detailed information about {getMentorById(selectedMentor)?.name}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt={getMentorById(selectedMentor)?.name} />
                    <AvatarFallback>
                      {getMentorById(selectedMentor)
                        ?.name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{getMentorById(selectedMentor)?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {getMentorById(selectedMentor)?.title} at {getMentorById(selectedMentor)?.company}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getMentorById(selectedMentor)?.experience} of experience
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-medium">Bio</h4>
                  <p className="text-sm">{getMentorById(selectedMentor)?.bio}</p>
                </div>

                <div>
                  <h4 className="mb-2 font-medium">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {getMentorById(selectedMentor)?.expertise.map((exp) => (
                      <Badge key={exp} variant="secondary">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-medium">Social Links</h4>
                  <div className="flex gap-2">
                    {getMentorById(selectedMentor)?.linkedin && (
                      <a
                        href={getMentorById(selectedMentor)?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {getMentorById(selectedMentor)?.github && (
                      <a
                        href={getMentorById(selectedMentor)?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {getMentorById(selectedMentor)?.twitter && (
                      <a
                        href={getMentorById(selectedMentor)?.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-medium">Session History</h4>
                  <p className="text-sm">
                    You have completed {getMentorById(selectedMentor)?.sessions} sessions with this mentor.
                  </p>
                  {getMentorById(selectedMentor)?.nextSession && (
                    <p className="text-sm mt-1">
                      Next session: {formatDate(getMentorById(selectedMentor)?.nextSession)}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

