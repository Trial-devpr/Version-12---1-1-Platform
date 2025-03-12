"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, RefreshCw, ExternalLink, BookOpen, FileText, Video, Code } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for resources
const resources = [
  {
    id: 1,
    title: "React Fundamentals",
    description: "A comprehensive guide to React fundamentals including hooks, components, and state management.",
    url: "https://reactjs.org/docs/getting-started.html",
    type: "documentation",
    tags: ["React", "Web Development", "Frontend"],
    addedBy: "John Smith",
    addedDate: "2025-03-01T10:00:00",
    recommended: true,
  },
  {
    id: 2,
    title: "Data Science Crash Course",
    description:
      "A crash course on data science fundamentals, covering statistics, Python, and machine learning basics.",
    url: "https://www.kaggle.com/learn/overview",
    type: "course",
    tags: ["Data Science", "Machine Learning", "Python"],
    addedBy: "Michael Chen",
    addedDate: "2025-02-25T11:00:00",
    recommended: true,
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Learn the core principles of UI/UX design with practical examples and case studies.",
    url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
    type: "article",
    tags: ["UI/UX", "Design", "User Research"],
    addedBy: "Emily Davis",
    addedDate: "2025-02-20T15:30:00",
    recommended: false,
  },
  {
    id: 4,
    title: "Product Management Handbook",
    description: "A comprehensive handbook for product managers covering product strategy, roadmaps, and execution.",
    url: "https://www.productplan.com/learn/product-management-handbook/",
    type: "ebook",
    tags: ["Product Management", "Strategy", "Roadmapping"],
    addedBy: "Sarah Johnson",
    addedDate: "2025-03-05T14:00:00",
    recommended: true,
  },
  {
    id: 5,
    title: "Introduction to Machine Learning",
    description: "A video course introducing machine learning concepts and algorithms with practical examples.",
    url: "https://www.youtube.com/watch?v=example",
    type: "video",
    tags: ["Machine Learning", "AI", "Data Science"],
    addedBy: "Michael Chen",
    addedDate: "2025-02-15T11:00:00",
    recommended: false,
  },
  {
    id: 6,
    title: "Web Development Roadmap 2025",
    description: "A comprehensive roadmap for web developers in 2025, covering frontend, backend, and DevOps.",
    url: "https://roadmap.sh/frontend",
    type: "guide",
    tags: ["Web Development", "Frontend", "Backend", "DevOps"],
    addedBy: "John Smith",
    addedDate: "2025-01-10T10:00:00",
    recommended: true,
  },
  {
    id: 7,
    title: "GitHub Repository: React Project Starter",
    description: "A starter template for React projects with TypeScript, Tailwind CSS, and testing setup.",
    url: "https://github.com/example/react-starter",
    type: "code",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    addedBy: "John Smith",
    addedDate: "2025-01-15T10:00:00",
    recommended: false,
  },
  {
    id: 8,
    title: "Product Management Case Studies",
    description: "Real-world case studies of successful product management strategies and implementations.",
    url: "https://www.productplan.com/learn/product-management-case-studies/",
    type: "article",
    tags: ["Product Management", "Case Studies", "Strategy"],
    addedBy: "Sarah Johnson",
    addedDate: "2025-02-01T14:00:00",
    recommended: false,
  },
]

// Mock data for collections
const collections = [
  {
    id: 1,
    title: "Web Development Essentials",
    description: "Essential resources for web development, covering frontend and backend technologies.",
    createdBy: "John Smith",
    resourceIds: [1, 6, 7],
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    description: "Fundamental resources for data science and machine learning.",
    createdBy: "Michael Chen",
    resourceIds: [2, 5],
  },
  {
    id: 3,
    title: "Product Management Resources",
    description: "Resources for product management, strategy, and execution.",
    createdBy: "Sarah Johnson",
    resourceIds: [4, 8],
  },
]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setTypeFilter("all")
    setTagFilter("all")
  }

  // Get all unique tags
  const allTags = new Set<string>()
  resources.forEach((resource) => {
    resource.tags.forEach((tag) => allTags.add(tag))
  })
  const tagOptions = Array.from(allTags)

  // Get all unique resource types
  const allTypes = new Set<string>()
  resources.forEach((resource) => {
    allTypes.add(resource.type)
  })
  const typeOptions = Array.from(allTypes)

  // Filter resources based on search term and filters
  const filterResources = (resourceList) => {
    return resourceList.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.addedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesType = typeFilter === "all" || resource.type === typeFilter
      const matchesTag = tagFilter === "all" || resource.tags.includes(tagFilter)

      return matchesSearch && matchesType && matchesTag
    })
  }

  // Get resources for a collection
  const getCollectionResources = (collectionId) => {
    const collection = collections.find((c) => c.id === collectionId)
    if (!collection) return []

    return resources.filter((resource) => collection.resourceIds.includes(resource.id))
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get icon for resource type
  const getResourceTypeIcon = (type) => {
    switch (type) {
      case "documentation":
        return <FileText className="h-4 w-4" />
      case "course":
        return <BookOpen className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "code":
        return <Code className="h-4 w-4" />
      default:
        return <ExternalLink className="h-4 w-4" />
    }
  }

  // Filtered resources
  const filteredResources = filterResources(resources)
  const recommendedResources = resources.filter((resource) => resource.recommended)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
        <p className="text-muted-foreground">Explore resources shared by your mentors</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="w-[180px]">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Resource Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {typeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-[180px]">
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {tagOptions.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
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

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
            {filteredResources.length === 0 ? (
              <div
                className={viewMode === "grid" ? "md:col-span-2 lg:col-span-3 text-center py-10" : "text-center py-10"}
              >
                <p className="text-muted-foreground">No resources found matching your filters.</p>
              </div>
            ) : (
              filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  viewMode={viewMode}
                  formatDate={formatDate}
                  getResourceTypeIcon={getResourceTypeIcon}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
            {recommendedResources.length === 0 ? (
              <div
                className={viewMode === "grid" ? "md:col-span-2 lg:col-span-3 text-center py-10" : "text-center py-10"}
              >
                <p className="text-muted-foreground">No recommended resources found.</p>
              </div>
            ) : (
              filterResources(recommendedResources).map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  viewMode={viewMode}
                  formatDate={formatDate}
                  getResourceTypeIcon={getResourceTypeIcon}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="collections">
          <div className="space-y-8">
            {collections.map((collection) => (
              <Card key={collection.id}>
                <CardHeader>
                  <CardTitle>{collection.title}</CardTitle>
                  <CardDescription>{collection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">Created by {collection.createdBy}</div>
                  <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
                    {filterResources(getCollectionResources(collection.id)).map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        viewMode={viewMode}
                        formatDate={formatDate}
                        getResourceTypeIcon={getResourceTypeIcon}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Resource Card Component
function ResourceCard({ resource, viewMode, formatDate, getResourceTypeIcon }) {
  if (viewMode === "grid") {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg truncate">{resource.title}</CardTitle>
            <div className="flex items-center gap-1 text-muted-foreground">
              {getResourceTypeIcon(resource.type)}
              <span className="text-xs capitalize">{resource.type}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm line-clamp-3">{resource.description}</p>

          <div className="flex flex-wrap gap-1">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            Added by {resource.addedBy} on {formatDate(resource.addedDate)}
          </div>

          <Button className="w-full gap-2" variant="outline" onClick={() => window.open(resource.url, "_blank")}>
            <ExternalLink className="h-4 w-4" />
            View Resource
          </Button>
        </CardContent>
      </Card>
    )
  } else {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{resource.title}</h3>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {getResourceTypeIcon(resource.type)}
                  <span className="text-xs capitalize">{resource.type}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                Added by {resource.addedBy} on {formatDate(resource.addedDate)}
              </div>
            </div>
            <Button
              className="gap-2 md:self-center"
              variant="outline"
              onClick={() => window.open(resource.url, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
}

