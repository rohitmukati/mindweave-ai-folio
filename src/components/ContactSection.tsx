import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  MessageCircle
} from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    projectType: "",
    description: "",
    timeline: ""
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_EMAIL_API_URL}/api/save-message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );

      if (res.ok) {
        setShowSuccess(true);
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          projectType: "",
          description: "",
          timeline: ""
        });
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "rohanmukati2002@gmail.com",
      link: "mailto:rohanmukati2002@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 6261903064",
      link: "tel:+916261903064"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Indore, MP, India",
      link: "https://maps.app.goo.gl/RNGfB1KaQrCcNCJm6"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      username: "@rohitmukati",
      link: "https://github.com/rohitmukati",
      color: "hover:text-primary"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      username: "Rohit Mukati",
      link: "https://www.linkedin.com/in/contact-rohit-mukati/",
      color: "hover:text-secondary"
    },
    {
      icon: Mail,
      label: "Email",
      username: "rohanmukati2002@gmail.com",
      link: "mailto:rohanmukati2002@gmail.com",
      color: "hover:text-accent"
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Message sent successfully!</span>
          </div>
        </div>
      )}

      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">Let's Build Something Amazing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your business with AI? Let's discuss your project
              and create intelligent solutions together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <div className="glass-card p-8">
              <div className="flex items-center mb-6">
                <MessageCircle className="w-6 h-6 text-primary mr-3 pulse-glow" />
                <h3 className="text-2xl font-semibold text-foreground">
                  Send Me a Message
                </h3>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      First Name
                    </label>
                    <Input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="glass-card border-glass-border focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Last Name
                    </label>
                    <Input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="glass-card border-glass-border focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john.doe@company.com"
                    className="glass-card border-glass-border focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Company (Optional)
                  </label>
                  <Input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="glass-card border-glass-border focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md glass-card border border-glass-border focus:border-primary transition-colors bg-gray-900 text-white"
                  >
                    <option value="">Select a service</option>
                    <option value="ai-model">AI Model Development</option>
                    <option value="chatbot">Conversational AI & Chatbots</option>
                    <option value="computer-vision">Computer Vision Solutions</option>
                    <option value="data-analytics">Data Analytics & ML Insights</option>
                    <option value="mlops">MLOps & Infrastructure</option>
                    <option value="consulting">AI Consulting & Strategy</option>
                    <option value="custom">Custom Solution</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Project Description
                  </label>
                  <Textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Tell me about your project, challenges, and goals..."
                    rows={4}
                    className="glass-card border-glass-border focus:border-primary transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Timeline & Budget
                  </label>
                  <Textarea
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    placeholder="When do you need this completed? What's your budget range?"
                    rows={2}
                    className="glass-card border-glass-border focus:border-primary transition-colors resize-none"
                  />
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  type="submit"
                  disabled={loading}
                >
                  <Send className="w-5 h-5" />
                  {loading ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  I'll get back to you within 24 hours. For urgent inquiries,
                  please call directly.
                </p>
              </form>
            </div>

            {/* Contact info and social links (unchanged) */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
