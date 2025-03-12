import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle, Clock, Users, XCircle } from "lucide-react"

export default function MenteeDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mentee Dashboard</h1>
        <p className="text-muted-foreground">Manage your mentors and upcoming sessions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Mentors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Assigned mentors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">In the next 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Session requests awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Total completed sessions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="mentors">My Mentors</TabsTrigger>
          <TabsTrigger value="history">Session History</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled mentoring sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="font-medium">Session with Mentor {i}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(Date.now() + i * 86400000).toLocaleDateString()} - 10:00 AM - 30 minutes
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Mentors</CardTitle>
              <CardDescription>Professionals assigned to mentor you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium">MP{i}</span>
                      </div>
                      <div>
                        <div className="font-medium">Mentor Professional {i}</div>
                        <div className="text-sm text-muted-foreground">Senior Developer at Tech Company {i}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <Button size="sm">Book Session</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>Your past mentoring sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="font-medium">Session with Mentor {(i % 3) + 1}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(Date.now() - i * 86400000 * 3).toLocaleDateString()} - 30 minutes
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {i % 3 === 0 ? (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          <span className="text-sm">Completed</span>
                        </div>
                      ) : i % 3 === 1 ? (
                        <div className="flex items-center text-red-500">
                          <XCircle className="mr-1 h-4 w-4" />
                          <span className="text-sm">Cancelled</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-yellow-500">
                          <Clock className="mr-1 h-4 w-4" />
                          <span className="text-sm">Rescheduled</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

