import React from "react";
import { connect, styled } from "frontity";
import ScrollAnimation from 'react-animate-on-scroll';

function TextPair(props){
	//console.log(props.data);
	const data = props.data;
  return(
  	<TextComponent topPadding={data.vertical_padding['top']} bottomPadding={data.vertical_padding['bottom']} background={data.background_color}>
		<Container>
			<ScrollAnimation animateIn="fadeIn" animateOnce={true}>
				{data.section_title.length > 0 && <SubHeading background={data.background_color}>{data.section_title}</SubHeading>}
			</ScrollAnimation>
			{data.multiple_articles_add && data.multiple_articles_add.map((items,index)=>
				<ScrollAnimation animateIn="fadeInUp" delay={200*index} animateOnce={true} key={index}>
					<Article>
						{items.heading && <Title as={data.headline['font_size']} weight={data.headline['font_weight']}>{items.heading}</Title>}
						{items.description.length > 0 && <Paragraph size={data.paragraph['front_size']} weight={data.paragraph['font_weight']}  dangerouslySetInnerHTML={{ __html: items.description }}></Paragraph>}
					</Article>
				</ScrollAnimation>
			)}
		</Container>
  	</TextComponent>
  );
}
export default TextPair;

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
  .animated:last-child > div{
	padding-bottom: 0rem;	
  }
`;
export const SubHeading = styled.div`
  display: block;
  font-family: "Ginto Nord Bold";
  text-transform: uppercase;
  font-size: 22px;
  line-height: 18px;
  letter-spacing: -0.46px;
  padding-bottom: 4rem;
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
	padding-bottom: 2rem;
  }

`;


export const H1 = styled.h1`
  padding: 0;
  display: block;
  margin:0;
  padding: 0px 20px 0px 0px;
  flex: 1 0 50%;
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
	font-size: 28px;
	line-height: 28px;
	padding: 0;
   }

`;

const Title = ({ children, ...props }) => <H1 {...props}>{children}</H1>;

export const Paragraph = styled.div`
   padding: 0px 0px 0px 20px;
   flex: 1 0 48%;
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
   > p{
	margin-bottom:2rem;
   }
   ul, ol{
	   margin-bottom:2rem;
	   margin-left:2rem;
	   li{
			line-height:${props=> {
			if(props.size == 'Large')
				return '38px'
			if(props.size == 'Medium')
				return '32px'
			if(props.size == 'Small')
				return '24px'
		   }};
		   padding-bottom:5px;
		   &:last-child{
			   padding-bottom:0px;
		   }
	   }
   }

   @media (max-width:1023px){
	font-size: 14px;
	line-height: 18px;
	padding: 25px 0 0 0;
   }
`;

export const Article = styled.div`
	display: flex;
	padding-bottom: 10rem;
	@media (max-width:1023px){
		flex-flow: column;
		padding-bottom: 3rem;
	}
`;