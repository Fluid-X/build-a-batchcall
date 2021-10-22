import { theme } from '../../constants/theme'
import styles from './styles.module.css'

export default function Loader() {
	return (
		<div className={styles.loader} style={{ background: theme.low }}>
			<div className={styles.container}>
				<svg
					className={styles.svg}
					viewBox="0 0 512 512"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clipPath="url(#clip0_10:13)">
						<path
							d="M0 0V64C256 160 384 208 384 256H448C448 192 320 128 64.0018 0.000595093L64.0006 0H0Z"
							fill="url(#paint0_linear_10:13)"
						/>
						<g filter="url(#filter0_d_10:13)">
							<path
								d="M512 0V64C256 160 128 208 128 256H64C64.0001 192 192 128 447.998 0.000595093L447.999 0H512Z"
								fill="url(#paint1_linear_10:13)"
							/>
						</g>
						<path
							d="M512 512V448C256 352 128 304 128 256H64C64.0001 320 192 384 447.998 511.999L447.999 512H512Z"
							fill="url(#paint2_linear_10:13)"
						/>
						<g filter="url(#filter1_d_10:13)">
							<path
								d="M0 512V448C256 352 384 304 384 256H448C448 320 320 384 64.0018 511.999L64.0006 512H0Z"
								fill="url(#paint3_linear_10:13)"
							/>
						</g>
					</g>
					<defs>
						<filter
							id="filter0_d_10:13"
							x="60"
							y="0"
							width="456"
							height="264"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood
								floodOpacity="0"
								result="BackgroundImageFix"
							/>
							<feColorMatrix
								in="SourceAlpha"
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
								result="hardAlpha"
							/>
							<feOffset dy="4" />
							<feGaussianBlur stdDeviation="2" />
							<feComposite in2="hardAlpha" operator="out" />
							<feColorMatrix
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
							/>
							<feBlend
								mode="normal"
								in2="BackgroundImageFix"
								result="effect1_dropShadow_10:13"
							/>
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="effect1_dropShadow_10:13"
								result="shape"
							/>
						</filter>
						<filter
							id="filter1_d_10:13"
							x="-4"
							y="256"
							width="456"
							height="264"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood
								floodOpacity="0"
								result="BackgroundImageFix"
							/>
							<feColorMatrix
								in="SourceAlpha"
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
								result="hardAlpha"
							/>
							<feOffset dy="4" />
							<feGaussianBlur stdDeviation="2" />
							<feComposite in2="hardAlpha" operator="out" />
							<feColorMatrix
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
							/>
							<feBlend
								mode="normal"
								in2="BackgroundImageFix"
								result="effect1_dropShadow_10:13"
							/>
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="effect1_dropShadow_10:13"
								result="shape"
							/>
						</filter>
						<linearGradient
							id="paint0_linear_10:13"
							x1="512"
							y1="2.67623e-06"
							x2="-3.26702e-05"
							y2="-3.11654e-05"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#00E676" />
							<stop offset="1" stopColor="#016600" />
						</linearGradient>
						<linearGradient
							id="paint1_linear_10:13"
							x1="512"
							y1="-4.71473e-05"
							x2="4.93526e-05"
							y2="-2.37823e-05"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#0CE1F2" />
							<stop offset="1" stopColor="#066B73" />
						</linearGradient>
						<linearGradient
							id="paint2_linear_10:13"
							x1="512"
							y1="512"
							x2="4.93526e-05"
							y2="512"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#0CE1F2" />
							<stop offset="1" stopColor="#066B73" />
						</linearGradient>
						<linearGradient
							id="paint3_linear_10:13"
							x1="512"
							y1="512"
							x2="-7.15974e-07"
							y2="512"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#00E676" />
							<stop offset="1" stopColor="#016600" />
						</linearGradient>
						<clipPath id="clip0_10:13">
							<rect width="512" height="512" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</div>
			<h3 className={styles.text}>Loading Your Experience</h3>
		</div>
	)
}
