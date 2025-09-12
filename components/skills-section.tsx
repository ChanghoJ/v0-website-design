import { Badge } from "@/components/ui/badge"

export function SkillsSection() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Design Tools",
      skills: ["Figma", "Photoshop", "Sketch", "Adobe XD"],
    },
    {
      category: "Backend & Tools",
      skills: ["Node.js", "WordPress", "Git", "MongoDB", "PostgreSQL"],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I work with a variety of technologies and tools to bring ideas to life.
          </p>
        </div>

        <div className="space-y-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-6">{category.category}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
