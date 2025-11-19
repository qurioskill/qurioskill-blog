import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import { IndividualWorkshopsPage, OrganizationWorkshopsPage } from "./pages/WorkshopsPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import CodeOfConductPage from "./pages/CodeOfConductPage.jsx";
import SiteLayout from "./components/SiteLayout.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/workshops/individuals" element={<IndividualWorkshopsPage />} />
        <Route path="/workshops/organizations" element={<OrganizationWorkshopsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/code-of-conduct" element={<CodeOfConductPage />} />
        <Route path="/posts/:slug" element={<PostPage />} />
      </Route>
    </Routes>
  );
}
