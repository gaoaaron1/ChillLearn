import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import SubjectContext from './Pages/SubjectContext';
import QuestionsPage from './Pages/QuestionsPage';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import grade_banner from './Components/Assets/kindergarten_poster.png';
import kindergarten_banner from './Components/Assets/kindergarten_banner.png';
import GradesPage from './Pages/GradesPage.jsx';
import { GradeProvider } from './Context/GradeContext.jsx';
import TutorialPage from './Pages/tutorialPage.jsx';
import Transaction from './Pages/Transaction.jsx';
import DropdownContainer from './Components/DropdownContainer/DropdownContainer.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <GradeProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/donate' element={<Transaction />} />
            <Route path='/kindergarten' element={<SubjectContext banner={kindergarten_banner} category="kindergarten" />} />
            <Route path='/grade1' element={<SubjectContext banner={grade_banner} category="grade1" />} />
            <Route path="/questions/:grade/:subject/:unit" element={<QuestionsPage />} />
            <Route path='/tutorial/:grade/:subject/:unit' element={<TutorialPage />} />
            <Route path='/login' element={<LoginSignup />} />
            <Route path='/grades' element={<GradesPage />} />
          </Routes>
          <Footer />
          <DropdownContainer /> {/* Add the dropdown container here */}
        </GradeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
