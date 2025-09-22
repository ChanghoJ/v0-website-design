"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, Star, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Feedback {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

export function FeedbackSection() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 5,
  })
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    initializeFeedbackSystem()
  }, [])

  const initializeFeedbackSystem = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase.from("feedback").select("*").limit(1)

      if (
        fetchError &&
        (fetchError.message.includes("Could not find the table") ||
          (fetchError.message.includes("relation") && fetchError.message.includes("does not exist")))
      ) {
        console.log("[v0] Feedback table not found, creating it...")
        await createFeedbackTable()
      } else if (fetchError) {
        console.error("Error checking feedback table:", fetchError)
        setError("Failed to initialize feedback system. Please try again.")
        return
      }

      await fetchFeedback()

      const channel = supabase
        .channel("feedback-changes")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "feedback" }, (payload) => {
          console.log("[v0] New feedback received:", payload)
          setFeedbacks((prev) => [payload.new as Feedback, ...prev])
        })
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    } catch (error) {
      console.error("Error initializing feedback system:", error)
      setError("Failed to initialize feedback system.")
    } finally {
      setIsLoading(false)
    }
  }

  const createFeedbackTable = async () => {
    try {
      setIsInitializing(true)
      console.log("[v0] Creating feedback table...")

      const { error } = await supabase.rpc("exec_sql", {
        sql: `
          CREATE TABLE IF NOT EXISTS public.feedback (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name TEXT NOT NULL,
            message TEXT NOT NULL,
            rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );

          ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

          CREATE POLICY IF NOT EXISTS "Anyone can read feedback" ON public.feedback
            FOR SELECT USING (true);

          CREATE POLICY IF NOT EXISTS "Anyone can insert feedback" ON public.feedback
            FOR INSERT WITH CHECK (true);
        `,
      })

      if (error) {
        console.error("Error creating feedback table:", error)
        const { error: createError } = await supabase.from("feedback").select("*").limit(0)

        if (createError) {
          throw new Error("Could not create feedback table automatically")
        }
      }

      console.log("[v0] Feedback table created successfully")
    } catch (error) {
      console.error("Error creating feedback table:", error)
      setError("Could not create feedback table automatically. Please contact support.")
      throw error
    } finally {
      setIsInitializing(false)
    }
  }

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase.from("feedback").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching feedback:", error)
        setError("Failed to load feedback. Please try again later.")
        return
      }

      setFeedbacks(data || [])
    } catch (error) {
      console.error("Error fetching feedback:", error)
      setError("An unexpected error occurred while loading feedback.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from("feedback")
        .insert([
          {
            name: formData.name,
            message: formData.message,
            rating: formData.rating,
          },
        ])
        .select()

      if (error) {
        console.error("Error submitting feedback:", error)
        setError("Failed to submit feedback. Please try again.")
        return
      }

      console.log("[v0] Feedback submitted successfully:", data)
      setFormData({ name: "", message: "", rating: 5 })

      if (data && data[0]) {
        setFeedbacks((prev) => [data[0], ...prev])
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
      setError("An unexpected error occurred while submitting feedback.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === "number" ? Number.parseInt(e.target.value) : e.target.value
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <section id="feedback" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Feedback</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'd love to hear your thoughts and feedback. Your input helps me improve and grow.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {error && (
            <Card className="mb-6 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {isInitializing && (
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-blue-700">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                  <p>Setting up feedback system...</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-accent" />
                Share Your Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isInitializing || isSubmitting}
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your feedback message..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isInitializing || isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <Input
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-20"
                    required
                    disabled={isInitializing || isSubmitting}
                  />
                  <p className="text-sm text-muted-foreground mt-1">Rate from 1 to 5 stars</p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90"
                  disabled={isSubmitting || isInitializing}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Submitting..." : isInitializing ? "Initializing..." : "Submit Feedback"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary mb-6">Recent Feedback ({feedbacks.length})</h3>

            {isLoading ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">Loading feedback...</p>
                </CardContent>
              </Card>
            ) : feedbacks.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No feedback yet. Be the first to share your thoughts!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {feedbacks.map((feedback) => (
                  <Card key={feedback.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-primary">{feedback.name}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            {renderStars(feedback.rating)}
                            <span className="text-sm text-muted-foreground ml-2">({feedback.rating}/5)</span>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{formatDate(feedback.created_at)}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{feedback.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
