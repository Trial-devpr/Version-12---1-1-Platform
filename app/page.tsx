"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

// Mock data for approved mentors
const approvedMentors = [
  {
    id: 1,
    name: "John Smith",
    title: "Senior Software Engineer",
    company: "Tech Corp",
    expertise: ["Web Development", "Machine Learning"],
    experience: "8 years",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Product Manager",
    company: "Product Inc",
    expertise: ["Product Management", "UX Design"],
    experience: "6 years",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "Data Scientist",
    company: "Data Analytics Co",
    expertise: ["Data Science", "AI"],
    experience: "5 years",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Emily Davis",
    title: "UX Designer",
    company: "Design Studio",
    expertise: ["UI/UX", "Design Systems"],
    experience: "7 years",
    rating: 4.9,
  },
]

// Mock data for colleges
const colleges = [
  {
    name: "PESCE Mandya",
    students: 42,
    website: "https://pesce.ac.in",
  },
  {
    name: "VVCE Mysore",
    students: 35,
    website: "https://vvce.ac.in",
  },
  {
    name: "MSRIT Bangalore",
    students: 56,
    website: "https://msrit.edu",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GEC_logo.jpg-40dETDc3SwS8JGnzsxqC4rJ8W3yw8H.jpeg"
              alt="GEC Logo"
              width={40}
              height={40}
              className="dark:invert"
            />
            <span className="font-bold text-xl">Menter-Tgthr</span>
          </Link>
          <div className="flex gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" className="font-medium">
                <Link href="/login">Login</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="font-medium">
                <Link href="/register">Register</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Connect, Learn, and Grow Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Menter-Tgthr is a comprehensive platform connecting college students with industry experts, fostering
            meaningful mentorship relationships that bridge the gap between academia and industry. Our platform
            facilitates structured learning, professional development, and career guidance through one-on-one mentoring
            sessions.
          </motion.p>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Expert Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approvedMentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold">
                          {mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{mentor.title}</p>
                      <p className="text-sm text-muted-foreground mb-4">{mentor.company}</p>
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {mentor.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span>{mentor.experience} experience</span>
                        <span className="mx-2">•</span>
                        <span>{mentor.rating} rating</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Participating Colleges</h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid gap-4">
              {colleges.map((college, index) => (
                <motion.div
                  key={college.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{college.name}</h3>
                          <p className="text-sm text-muted-foreground">{college.students} students enrolled</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                          onClick={() => window.open(college.website, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Visit Website
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">Made with ❤️ by GEC</p>
        </div>
      </footer>
    </div>
  )
}

