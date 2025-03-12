"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Filter, Search, XCircle } from "lucide-react"

// Mock data for mentees
const mentees = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@college1.edu",
    college: "College 1",
    program: "Computer Science",
    year: "3rd Year",
    interests: ["Web Development", "Mobile Apps"],
    status: "active",
    mentor: "John Smith",
  },
  {
    id: 2,
    name: "Jessica Williams",
    email: "j.williams@college2.edu",
    college: "College 2",
    program: "Information Technology",
    year: "2nd Year",
    interests: ["Data Science", "Cloud Computing"],
    status: "active",
    mentor: "Sarah Johnson",
  },
  {
    id: 3,
    name: "Ryan Davis",
    email: "r.davis@college1.edu",
    college: "College 1",
    program: "Computer Engineering",
    year: "4th Year",
    interests: ["Embedded Systems", "IoT"],
    status: "inactive",
    mentor: null,
  },
  {
    id: 4,
    name: "Emma Martinez",
    email: "e.martinez@college3.edu",
    college: "College 3",
    program: "Software Engineering",
    year: "3rd Year",
    interests: ["AI", "Machine Learning"],
    status: "active",
    mentor: "Michael Chen",
  },
  {
    id: 5,
    name: "Tyler Brown",
    email: "t.brown@college2.edu",
    college: "College 2",
    program: "Computer Science",
    year: "1st Year",
    interests: ["Game Development", "AR/VR"],
    status: "active",
    mentor: "Emily Davis",
  },
  {
    id: 6,
    name: "Sophia Garcia",
    email: "s.garcia@college3.edu",
    college: "College 3",
    program: "UI/UX Design",
    year: "2nd Year",
    interests: ["UI Design", "User Research"],
    status: "active",
    mentor: "Jennifer Lee",
  },
  {
    id: 7,
    name: "Ethan Wilson",
    email: "e.wilson@college1.edu",
    college: "College 1",
    program: "Information Systems",
    year: "3rd Year",
    interests: ["Database Management", "System Analysis"],
    status: "inactive",
    mentor: null,
  },
  {
    id: 8,
    name: "Olivia Thompson",
    email: "o.thompson@college2.edu",
    college: "College 2",
    program: "Cybersecurity",
    year: "4th Year",
    interests: ["Network Security", "Ethical Hacking"],
    status: "active",
    mentor: "David Brown",
  },
]

export default function MenteesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [collegeFilter, setCollegeFilter] = useState("all")
  const [mentorFilter, setMentorFilter] = useState("all")

  // Filter mentees based on search term and filters
  const filteredMentees = mentees.filter((mentee) => {
    const matchesSearch =
      mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.interests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCollege = collegeFilter === "all" || mentee.college === collegeFilter
    const matchesMentor =
      mentorFilter === "all" ||
      (mentorFilter === "assigned" && mentee.mentor) ||
      (mentorFilter === "unassigned" && !mentee.mentor)

    return matchesSearch && matchesCollege && matchesMentor
  })

  // Get unique colleges for filter
  const colleges = Array.from(new Set(mentees.map((mentee) => mentee.college)))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mentees</h1>
        <p className="text-muted-foreground">Manage and view all mentees in the platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mentees List</CardTitle>
          <CardDescription>View, filter, and manage all registered mentees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search mentees..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <div className="w-[180px]">
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

                <div className="w-[200px]">
                  <Select value={mentorFilter} onValueChange={setMentorFilter}>
                    <SelectTrigger>
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Mentor Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Mentees</SelectItem>
                      <SelectItem value="assigned">With Mentor</SelectItem>
                      <SelectItem value="unassigned">Without Mentor</SelectItem>
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
                    <TableHead>Program</TableHead>
                    <TableHead>Interests</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Mentor</TableHead>
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
                          {mentee.status === "active" ? (
                            <div className="flex items-center text-green-500">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              <span>Active</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-500">
                              <XCircle className="mr-1 h-4 w-4" />
                              <span>Inactive</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {mentee.mentor ? (
                            <span>{mentee.mentor}</span>
                          ) : (
                            <span className="text-muted-foreground">Not assigned</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              {mentee.mentor ? "Change Mentor" : "Assign Mentor"}
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

