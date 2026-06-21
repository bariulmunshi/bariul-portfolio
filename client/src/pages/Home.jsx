import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import PublicationsSection from "../components/PublicationsSection";
import ResearchSection from "../components/ResearchSection";
import BlogTeaserSection from "../components/BlogTeaserSection";
import ContactForm from "../components/ContactForm";
import ContactSection from "../components/ContactSection";

const Home = () => {
    return (
        <div>
            <Hero />
            <AboutSection />
            <EducationSection />
            <ExperienceSection />
            <SkillsSection />
            <ProjectsSection />
            <PublicationsSection />
            <ResearchSection />
            <BlogTeaserSection />
            <ContactForm />
            <ContactSection />
        </div>
    );
};

export default Home;
