import styled, { CSSProperties } from 'styled-components'
import { lightTheme, darkTheme, theme } from './theme.ts'
import { Link } from 'react-router-dom'

interface StyledComponentProps {
  display?: CSSProperties['display']
  justifyContent?: CSSProperties['justifyContent']
  justifySelf?: CSSProperties['justifySelf']
  alignItems?: CSSProperties['alignItems']
  alignSelf?: CSSProperties['alignSelf']
  color?: CSSProperties['color']
  flexDirection?: CSSProperties['flexDirection']
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  maxWidth?: CSSProperties['maxWidth']
  maxHeight?: CSSProperties['maxHeight']
  margin?: CSSProperties['margin']
  padding?: CSSProperties['padding']
  fontSize?: CSSProperties['fontSize']
  border?: CSSProperties['border']
  borderRadius?: CSSProperties['borderRadius']
  marginLeft?: CSSProperties['marginLeft']
}

export const FlexContainer = styled.div<StyledComponentProps>`
  display: ${(props) => props.display || 'flex'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  justify-self: ${(props) => props.justifySelf || 'flex-start'};
  align-items: ${(props) => props.alignItems || 'center'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
  max-width: ${(props) => props.maxWidth || '370px'};
  background-color: ${(props) => props.theme.colors.secondary};
  margin: ${(props) => props.margin || ''};
  margin-left: ${(props) => props.marginLeft || '1rem'};
  border-radius: ${(props) => props.borderRadius || '1rem'};
  color: ${(props) => props.theme.colors.text};
  span {
    margin-left: 0.5rem;
  }
  b {
  }
  @media only screen and (min-width: 480px) {
    flex-direction: ${(props) => props.flexDirection || 'row'};
    justify-content: ${(props) => props.justifyContent || 'space-evenly'};
    max-width: ${(props) => props.maxWidth || '768px'};
    width: ${(props) => props.width || '70%'};

    svg {
      width: 50px;
      font-size: '3rem';
    }
    p {
      padding: 2rem;
      width: 300px;
      font-size: '3rem';
    }
  }

  @media only screen and (min-width: 768px) {
    p {
      padding: 2rem;
      width: 300px;
      font-size: '3rem';
    }
    flex-direction: ${(props) => props.flexDirection || 'row'};
    font-size: '3rem';
  }
`
export const CardContainer = styled.div<StyledComponentProps>`
  display: ${(props) => props.display || 'flex'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-items: ${(props) => props.alignItems || 'center'};
  flex-direction: ${(props) => props.flexDirection || 'column '};
  max-width: ${(props) => props.maxWidth || '370px'};
  width: ${(props) => props.width || '370px'};
  margin: ${(props) => props.margin || '1rem'};
  border-radius: ${(props) => props.borderRadius || '1rem'};
  background-color: ${(props) => props.theme.colors.secondary};

  @media only screen and (min-width: 480px) {
    max-width: ${(props) => props.maxWidth || '768px'};
    width: ${(props) => props.width || '768px'};
    display: ${(props) => props.display || 'flex'};
  }
`

export const Container = styled.div<StyledComponentProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  width: ${(props) => props.width || '300px'};
  /* background-color: ${(props) => props.theme.colors.background}; */
  li {
    margin-left: 0.5rem;
  }
  span {
    margin-left: 0.5rem;
    justify-content: ${(props) => props.justifyContent || 'flex-end'};
    color: ${(props) => props.theme.colors.text};
  }
  @media only screen and (min-width: 480px) {
    width: ${(props) => props.width || '668px'};

    span {
      font-size: 1.5rem;
      font-weight: bold;
    }
    img {
      width: 350px;
    }
  }
`

export const ImageContainer = styled.div<StyledComponentProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-items: ${(props) => props.alignItems || 'center'};
  padding: 1rem;
  max-width: 22rem;
  max-height: 22rem;

  & img {
    max-width: 100%;
    height: auto;
  }

  @media (min-width: 719px) {
    max-width: 26rem;
    max-height: 26rem;
  }

  @media (min-width: 992px) {
    max-width: 32rem;
    max-height: 32rem;
  }
`

export const Title = styled.h1<StyledComponentProps>`
  font-size: ${(props) => props.fontSize || '1.2rem'};
  display: ${(props) => props.display || 'flex'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  color: ${(props) => props.theme.colors.text};

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
  @media (min-width: 992px) {
    font-size: 1.5rem;
  }
`

export const Text = styled.p<StyledComponentProps>`
  font-size: 1.2rem;
  display: ${(props) => props.display || 'flex'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  color: ${(props) => props.theme.colors.text};
  align-self: ${(props) => props.alignSelf || 'center'};
  margin-bottom: ${(props) => props.marginBottom || '1rem'};

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
  @media (min-width: 992px) {
    font-size: 1.4rem;
  }
`

export const Navigation = styled.div<StyledComponentProps>`
  display: ${(props) => props.display || 'flex'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  align-items: ${(props) => props.alignItems || 'flex-start'};
  margin-left: ${(props) => props.marginLeft || '1rem'};
  max-width: ${(props) => props.maxWidth || '350px'};
  flex-direction: ${(props) => props.flexDirection || 'column'};

  @media only screen and(min-width: 480px) {
    /* max-width:${(props) => props.maxWidth || '678px'}; */
    /* width:${(props) => props.width || '660px'}; */
  }
`

export const HamburgerMenu = styled.div<StyledComponentProps>`
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  font-size: ${(props) => props.fontSize || '2rem'};
  cursor: pointer;
`

export const SlideOutMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background-color: ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.text};
  padding: 10px;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1;
`

export const ListItem = styled.li<StyledComponentProps>`
  height: ${(props) => props.height || '30px'};
  width: ${(props) => props.width || '30px'};
  font-size: ${(props) => props.fontSize || '1.2rem'};
  color: ${(props) => props.theme.colors.text};
  list-style-type: none;
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
  @media only screen and(min-width: 480px) {
    font-size: 3rem;
    padding: 1rem;
    margin-right: 23rem;
    width: 60px;
    svg {
      font-size: 3rem;
      padding: 1rem;
      margin-right: 3rem;
      width: 60px;
    }
  }
`
export const StyledLink = styled(Link)<StyledComponentProps>`
  font-size: 1.2rem;
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.fontSize || '1.2rem'};
  padding: 1rem;
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
  @media (min-width: 992px) {
    font-size: 1.6rem;
  }
`
export const Button = styled.button<StyledComponentProps>`
  height: ${(props) => props.height || '30px'};
  width: ${(props) => props.width || '30px'};
  font-size: ${(props) => props.fontSize || '1.2rem'};
  padding: ${(props) => props.padding || '0.5rem'};
  width: 100%;
  border: none;
`
