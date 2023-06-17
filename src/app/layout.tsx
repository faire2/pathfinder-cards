import '../styles/fonts.css'
import StyledComponentsRegistry from '@/utils/styledComponentsRegistry'


export const metadata = {
	title: 'Pathfinder 2e Card Generator',
	description: 'Utility for generating PF2e cards from data json format provided by Template util of PF2 tools',
}


export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<StyledComponentsRegistry>
					{children}
				</StyledComponentsRegistry>
			</body>
		</html>
	)
}
