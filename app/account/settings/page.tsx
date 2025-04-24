"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { User, Lock, Bell, Settings, ArrowLeft } from "lucide-react"

export const dynamic = "force-static"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    address: "123 Main St",
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    marketing: true,
  })
  const [preferences, setPreferences] = useState({
    darkMode: false,
    twoFactorAuth: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isSavingNotifications, setIsSavingNotifications] = useState(false)
  const [isSavingPreferences, setIsSavingPreferences] = useState(false)

  const handleChange = (key: string, value: string) => {
    setProfile({ ...profile, [key]: value })
  }

  const handlePasswordChange = (key: string, value: string) => {
    setPasswordForm({ ...passwordForm, [key]: value })
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotifications({ ...notifications, [key]: checked })
  }

  const handlePreferenceChange = (key: string, checked: boolean) => {
    setPreferences({ ...preferences, [key]: checked })
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert("Profile saved!")
  }

  const handleChangePassword = async () => {
    setIsChangingPassword(true)
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsChangingPassword(false)
    alert("Password updated!")
  }

  const handleSaveNotifications = async () => {
    setIsSavingNotifications(true)
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSavingNotifications(false)
    alert("Notifications saved!")
  }

  const handleSavePreferences = async () => {
    setIsSavingPreferences(true)
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSavingPreferences(false)
    alert("Preferences saved!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" className="flex items-center gap-2" asChild>
          <a href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </a>
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <div className="grid gap-8 md:grid-cols-[250px_1fr]">
        <div className="space-y-4">
          <Button
            variant={activeTab === "profile" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant={activeTab === "password" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setActiveTab("password")}
          >
            <Lock className="mr-2 h-4 w-4" />
            Password
          </Button>
          <Button
            variant={activeTab === "notifications" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button
            variant={activeTab === "preferences" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setActiveTab("preferences")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </Button>
        </div>
        <div className="space-y-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <p className="text-muted-foreground">Update your account profile information.</p>
              </div>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={profile.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
          {activeTab === "password" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Change Password</h2>
                <p className="text-muted-foreground">Update your password.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  />
                </div>
                <Button onClick={handleChangePassword} disabled={isChangingPassword}>
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </div>
          )}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Notification Preferences</h2>
                <p className="text-muted-foreground">Manage how we contact you.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive text messages for important updates.</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about new features and offers.</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                  />
                </div>
                <Button onClick={handleSaveNotifications} disabled={isSavingNotifications}>
                  {isSavingNotifications ? "Saving..." : "Save Preferences"}
                </Button>
              </div>
            </div>
          )}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Account Preferences</h2>
                <p className="text-muted-foreground">Manage your account settings.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Use dark theme for the application.</p>
                  </div>
                  <Switch
                    id="darkMode"
                    checked={preferences.darkMode}
                    onCheckedChange={(checked) => handlePreferenceChange("darkMode", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={preferences.twoFactorAuth}
                    onCheckedChange={(checked) => handlePreferenceChange("twoFactorAuth", checked)}
                  />
                </div>
                <Button onClick={handleSavePreferences} disabled={isSavingPreferences}>
                  {isSavingPreferences ? "Saving..." : "Save Preferences"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
