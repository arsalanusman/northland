import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import ScrollAnimation from 'react-animate-on-scroll';
import ButtonLink from "../styles/button";

function TextImage(props){
	// console.log(props.data)
	const data = props.data;
	const link =  data.button['link'] ;

	const [baseUrl, setbaseUrl] = useState();
	const [isMobile, setIsMobile] = useState(false);
	useEffect(()=>{
		if(typeof window !== "undefined"){
			setbaseUrl(frontity.state.frontity.url);
			setIsMobile(window.matchMedia('(max-width: 600px)').matches);
			$(window).on('resize',function(){
				setIsMobile(window.matchMedia('(max-width: 600px)').matches)
			});
		}
	});

  return(
  	<TextComponent topPadding={data.vertical_padding['top']} bottomPadding={data.vertical_padding['bottom']} background={data.background_color}>
		<Container>
			<TextGridContainer align={data.alignment}>
				<TextGrid>
					<ScrollAnimation animateIn="fadeIn" duration={2} animateOnce={true}>
						{data.section_title.length > 0 && <SubHeading background={data.background_color}>{data.section_title}</SubHeading>}
						{data.headline['heading'].length > 0 && <Title as={data.headline['font_size']} weight={data.headline['font_weight']}>{data.headline['heading']}</Title>}
						{data.paragraph['text'].length > 0 && <Paragraph size={data.paragraph['front_size']} weight={data.paragraph['font_weight']}>{data.paragraph['text']}</Paragraph>}
						{link['title'] && <ButtonLink className={data.button['type'] == 'pre' ? 'primary':'secondary'} target={link['target'] && link['target']} href={link['url'] && (link['url'].indexOf(baseUrl) > -1) ? "/" + link['url'].split(baseUrl).join('') : link['url'].split(baseUrl).join('')} color={data.button['color']}>{link['title'] && link['title']}</ButtonLink>}
				</ScrollAnimation>
				</TextGrid>
				<ImageGrid>
					<ScrollAnimation animateIn="fadeInUpLong" duration={1} animateOnce={true}>
						{isMobile ? 
							[data.mobile_image.length > 0 ? <img src={data.mobile_image} data-image="mobile" /> : <img src={data.desktop_image} data-image="desktop" />] 
						: 
							[data.desktop_image && <img src={data.desktop_image} data-image="desktop" />]
						}
					</ScrollAnimation>
				</ImageGrid>
			</TextGridContainer>
		</Container>
  	</TextComponent>
  );
}	
export default TextImage;

export const TextComponent = styled.div`
	position:relative; 
	z-index:1;
	text-align:${props=>props.align};
	background-color:${props=> {
		if(props.background == 'red')
			return '#FF0000'
		if(props.background == 'navy')
			return '#01203F'
		if(props.background == 'white')
			return '#FFFFFF'
	}};
	color:${props=> {
		if(props.background == 'red')
			return '#01203F'
		if(props.background == 'navy')
			return '#FFFFFF'
		if(props.background == 'white')
			return '#01203F'
	}};
	padding-top:${props=> {
		if(props.topPadding == 'default')
			return '12rem'
		if(props.topPadding == 'reduced')
			return '6rem'
		if(props.topPadding == 'none')
			return '0rem'
	}};
	padding-bottom:${props=> {
	if(props.bottomPadding == 'default')
		return '12rem'
	if(props.bottomPadding == 'reduced')
		return '6rem'
	if(props.bottomPadding == 'none')
		return '0rem'
	}};
	  margin-left: auto;
	  margin-right: auto;

	  @media (max-width:1023px){
		padding-top: 4rem;
    	padding-bottom: 4rem;
	  }
	
`;

export const Container = styled.div`
  max-width:1160px;
  margin:auto;
  padding:0px 15px;
`;
export const SubHeading = styled.div`
  display: block;
  font-family: "Ginto Nord Bold";
  text-transform: uppercase;
  font-size: 22px;
  line-height: 18px;
  letter-spacing: -0.46px;
  color:${props=> {
	if(props.background == 'red')
		return '#FFFFFF'
	if(props.background == 'navy')
		return '#FF0000'
	if(props.background == 'white')
		return '#FF0000'
  }};

  @media (max-width:1023px){
	font-size: 14px;
    line-height: 18px;
  }

`;


export const H1 = styled.h1`
  padding: 0;
  display: block;
  margin:0;
  padding: 20px 0 0px 0px;
  font-family:${props=> {
  	if(props.weight == 'bold')
  		return 'Ginto Normal Bold'
  	if(props.weight == 'reg')
  		return 'Ginto Normal Regular'
   }};
   font-size:${props=> {
	if(props.size == 'h1')
		return '96px'
	if(props.size == 'h2')
		return '72px'
	if(props.size == 'h3')
		return '48px'
   }};

   @media (max-width:1023px){
	font-size: 46px;
    line-height: 46px;
   }
   @media (max-width:400px){
	font-size: 12vw;
    line-height: 12vw;
   }

`;

const Title = ({ children, ...props }) => <H1 {...props}>{children}</H1>;

export const Paragraph = styled.p`
  padding: 30px 0 0 0;
  display: block;
   font-family:${props=> {
	if(props.weight == 'bold')
		return 'Ginto Normal Bold'
	if(props.weight == 'reg')
		return 'Ginto Normal Regular'
   }};
   font-size:${props=> {
  	if(props.size == 'Large')
  		return '34px'
  	if(props.size == 'Medium')
  		return '24px'
  	if(props.size == 'Small')
  		return '18px'
   }};
   line-height:${props=> {
	if(props.size == 'Large')
		return '38px'
	if(props.size == 'Medium')
		return '32px'
	if(props.size == 'Small')
		return '24px'
   }};

   @media (max-width:1023px){
	font-size: 14px;
    line-height: 18px;
   }
`;

const TextGridContainer = styled.div`
	display: flex;
	flex-flow:${props=> props.align == 'Right' ? 'row' : 'row-reverse'};
	align-items: center;
	@media (max-width:1023px){
		flex-flow: column-reverse;
	}
`;
const TextGrid = styled.div`
	width: 62%;
	padding-left: 6rem;
	padding-right: 3.5rem;
	@media (width:1024px){
		width: 44%;
		padding-left: 0rem;
		padding-right: 6.5rem;
	}
	@media (max-width:1023px){
		padding:0;
		width:100%;
	}
`;
const ImageGrid = styled.div`
	max-width:740px;
	width:100%;
	@media (max-width:1023px){
		margin-bottom: 30px;
	}
`;