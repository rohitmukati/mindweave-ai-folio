import { Brain, Code, Lightbulb, Target } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Brain,
      title: "AI Specialist",
      description: "5+ years developing cutting-edge ML models and neural networks"
    },
    {
      icon: Code,
      title: "Full Stack ML",
      description: "From research to production, building end-to-end AI solutions"
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description: "Passionate about solving complex problems with creative AI approaches"
    },
    {
      icon: Target,
      title: "Results Focused",
      description: "Delivered 20+ production ML systems with measurable business impact"
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
              Passionate about transforming complex data into intelligent solutions that drive real-world impact
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
                  My fascination with artificial intelligence began during my computer science studies, 
                  where I discovered the incredible potential of machines to learn and make decisions. 
                  What started as curiosity evolved into a deep expertise in neural networks, 
                  natural language processing, and computer vision.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Over the past 5 years, I've had the privilege of working with cutting-edge technologies 
                  like PyTorch, TensorFlow, and Hugging Face, building everything from conversational AI 
                  systems to computer vision applications that process millions of images daily.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  What drives me is the opportunity to bridge the gap between theoretical AI research 
                  and practical solutions that solve real business problems. I believe the best AI 
                  systems are those that seamlessly integrate into users' workflows, making complex 
                  tasks simple and intuitive.
                </p>
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">50+</div>
                  <div className="text-sm text-muted-foreground">ML Models Deployed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
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