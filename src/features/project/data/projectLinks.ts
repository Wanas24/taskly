import epicsIcon from "@/assets/icons/epics.svg"
import tasksIcon from "@/assets/icons/tasks.svg"
import membersIcon from "@/assets/icons/members.svg"
import detailsIcon from "@/assets/icons/details.svg"

export const projectLinks = [
  {
    label: "Epics",
    href: "/project/epics",
    icon: epicsIcon,
    
  },
  {
    label: "Tasks",
    href: "/project/tasks",
    icon: tasksIcon,
  },
  {
    label: "Members",
    href: "/project/members",
    icon: membersIcon,
  },
  {
    label: "Details",
    href: "/project/details",
    icon: detailsIcon,
  },
];
export const projectCardLinks = projectLinks.filter(
  (link) => link.label !== "Details",
);