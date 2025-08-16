import { Brain, Code, Lightbulb, Target } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Brain,
      title: "LLM & RAG Expert",
      description: "Specialized in building intelligent systems with LangChain and OpenAI APIs"
    },
    {
      icon: Code,
      title: "End-to-End Solutions",
      description: "From data collection to deployment, creating scalable AI applications"
    },
    {
      icon: Lightbulb,
      title: "Innovation Focused",
      description: "Building cutting-edge applications like speech-to-speech pipelines and automated hiring systems"
    },
    {
      icon: Target,
      title: "Real-World Impact",
      description: "Developed 10+ AI projects with practical applications in education and business automation"
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              B.Tech student specializing in AI & ML, building innovative solutions with generative AI and automation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Story */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">
                  My Journey in AI & Machine Learning
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Currently pursuing B.Tech in Information Technology with specialization in AI & ML at Vikrant Group 
                  of Technology and Management. My passion for AI began with exploring the potential of machine learning 
                  to solve real-world problems and has evolved into hands-on experience with cutting-edge technologies.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Through internships at NeevCloud and VRadicals, I've gained practical experience in building 
                  LLM-based applications, RAG systems, and end-to-end AI pipelines. From fine-tuning OCR models 
                  to creating speech-to-speech AI systems, I focus on delivering solutions that make a real impact.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  What excites me most is the intersection of generative AI and practical applications - building 
                  intelligent systems that automate complex workflows, from educational assistants to hiring 
                  automation platforms. I believe AI should augment human capabilities and simplify complex processes.
                </p>
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">10+</div>
                  <div className="text-sm text-muted-foreground">AI Projects Built</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">2+</div>
                  <div className="text-sm text-muted-foreground">Industry Experience</div>
                </div>
              </div>
            </div>

            {/* Right side - Highlights */}
            <div className="space-y-6">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div 
                    key={index}
                    className="glass-card p-6 hover-lift group cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="glass-card p-3 rounded-lg group-hover:bg-primary/20 transition-all duration-300">
                        <Icon className="w-6 h-6 text-primary pulse-glow" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          {highlight.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Philosophy section */}
          <div className="mt-20 text-center">
            <div className="glass-card p-8 lg:p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                My Philosophy
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                "The best AI solutions are invisible to the end user—they work so seamlessly 
                that they feel like magic. My goal is to create intelligent systems that 
                enhance human capabilities rather than replace them, making complex tasks 
                simple and empowering people to achieve more."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;