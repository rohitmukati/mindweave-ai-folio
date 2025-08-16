import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play, Brain, MessageSquare, Eye, BarChart3 } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Intelligent Document Processing System",
      description: "End-to-end OCR and NLP pipeline that extracts, processes, and analyzes documents using computer vision and large language models. Handles multiple formats with 95% accuracy.",
      image: "/api/placeholder/600/400",
      technologies: ["PyTorch", "OpenCV", "Transformers", "FastAPI", "Docker"],
      category: "Computer Vision",
      icon: Eye,
      demoLink: "#",
      githubLink: "#",
      featured: true
    },
    {
      title: "Conversational AI Assistant",
      description: "Multi-modal AI assistant built with LangChain and OpenAI APIs. Features memory management, tool integration, and natural conversation flow.",
      image: "/api/placeholder/600/400",
      technologies: ["LangChain", "OpenAI API", "Vector DB", "React", "FastAPI"],
      category: "Natural Language Processing",
      icon: MessageSquare,
      demoLink: "#",
      githubLink: "#",
      featured: true
    },
    {
      title: "Real-time Sentiment Analysis Dashboard",
      description: "Live social media sentiment tracking using transformer models and streaming data processing. Processes 10k+ posts per minute.",
      image: "/api/placeholder/600/400",
      technologies: ["BERT", "Apache Kafka", "Streamlit", "Redis", "PostgreSQL"],
      category: "Data Science",
      icon: BarChart3,
      demoLink: "#",
      githubLink: "#",
      featured: false
    },
    {
      title: "Neural Style Transfer Application",
      description: "Web application that applies artistic styles to images using deep neural networks. Features real-time processing and custom style training.",
      image: "/api/placeholder/600/400",
      technologies: ["TensorFlow", "StyleGAN", "React", "WebGL", "AWS S3"],
      category: "Generative AI",
      icon: Brain,
      demoLink: "#",
      githubLink: "#",
      featured: false
    },
    {
      title: "Automated Code Review Bot",
      description: "AI-powered code review system that analyzes pull requests, suggests improvements, and detects potential bugs using fine-tuned language models.",
      image: "/api/placeholder/600/400",
      technologies: ["CodeBERT", "GitHub API", "Node.js", "MongoDB", "Docker"],
      category: "AI Tools",
      icon: Brain,
      demoLink: "#",
      githubLink: "#",
      featured: false
    },
    {
      title: "Voice-to-Code Generator",
      description: "Revolutionary tool that converts natural language voice commands into functional code across multiple programming languages using speech recognition and code generation models.",
      image: "/api/placeholder/600/400",
      technologies: ["Whisper", "CodeT5", "WebRTC", "FastAPI", "VSCode Extension"],
      category: "Speech Processing",
      icon: MessageSquare,
      demoLink: "#",
      githubLink: "#",
      featured: false
    }
  ];

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-60 h-60 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcasing real-world AI solutions that deliver measurable impact across diverse industries
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button 
                key={category}
                variant="glass" 
                size="sm"
                className="hover:bg-primary/20 transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured projects grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {projects.filter(p => p.featured).map((project, index) => {
              const CategoryIcon = project.icon;
              return (
                <div key={index} className="glass-card overflow-hidden hover-lift group">
                  {/* Project image */}
                  <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CategoryIcon className="w-16 h-16 text-primary/40" />
                    </div>
                    
                    {/* Project category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="glass-card px-3 py-1 text-xs font-medium text-primary">
                        {project.category}
                      </span>
                    </div>

                    {/* Action buttons overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button variant="hero" size="sm">
                        <Play className="w-4 h-4" />
                        Live Demo
                      </Button>
                      <Button variant="glass" size="sm">
                        <Github className="w-4 h-4" />
                        Code
                      </Button>
                    </div>
                  </div>

                  {/* Project content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-muted/30 text-muted-foreground rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project links */}
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4" />
                        View Project
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Github className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Regular projects grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => {
              const CategoryIcon = project.icon;
              return (
                <div key={index} className="glass-card overflow-hidden hover-lift group">
                  {/* Compact project image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CategoryIcon className="w-12 h-12 text-primary/30" />
                    </div>
                    
                    <div className="absolute top-3 right-3">
                      <span className="glass-card px-2 py-1 text-xs text-primary">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-muted/20 text-muted-foreground rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs text-muted-foreground">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        <ExternalLink className="w-3 h-3" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Github className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View more projects CTA */}
          <div className="text-center mt-12">
            <Button variant="hero" size="lg">
              <Github className="w-5 h-5" />
              View All Projects on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;