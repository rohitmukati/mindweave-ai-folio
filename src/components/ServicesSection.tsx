import { 
  Brain, 
  MessageSquare, 
  Eye, 
  BarChart3, 
  Code, 
  Zap, 
  Target, 
  Users,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Scroll function
const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const ServicesSection = () => {
  const services = [
    {
      icon: Brain,
      title: "AI Model Development",
      description: "Custom machine learning models tailored to your specific business needs, from concept to production deployment.",
      features: [
        "Deep Learning Architecture Design",
        "Model Training & Optimization",
        "Performance Benchmarking",
        "Production Deployment"
      ],
      popular: false
    },
    {
      icon: MessageSquare,
      title: "Conversational AI & Chatbots",
      description: "Intelligent chatbots and virtual assistants that understand context and provide meaningful interactions.",
      features: [
        "Natural Language Understanding",
        "Multi-turn Conversations",
        "Integration with Existing Systems",
        "Multi-language Support"
      ],
      popular: true
    },
    {
      icon: Eye,
      title: "Computer Vision Solutions",
      description: "Advanced image and video analysis systems for automation, quality control, and intelligent monitoring.",
      features: [
        "Object Detection & Recognition",
        "Image Classification",
        "Real-time Video Analysis",
        "Custom Vision Models"
      ],
      popular: false
    },
    {
      icon: BarChart3,
      title: "Data Analytics & ML Insights",
      description: "Transform your data into actionable insights with advanced analytics and predictive modeling.",
      features: [
        "Predictive Analytics",
        "Data Pipeline Development",
        "Real-time Dashboards",
        "Business Intelligence"
      ],
      popular: false
    },
    {
      icon: Code,
      title: "MLOps & Infrastructure",
      description: "Complete ML operations setup for scalable, reliable, and maintainable machine learning systems.",
      features: [
        "Model Versioning & Tracking",
        "Automated Testing & Validation",
        "Continuous Integration/Deployment",
        "Monitoring & Maintenance"
      ],
      popular: false
    },
    {
      icon: Zap,
      title: "AI Consulting & Strategy",
      description: "Strategic guidance on AI adoption, technology selection, and implementation roadmaps for your organization.",
      features: [
        "AI Readiness Assessment",
        "Technology Stack Recommendations",
        "Implementation Roadmap",
        "Team Training & Workshops"
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Analysis",
      description: "Deep dive into your business needs, data landscape, and technical requirements to design the perfect AI solution."
    },
    {
      number: "02", 
      title: "Solution Design",
      description: "Create detailed architecture and implementation plans with clear timelines, milestones, and success metrics."
    },
    {
      number: "03",
      title: "Development & Testing",
      description: "Build and rigorously test your AI solution with iterative feedback loops and continuous optimization."
    },
    {
      number: "04",
      title: "Deployment & Support",
      description: "Launch your solution with comprehensive monitoring, documentation, and ongoing support for long-term success."
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">Services Offered</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              End-to-end AI solutions that drive innovation and deliver measurable business value
            </p>
          </div>

          {/* Services grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <div 
                  key={index}
                  className={`glass-card p-6 hover-lift group relative ${
                    service.popular ? 'ring-2 ring-primary/50' : ''
                  }`}
                >
                  {/* Popular badge */}
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Service icon */}
                  <div className="glass-card p-4 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-all duration-300">
                    <ServiceIcon className="w-8 h-8 text-primary pulse-glow" />
                  </div>

                  {/* Service details */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 pulse-glow"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button → Scroll to Contact */}
                  <div className="mt-auto">
                    <Button 
                      variant={service.popular ? "hero" : "outline"} 
                      className="w-full group"
                      onClick={() => scrollToSection("contact")}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Process section */}
          <div className="glass-card p-8 lg:p-12 mb-12">
            <h3 className="text-2xl lg:text-3xl font-semibold text-center text-foreground mb-12">
              My Development Process
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center relative">
                  {/* Step number */}
                  <div className="glass-card w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-xl font-bold gradient-text">{step.number}</span>
                  </div>
                  
                  {/* Connecting line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-primary/30 -z-10"></div>
                  )}
                  
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    {step.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom solutions CTA */}
          <div className="text-center">
            <div className="glass-card p-8 lg:p-12 max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Target className="w-12 h-12 text-primary pulse-glow" />
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-6">
                Need a Custom AI Solution?
              </h3>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Every business is unique. Let's discuss your specific challenges and create 
                a tailored AI solution that delivers exactly what you need.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" onClick={() => scrollToSection("contact")}>
                  <Users className="w-5 h-5" />
                  Schedule a Consultation
                </Button>
                <Button variant="glass" size="lg" onClick={() => scrollToSection("contact")}>
                  <MessageSquare className="w-5 h-5" />
                  Discuss Your Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
