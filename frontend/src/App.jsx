import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import Upload from './pages/Upload'
import View from "./pages/View";
import HomeLayout from "./layout/HomeLayout";
import './App.css'
import ScrollToTop from "./utils/ScrollToTop";
import RecipeDetails from "./pages/components/RecipeDetails";
import { RecipeProvider } from "./context/RecipeContext";
import Favorite from "./pages/Favorite";
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <RecipeProvider>
        <Routes>
          <Route path="/" element={<HomeLayout />} >
            <Route index element={<Home />} />
            <Route path="recipes" element={<View />} />
            <Route path="recipes/:id" element={<RecipeDetails />} />
            <Route path="create" element={<Upload />} />
            <Route path="favorites" element={<Favorite />} />
          </Route>
        </Routes>
      </RecipeProvider>
      <Toaster position="top-right" />
    </Router>
  )
}

export default App