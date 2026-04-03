import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FullLayout, ProfileLayout, MessagesLayout } from "../components/layout/Layout";
import BottomNav from "../components/layout/BottomNav";
import CreatePost from "../components/feed/CreatePost";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Friends from "../pages/Friends";
import Messages from "../pages/Messages";
import Notifications from "../pages/Notifications";
import Explore from "../pages/Explore";
import Saved from "../pages/Saved";

function AppRoutes() {
  const { createPostOpen } = useApp();

  return (
    <>
      <Routes>

        {/* FullLayout — Navbar + Left Sidebar + Right Panel */}
        <Route element={<FullLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
        </Route>

        {/* ProfileLayout — Navbar + Left Sidebar, no Right Panel */}
        <Route element={<ProfileLayout />}>
          <Route path="/profile/:username?" element={<Profile />} />
        </Route>

        {/* MessagesLayout — Navbar only, no sidebars */}
        <Route element={<MessagesLayout />}>
          <Route path="/messages" element={<Messages />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      <BottomNav />
      {createPostOpen && <CreatePost />}
    </>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
