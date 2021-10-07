import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import TrianglesImage from "../../img/triangles.svg";
import ScrollAnimation from 'react-animate-on-scroll';
import ButtonLink from "../styles/button";

const Img = TrianglesImage;

function Text(props){
	const data = props.data;
	const link = data.button['link'];
	const heroId = data.c_label.split(' ').join('-');
	//console.log(data);

	const [baseUrl, setbaseUrl] = useState();
	const [isMobile, setIsMobile] = useState(false);
	useEffect(()=>{
		setbaseUrl(frontity.state.frontity.url);
		if(typeof window !== "undefined"){
			setIsMobile(window.matchMedia('(max-width: 600px)').matches);
			$(window).on('resize',function(){
				setIsMobile(window.matchMedia('(max-width: 600px)').matches)
			});
		}
	});

	return(
		<TextComponent pos={data.background_media['select_background_options']} id={heroId} align={data.alignment} topPadding={data.vertical_padding['top']} bottomPadding={data.vertical_padding['bottom']}>
			<Container pos={data.background_media['select_background_options']}>
				<ScrollAnimation animateIn="fadeIn" duration={1} animateOnce={true}>
					{data.section_title && <SubHeading>{data.section_title}</SubHeading>}
					{data.headline['heading'] && <Title as={data.headline['font_size']} weight={data.headline['font_weight']}>{data.headline['heading']}</Title>}
					{data.paragraph['text'] && <Paragraph size={data.paragraph['front_size']} weight={data.paragraph['font_weight']}>{data.paragraph['text']}</Paragraph>}
					{link['title'] && <ButtonLink className={data.button['type'] == 'pre' ? 'primary':'secondary'} target={link['target'] && link['target']} href={link['url'] && (link['url'].indexOf(baseUrl) > -1) ? "/" + link['url'].split(baseUrl).join('') : link['url'].split(baseUrl).join('')} color={data.button['color']}>{link['title'] && link['title']}</ButtonLink>}
				</ ScrollAnimation>
			</Container>
			{data.background_media['triangle_overlay'] && 
			<BackgroundTringle
			data-smooth-scrolling="off" 
			data-center="background-position: 50% 0px;"
			data-top-bottom="background-position: 50% -500px;"
			data-bottom-top="background-position: 50% 500px;" 
			data-anchor-target={'#'+ heroId} image={Img} className="control-animation">
			</BackgroundTringle>}
			{data.background_media['select_background_options'] == 'image' ? 
				[isMobile ? 
					[data.background_media['mobile_image'] ? <Image heroimage={data.background_media['mobile_image']} data-image="mobile"><img src={data.background_media['mobile_image']} /></Image> : <Image heroimage={data.background_media['desktop_image']} data-image="desktop"><img src={data.background_media['desktop_image']} /></Image>] 
				: 
					[<Image heroimage={data.background_media['desktop_image']} data-image="desktop"><img src={data.background_media['desktop_image']} /></Image>]
				]
			: 
				<Video src={"https://player.vimeo.com/video/"+data.background_media['video']+"?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0"} frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></Video>
			}
		</TextComponent>
	);
}
export default Text;

export const TextComponent = styled.div`
	position:relative;
	z-index:1;
	text-align:${props=>props.align};
	background-color:#01203F;
	color:#FFFFFF;
	/* padding-top:${props=> {
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
	}}; */

	padding-bottom:${props=> {
	if(props.pos == 'image')
		return '0px'
	if(props.pos == 'video')
		return '15%'
	}};
	padding-top:${props=> {
	if(props.pos == 'image')
		return '0px'
	if(props.pos == 'video')
		return '15%'
	}};
	margin-left: auto;
	margin-right: auto;
	overflow: hidden;

	display: flex;
    align-items: center;

	@media (max-width:1023px){
		padding-top: 0rem;
    	padding-bottom: 0rem;
	}

	.primary{
		margin-top:4rem;
	}
`;

export const Container = styled.div`
	max-width:850px;
	margin:auto;
	padding:0rem 15px;
	position:${props=> {
	if(props.pos == 'image')
		return 'absolute'
	if(props.pos == 'video')
		return 'relative'
	}};
    z-index: 9999;
    left: 0;
    right: 0;
	@media (max-width:1023px){
		padding:${props=> {
		if(props.pos == 'image')
			return '0rem 15px'
		if(props.pos == 'video')
			return '22vh 15px'
		}};
	}
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
		return '#FFFFFF'
	if(props.background == 'white')
		return '#FFFFFF'
	}};

	@media (max-width:1023px){
		font-size: 14px;
		line-height: 18px;
		letter-spacing: -0.29px;
	}
`;
export const BackgroundTringle = styled.div`
	background-image:url(${props=> props.image});
	position: absolute;
	width: 100%;
	height: 100%;
	top:0;
	left:0;
	bottom:0;
	right:0;
	margin:0 auto;
	background-size:cover;
	z-index: 2;
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

`;

const Title = ({ children, ...props }) => <H1 {...props}>{children}</H1>;

export const Paragraph = styled.p`
  padding: 50px 0 0 0;
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
	letter-spacing: -0.03px;
   }
`;

const Image = styled.div`
	/* background-image:url(${props=> props.heroimage});
	position: absolute;
	width: 100%;
	height: 100%;
	top:0;
	left:0;
	bottom:0;
	right:0;
	margin:0 auto;
	background-size:cover;
	z-index: 1; */
`;

const Video = styled.iframe`
	width: 120vw;
	height: 120vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
	min-height: 120vh;
	min-width: 250.00vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 0;
	margin: 0;
	border: 0;
`;
