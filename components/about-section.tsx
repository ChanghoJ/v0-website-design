import { Card, CardContent } from "@/components/ui/card"
import { Coffee, Camera, Plane, Code } from "lucide-react"

export function AboutSection() {
  const interests = [
    { icon: Coffee, label: "Coffee ☕", description: "Fueling creativity one cup at a time" },
    { icon: Camera, label: "Photography 📸", description: "Capturing moments and inspiration" },
    { icon: Plane, label: "Travel ✈️", description: "Exploring new cultures and perspectives" },
    { icon: Code, label: "Coding 💻", description: "Building the future, one line at a time" },
  ]

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">About Me</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              With over 5 years of experience in web development and design, I specialize in creating digital
              experiences that not only look great but also drive results. My journey started with a curiosity about how
              websites work, and it has evolved into a passion for crafting solutions that make a difference.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I believe in the power of clean, efficient code and user-centered design. Whether it's a simple landing
              page or a complex web application, I approach each project with attention to detail and a commitment to
              excellence.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
              sharing knowledge with the developer community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {interests.map((interest, index) => {
              const IconComponent = interest.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <IconComponent className="h-8 w-8 text-accent mx-auto mb-3" />
                    <h3 className="font-semibold text-card-foreground mb-2">{interest.label}</h3>
                    <p className="text-sm text-muted-foreground">{interest.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
