"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Container from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Section from "@/components/ui/section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import * as React from "react"

export default function CardsReportIssue() {
  const id = React.useId()

  return (
    <Section>
        <Card>
        <CardHeader>
            <CardTitle>Report an issue</CardTitle>
            <CardDescription>
            What area are you having problems with?
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
                <Label htmlFor={`area-${id}`}>Name</Label>
                <Input id={`subject-${id}`} placeholder="Your Name" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`security-${id}`}>Security</Label>
                <Select defaultValue="sev1">
                <SelectTrigger id={`area-${id}`} aria-label="Area">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="sev1">Severity level 1 (Highest)</SelectItem>
                    <SelectItem value="sev2">Severity level 2</SelectItem>
                    <SelectItem value="sev3">Severity level 3</SelectItem>
                    <SelectItem value="sev5">Severity level 4 (Lowest)</SelectItem>
                </SelectContent>
                </Select>
            </div>
            </div>
            <div className="grid gap-2">
            <Label htmlFor={`subject-${id}`}>Subject</Label>
            <Input id={`subject-${id}`} placeholder="I need help with..." />
            </div>
            <div className="grid gap-2">
            <Label htmlFor={`description-${id}`}>Description</Label>
            <Textarea
                id={`description-${id}`}
                placeholder="Please include all information relevant to your issue."
            />
            </div>
        </CardContent>
        <CardFooter className="justify-between space-x-2">
            <Button variant="ghost">Cancel</Button>
            <Button>Submit</Button>
        </CardFooter>
        </Card>
    </Section>
  )
}