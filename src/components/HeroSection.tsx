import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg"; // ✅ ye assets me rahega

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 42, 69, 0.8), rgba(34, 42, 69, 0.9)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Professional badge */}
              <div className="inline-flex items-center glass-card px-4 py-2 text-sm font-medium text-primary">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 pulse-glow"></div>
                AI/ML Engineer & Innovator
              </div>

              {/* Main heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-foreground">Rohit</span>
                  <span className="block gradient-text">Mukati</span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl">
                  AI/ML Enthusiast and Emerging AI Engineer with hands-on experience in building machine learning pipelines, 
                  LLM-based chatbots, and Generative AI applications.
                </p>
              </div>

              {/* Specializations */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {['LangChain', 'RAG Systems', 'AI Agents', 'ML Deployment', 'NLP', 'Computer Vision', 'ChatBot Development', 'Speech-to-Speech'].map((skill) => (
                  <span 
                    key={skill}
                    className="glass-card px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/20 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  variant="hero" 
                  size="xl"
                  onClick={() => scrollToSection('projects')}
                >
                  View My Work
                  <ArrowDown className="w-5 h-5" />
                </Button>
                <Button 
                  variant="glass" 
                  size="xl"
                  onClick={() => scrollToSection('contact')}
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center lg:justify-start">
                <Button variant="ghost" size="icon" className="hover-lift" asChild>
                  <a href="https://github.com/rohitmukati" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="hover-lift" asChild>
                  <a href="https://www.linkedin.com/in/contact-rohit-mukati/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="hover-lift" asChild>
                  <a href="mailto:rohanmukati2002@gmail.com">
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right side - Profile image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glowing ring */}
                <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-30 animate-pulse"></div>
                
                {/* Profile container */}
                <div className="relative glass-card p-6 rounded-full float">
                  <img 
                    src="/profile.jpg"   // ✅ public se direct access
                    alt="Rohit Mukati - AI & ML Engineer"
                    className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover"
                  />
                </div>

                {/* Floating tech icons */}
                <div className="absolute -top-4 -right-4 glass-card p-3 rounded-lg float delay-1000">
                  <div className="w-6 h-6 bg-primary rounded-full pulse-glow"></div>
                </div>
                <div className="absolute -bottom-4 -left-4 glass-card p-3 rounded-lg float delay-2000">
                  <div className="w-6 h-6 bg-secondary rounded-full pulse-glow"></div>
                </div>
                <div className="absolute top-1/2 -left-8 glass-card p-3 rounded-lg float delay-3000">
                  <div className="w-6 h-6 bg-accent rounded-full pulse-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
