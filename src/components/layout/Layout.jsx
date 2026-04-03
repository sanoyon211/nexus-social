import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";
import { RiCloseLine } from "react-icons/ri";

// Full layout - Navbar + Left Sidebar + Right Panel
export function FullLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070715]">
      <Navbar onMenuToggle={() => setMobileMenuOpen(true)} />
      <MobileSidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="pt-16 max-w-7xl mx-auto">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="hidden md:block w-64 xl:w-72 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-[#1e1e48]">
            <Sidebar />
          </div>

          {/* Page Content */}
          <main className="flex-1 min-w-0 pb-20 md:pb-0">
            <Outlet />
          </main>

          {/* Right Panel */}
          <div className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-l border-[#1e1e48]">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile layout - Navbar + Left Sidebar, NO Right Panel
export function ProfileLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070715]">
      <Navbar onMenuToggle={() => setMobileMenuOpen(true)} />
      <MobileSidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="pt-16 max-w-7xl mx-auto">
        <div className="flex">
          {/* Left Sidebar */}
          <div className="hidden md:block w-64 xl:w-72 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-[#1e1e48]">
            <Sidebar />
          </div>

          {/* Page Content */}
          <main className="flex-1 min-w-0 pb-20 md:pb-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

// Messages layout - Navbar only, NO sidebars
export function MessagesLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070715]">
      <Navbar onMenuToggle={() => setMobileMenuOpen(true)} />
      <MobileSidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="pt-16 max-w-7xl mx-auto">
        <main className="pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Reusable mobile sidebar overlay
function MobileSidebar({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] md:hidden fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#0f0f26] border-r border-[#1e1e48] slide-up overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-[#1e1e48]">
          <span className="font-bold gradient-text text-lg">Menu</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8888bb] hover:text-white hover:bg-[#1a1a40] cursor-pointer transition-all"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>
        <Sidebar mobile onClose={onClose} />
      </div>
    </div>
  );
}
