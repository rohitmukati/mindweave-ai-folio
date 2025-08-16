import { Github, ExternalLink, Brain, Bot, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "AI-Enhanced Leads Generation Platform",
    description: "AI-Optimized B2B lead generation platform using FastAPI, Streamlit, and SerpAPI with autonomous search agents and real-time data pipelines.",
    image: "/placeholder.svg",
    technologies: ["FastAPI", "Streamlit", "SerpAPI", "PostgreSQL", "JWT", "Google Gemini 2.0"],
    features: [
      "Dual-agent scraping architecture (Google + LinkedIn)",
      "JWT-authenticated user flow with signup/login",
      "Custom scoring logic to prioritize leads",
      "Analytics dashboard with charts",
      "CSV export for CRM integration"
    ],
    github: "https://github.com/rohitmukati",
    demo: "#",
    icon: Search
  },
  {
    title: "Automated Hiring Process System",
    description: "End-to-end hiring automation that streamlines resume collection, parsing, analysis, and evaluation with intelligent candidate matching.",
    image: "/placeholder.svg",
    technologies: ["Gmail API", "Google Drive API", "PyPDFLoader", "Gemini API", "Google Sheets", "Google Calendar"],
    features: [
      "Automated resume collection from emails",
      "Structured data extraction using Gemini API",
      "Candidate-job description matching",
      "Auto-scheduling interviews with calendar integration",
      "Real-time recruiter dashboard"
    ],
    github: "https://github.com/rohitmukati",
    demo: "#",
    icon: Bot
  },
  {
    title: "Personalized Medical Chatbot",
    description: "AI-powered medical chatbot utilizing LangChain and RAG pipeline for accurate healthcare responses with 700+ pages of medical knowledge.",
    image: "/placeholder.svg",
    technologies: ["LangChain", "RAG", "PyPDFLoader", "Pinecone", "OpenAI", "Hugging Face"],
    features: [
      "RAG pipeline for context-aware responses",
      "700 pages of medical document parsing",
      "Vector embeddings with Pinecone database",
      "Real-time medical query resolution",
      "Context-aware conversational AI"
    ],
    github: "https://github.com/rohitmukati",
    demo: "#",
    icon: Brain
  },
  {
    title: "Text Summarization NLP System",
    description: "End-to-end text summarization system with structured pipeline using Hugging Face Samsum dataset and transformer fine-tuning.",
    image: "/placeholder.svg",
    technologies: ["Hugging Face", "Transformers", "PyTorch", "NLP", "Word Embeddings"],
    features: [
      "Complete data ingestion and validation pipeline",
      "Fine-tuned transformer models",
      "Word embeddings for accurate summarization",
      "User-friendly web application interface",
      "Batch processing capabilities"
    ],
    github: "https://github.com/rohitmukati",
    demo: "#",
    icon: FileText
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-world AI applications showcasing expertise in machine learning pipelines, 
            LLM-based systems, and innovative automation solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="glass-card p-8 group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden"
            >
              {/* Project Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <project.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{project.title}</h3>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-primary mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {project.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </Button>
                <Button 
                  size="sm" 
                  className="flex items-center gap-2"
                  asChild
                >
                  <a href={project.demo}>
                    <ExternalLink className="w-4 h-4" />
                    Details
                  </a>
                </Button>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* View More Projects Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="group"
            asChild
          >
            <a href="https://github.com/rohitmukati" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              View More on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;