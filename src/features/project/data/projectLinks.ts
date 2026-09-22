import epicsIcon from "@/assets/icons/epics.svg";
import tasksIcon from "@/assets/icons/tasks.svg";
import membersIcon from "@/assets/icons/members.svg";
import detailsIcon from "@/assets/icons/details.svg";
import editIcon from "@/assets/icons/edit.svg";

export const projectLinks = [
  {
    label: "Epics",
    path: "epics",
    icon: epicsIcon,
  },
  {
    label: "Tasks",
    path: "tasks",
    icon: tasksIcon,
  },
  {
    label: "Members",
    path: "members",
    icon: membersIcon,
  },
  {
    label: "Details",
    path: "edit",
    icon: detailsIcon,
  },
];

export const projectCardLinks = [
  ...projectLinks.filter((link) => link.label !== "Details"),
  {
    label: "Edit",
    path: "edit",
    icon: editIcon,
  },
];

export function getProjectLink(
  projectId: string,
  path: string,
) {
  return `/projects/${projectId}/${path}`;
}