import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/theme"; 
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyCreations from "./pages/MyCreations";
import { Navigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg };
  color: ${({ theme }) => theme.text_primary };
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return <ThemeProvider theme={darkTheme}>
    <Container>
      <Wrapper>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<Signup />} exact />
            <Route path="/explore" element={<PrivateRoute><Explore /></PrivateRoute>}/>
            <Route path="/myCreations" element={<PrivateRoute><MyCreations /></PrivateRoute>} />
            <Route path="/createPost" element={<PrivateRoute><CreatePost /></PrivateRoute>}/>
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </Container>
    </ThemeProvider>
  ;
}

export default App;
