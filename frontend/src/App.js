import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import SubjectContext from './Pages/SubjectContext';
import QuestionsPage from './Pages/QuestionsPage';

import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import grade_banner from './Components/Assets/kindergarten_poster.png';
import kindergarten_banner from './Components/Assets/kindergarten_banner.png';
import GradesPage from './Pages/GradesPage.jsx'; // Import the GradesPage component
import { GradeProvider } from './Context/GradeContext.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <GradeProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/kindergarten' element={<SubjectContext banner={kindergarten_banner} category="kindergarten" />} />
          <Route path='/grade1' element={<SubjectContext banner={grade_banner} category="grade1" />} />
          <Route path='/grade2' element={<SubjectContext banner={grade_banner} category="grade2" />} />
          <Route path="/questions/:grade/:subject/:unit" element={<QuestionsPage />} />

          <Route path='/login' element={<LoginSignup />} />
          {/* Add the Grades route here */}
          <Route path='/grades' element={<GradesPage />} /> 
        </Routes>
        <Footer />
        </GradeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
