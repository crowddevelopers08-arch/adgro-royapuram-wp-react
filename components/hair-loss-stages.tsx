"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope, Award, Users, Cpu, Building2, CalendarCheck } from "lucide-react";

const usps = [
  {
    icon: Stethoscope,
    title: "Dermatology-Led Expertise",
    description: "All treatments performed by Dr Sushma, MD, Dermatology & Hair Transplant Surgeon.",
  },
  {
    icon: Award,
    title: "10+ Years of Clinical Experience",
    description: "Over a decade of delivering safe, evidence-based hair restoration solutions.",
  },
  {
    icon: Users,
    title: "10,000+ Patients Treated",
    description: "A trusted clinic with thousands of successful transformations.",
  },
  {
    icon: Cpu,
    title: "Advanced Hair Transplant Technology",
    description: "Precision FUE techniques for denser, natural-looking results.",
  },
  {
    icon: Building2,
    title: "Safe & Modern Infrastructure",
    description: "Fully equipped dermatology centre with advanced hair and laser systems.",
  },
  {
    icon: CalendarCheck,
    title: "Results Focused With Follow-Ups",
    description: "Structured follow-up and continuous tracking to ensure long-term success.",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Why Thousands Choose <span className="text-primary">Skinology</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Trusted dermatology expertise, advanced hair treatments, and a results-driven clinical process, all under one roof.
          </p>
        </div>

        {/* USP Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {usps.map((usp, index) => (
            <div
              key={usp.title}
              className="card-elegant group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <usp.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {usp.title}
                  </h3>
                  <p className="text-muted-foreground">{usp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="xl" className="group">
            Start Your Treatment Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
