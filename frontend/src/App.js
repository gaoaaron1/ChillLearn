import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import SubjectContext from './Pages/SubjectContext';
import QuestionsPage from './Pages/QuestionsPage';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import juniorhigh_banner from './Components/Assets/juniorhigh_banner.png';
import grade_banner from './Components/Assets/kindergarten_poster.png';
import kindergarten_banner from './Components/Assets/kindergarten_banner.png';
import GradesPage from './Pages/GradesPage.jsx'; 
import { GradeProvider } from './Context/GradeContext.jsx';
import TutorialPage from './Pages/tutorialPage.jsx';
import Transaction from './Pages/Transaction.jsx';
import BoardContainer from './Components/BoardContainer/BoardContainer.jsx';

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
            <Route path='/grade2' element={<SubjectContext banner={grade_banner} category="grade2" />} />
            <Route path='/grade3' element={<SubjectContext banner={grade_banner} category="grade3" />} />
            <Route path='/grade4' element={<SubjectContext banner={grade_banner} category="grade4" />} />
            <Route path='/grade5' element={<SubjectContext banner={grade_banner} category="grade5" />} />
            <Route path='/grade6' element={<SubjectContext banner={grade_banner} category="grade6" />} />            
            <Route path='/grade7' element={<SubjectContext banner={juniorhigh_banner} category="grade7" />} />
            <Route path='/grade8' element={<SubjectContext banner={juniorhigh_banner} category="grade8" />} />
            <Route path='/grade9' element={<SubjectContext banner={juniorhigh_banner} category="grade9" />} />
            <Route path='/grade10' element={<SubjectContext banner={juniorhigh_banner} category="grade10" />} />
            <Route path='/grade11' element={<SubjectContext banner={juniorhigh_banner} category="grade11" />} />
            <Route path='/grade12' element={<SubjectContext banner={juniorhigh_banner} category="grade12" />} />

            <Route path="/questions/:grade/:subject/:unit" element={<QuestionsPage />} />
          
            <Route path='/tutorial/:grade/:subject/:unit' element={<TutorialPage />} />
            
            <Route path='/login' element={<LoginSignup />} />
            <Route path='/grades' element={<GradesPage />} />
          </Routes>
          <Footer />
          <BoardContainer />
        </GradeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;