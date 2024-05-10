import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  ImageSlider,
  Login,
  PostPutImageSlider,
  PostPutSoap,
  PostPutStory,
  PostPutTeamMember,
  Soaps,
  Stories,
  TeamMembers,
} from "./pages";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/team-members" element={<TeamMembers />} />
          <Route path="/team-members/create" element={<PostPutTeamMember />} key="create" />
          <Route path="/team-members/:id" element={<PostPutTeamMember />} key="update" />

          <Route path="/soaps" element={<Soaps />} />
          <Route path="/soaps/create" element={<PostPutSoap />} key="create" />
          <Route path="/soaps/:id" element={<PostPutSoap />} key="update" />

          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/create" element={<PostPutStory />} key="create" />
          <Route path="/stories/:id" element={<PostPutStory />} key="update" />

          <Route path="/image-slider" element={<ImageSlider />} />
          <Route path="/image-slider/create" element={<PostPutImageSlider />} key="create" />
          <Route path="/image-slider/:id" element={<PostPutImageSlider />} key="update" />
        </Route>

        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
