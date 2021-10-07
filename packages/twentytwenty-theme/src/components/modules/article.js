import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import ScrollAnimation from 'react-animate-on-scroll';
import ButtonLink from "../styles/button"

function Articles(props){
	const data = props.data;
	///console.log(data);

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
			<TextComponent align={data.alignment} topPadding={data.vertical_padding['top']} bottomPadding={data.vertical_padding['bottom']} background={data.background_color}>
				<Container>
					{data.section_title.length > 0 && <SubHeading background={data.background_color}>{data.section_title}</SubHeading>}

					{
						data.article_row.map((ar,ari)=> {
							if(ar.type == 'image')
								return(
									
									<ArticleContainer key={'TextImage', ari} className={ar.type+'-container'}>
										{ar.article.map((ara,arai)=> {
											const link = ara.button['link'];	
											return(
												<Article key={arai}>
													<ScrollAnimation animateIn="fadeIn" duration={3} animateOnce={true} delay={500*arai}>
														{ara.desktop_image && <Image>
															{isMobile ? 
																[ara.mobile_image ? <img src={ara.mobile_image} data-image="mobile" /> : <img src={ara.desktop_image} data-image="desktop" />] 
															: 
																[ara.desktop_image && <img src={ara.desktop_image} data-image="desktop" />]
															}
														</Image> }
														{ara.headline['heading'] && <Title as={ara.headline['font_size']} weight={ara.headline['font_weight']} type={ar.type}>{ara.headline['heading']}</Title>}
														{ara.paragraph['text'] && <Paragraph size={ara.paragraph['front_size']}
																weight={ara.paragraph['font_weight']}>{ara.paragraph['text']}</Paragraph>}
														{link['title'] ? <ButtonLink className={ara.button['type'] == 'primary' ? 'primary':'secondary'} target={link['target'] && link['target']} href={link['url'] && (link['url'].indexOf(baseUrl) > -1) ? "/" + link['url'].split(baseUrl).join('') : link['url'].split(baseUrl).join('')} color={ara.button['color']}>{link['title'] && link['title']}</ButtonLink>:""}
													</ScrollAnimation>
												</Article>
											)
										})}
									</ArticleContainer>
								)
							if(ar.type == 'text')
								return(
									<ArticleContainer key={ari} className={ar.type+'-container'}>
										{ar.article.map((ara,arai)=> {
											const link = ara.button['link'];	
											return(
												<Article key={arai}>
													<ScrollAnimation animateIn="fadeIn" duration={3} animateOnce={true} delay={500*arai}>
														<Title as={ara.headline['font_size']} weight={ara.headline['font_weight']} type={ar.type}>{ara.headline['heading']}</Title>
														<Paragraph size={ara.paragraph['front_size']}
																weight={ara.paragraph['font_weight']}>{ara.paragraph['text']}</Paragraph>
														{link['title'] ? <ButtonLink className={ara.button['type'] == 'primary' ? 'primary':'secondary'} target={link['target'] && link['target']} href={link['url'] && link['url'].split(baseUrl).join('')} color={ara.button['color']}>{link['title'] && link['title']}</ButtonLink>:""}
													</ScrollAnimation>
												</Article>
											)
										})}
									</ArticleContainer>
								)
						})
					}
				</Container>
			</TextComponent>
	);
}
export default Articles;

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
  max-width:1025px;
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
  padding-bottom:4rem;
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
  letter-spacing: -0.09px;
  padding: ${props => {
	if(props.as == 'p'){
		return '32px 0 0rem 0px'
	}else{
		return '0px 0 5rem 0px'
	}
  }};
  font-family:${props=> {
	if(props.weight == 'Bold')
		return 'Ginto Normal Bold'
	if(props.weight == 'Regular')
		return 'Ginto Normal Regular'
   }};

   @media (max-width:1023px){
	   ${props => {
		   if(props.as == 'p'){
				return 'font-size: 14px; line-height: 18px; letter-spacing: -0.03px;'
		   }else{
				return 'font-size: 24px; line-height: 24px; letter-spacing: -0.04px;'
		   }
	   }}
	   padding: ${props => {
			if(props.as == 'p'){
				return '32px 0 0rem 0px'
			}else{
				return '0px 0 0.8rem 0px'
			}
	  	}};
   }

`;

const Title = ({ children, ...props }) => <H1 {...props}>{children}</H1>;

export const Paragraph = styled.p`
  padding: 28px 0 0 0;
  display: block;
  font-weight:${props=> {
	if(props.weight == 'Bold')
		return 'bold'
	if(props.weight == 'Regular')
		return 'normal'
	}};
   font-family:${props=> {
	if(props.weight == 'Bold')
		return 'Ginto Normal Bold'
	if(props.weight == 'Regular')
		return 'Ginto Normal Regular'
	}};
   font-size:${props=> {
	if(props.size == 'large')
		return '34px'
	if(props.size == 'medium')
		return '24px'
	if(props.size == 'small')
		return '18px'
	}};
   line-height:${props=> {
	if(props.size == 'large')
		return '38px'
	if(props.size == 'medium')
		return '32px'
	if(props.size == 'small')
		return '24px'
	}};

   @media (max-width:1023px){
	font-size: 14px;
    line-height: 18px;
   }
`;



export const ArticleContainer = styled.div`
	display: flex;
	flex-flow: row;
	margin-left: -19px;
	margin-right: -19px;
	margin-bottom: 12.5rem;
	&:last-child{
		margin-bottom: 0;
	}

	@media (max-width:1023px){
		flex-flow: column;
		margin-bottom: 3.8rem;
		margin-left: 0px;
    	margin-right: 0px;
	}

`;
export const Article = styled.div`
	flex: 1 0 0;
	padding:0 19px;
	
	@media (max-width:1023px){
		padding:0;
		margin-bottom: 3.8rem;
		a.primary, a.secondary{
			margin-top:30px;
		}
		&:last-child{
			margin-bottom: 0rem;
		}
	}
`;
const Image = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 78.4%;
  img{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	margin: auto;
  }
  @media (max-width:1023px){
	padding-top: 0%;
	img{
		position: relative;
		margin-bottom: 15px;
	}
  }
`;
