import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import { IndividualWorkshopsPage, OrganizationWorkshopsPage } from "./pages/WorkshopsPage.jsx";
import SiteLayout from "./components/SiteLayout.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/workshops/individuals" element={<IndividualWorkshopsPage />} />
        <Route path="/workshops/organizations" element={<OrganizationWorkshopsPage />} />
        <Route path="/posts/:slug" element={<PostPage />} />
      </Route>
    </Routes>
  );
}
