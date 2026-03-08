// Required imports
import { Box } from '@mui/material'
// Components imports
import { HeroSectionHomePageComponent } from './sections/hero.section.home.component.tsx'
import { QuicktestSectionHomePageComponent } from './sections/quicktest.section.home.component.tsx'
import { FeaturesSectionHomePageComponent } from './sections/features.section.home.component.tsx'
import { WorkHowSectionHomePageComponent } from './sections/howitworks.section.home.component.tsx'
// Required objects

export function CoreHomePageComponent ({  }) {
	
	return (
		<Box>
			<HeroSectionHomePageComponent />
			<QuicktestSectionHomePageComponent />
			<FeaturesSectionHomePageComponent />
			<WorkHowSectionHomePageComponent />
		</Box>
	)
}