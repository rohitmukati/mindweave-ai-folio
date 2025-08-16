import { 
  Brain, 
  Code, 
  Database, 
  GitBranch, 
  Cpu, 
  Cloud,
  Eye,
  MessageSquare,
  BarChart3,
  Workflow
} from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "AI & Machine Learning",
      icon: Brain,
      skills: [
        { name: "Deep Learning", level: 95 },
        { name: "Neural Networks", level: 90 },
        { name: "Computer Vision", level: 85 },
        { name: "Natural Language Processing", level: 90 },
        { name: "Generative AI", level: 88 },
        { name: "Reinforcement Learning", level: 75 }
      ]
    },
    {
      title: "Programming & Frameworks",
      icon: Code,
      skills: [
        { name: "Python", level: 95 },
        { name: "PyTorch", level: 92 },
        { name: "TensorFlow", level: 88 },
        { name: "Hugging Face", level: 90 },
        { name: "LangChain", level: 85 },
        { name: "FastAPI", level: 82 }
      ]
    },
    {
      title: "Data & Infrastructure",
      icon: Database,
      skills: [
        { name: "MLOps", level: 85 },
        { name: "Docker", level: 88 },
        { name: "Kubernetes", level: 75 },
        { name: "AWS/GCP", level: 80 },
        { name: "Apache Spark", level: 70 },
        { name: "Data Engineering", level: 78 }
      ]
    }
  ];

  const technologies = [
    { name: "PyTorch", icon: Brain, color: "text-primary" },
    { name: "TensorFlow", icon: Cpu, color: "text-secondary" },
    { name: "OpenAI API", icon: MessageSquare, color: "text-accent" },
    { name: "Hugging Face", icon: Brain, color: "text-primary" },
    { name: "LangChain", icon: Workflow, color: "text-secondary" },
    { name: "Computer Vision", icon: Eye, color: "text-accent" },
    { name: "MLOps", icon: GitBranch, color: "text-primary" },
    { name: "Data Science", icon: BarChart3, color: "text-secondary" },
    { name: "Cloud AI", icon: Cloud, color: "text-accent" }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">Skills & Technologies</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expertise across the full AI/ML stack, from research to production deployment
            </p>
          </div>

          {/* Skill categories */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div key={categoryIndex} className="glass-card p-6 hover-lift">
                  <div className="flex items-center mb-6">
                    <div className="glass-card p-3 rounded-lg mr-4">
                      <CategoryIcon className="w-6 h-6 text-primary pulse-glow" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="skill-bar h-2">
                          <div 
                            className="skill-fill"
                            style={{ 
                              animationDelay: `${categoryIndex * 0.2 + skillIndex * 0.1}s`,
                              width: `${skill.level}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Technology grid */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Technologies I Work With
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-6">
              {technologies.map((tech, index) => {
                const TechIcon = tech.icon;
                return (
                  <div 
                    key={index}
                    className="glass-card p-4 hover-lift group cursor-pointer"
                    title={tech.name}
                  >
                    <TechIcon className={`w-8 h-8 mx-auto ${tech.color} pulse-glow group-hover:scale-110 transition-transform duration-300`} />
                    <div className="text-xs text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
                      {tech.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-card p-8 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Certifications & Education
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "AWS ML Specialty",
                "TensorFlow Developer",
                "MS Computer Science",
                "Google Cloud ML"
              ].map((cert, index) => (
                <div key={index} className="glass-card p-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-sm font-medium text-foreground">{cert}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;