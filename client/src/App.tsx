import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import CreatePost from './pages/CreatePost'
import FullPost from './pages/FullPost'
import Products from './components/Products'
import History from './pages/History'
import Navbar from './components/Navbar'
import ReadLater from './components/ReadLater'
import Favorites from './components/Favorites'
import { Routes, Route } from 'react-router-dom'
import { lightTheme, darkTheme } from './styled-component/theme'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styled-component/globalStyle'
import {
  FlexContainer,
  ListItem,
  Container,
} from './styled-component/styledComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faMoon as farMoon } from '@fortawesome/free-regular-svg-icons'

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <FlexContainer justifyContent={'space-around'} margin={'1rem'}>
        <Navbar />
        <Container flexDirection={'row'}>
          <Header />
        </Container>
        <ListItem onClick={toggleTheme} style={{ marginRight: '2rem' }}>
          {theme === 'dark' ? (
            <FontAwesomeIcon icon={farMoon} className="fa-thin" />
          ) : (
            <FontAwesomeIcon icon={faMoon} className="fa-duotone" />
          )}
        </ListItem>
      </FlexContainer>
      <GlobalStyle />

      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/create-post" element={<CreatePost />} />

          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/history" element={<History />} />
          <Route path="/read-later" element={<ReadLater />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
