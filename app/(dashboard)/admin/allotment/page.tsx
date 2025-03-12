"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, Search, UserPlus } from "lucide-react"

// Mock data for mentees without mentors
const unassignedMentees = [
  {
    id: 1,
    name: "Ryan Davis",
    email: "r.davis@college1.edu",
    college: "College 1",
    program: "Computer Engineering",
    year: "4th Year",
    interests: ["Embedded Systems", "IoT"],
  },
  {
    id: 2,
    name: "Ethan Wilson",
    email: "e.wilson@college1.edu",
    college: "College 1",
    program: "Information Systems",
    year: "3rd Year",
    interests: ["Database Management", "System Analysis"],
  },
  {
    id: 3,
    name: "Maya Patel",
    email: "m.patel@college2.edu",
    college: "College 2",
    program: "Computer Science",
    year: "2nd Year",
    interests: ["AI", "Machine Learning"],
  },
  {
    id: 4,
    name: "Daniel Kim",
    email: "d.kim@college3.edu",
    college: "College 3",
    program: "Software Engineering",
    year: "1st Year",
    interests: ["Web Development", "Mobile Apps"],
  },
  {
    id: 5,
    name: "Zoe Rodriguez",
    email: "z.rodriguez@college2.edu",
    college: "College 2",
    program: "Cybersecurity",
    year: "3rd Year",
    interests: ["Network Security", "Ethical Hacking"],
  },
]

// Mock data for available mentors
const availableMentors = [
  {
    id: 1,
    name: "John Smith",
    job: "Senior Software Engineer",
    company: "Tech Corp",
    interests: ["Web Development", "Machine Learning"],
    mentees: 5,
    maxMentees: 8,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    job: "Product Manager",
    company: "Product Inc",
    interests: ["Product Management", "UX Design"],
    mentees: 3,
    maxMentees: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    job: "Data Scientist",
    company: "Data Analytics Co",
    interests: ["Data Science", "AI", "Machine Learning"],
    mentees: 2,
    maxMentees: 5,
  },
  {
    id: 4,
    name: "Emily Davis",
    job: "UX Designer",
    company: "Design Studio",
    interests: ["UI/UX", "Graphic Design"],
    mentees: 4,
    maxMentees: 6,
  },
  {
    id: 5,
    name: "Jennifer Lee",
    job: "Frontend Developer",
    company: "Web Solutions",
    interests: ["React", "JavaScript", "Web Development"],
    mentees: 2,
    maxMentees: 4,
  },
  {
    id: 6,
    name: "David Brown",
    job: "Backend Engineer",
    company: "Server Systems",
    interests: ["Node.js", "Databases", "System Analysis"],
    mentees: 1,
    maxMentees: 3,
  },
]

export default function AllotmentPage() {
  const [searchMentee, setSearchMentee] = useState("")
  const [searchMentor, setSearchMentor] = useState("")
  const [collegeFilter, setCollegeFilter] = useState("all")
  const [interestFilter, setInterestFilter] = useState("all")
  const [selectedMentee, setSelectedMentee] = useState<number | null>(null)
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null)

  // Get unique colleges for filter
  const colleges = Array.from(new Set(unassignedMentees.map((mentee) => mentee.college)))

  // Get unique interests for filter
  const allInterests = new Set<string>()
  unassignedMentees.forEach((mentee) => {
    mentee.interests.forEach((interest) => {
      allInterests.add(interest)
    })
  })
  availableMentors.forEach((mentor) => {
    mentor.interests.forEach((interest) => {
      allInterests.add(interest)
    })
  })
  const interests = Array.from(allInterests)

  // Filter mentees based on search term and filters
  const filteredMentees = unassignedMentees.filter((mentee) => {
    const matchesSearch =
      mentee.name.toLowerCase().includes(searchMentee.toLowerCase()) ||
      mentee.email.toLowerCase().includes(searchMentee.toLowerCase()) ||
      mentee.program.toLowerCase().includes(searchMentee.toLowerCase())

    const matchesCollege = collegeFilter === "all" || mentee.college === collegeFilter
    const matchesInterest = interestFilter === "all" || mentee.interests.some((interest) => interest === interestFilter)

    return matchesSearch && matchesCollege && matchesInterest
  })

  // Filter mentors based on search term and interest filter
  const filteredMentors = availableMentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchMentor.toLowerCase()) ||
      mentor.job.toLowerCase().includes(searchMentor.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchMentor.toLowerCase())

    const matchesInterest = interestFilter === "all" || mentor.interests.some((interest) => interest === interestFilter)

    const hasCapacity = mentor.mentees < mentor.maxMentees

    return matchesSearch && matchesInterest && hasCapacity
  })

  // Handle mentor assignment
  const assignMentor = () => {
    if (selectedMentee !== null && selectedMentor !== null) {
      // In a real app, you would make an API call to assign the mentor
      alert(`Assigned mentor ${selectedMentor} to mentee ${selectedMentee}`)
      setSelectedMentee(null)
      setSelectedMentor(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mentor Allotment</h1>
        <p className="text-muted-foreground">Assign mentors to mentees based on interests and availability</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Unassigned Mentees */}
        <Card>
          <CardHeader>
            <CardTitle>Unassigned Mentees</CardTitle>
            <CardDescription>Mentees who need to be assigned a mentor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search mentees..."
                    className="pl-8"
                    value={searchMentee}
                    onChange={(e) => setSearchMentee(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <Select value={collegeFilter} onValueChange={setCollegeFilter}>
                      <SelectTrigger>
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="College" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Colleges</SelectItem>
                        {colleges.map((college) => (
                          <SelectItem key={college} value={college}>
                            {college}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <Select value={interestFilter} onValueChange={setInterestFilter}>
                      <SelectTrigger>
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Interests</SelectItem>
                        {interests.map((interest) => (
                          <SelectItem key={interest} value={interest}>
                            {interest}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>College</TableHead>
                      <TableHead>Interests</TableHead>
                      <TableHead>Select</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMentees.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No mentees found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMentees.map((mentee) => (
                        <TableRow key={mentee.id} className={selectedMentee === mentee.id ? "bg-muted" : ""}>
                          <TableCell className="font-medium">
                            <div>{mentee.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {mentee.program}, {mentee.year}
                            </div>
                          </TableCell>
                          <TableCell>{mentee.college}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {mentee.interests.map((interest) => (
                                <span
                                  key={interest}
                                  className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant={selectedMentee === mentee.id ? "default" : "outline"}
                              onClick={() => setSelectedMentee(mentee.id)}
                            >
                              Select
                            </Button>
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

        {/* Available Mentors */}
        <Card>
          <CardHeader>
            <CardTitle>Available Mentors</CardTitle>
            <CardDescription>Mentors with capacity to take on more mentees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search mentors..."
                  className="pl-8"
                  value={searchMentor}
                  onChange={(e) => setSearchMentor(e.target.value)}
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Expertise</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Select</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMentors.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No mentors found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMentors.map((mentor) => (
                        <TableRow key={mentor.id} className={selectedMentor === mentor.id ? "bg-muted" : ""}>
                          <TableCell className="font-medium">
                            <div>{mentor.name}</div>
                            <div className="text-sm text-muted-foreground">{mentor.job}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {mentor.interests.map((interest) => (
                                <span
                                  key={interest}
                                  className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {mentor.mentees}/{mentor.maxMentees} mentees
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant={selectedMentor === mentor.id ? "default" : "outline"}
                              onClick={() => setSelectedMentor(mentor.id)}
                            >
                              Select
                            </Button>
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

      <div className="flex justify-center">
        <Button
          size="lg"
          disabled={selectedMentee === null || selectedMentor === null}
          onClick={assignMentor}
          className="gap-2"
        >
          <UserPlus className="h-5 w-5" />
          Assign Mentor to Mentee
        </Button>
      </div>
    </div>
  )
}

