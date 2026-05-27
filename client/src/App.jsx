import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import InterviewRoom from "./pages/InterviewRoom.jsx";
import Results from "./pages/Results.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import Auth from "./pages/Auth.jsx";
import MCQRoom   from "./pages/MCQRoom.jsx";
import VoiceRoom from "./pages/VoiceRoom.jsx";
import MockRoom  from "./pages/MockRoom.jsx";
import SessionSelect from "./pages/Sessionselect.jsx";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<SessionSelect />} />
      <Route path="/practice"  element={<SessionSelect />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/interview" element={<InterviewRoom />} />
      <Route path="/dashboard" element={<Navigate to="/interview" replace />} />
      <Route path="/results" element={<Results />} />
      <Route path="/results/:sessionId" element={<Results />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/mcq"   element={<MCQRoom />} />
      <Route path="/voice" element={<VoiceRoom />} />
      <Route path="/mock"  element={<MockRoom />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}