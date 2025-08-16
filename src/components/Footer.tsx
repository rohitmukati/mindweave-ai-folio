import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" }
  ];

  const services = [
    "AI Model Development",
    "Conversational AI",
    "Computer Vision",
    "Data Analytics",
    "MLOps Setup",
    "AI Consulting"
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-muted/10"></div>
      
      {/* Background effects */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-bold gradient-text mb-3">
                  Alex Chen
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  AI & Machine Learning Engineer passionate about building intelligent solutions 
                  that transform industries and improve lives. Let's create the future together.
                </p>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="hover-lift">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover-lift">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover-lift">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover-lift">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <span className="text-muted-foreground text-sm">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="glass-card p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Stay Updated on AI Trends
                </h4>
                <p className="text-muted-foreground text-sm">
                  Get insights on the latest AI developments and machine learning breakthroughs.
                </p>
              </div>
              <div className="flex gap-3 min-w-fit">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-lg glass-card border border-glass-border focus:border-primary transition-colors bg-transparent text-foreground placeholder:text-muted-foreground min-w-64"
                />
                <Button variant="hero">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-glass-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <span>© {currentYear} Alex Chen. Made with</span>
                <Heart className="w-4 h-4 text-red-500 mx-2 animate-pulse" />
                <span>for the AI community</span>
              </div>
              
              <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Sitemap
                </a>
              </div>
            </div>
          </div>

          {/* Back to top */}
          <div className="text-center mt-8">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover-lift"
            >
              Back to Top ↑
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;