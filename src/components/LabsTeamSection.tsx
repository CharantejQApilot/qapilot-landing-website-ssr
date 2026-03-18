import { BrainCircuit } from "lucide-react";

const labsTeam = [
  { name: "Muhammed Nihad U", linkedin: "https://www.linkedin.com/in/muhammed-nihad-u-813357212/" },
  { name: "Vidushee Geetam", linkedin: "https://www.linkedin.com/in/vidushee-geetam/" },
  { name: "Aakash B", linkedin: "https://www.linkedin.com/in/aak024/" },
];

const LabsTeamSection = () => {
  return (
    <section className="py-10 md:py-14 relative overflow-hidden">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Meet The Team Behind <span className="text-primary">Labs</span>
          </h2>
        </div>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {labsTeam.map((member, index) => (
            <a
              key={index}
              href={member.linkedin}
              target="_blank"
              rel="noopener"
              className="group flex flex-col items-center text-center transition-transform hover:scale-105 w-[160px] md:w-[180px] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card border border-border/50 flex items-center justify-center mb-3 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
                <BrainCircuit className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {member.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsTeamSection;
