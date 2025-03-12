"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Mock data for colleges
const initialColleges = [
  {
    id: 1,
    name: "PESCE Mandya",
    code: "PES23",
    location: "Mandya, Karnataka",
    students: 42,
    mentors: 8,
    active: true,
  },
  {
    id: 2,
    name: "VVCE Mys",
    code: "VVC23",
    location: "Mysore, Karnataka",
    students: 35,
    mentors: 6,
    active: true,
  },
  {
    id: 3,
    name: "MSRIT Banglore",
    code: "MSR23",
    location: "Bangalore, Karnataka",
    students: 56,
    mentors: 12,
    active: true,
  },
]

export default function CollegesPage() {
  const [colleges, setColleges] = useState(initialColleges)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCollege, setSelectedCollege] = useState(null)

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    location: "",
  })

  // Filter colleges based on search term
  const filteredColleges = colleges.filter(
    (college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle add college
  const handleAddCollege = () => {
    const newCollege = {
      id: colleges.length + 1,
      name: formData.name,
      code: formData.code,
      location: formData.location,
      students: 0,
      mentors: 0,
      active: true,
    }

    setColleges((prev) => [...prev, newCollege])
    setFormData({ name: "", code: "", location: "" })
    setIsAddDialogOpen(false)

    toast({
      title: "College Added",
      description: `${formData.name} has been added successfully.`,
    })
  }

  // Handle edit college
  const handleEditCollege = () => {
    if (!selectedCollege) return

    setColleges((prev) =>
      prev.map((college) =>
        college.id === selectedCollege.id
          ? {
              ...college,
              name: formData.name,
              code: formData.code,
              location: formData.location,
            }
          : college,
      ),
    )

    setFormData({ name: "", code: "", location: "" })
    setSelectedCollege(null)
    setIsEditDialogOpen(false)

    toast({
      title: "College Updated",
      description: `${formData.name} has been updated successfully.`,
    })
  }

  // Handle delete college
  const handleDeleteCollege = () => {
    if (!selectedCollege) return

    setColleges((prev) => prev.filter((college) => college.id !== selectedCollege.id))
    setSelectedCollege(null)
    setIsDeleteDialogOpen(false)

    toast({
      title: "College Deleted",
      description: `${selectedCollege.name} has been deleted successfully.`,
    })
  }

  // Open edit dialog and set form data
  const openEditDialog = (college) => {
    setSelectedCollege(college)
    setFormData({
      name: college.name,
      code: college.code,
      location: college.location,
    })
    setIsEditDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (college) => {
    setSelectedCollege(college)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Colleges</h1>
        <p className="text-muted-foreground">Manage colleges registered on the platform</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Colleges List</CardTitle>
            <CardDescription>View and manage all registered colleges</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Add College
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New College</DialogTitle>
                <DialogDescription>Enter the details of the new college to add to the platform</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">College Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter college name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">College Code</Label>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="Enter college code"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter college location"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCollege}>Add College</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search colleges..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>College Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Mentors</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredColleges.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No colleges found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredColleges.map((college) => (
                      <TableRow key={college.id}>
                        <TableCell className="font-medium">{college.name}</TableCell>
                        <TableCell>{college.code}</TableCell>
                        <TableCell>{college.location}</TableCell>
                        <TableCell>{college.students}</TableCell>
                        <TableCell>{college.mentors}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              college.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {college.active ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => openEditDialog(college)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => openDeleteDialog(college)}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit College</DialogTitle>
            <DialogDescription>Update the college information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">College Name</Label>
              <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-code">College Code</Label>
              <Input id="edit-code" name="code" value={formData.code} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input id="edit-location" name="location" value={formData.location} onChange={handleInputChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCollege}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete College</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this college? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCollege}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

