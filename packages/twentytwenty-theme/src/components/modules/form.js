import React, { useState, useEffect, useRef  } from "react";
import {connect, styled} from "frontity";
import Link from "../link";
import ScrollAnimation from 'react-animate-on-scroll';
import icon_down from '../../img/icon_down-arrowBlack.svg';
import icon_alert from '../../img/icon_Alert2Blue.svg';
import { useForm } from 'react-hook-form';

function Form(props) {
		const data = props.data;
		const [message,setMessage] = useState();
		const [submitLoader,setsubmitLoader] = useState('Submit');
		const [isUSA, setIsUSA] = useState(true);
		const { register, handleSubmit, errors } = useForm(); // initialise the hook
		const [baseUrl, setbaseUrl] = useState();

		console.log(data)

		useEffect(() => {
			if(typeof window !== "undefined"){
				setbaseUrl(frontity.state.frontity.url);
			}
		});	
		
		if(typeof window !== "undefined"){
			document.getElementById('phone').addEventListener('input', function (e) {
				var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
				e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] && '-' + x[3]);
			});
		}
		  
		
		const onSubmit = (event) => {
			const data = new FormData(document.getElementById("contactForm"));
			setsubmitLoader('Sending...')
			fetch(baseUrl + 'wp-json/contact-form-7/v1/contact-forms/880/feedback', {
				method: 'POST',
				body: data,
			})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data);
				setMessage( '<div class="alert">Thank you for your message. It has been sent.</div>')
				setsubmitLoader('Submit')
				document.getElementById("contactForm").reset();
				setTimeout(()=>{
					setMessage('')
				},5000)
			})
			.catch((error) => {
				console.error('Error:', error);
				setMessage('<div class="alert error">Your Message has not send</div>')
				setsubmitLoader('Submit')
				setTimeout(()=>{
					setMessage('')
				},3000)
			});
		}
		const selectCountry = (e) => {
			if(e.target.value == 'United States'){
				setIsUSA(true)
			}else{
				setIsUSA(false)
			}
		}
		  return(
				  <TextComponent>
					  <Container>
						<HeadingContainer>
						  <img src={data.logo} alt={data.heading} width="300px" />
						  <h1>{data.heading}</h1>
						  <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
						</HeadingContainer>
						  <form onSubmit={handleSubmit(onSubmit)} id="contactForm">
							  <label className="half">
								  First Name {errors.firstname ? [<> <span className="error">(First Name is required)</span> </>] : [<> <span>(Required)</span> </>] }
								  <input type="text" className={errors.firstname ? 'errorField' : ''} placeholder="" name="firstname"  ref={register({ required: true })} />
							  </label>
							  <label className="half">
								  Last Name {errors.lastname ? [<> <span className="error">(Last Name is required)</span> </>] : [<> <span>(Required)</span> </>] }
								  <input type="text" className={errors.lastname ? 'errorField' : ''} placeholder="" name="lastname"  ref={register({ required: true })}/>
							  </label>
							  <br className="clearfix" />
							  <label className="half">
								  Email {errors.email ? [<> <span className="error">(Invalid email address)</span> </>] : [<> <span>(Required)</span> </>] }
								  <input type="email" className={errors.email ? 'errorField' : ''} placeholder="" name="email" ref={register({ required: true, pattern:{ value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,  message: "invalid email address"} })}/>
							  </label>
							  <label className="half">
								  Phone
								  <input id="phone" type="tel" placeholder=""  name="phone" />
							  </label>
							  <br className="clearfix" />
							  <label className="full">
								  Address
								  <input type="text" placeholder=""  name="address"  />
							  </label>
							  <br className="clearfix" />
							  <label className="half">
								 City
								  <input type="text" placeholder="" name="city"  />
							  </label>
							  
							  <label className="half">
								  State
								  {isUSA ?
								  <select name="state" id="state">
									  <option value="" selected="selected">Select a State</option>
									  <option value="AL">Alabama</option>
									  <option value="AK">Alaska</option>
									  <option value="AZ">Arizona</option>
									  <option value="AR">Arkansas</option>
									  <option value="CA">California</option>
									  <option value="CO">Colorado</option>
									  <option value="CT">Connecticut</option>
									  <option value="DE">Delaware</option>
									  <option value="DC">District Of Columbia</option>
									  <option value="FL">Florida</option>
									  <option value="GA">Georgia</option>
									  <option value="HI">Hawaii</option>
									  <option value="ID">Idaho</option>
									  <option value="IL">Illinois</option>
									  <option value="IN">Indiana</option>
									  <option value="IA">Iowa</option>
									  <option value="KS">Kansas</option>
									  <option value="KY">Kentucky</option>
									  <option value="LA">Louisiana</option>
									  <option value="ME">Maine</option>
									  <option value="MD">Maryland</option>
									  <option value="MA">Massachusetts</option>
									  <option value="MI">Michigan</option>
									  <option value="MN">Minnesota</option>
									  <option value="MS">Mississippi</option>
									  <option value="MO">Missouri</option>
									  <option value="MT">Montana</option>
									  <option value="NE">Nebraska</option>
									  <option value="NV">Nevada</option>
									  <option value="NH">New Hampshire</option>
									  <option value="NJ">New Jersey</option>
									  <option value="NM">New Mexico</option>
									  <option value="NY">New York</option>
									  <option value="NC">North Carolina</option>
									  <option value="ND">North Dakota</option>
									  <option value="OH">Ohio</option>
									  <option value="OK">Oklahoma</option>
									  <option value="OR">Oregon</option>
									  <option value="PA">Pennsylvania</option>
									  <option value="RI">Rhode Island</option>
									  <option value="SC">South Carolina</option>
									  <option value="SD">South Dakota</option>
									  <option value="TN">Tennessee</option>
									  <option value="TX">Texas</option>
									  <option value="UT">Utah</option>
									  <option value="VT">Vermont</option>
									  <option value="VA">Virginia</option>
									  <option value="WA">Washington</option>
									  <option value="WV">West Virginia</option>
									  <option value="WI">Wisconsin</option>
									  <option value="WY">Wyoming</option>
								  </select>
								:  <input type="text" placeholder="" name="state"  />}
							  </label>
							  <br className="clearfix" />
							  <label className="half">
								  Zip
								  <input type="text" placeholder="" name="zip"  />
							  </label>
							  <label className="half">
								  Country
								  <select name="country" onChange={(e)=>selectCountry(e)}>
									  <option value="Afghanistan">Afghanistan</option>
									  <option value="Åland Islands">Åland Islands</option>
									  <option value="Albania">Albania</option>
									  <option value="Algeria">Algeria</option>
									  <option value="American Samoa">American Samoa</option>
									  <option value="Andorra">Andorra</option>
									  <option value="Angola">Angola</option>
									  <option value="Anguilla">Anguilla</option>
									  <option value="Antarctica">Antarctica</option>
									  <option value="Antigua and Barbuda">Antigua and Barbuda</option>
									  <option value="Argentina">Argentina</option>
									  <option value="Armenia">Armenia</option>
									  <option value="Aruba">Aruba</option>
									  <option value="Australia">Australia</option>
									  <option value="Austria">Austria</option>
									  <option value="Azerbaijan">Azerbaijan</option>
									  <option value="Bahamas">Bahamas</option>
									  <option value="Bahrain">Bahrain</option>
									  <option value="Bangladesh">Bangladesh</option>
									  <option value="Barbados">Barbados</option>
									  <option value="Belarus">Belarus</option>
									  <option value="Belgium">Belgium</option>
									  <option value="Belize">Belize</option>
									  <option value="Benin">Benin</option>
									  <option value="Bermuda">Bermuda</option>
									  <option value="Bhutan">Bhutan</option>
									  <option value="Bolivia">Bolivia</option>
									  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
									  <option value="Botswana">Botswana</option>
									  <option value="Bouvet Island">Bouvet Island</option>
									  <option value="Brazil">Brazil</option>
									  <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
									  <option value="Brunei Darussalam">Brunei Darussalam</option>
									  <option value="Bulgaria">Bulgaria</option>
									  <option value="Burkina Faso">Burkina Faso</option>
									  <option value="Burundi">Burundi</option>
									  <option value="Cambodia">Cambodia</option>
									  <option value="Cameroon">Cameroon</option>
									  <option value="Canada">Canada</option>
									  <option value="Cape Verde">Cape Verde</option>
									  <option value="Cayman Islands">Cayman Islands</option>
									  <option value="Central African Republic">Central African Republic</option>
									  <option value="Chad">Chad</option>
									  <option value="Chile">Chile</option>
									  <option value="China">China</option>
									  <option value="Christmas Island">Christmas Island</option>
									  <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
									  <option value="Colombia">Colombia</option>
									  <option value="Comoros">Comoros</option>
									  <option value="Congo">Congo</option>
									  <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
									  <option value="Cook Islands">Cook Islands</option>
									  <option value="Costa Rica">Costa Rica</option>
									  <option value="Cote D'ivoire">Cote D'ivoire</option>
									  <option value="Croatia">Croatia</option>
									  <option value="Cuba">Cuba</option>
									  <option value="Cyprus">Cyprus</option>
									  <option value="Czech Republic">Czech Republic</option>
									  <option value="Denmark">Denmark</option>
									  <option value="Djibouti">Djibouti</option>
									  <option value="Dominica">Dominica</option>
									  <option value="Dominican Republic">Dominican Republic</option>
									  <option value="Ecuador">Ecuador</option>
									  <option value="Egypt">Egypt</option>
									  <option value="El Salvador">El Salvador</option>
									  <option value="Equatorial Guinea">Equatorial Guinea</option>
									  <option value="Eritrea">Eritrea</option>
									  <option value="Estonia">Estonia</option>
									  <option value="Ethiopia">Ethiopia</option>
									  <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
									  <option value="Faroe Islands">Faroe Islands</option>
									  <option value="Fiji">Fiji</option>
									  <option value="Finland">Finland</option>
									  <option value="France">France</option>
									  <option value="French Guiana">French Guiana</option>
									  <option value="French Polynesia">French Polynesia</option>
									  <option value="French Southern Territories">French Southern Territories</option>
									  <option value="Gabon">Gabon</option>
									  <option value="Gambia">Gambia</option>
									  <option value="Georgia">Georgia</option>
									  <option value="Germany">Germany</option>
									  <option value="Ghana">Ghana</option>
									  <option value="Gibraltar">Gibraltar</option>
									  <option value="Greece">Greece</option>
									  <option value="Greenland">Greenland</option>
									  <option value="Grenada">Grenada</option>
									  <option value="Guadeloupe">Guadeloupe</option>
									  <option value="Guam">Guam</option>
									  <option value="Guatemala">Guatemala</option>
									  <option value="Guernsey">Guernsey</option>
									  <option value="Guinea">Guinea</option>
									  <option value="Guinea-bissau">Guinea-bissau</option>
									  <option value="Guyana">Guyana</option>
									  <option value="Haiti">Haiti</option>
									  <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
									  <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
									  <option value="Honduras">Honduras</option>
									  <option value="Hong Kong">Hong Kong</option>
									  <option value="Hungary">Hungary</option>
									  <option value="Iceland">Iceland</option>
									  <option value="India">India</option>
									  <option value="Indonesia">Indonesia</option>
									  <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
									  <option value="Iraq">Iraq</option>
									  <option value="Ireland">Ireland</option>
									  <option value="Isle of Man">Isle of Man</option>
									  <option value="Israel">Israel</option>
									  <option value="Italy">Italy</option>
									  <option value="Jamaica">Jamaica</option>
									  <option value="Japan">Japan</option>
									  <option value="Jersey">Jersey</option>
									  <option value="Jordan">Jordan</option>
									  <option value="Kazakhstan">Kazakhstan</option>
									  <option value="Kenya">Kenya</option>
									  <option value="Kiribati">Kiribati</option>
									  <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
									  <option value="Korea, Republic of">Korea, Republic of</option>
									  <option value="Kuwait">Kuwait</option>
									  <option value="Kyrgyzstan">Kyrgyzstan</option>
									  <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
									  <option value="Latvia">Latvia</option>
									  <option value="Lebanon">Lebanon</option>
									  <option value="Lesotho">Lesotho</option>
									  <option value="Liberia">Liberia</option>
									  <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
									  <option value="Liechtenstein">Liechtenstein</option>
									  <option value="Lithuania">Lithuania</option>
									  <option value="Luxembourg">Luxembourg</option>
									  <option value="Macao">Macao</option>
									  <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
									  <option value="Madagascar">Madagascar</option>
									  <option value="Malawi">Malawi</option>
									  <option value="Malaysia">Malaysia</option>
									  <option value="Maldives">Maldives</option>
									  <option value="Mali">Mali</option>
									  <option value="Malta">Malta</option>
									  <option value="Marshall Islands">Marshall Islands</option>
									  <option value="Martinique">Martinique</option>
									  <option value="Mauritania">Mauritania</option>
									  <option value="Mauritius">Mauritius</option>
									  <option value="Mayotte">Mayotte</option>
									  <option value="Mexico">Mexico</option>
									  <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
									  <option value="Moldova, Republic of">Moldova, Republic of</option>
									  <option value="Monaco">Monaco</option>
									  <option value="Mongolia">Mongolia</option>
									  <option value="Montenegro">Montenegro</option>
									  <option value="Montserrat">Montserrat</option>
									  <option value="Morocco">Morocco</option>
									  <option value="Mozambique">Mozambique</option>
									  <option value="Myanmar">Myanmar</option>
									  <option value="Namibia">Namibia</option>
									  <option value="Nauru">Nauru</option>
									  <option value="Nepal">Nepal</option>
									  <option value="Netherlands">Netherlands</option>
									  <option value="Netherlands Antilles">Netherlands Antilles</option>
									  <option value="New Caledonia">New Caledonia</option>
									  <option value="New Zealand">New Zealand</option>
									  <option value="Nicaragua">Nicaragua</option>
									  <option value="Niger">Niger</option>
									  <option value="Nigeria">Nigeria</option>
									  <option value="Niue">Niue</option>
									  <option value="Norfolk Island">Norfolk Island</option>
									  <option value="Northern Mariana Islands">Northern Mariana Islands</option>
									  <option value="Norway">Norway</option>
									  <option value="Oman">Oman</option>
									  <option value="Pakistan">Pakistan</option>
									  <option value="Palau">Palau</option>
									  <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
									  <option value="Panama">Panama</option>
									  <option value="Papua New Guinea">Papua New Guinea</option>
									  <option value="Paraguay">Paraguay</option>
									  <option value="Peru">Peru</option>
									  <option value="Philippines">Philippines</option>
									  <option value="Pitcairn">Pitcairn</option>
									  <option value="Poland">Poland</option>
									  <option value="Portugal">Portugal</option>
									  <option value="Puerto Rico">Puerto Rico</option>
									  <option value="Qatar">Qatar</option>
									  <option value="Reunion">Reunion</option>
									  <option value="Romania">Romania</option>
									  <option value="Russian Federation">Russian Federation</option>
									  <option value="Rwanda">Rwanda</option>
									  <option value="Saint Helena">Saint Helena</option>
									  <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
									  <option value="Saint Lucia">Saint Lucia</option>
									  <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
									  <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
									  <option value="Samoa">Samoa</option>
									  <option value="San Marino">San Marino</option>
									  <option value="Sao Tome and Principe">Sao Tome and Principe</option>
									  <option value="Saudi Arabia">Saudi Arabia</option>
									  <option value="Senegal">Senegal</option>
									  <option value="Serbia">Serbia</option>
									  <option value="Seychelles">Seychelles</option>
									  <option value="Sierra Leone">Sierra Leone</option>
									  <option value="Singapore">Singapore</option>
									  <option value="Slovakia">Slovakia</option>
									  <option value="Slovenia">Slovenia</option>
									  <option value="Solomon Islands">Solomon Islands</option>
									  <option value="Somalia">Somalia</option>
									  <option value="South Africa">South Africa</option>
									  <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
									  <option value="Spain">Spain</option>
									  <option value="Sri Lanka">Sri Lanka</option>
									  <option value="Sudan">Sudan</option>
									  <option value="Suriname">Suriname</option>
									  <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
									  <option value="Swaziland">Swaziland</option>
									  <option value="Sweden">Sweden</option>
									  <option value="Switzerland">Switzerland</option>
									  <option value="Syrian Arab Republic">Syrian Arab Republic</option>
									  <option value="Taiwan, Province of China">Taiwan, Province of China</option>
									  <option value="Tajikistan">Tajikistan</option>
									  <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
									  <option value="Thailand">Thailand</option>
									  <option value="Timor-leste">Timor-leste</option>
									  <option value="Togo">Togo</option>
									  <option value="Tokelau">Tokelau</option>
									  <option value="Tonga">Tonga</option>
									  <option value="Trinidad and Tobago">Trinidad and Tobago</option>
									  <option value="Tunisia">Tunisia</option>
									  <option value="Turkey">Turkey</option>
									  <option value="Turkmenistan">Turkmenistan</option>
									  <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
									  <option value="Tuvalu">Tuvalu</option>
									  <option value="Uganda">Uganda</option>
									  <option value="Ukraine">Ukraine</option>
									  <option value="United Arab Emirates">United Arab Emirates</option>
									  <option value="United Kingdom">United Kingdom</option>
									  <option value="United States" selected>United States</option>
									  <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
									  <option value="Uruguay">Uruguay</option>
									  <option value="Uzbekistan">Uzbekistan</option>
									  <option value="Vanuatu">Vanuatu</option>
									  <option value="Venezuela">Venezuela</option>
									  <option value="Viet Nam">Viet Nam</option>
									  <option value="Virgin Islands, British">Virgin Islands, British</option>
									  <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
									  <option value="Wallis and Futuna">Wallis and Futuna</option>
									  <option value="Western Sahara">Western Sahara</option>
									  <option value="Yemen">Yemen</option>
									  <option value="Zambia">Zambia</option>
									  <option value="Zimbabwe">Zimbabwe</option>
								  </select>
							  </label>
							  <label className="full">
								  Program of Interest {errors.program ? [<> <span className="error">(Program of Interest is required)</span> </>] : [<> <span>(Required)</span> </>] }
								  <select name="program" className={errors.program ? 'errorField' : ''} ref={register({ required: true })}>
									<option value="">Select Program</option>
									  {data.program_of_interest && data.program_of_interest.map((items,index)=>
										  <option value={items.add_value}>{items.add_value}</option>
									  )}
								  </select>
							  </label>
							  <br className="clearfix" />
							  <div className="center"><Button type="submit" >{submitLoader}</Button></div>

							  {message ? <div dangerouslySetInnerHTML={{ __html: message }}></div>:""}
						  </form>
					  </Container>
				  </TextComponent>
		  )
}
export default Form;

export const TextComponent = styled.div`
	position:relative;
	z-index:1;
	background-color:#FF0000;
	color: #01203F;
	padding-top:18rem;
	padding-bottom: 0rem;
	margin-left: auto;
	margin-right: auto;

	h1 {
		color: #01203F;
	}
	label {
		margin: 20px 20px 5px;
		display: block;

		span{
			font-family: 'Ginto Normal Regular';
		}
		span.error{
	    	color:#fff;
		}
		.errorField{
			border: 2px solid #0344DC;
			color:#01203F;
			background:#fff url(${icon_alert}) no-repeat 7px 50%;
			background-size: 24px;
			text-indent: 30px;
		}
	}
	&:focus{
			border:0px;
		}
	label input,label select {
		display: block;
		clear: both;
		width: 100%;
		margin-top: 10px;
		border: 0;
		height: 40px;
		color:#01203F;
		padding: 0px 8px;
		border: 2px solid #fff;
		font-size: 18px;
		line-height: 24px;
		font-family: Ginto Normal Regular;
		letter-spacing:-0.03px;

		&:focus{
			outline:none;
		}

	}
	label select {
		-moz-appearance: none;
		-webkit-appearance: none;
		background-image:url(${icon_down});
		background-position: right 7px;
		background-repeat: no-repeat;
		background-size: 15px;
		background-position-x: 99%;
		border-radius: 0 !important;
	    background-color: #fff !important;
		
		&.errorField{
			background-image: url(${icon_alert}), url(${icon_down});
			background-position: 7px 50%, 99% 7px;
			background-repeat: no-repeat, no-repeat;
			background-size: auto, 15px;
		}

	}
	label.half {
		width: 44.8%;
		float: left;
	}
	label.full {
		width:95%;
		float: left;
	}


	 @media (max-width:1023px){
		padding-top: 12rem;
		padding-bottom: 4rem;
		h1{
			margin:10px 0 0 0;
		}
		label.half, label.full {
			width: 100%;
			float: left;
			font-size: 14px;
			line-height: 19px;
			letter-spacing: -0.03px;
		}
		label {
			margin:0px;
			padding: 13px 0;
		}
		#contactForm{
			padding: 0 20px;
		}
	  }

	  .alert {
		display: block;
		clear: both;
		width: 95%;
		color: white;
		border: 2px solid #fff;
		text-align: center;
		padding: 7px 10px 11px;
		margin-top: 69px;
		margin: 69px 20px 0;
	}
	.alert.error {
		border: 1px solid #8a0202;
		color: #380202;
	}
	.center{
		text-align:center;
	}
`;

export const Container = styled.div`
	  max-width:812px;
	  margin:auto;
	  padding:0px 15px;
`;


export const HeadingContainer = styled.div`

  text-align:center;
  img{
	  display: table;
	  margin-left: auto;
	  margin-right: auto;
  }
	p{
	  display: table;
	  margin-left: auto;
	  margin-right: auto;
		width:80%;
		margin-top:50px;
        margin-bottom: 65px;
		font-family: 'Ginto Normal Regular';
	}
	@media (max-width:1023px){
		img{
			max-width: 210px;	
		}
		p{
			font-size:14px;
			line-height:18px;
			letter-spacing:-0.03px;
			margin-bottom: 35px;
			br{
				display:none;
			}
		}
	}
`;
export const Button = styled.button`
		display: inline-block !important;
		margin-left: auto;
		margin-right: auto;position: relative;
    	background-color:#356EF2;
		color:#FFFFFF;
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
		margin-top: 60px;
		min-width: 220px;

		&:hover{
			background-color:#0344DC;
			color:#fff;
		}
		&:focus{
			border:0px !important;
			outline:none;
		}
		@media (max-width:1023px){
			display:block !important;
			top: 25px;
			min-width: 100%;
		}
`;