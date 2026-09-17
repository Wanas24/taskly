import ProjectsIcon from "@/assets/icons/Projects";


function MobileNavLinks() {
  return (
    <nav className="flex gap-1 justify-center px-6 py-4 bg-surface-low">
      
      
          <button
            className={
              "group flex items-center gap-0.5 flex-col  text-[10px] font-medium text-slate-dark transition hover:text-primary"
            }
          >
            <ProjectsIcon className="h-5 w-5 shrink-0" />

            <span>Projects</span>
          </button>
     
    </nav>
  );
}

export default MobileNavLinks;
