import Nav from "./nav";
import NavLinks from "./nav-links";

export default function Navbar() {
  return (
    <div className="flex justify-between items-start">
      <NavLinks />
      <Nav />
    </div>
  );
}
