import { 
  Brain, 
  Database, 
  Code, 
  Mic, 
  Eye, 
  MessageSquare, 
  Cpu,
  Github,
  FileText,
  Zap,
  Server,
  Globe
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const skillCategories = [
  {
    title: "Generative AI & LLMs",
    icon: Brain,
    skills: [
      { name: "LangChain", level: 90 },
      { name: "OpenAI APIs", level: 85 },
      { name: "Retrieval-Augmented Generation (RAG)", level: 88 },
      { name: "Prompt Engineering", level: 92 },
      { name: "Hugging Face Transformers", level: 80 }
    ]
  },
  {
    title: "Machine Learning & Deep Learning",
    icon: Cpu,
    skills: [
      { name: "PyTorch", level: 85 },
      { name: "TensorFlow", level: 82 },
      { name: "Scikit-Learn", level: 90 },
      { name: "Model Fine-tuning", level: 85 },
      { name: "Neural Networks", level: 88 }
    ]
  },
  {
    title: "NLP & Speech Processing",
    icon: MessageSquare,
    skills: [
      { name: "Natural Language Processing", level: 88 },
      { name: "Speech-to-Text (Whisper)", level: 85 },
      { name: "Text-to-Speech (Parler TTS)", level: 80 },
      { name: "NLTK & spaCy", level: 85 },
      { name: "Word Embeddings", level: 87 }
    ]
  },
  {
    title: "Computer Vision & OCR",
    icon: Eye,
    skills: [
      { name: "OpenCV", level: 85 },
      { name: "OCR (Tesseract, TrOCR)", level: 88 },
      { name: "Object Detection (YOLO)", level: 82 },
      { name: "Mediapipe", level: 80 },
      { name: "Face Recognition", level: 85 }
    ]
  },
  {
    title: "Programming & Tools",
    icon: Code,
    skills: [
      { name: "Python", level: 92 },
      { name: "SQL (MySQL, PostgreSQL)", level: 85 },
      { name: "FastAPI & Flask", level: 88 },
      { name: "Git/GitHub", level: 90 },
      { name: "Java", level: 75 }
    ]
  },
  {
    title: "Data & Databases",
    icon: Database,
    skills: [
      { name: "Vector Databases (Pinecone)", level: 85 },
      { name: "Data Preprocessing", level: 90 },
      { name: "Pandas & NumPy", level: 92 },
      { name: "Data Visualization", level: 88 },
      { name: "PostgreSQL", level: 85 }
    ]
  }
];

const technologies = [
  { name: "LangChain", icon: Zap, color: "text-yellow-400" },
  { name: "OpenAI", icon: Brain, color: "text-green-400" },
  { name: "PyTorch", icon: Cpu, color: "text-orange-400" },
  { name: "TensorFlow", icon: Cpu, color: "text-blue-400" },
  { name: "Hugging Face", icon: MessageSquare, color: "text-purple-400" },
  { name: "FastAPI", icon: Server, color: "text-cyan-400" },
  { name: "Streamlit", icon: Globe, color: "text-red-400" },
  { name: "PostgreSQL", icon: Database, color: "text-indigo-400" },
  { name: "Docker", icon: Server, color: "text-blue-500" },
  { name: "Git", icon: Github, color: "text-gray-400" },
  { name: "Jupyter", icon: FileText, color: "text-orange-500" },
  { name: "Pinecone", icon: Database, color: "text-green-500" }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background/50"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-accent/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Technical Expertise
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive skill set spanning AI/ML, NLP, Computer Vision, and modern development technologies.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title}
              className="glass-card p-6 hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Cloud */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-8">Technologies & Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={tech.name}
                className="glass-card p-4 flex flex-col items-center gap-3 hover:scale-110 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
              >
                <tech.icon className={`w-8 h-8 ${tech.color} group-hover:scale-125 transition-transform`} />
                <span className="text-sm font-medium text-center">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              Education
            </h3>
            <div className="space-y-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <h4 className="text-lg font-semibold">Bachelor of Technology</h4>
                <p className="text-primary font-medium">Information Technology & Engineering</p>
                <p className="text-muted-foreground">Vikrant Group of Technology and Management</p>
                <p className="text-sm text-muted-foreground">2021 - 2025 | Specialization in AI & ML</p>
                <p className="text-sm text-muted-foreground mt-2">Indore, MP, India</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary" />
              Experience & Certifications
            </h3>
            <div className="space-y-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <h4 className="text-lg font-semibold">AI & ML Intern</h4>
                <p className="text-primary font-medium">NeevCloud</p>
                <p className="text-sm text-muted-foreground">Dec 2024 - Present</p>
                <p className="text-sm mt-2">Chanakya AI, End-to-End Speech-to-Speech Pipeline</p>
              </div>
              
              <div className="border-l-2 border-primary/20 pl-6">
                <h4 className="text-lg font-semibold">AI Intern</h4>
                <p className="text-primary font-medium">VRadicals Pvt. Ltd</p>
                <p className="text-sm text-muted-foreground">Oct 2024 - Dec 2024</p>
                <p className="text-sm mt-2">Custom chatbot development, LLaMA integration</p>
              </div>

              <div className="border-l-2 border-accent/20 pl-6">
                <h4 className="text-lg font-semibold">Certifications</h4>
                <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                  <li>• BCG Open-Access Data Science Program</li>
                  <li>• British Airways Data Science Programme</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;