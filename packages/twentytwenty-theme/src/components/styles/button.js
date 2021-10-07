import { connect, styled } from "frontity";

const ButtonLink = styled.a`
  &.primary, &.secondary{
  
	background-color:${ props=> {
		if(props.color == 'blue')
			return '#0344DC'
		if(props.color == 'red')
			return '#FF0000'
		if(props.color == 'navy')
			return '#01203F'
		if(props.color == 'white')
			return '#FFFFFF'
		}};

		color:${ props=> {
		if(props.color == 'blue')
			return '#FFFFFF'
		if(props.color == 'red')
			return '#FFFFFF'
		if(props.color == 'navy')
			return '#FFFFFF'
		if(props.color == 'white')
			return '#01203F'
		}};
		font-family: "Ginto Normal Regular";
		font-size: 14px;
		border: none;
		border-radius: 50px;
		cursor: pointer;
		display: inline-block;
		line-height: 20px;
		padding: 11px 31px 13px 31px;
		text-align: center;
		text-decoration: none;
		transition:all 0.5s;
		-webkit-transition:all 0.5s;
		margin-top: ${props => props.mt || '60px' };
		min-width: 220px;

		&:hover{
		background-color: ${props => {
			if(props.color == 'navy')
				return '#0A3765';
			if(props.color == 'red')
				return '#F74545';
			if(props.color == 'blue')
				return '#356EF2';
		}};
		color:${ props=> {
			if(props.color == 'white')
				return '#0344DC'
		}};
		}
	
	}

	&.secondary{
		background:none;
		padding: 9px 31px 11px 31px;
		border-width:2px;
		border-style: solid;
		color:${ props=> {
			if(props.color == 'blue')
				return '#0344DC'
			if(props.color == 'red')
				return '#FF0000'
			if(props.color == 'navy')
				return '#01203F'
			if(props.color == 'white')
				return '#FFFFFF'
		}};

		&:hover{
			color:#ffffff;
			color:${ props=> {
				if(props.color == 'white')
					return '#0344DC'
			}};
			border-color:transparent;
			background:${ props=> {
				if(props.color == 'blue')
					return '#0344DC'
				if(props.color == 'red')
					return '#FF0000'
				if(props.color == 'navy')
					return '#01203F'
				if(props.color == 'white')
					return '#FFFFFF'
			}};
		}
	}

	@media (max-width:1023px){
		&.primary, &.secondary{
			margin: auto;
			display: block;
			max-width: 285px;
			margin-top: 60px;
		}
	}

`;

//export default ButtonLink;
export default connect(ButtonLink);