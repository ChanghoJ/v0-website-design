"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">Hi, I'm Joey J.</h1>
            <h2 className="text-xl md:text-2xl text-primary-foreground/80">Web Developer & Designer</h2>
            <p className="text-lg text-primary-foreground/70 text-pretty max-w-lg">
              I create beautiful, functional websites that help businesses grow. With a passion for clean code and
              stunning design, I bring ideas to life on the web.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" onClick={() => scrollToSection("projects")} className="group">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-accent/20 flex items-center justify-center">
                <img
                  src="/professional-headshot-of-web-developer-joey-j.jpg"
                  alt="Joey J. - Professional headshot"
                  className="w-72 h-72 rounded-full object-cover border-4 border-primary-foreground/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
