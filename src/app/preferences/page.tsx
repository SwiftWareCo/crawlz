"use client";

import { useState } from "react";
import { TagInput } from "~/components/TagInput";
import { Switch } from "~/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export default function PreferencesPage() {
  const [keywords, setKeywords] = useState<string[]>(["React", "TypeScript", "Next.js"]);
  const [locations, setLocations] = useState<string[]>(["Remote", "San Francisco"]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationFrequency, setNotificationFrequency] = useState("instant");

  const handleSave = () => {
    console.log("Saving preferences:", {
      keywords,
      locations,
      notificationsEnabled,
      notificationFrequency,
    });
    alert("Preferences saved!");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Preferences</h1>
        <p className="text-muted-foreground">
          Customize your job search experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Job Preferences Section */}
        <Card>
          <CardHeader>
            <CardTitle>Job Preferences</CardTitle>
            <CardDescription>
              Set your job search criteria to get better matches
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="keywords">Job Keywords</Label>
              <TagInput
                value={keywords}
                onChange={setKeywords}
                placeholder="Type a keyword and press Enter"
              />
              <p className="text-xs text-muted-foreground">
                Add skills, technologies, or job titles you're interested in
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="locations">Locations</Label>
              <TagInput
                value={locations}
                onChange={setLocations}
                placeholder="Type a location and press Enter"
              />
              <p className="text-xs text-muted-foreground">
                Add cities, states, or &quot;Remote&quot; for remote positions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage how you receive job alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Enable Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about new job matches
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            {notificationsEnabled && (
              <div className="space-y-3">
                <Label>Notification Frequency</Label>
                <RadioGroup
                  value={notificationFrequency}
                  onValueChange={setNotificationFrequency}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="instant" id="instant" />
                    <Label htmlFor="instant" className="font-normal cursor-pointer">
                      Notify me instantly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily" className="font-normal cursor-pointer">
                      Send a daily digest
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Section */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Manage your account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                User Profile Component
              </p>
              <p className="text-xs text-muted-foreground">
                Clerk UserProfile component will be integrated here
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
