import styled, { CSSProperties } from 'styled-components';
import { lightTheme, darkTheme, theme  } from './theme.ts';


interface StyledComponentProps {
  display?: CSSProperties['display'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  color?: CSSProperties['color'];
  flexDirection?: CSSProperties['flexDirection'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  maxWidth?: CSSProperties['maxWidth'];
  maxHeight?: CSSProperties['maxHeight'];
  margin?: CSSProperties['margin'];
  fontSize?: CSSProperties['fontSize'];

}

export const FlexContainer = styled.div<StyledComponentProps>`
  display: ${(props) => props.display || 'flex'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-items: ${(props) => props.alignItems || 'center'};
  flex-direction: ${(props)=> props.flexDirection || 'row'};
  max-width:${(props)=> props.width || '400px'};
  margin:${(props)=> props.margin || '0'};
`;
  
export const Navigation = styled.div<StyledComponentProps>`
    display: ${(props) => props.display || 'flex'};
    justify-content: ${(props) => props.justifyContent || 'flex-start'};
    align-items: ${(props) => props.alignItems || 'flex-start'};
    max-width:${(props)=> props.maxWidth || '350px'};
    flex-direction: ${(props)=> props.flexDirection || 'column'};

`;

export const HamburgerMenu = styled.div<StyledComponentProps>`
    align-items: ${(props) => props.alignItems || 'center'};
    justify-content: ${(props) => props.justifyContent || 'center'};
    font-size:${(props)=> props.fontSize || '2rem'};
    cursor: pointer;
`;

export const SlideOutMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 200px;
  background-color: ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.text};
  padding: 10px;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1;

`;

export const ListItem = styled.li<StyledComponentProps>`
    height:${(props)=> props.height || '30px'};
    width:${(props)=> props.width || '30px'};
    font-size:${(props)=> props.fontSize || '2rem'};
    list-style-type: none;

`