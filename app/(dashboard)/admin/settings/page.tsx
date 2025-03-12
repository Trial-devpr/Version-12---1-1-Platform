"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "Menter-Tgthr",
    supportEmail: "support@menter-tgthr.com",
    maxMenteesPerMentor: "5",
    defaultSessionDuration: "30",
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@menter-tgthr.com",
    smtpPassword: "••••••••••••",
    senderName: "Menter-Tgthr Support",
    senderEmail: "notifications@menter-tgthr.com",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    enableMentorApprovalEmails: true,
    enableSessionReminderEmails: true,
    enableFeedbackRequestEmails: true,
    sessionReminderHours: "24",
    feedbackReminderHours: "48",
  })

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmailSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNotificationSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const saveGeneralSettings = () => {
    // In a real app, you would save these settings to your backend
    toast({
      title: "Settings saved",
      description: "General settings have been updated successfully.",
    })
  }

  const saveEmailSettings = () => {
    // In a real app, you would save these settings to your backend
    toast({
      title: "Settings saved",
      description: "Email settings have been updated successfully.",
    })
  }

  const saveNotificationSettings = () => {
    // In a real app, you would save these settings to your backend
    toast({
      title: "Settings saved",
      description: "Notification settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage platform settings and configurations</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic platform settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input
                  id="platformName"
                  name="platformName"
                  value={generalSettings.platformName}
                  onChange={handleGeneralSettingsChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  name="supportEmail"
                  type="email"
                  value={generalSettings.supportEmail}
                  onChange={handleGeneralSettingsChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxMenteesPerMentor">Maximum Mentees Per Mentor</Label>
                <Input
                  id="maxMenteesPerMentor"
                  name="maxMenteesPerMentor"
                  type="number"
                  value={generalSettings.maxMenteesPerMentor}
                  onChange={handleGeneralSettingsChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultSessionDuration">Default Session Duration (minutes)</Label>
                <Input
                  id="defaultSessionDuration"
                  name="defaultSessionDuration"
                  type="number"
                  value={generalSettings.defaultSessionDuration}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveGeneralSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email server settings for notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input
                    id="senderName"
                    name="senderName"
                    value={emailSettings.senderName}
                    onChange={handleEmailSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Sender Email</Label>
                  <Input
                    id="senderEmail"
                    name="senderEmail"
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveEmailSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send email notifications to users</p>
                </div>
                <Switch
                  id="enableEmailNotifications"
                  checked={notificationSettings.enableEmailNotifications}
                  onCheckedChange={(checked) => handleSwitchChange("enableEmailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableMentorApprovalEmails">Mentor Approval Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Send emails when mentor applications are approved or rejected
                  </p>
                </div>
                <Switch
                  id="enableMentorApprovalEmails"
                  checked={notificationSettings.enableMentorApprovalEmails}
                  onCheckedChange={(checked) => handleSwitchChange("enableMentorApprovalEmails", checked)}
                  disabled={!notificationSettings.enableEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableSessionReminderEmails">Session Reminder Emails</Label>
                  <p className="text-sm text-muted-foreground">Send reminder emails before scheduled sessions</p>
                </div>
                <Switch
                  id="enableSessionReminderEmails"
                  checked={notificationSettings.enableSessionReminderEmails}
                  onCheckedChange={(checked) => handleSwitchChange("enableSessionReminderEmails", checked)}
                  disabled={!notificationSettings.enableEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableFeedbackRequestEmails">Feedback Request Emails</Label>
                  <p className="text-sm text-muted-foreground">Send emails requesting feedback after sessions</p>
                </div>
                <Switch
                  id="enableFeedbackRequestEmails"
                  checked={notificationSettings.enableFeedbackRequestEmails}
                  onCheckedChange={(checked) => handleSwitchChange("enableFeedbackRequestEmails", checked)}
                  disabled={!notificationSettings.enableEmailNotifications}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionReminderHours">Session Reminder (hours before)</Label>
                  <Input
                    id="sessionReminderHours"
                    name="sessionReminderHours"
                    type="number"
                    value={notificationSettings.sessionReminderHours}
                    onChange={handleNotificationSettingsChange}
                    disabled={
                      !notificationSettings.enableSessionReminderEmails ||
                      !notificationSettings.enableEmailNotifications
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedbackReminderHours">Feedback Request (hours after)</Label>
                  <Input
                    id="feedbackReminderHours"
                    name="feedbackReminderHours"
                    type="number"
                    value={notificationSettings.feedbackReminderHours}
                    onChange={handleNotificationSettingsChange}
                    disabled={
                      !notificationSettings.enableFeedbackRequestEmails ||
                      !notificationSettings.enableEmailNotifications
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveNotificationSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

