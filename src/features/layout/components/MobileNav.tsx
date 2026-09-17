import MobileNavLinks from "./MobileNavLinks"

function MobileNav() {
  return (
    <aside className=" hidden max-sm:absolute max-sm:block w-full  bottom-0 z-40">
        <MobileNavLinks/>
    </aside>
  )
}

export default MobileNav