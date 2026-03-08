// Required imports
import { Box } from '@mui/material'
// Components imports
import { HeroSectionFeaturePageComponent } from './sections/hero.section.feature.component'
import { TimelineSectionFeaturePageComponent } from './sections/timeline.section.feature.component'
// Required objects

export function CoreFeaturePageComponent ({  }) {
	
	return (
		<Box>
            <HeroSectionFeaturePageComponent />
			<TimelineSectionFeaturePageComponent />
		</Box>
	)
}