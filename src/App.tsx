// Required Imports
import { Routes, Route } from 'react-router-dom'

// Component Imports
import MainLayout from './layout/main.layout.component.tsx'
import HomePage from './pages/home/index.tsx'
import FeaturePage from './pages/features/index.tsx'
import CustomPage from './pages/custom/index.tsx'
import PracticePage from './pages/practice/index.tsx'
import ThemeContextComponent from './context/theme/theme.context.component.tsx'

function App() {

  return (
	<Routes>
		<Route element={
			<ThemeContextComponent>
				<MainLayout />
			</ThemeContextComponent>
			}
		>
			<Route path="" element={<HomePage />} />
			<Route path="/features" element={<FeaturePage />} />
			<Route path="/custom" element={<CustomPage />} />
			<Route path="/practice" element={<PracticePage />} />
			<Route path="*" element={ <>This is the error page for this.</> } />
			{/* <Route path="/work" element={ <WorkPage /> } /> */}
			{/* <Route path="/work" element={ <WorkPage /> } /> */}
		</Route>
	</Routes>
  )
}

export default App