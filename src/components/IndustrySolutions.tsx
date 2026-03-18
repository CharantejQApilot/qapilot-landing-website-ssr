const IndustrySolutions = () => {
  const industries = [
    {
      title: "Healthcare",
      description: "Specialized testing for healthcare apps",
      features: [
        "HIPAA compliance validation",
        "Patient data security testing", 
        "Medical device integration",
        "Regulatory compliance checks"
      ]
    },
    {
      title: "Telco Carrier",
      description: "Comprehensive testing for telecom applications", 
      features: [
        "Network performance testing",
        "Call quality assurance",
        "Billing system validation",
        "Multi-device compatibility"
      ]
    },
    {
      title: "Travel & Hospitality",
      description: "Seamless testing for travel platforms",
      features: [
        "Booking flow validation",
        "Payment processing tests",
        "Multi-language support",
        "Real-time availability checks"
      ]
    },
    {
      title: "BFSI",
      description: "Secure testing for financial services",
      features: [
        "Transaction security testing",
        "Fraud detection validation",
        "Regulatory compliance",
        "Multi-factor authentication"
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-background-alt">
      <div className="container mx-auto max-w-screen-xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Industry Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tailored testing solutions for your industry's unique requirements and compliance needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              {/* Placeholder image */}
              <div className="w-full h-32 bg-muted rounded-lg mb-4 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Industry Image</span>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {industry.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {industry.description}
              </p>
              
              <ul className="space-y-2">
                {industry.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;