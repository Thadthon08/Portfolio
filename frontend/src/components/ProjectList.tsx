import CatVoice from "../assets/project/catvoice.png";
import SUTAttendance from "../assets/project/sutattendance.png";
import SoftwareKey from "../assets/project/softwarekey.png";
import Card from "./Card";
import { ExternalLink } from "lucide-react";

const projectList = [
  {
    id: 1,
    title: "SUT Online Attendance System",
    image: SUTAttendance,
    link: "https://sut-online-attendance-system-v1.vercel.app/",
    description:
      "An online attendance system enabling students to check in via QR code and teachers to monitor attendance through a web interface.",
  },
  {
    id: 2,
    title: "Key Software Online",
    image: SoftwareKey,
    link: "#",
    description:
      "A website for selling software keys, developed as a project in the Software Engineering course.",
  },
  {
    id: 3,
    title: "Cat's Voice",
    image: CatVoice,
    link: "https://cat-s-voice-i9uz.vercel.app/",
    description:
      "A project focused on finding homes for cats and dogs, developed as a project in the Advanced Web Application course.",
  },
];

function ProjectList() {
  return (
    <div className="w-3/4 mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-yellow-500 mb-8">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectList.map((project) => (
          <Card key={project.id} className="group p-6 h-full">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                <img
                  src={project.image || "/api/placeholder/400/225"}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-yellow-500 group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                </div>
                <p className="text-gray-300 line-clamp-3">
                  {project.description}
                </p>
              </div>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
