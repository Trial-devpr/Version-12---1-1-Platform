import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registration Successful</CardTitle>
            <CardDescription>Your mentor application is pending approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Thank you for registering as a mentor on Menter-Tgthr. Your application has been received and is currently
              under review by our admin team.
            </p>
            <p>
              You will receive an email notification once your application has been approved. This process typically
              takes 1-2 business days.
            </p>
            <div className="rounded-md bg-blue-50 p-4 text-blue-800">
              <p className="text-sm">
                <strong>Note:</strong> You will not be able to access the mentor dashboard until your application has
                been approved.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/login">Return to Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

