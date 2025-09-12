import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "E-commerce Store",
      description:
        "A modern, responsive e-commerce platform built with React and Node.js. Features include user authentication, payment processing, and inventory management.",
      image: "/modern-ecommerce-interface.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Restaurant Website",
      description:
        "An elegant restaurant website with online reservation system, menu display, and customer reviews. Optimized for mobile and desktop experiences.",
      image: "/restaurant-website.png",
      technologies: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Portfolio Blog",
      description:
        "A personal blog platform with content management system, SEO optimization, and social media integration. Built for performance and accessibility.",
      image: "/clean-blog-website-interface.jpg",
      technologies: ["Gatsby", "GraphQL", "Contentful", "Netlify"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in web development and design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-pretty">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-3">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
