import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import ScrollAnimation from 'react-animate-on-scroll';
import ButtonLink from "../styles/button"

function Accordion(props){

	const data = props.data;
	const [ multiple_articles, setMultiple] = useState( props.data.multiple_articles);
	const [opened, setOpened] = useState(false);

	const [baseUrl, setbaseUrl] = useState();

	useEffect(() => {
		if(typeof window !== "undefined"){
			setbaseUrl(frontity.state.frontity.url);
		}
	});	

	//console.log(opened)
	// console.log(data)
  	return(
		  <TextComponent topPadding={data.vertical_padding['top']} bottomPadding={data.vertical_padding['bottom']} background={data.background_color}>
			  <Container>
			  	<ScrollAnimation animateIn="fadeIn" delay={400} animateOnce={true}>
					{data.section_title.length > 0 && <SubHeading background={data.background_color}>{data.section_title}</SubHeading>}
				</ScrollAnimation>
				{multiple_articles.length > 0  && multiple_articles.map((items,index)=>
											
							[items.headline.length > 0 &&
							
							<ScrollAnimation key={index} animateIn="fadeInUp" delay={300*index} animateOnce={true}>
								<Article background={data.background_color} className={opened[index] && 'Open'}
										 onClick={() => setOpened( opened[index] == true ? {[index]:false} : {[index]:true})  }>
									{items.headline.length > 0 && <Title as="h3">{items.headline}</Title>}
									<ToggleContent>
										{items.body.length > 0 &&
										<Paragraph dangerouslySetInnerHTML={{ __html: items.body }}></Paragraph>}
										{items.cta_button['link_page_or_url']['title'] && <ButtonLink className={items.cta_button['type'] && items.cta_button['type'] == 'pre' ? 'primary':'secondary'} target={items.cta_button['link_page_or_url']['target'] && items.cta_button['link_page_or_url']['target']} href={items.cta_button['link_page_or_url']['url'] && (items.cta_button['link_page_or_url']['url'].indexOf(baseUrl) > -1) ? "/" + items.cta_button['link_page_or_url']['url'].split(baseUrl).join('') : items.cta_button['link_page_or_url']['url'].split(baseUrl).join('')} color={items.cta_button['color'] && items.cta_button['color']}>{items.cta_button['link_page_or_url']['title'] && items.cta_button['link_page_or_url']['title']}</ButtonLink>}			
									</ToggleContent>
								</Article>
							</ScrollAnimation>
						]
					)}
				</Container>
		  </TextComponent>
  	);
}
export default Accordion;

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
  max-width:1030px;
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
  padding-bottom: 55px;
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
  padding: 14px 0 18px 0px;
  font-size:24px;
  line-height: 24px;
  font-family: "Ginto Normal Bold";
  letter-spacing: -0.04px;
  cursor: pointer;

   @media (max-width:1023px){
	font-size: 14px;
	line-height: 19px;
	letter-spacing: -0.03px;
   }

`;

const Title = ({ children, ...props }) => <H1 {...props}>{children}</H1>;

export const Paragraph = styled.p`
	padding: 20px 0 40px 0;
	font-family:'Ginto Normal Regular';
    font-size: 18px;
    line-height: 24px;

   @media (max-width:1023px){
	font-size: 14px;
    line-height: 18px;
   }
`;

export const Article = styled.div`
	display: block;
	border-bottom: 1px solid;
	padding-left: 105px;
	position: relative;
	&:before, &:after{
		transition: all 0.5s;
		position: absolute;
		content: ' ';
		width: 24px;
		background:${props=> {
			if(props.background == 'red')
				return '#01203F'
			if(props.background == 'navy')
				return '#FFFFFF'
			if(props.background == 'white')
				return '#01203F'
		}};
		height: 5px;
		left: 0;
		top: 29px;
	}
	&:after{
		transform: rotate(90deg);	
	}
	&.Open{
		> div{
			max-height: 9999px;
			transition-timing-function: cubic-bezier(0.5, 0, 1, 0); 
			transition-delay: 0s;
			opacity:1;
		}
		&:after{
			transform: rotate(-180deg);	
		}
	}

	@media (max-width:1023px){
		padding-left: 33px;
		&:before, &:after{
			width:18px;
			height:3px;
			top:23px;
		}
	}
`;

export const ToggleContent = styled.div`
	display: block;
	overflow: hidden;
	max-height: 0px;
	opacity:0;
	transition: max-height .8s cubic-bezier(0, 1, 0, 1) -.1s, opacity .5s;

	a.primary, a.secondary{
		margin-top:0rem;
		margin-bottom:5rem;
	}

`;