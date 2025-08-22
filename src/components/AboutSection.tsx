import { Brain, Code, Lightbulb, Target } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Brain,
      title: "LLM & RAG Pipeline",
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
              AI Engineer passionate about building intelligent, scalable solutions using ML, DL, and agentic AI—transforming data into impactful innovations for a smarter future.
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
                  I come from a small village where technology was hardly known, I first encountered the concept of artificial intelligence during my computer science studies. What began as pure curiosity turned into countless nights of self-learning, research, and experiments—teaching myself how machines can learn, adapt, and make decisions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Over the past 2 years, I've had the privilege of working with cutting-edge technologies like PyTorch, TensorFlow, and Hugging Face, building everything from conversational AI systems to computer vision applications that process millions of images daily.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  What drives me today is the same spark I felt in those early days—bridging the gap between research and real-world applications, and building AI systems that make complex tasks simple, intuitive, and meaningful.
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