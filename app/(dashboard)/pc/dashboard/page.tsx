"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, RefreshCw, Users, Calendar, CheckCircle } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Mock data for mentees
const mentees = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@college1.edu",
    department: "Computer Science",
    year: "3rd Year",
    mentor: "John Smith",
    meetingsAttended: 5,
    meetingsMissed: 1,
    lastAttendance: "2025-03-01",
  },
  {
    id: 2,
    name: "Jessica Williams",
    email: "j.williams@college1.edu",
    department: "Information Technology",
    year: "2nd Year",
    mentor: "Sarah Johnson",
    meetingsAttended: 3,
    meetingsMissed: 0,
    lastAttendance: "2025-03-05",
  },
  // Add more mentees...
]

// Mock data for upcoming meetings
const upcomingMeetings = [
  {
    id: 1,
    mentee: "Alex Johnson",
    mentor: "John Smith",
    date: "2025-03-15T10:00:00",
    duration: 30,
    topic: "Career guidance",
  },
  {
    id: 2,
    mentee: "Jessica Williams",
    mentor: "Sarah Johnson",
    date: "2025-03-16T14:00:00",
    duration: 45,
    topic: "Project review",
  },
  // Add more meetings...
]

// Mock data for charts
const attendanceData = [
  { month: "Jan", attended: 45, missed: 5 },
  { month: "Feb", attended: 52, missed: 8 },
  { month: "Mar", attended: 48, missed: 6 },
  // Add more months...
]

const departmentDistribution = [
  { name: "Computer Science", value: 25, color: "#8884d8" },
  { name: "Information Technology", value: 20, color: "#83a6ed" },
  { name: "Electronics", value: 15, color: "#8dd1e1" },
  // Add more departments...
]

const mentorMenteeRatio = [
  { month: "Jan", mentors: 8, mentees: 40 },
  { month: "Feb", mentors: 10, mentees: 45 },
  { month: "Mar", mentors: 12, mentees: 50 },
  // Add more months...
]

export default function PCDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setDepartmentFilter("all")
    setYearFilter("all")
  }

  // Filter mentees
  const filteredMentees = mentees.filter((mentee) => {
    const matchesSearch =
      mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.mentor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || mentee.department === departmentFilter
    const matchesYear = yearFilter === "all" || mentee.year === yearFilter

    return matchesSearch && matchesDepartment && matchesYear
  })

  // Format date
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">College PC Dashboard</h1>
        <p className="text-muted-foreground">Monitor your college's mentorship program</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mentees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Active students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Mentors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Working with your students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">In the next 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="mentees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mentees">Mentees</TabsTrigger>
          <TabsTrigger value="meetings">Upcoming Meetings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="mentees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>College Mentees</CardTitle>
              <CardDescription>View and monitor all mentees from your college</CardDescription>
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

                  <div className="flex flex-wrap gap-2">
                    <div className="w-[180px]">
                      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger>
                          <Filter className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Information Technology">Information Technology</SelectItem>
                          {/* Add more departments */}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-[180px]">
                      <Select value={yearFilter} onValueChange={setYearFilter}>
                        <SelectTrigger>
                          <Filter className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Years</SelectItem>
                          <SelectItem value="1st Year">1st Year</SelectItem>
                          <SelectItem value="2nd Year">2nd Year</SelectItem>
                          <SelectItem value="3rd Year">3rd Year</SelectItem>
                          <SelectItem value="4th Year">4th Year</SelectItem>
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
                        <TableHead>Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Mentor</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Last Session</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMentees.map((mentee) => (
                        <TableRow key={mentee.id}>
                          <TableCell>
                            <div className="font-medium">{mentee.name}</div>
                            <div className="text-sm text-muted-foreground">{mentee.email}</div>
                          </TableCell>
                          <TableCell>
                            <div>{mentee.department}</div>
                            <div className="text-sm text-muted-foreground">{mentee.year}</div>
                          </TableCell>
                          <TableCell>{mentee.mentor}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {mentee.meetingsAttended} attended
                              <span className="mx-1">•</span>
                              {mentee.meetingsMissed} missed
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(mentee.lastAttendance)}</TableCell>
                          <TableCell>
                            {mentee.meetingsMissed === 0 ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Good Standing
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                Needs Attention
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>View all scheduled meetings for your college's mentees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mentee</TableHead>
                      <TableHead>Mentor</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingMeetings.map((meeting) => (
                      <TableRow key={meeting.id}>
                        <TableCell>{meeting.mentee}</TableCell>
                        <TableCell>{meeting.mentor}</TableCell>
                        <TableCell>{formatDate(meeting.date)}</TableCell>
                        <TableCell>{meeting.topic}</TableCell>
                        <TableCell>{meeting.duration} minutes</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Attendance</CardTitle>
                <CardDescription>Monthly attendance statistics</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attended" fill="#22c55e" name="Attended" />
                    <Bar dataKey="missed" fill="#ef4444" name="Missed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Mentees by department</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Mentor-Mentee Ratio</CardTitle>
                <CardDescription>Monthly distribution of mentors and mentees</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mentorMenteeRatio}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="mentors" stroke="#8884d8" name="Mentors" strokeWidth={2} />
                    <Line type="monotone" dataKey="mentees" stroke="#82ca9d" name="Mentees" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

