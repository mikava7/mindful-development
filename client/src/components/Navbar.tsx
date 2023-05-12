import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Navigation,
  HamburgerMenu,
  SlideOutMenu,
} from '../styled-component/styledComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faRss,
  faClockRotateLeft,
  faBookmark,
  faStar,
  faUser,
  faUserPlus,
  faShop,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
const Navbar = () => {
  const favorites = useSelector((state) => state.favorites.favorites) || {}
  const favoritesLength = favorites.favorites && favorites.favorites.length

  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState)
    console.log('clicked')
    console.log('isOpen', isOpen)
  }

  return (
    <Navigation>
      <HamburgerMenu onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </HamburgerMenu>
      <SlideOutMenu
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <Navigation maxWidth={'100px'}>
          <StyledLink to="/" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faRss} />
            All Posts
          </StyledLink>
          <StyledLink to="/history" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faClockRotateLeft} />
            History
          </StyledLink>
          <StyledLink to="/my-page" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faUser} />
            My page
          </StyledLink>

          <StyledLink to="/users" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faUsers} />
            All Users
          </StyledLink>

          <StyledLink to="/favorites" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faStar} />
            Favorites{favoritesLength ? favoritesLength : null}
          </StyledLink>
          <StyledLink to="/login" onClick={toggleMenu}>
            {' '}
            <FontAwesomeIcon icon={faUser} />
            Login
          </StyledLink>
          <StyledLink to="/register" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faUserPlus} />
            Register
          </StyledLink>
          <StyledLink to="/products" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faShop} />
            Store
          </StyledLink>
        </Navigation>
      </SlideOutMenu>
    </Navigation>
  )
}

const StyledLink = styled(Link)`
  font-size: 1.3rem;
  width: 150px;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  & > svg {
    margin-right: 1rem;
    background-color: transparent;
  }
`
export default Navbar
