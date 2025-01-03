
import CourseList from "@/components/courses/course-list";
import { StudentDashboard } from "@/components/dashboard/student-dashboard";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import Testimonials from "@/components/home/TestimonalSliderDemo";





export default function Home() {
  return (
    <div className="space-y-16">


      <Hero />
      <StudentDashboard />
      <Features />
      <CourseList />
      <Testimonials />
    </div>

  );
}
