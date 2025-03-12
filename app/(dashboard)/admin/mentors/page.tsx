"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Filter, Search, XCircle } from "lucide-react"

// Mock data for mentors
const mentors = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    job: "Senior Software Engineer",
    company: "Tech Corp",
    interests: ["Web Development", "Machine Learning"],
    status: "active",
    mentees: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    job: "Product Manager",
    company: "Product Inc",
    interests: ["Product Management", "UX Design"],
    status: "active",
    mentees: 3,
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@example.com",
    job: "Data Scientist",
    company: "Data Analytics Co",
    interests: ["Data Science", "AI"],
    status: "inactive",
    mentees: 0,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    job: "UX Designer",
    company: "Design Studio",
    interests: ["UI/UX", "Graphic Design"],
    status: "active",
    mentees: 4,
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    job: "CTO",
    company: "Startup XYZ",
    interests: ["Entrepreneurship", "Tech Leadership"],
    status: "pending",
    mentees: 0,
  },
  {
    id: 6,
    name: "Jennifer Lee",
    email: "j.lee@example.com",
    job: "Frontend Developer",
    company: "Web Solutions",
    interests: ["React", "JavaScript"],
    status: "active",
    mentees: 2,
  },
  {
    id: 7,
    name: "David Brown",
    email: "d.brown@example.com",
    job: "Backend Engineer",
    company: "Server Systems",
    interests: ["Node.js", "Databases"],
    status: "inactive",
    mentees: 1,
  },
  {
    id: 8,
    name: "Lisa Wang",
    email: "l.wang@example.com",
    job: "Mobile Developer",
    company: "App Creators",
    interests: ["iOS", "Android"],
    status: "pending",
    mentees: 0,
  },
]

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [jobFilter, setJobFilter] = useState("all")

  // Filter mentors based on search term and filters
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.interests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || mentor.status === statusFilter
    const matchesJob = jobFilter === "all" || mentor.job.includes(jobFilter)

    return matchesSearch && matchesStatus && matchesJob
  })

  // Get unique job titles for filter
  const jobTitles = Array.from(new Set(mentors.map((mentor) => mentor.job)))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mentors</h1>
        <p className="text-muted-foreground">Manage and view all mentors in the platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mentors List</CardTitle>
          <CardDescription>View, filter, and manage all registered mentors</CardDescription>
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

              <div className="flex gap-2">
                <div className="w-[180px]">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-[200px]">
                  <Select value={jobFilter} onValueChange={setJobFilter}>
                    <SelectTrigger>
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Job Title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Job Titles</SelectItem>
                      {jobTitles.map((job) => (
                        <SelectItem key={job} value={job}>
                          {job}
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
                    <TableHead>Job Title</TableHead>
                    <TableHead>Interests</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Mentees</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMentors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No mentors found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMentors.map((mentor) => (
                      <TableRow key={mentor.id}>
                        <TableCell className="font-medium">
                          <div>{mentor.name}</div>
                          <div className="text-sm text-muted-foreground">{mentor.email}</div>
                        </TableCell>
                        <TableCell>
                          <div>{mentor.job}</div>
                          <div className="text-sm text-muted-foreground">{mentor.company}</div>
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
                          {mentor.status === "active" ? (
                            <div className="flex items-center text-green-500">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              <span>Active</span>
                            </div>
                          ) : mentor.status === "inactive" ? (
                            <div className="flex items-center text-red-500">
                              <XCircle className="mr-1 h-4 w-4" />
                              <span>Inactive</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-yellow-500">
                              <span>Pending</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{mentor.mentees}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            {mentor.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                                >
                                  Reject
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

