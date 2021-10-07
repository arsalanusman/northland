import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import ScrollAnimation from 'react-animate-on-scroll';
import ButtonLink from "../styles/button";

function Text(props) {
		const data = props.data;
		const link = data.button['link'];
		const [baseUrl, setbaseUrl] = useState();

		useEffect(() => {
			if(typeof window !== "undefined"){
				setbaseUrl(frontity.state.frontity.url);
			}
		});	

		// console.log(baseUrl);

	  return(
		<TextComponent className="control-animation" align={data.alignment} topPadding={data.vertical_padding['top']} bottomPadding={data.vertical_padding['bottom']} background={data.background_color}>
			<Container>
				<ScrollAnimation animateIn="fadeIn" animateOnce={true}>
					{data.section_title ? <SubHeading background={data.background_color}>{data.section_title}</SubHeading>:""}
					{data.headline['heading'] ? <Title as={data.headline['font_size']} weight={data.headline['font_weight']}>{data.headline['heading']}</Title>:""}
					{data.paragraph['text'] ? <Paragraph size={data.paragraph['front_size']} weight={data.paragraph['font_weight']}>{data.paragraph['text']}</Paragraph>:""}
					{link['title'] && <ButtonLink className={data.button['type'] == 'pre' ? 'primary':'secondary'} target={link['target'] && link['target']} href={link['url'] && (link['url'].indexOf(baseUrl) > -1) ? "/" + link['url'].split(baseUrl).join('') : link['url'].split(baseUrl).join('')} color={data.button['color']}>{link['title'] && link['title']}</ButtonLink>}
				</ScrollAnimation>
			</Container>				
		</TextComponent>
	  )
}
export default Text;

const CustomButton = ({ children, ...props }) => <ButtonLink {...props}>{children}</ButtonLink>;

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
  max-width:1000px;
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
	letter-spacing: -0.29px;
  }

`;


export const H1 = styled.h1`
  padding: 0;
  display: block;
  margin:0;
  padding: 35px 0 0px 0px;
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
	padding: 20px 0 0 0;
   }

`;

const Title = ({ children, ...props }) => <H1 {...props}>{children}</H1>;

export const Paragraph = styled.p`
  padding: 55px 0 0 0;
  display: block;
  font-weight:${props=> {
  	if(props.weight == 'bold')
  		return 'bold'
  	if(props.weight == 'reg')
  		return 'normal'
   }};
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
	font-size: 20px;
	line-height: 26px;
	letter-spacing: -0.04px;
	padding: 30px 0 0 0;
   }
`;