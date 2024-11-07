import '../styles/globals.css'
import 'tailwindcss/tailwind.css';

import React from 'react'
import { Windmill } from '@roketid/windmill-react-ui'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'context/AuthContext';
import { SelectedGrievanceProvider } from 'hooks/GrievanceTreatment/useSelectedGrievance';
import GrievanceTreatmentConsulting from './app/grievanceTreatmentConsulting';
import { SelectedComplaintProvider } from 'hooks/ComplaintTreatment/useSelectedComplaint';

function MyApp({ Component, pageProps }: AppProps) {
  // suppress useLayoutEffect warnings when running outside a browser
  if (!process.browser) React.useLayoutEffect = React.useEffect;

  return (
    <AuthProvider>
      <SelectedComplaintProvider>
        <SelectedGrievanceProvider>
          <Windmill usePreferences={true}>
            <Component {...pageProps} />
            {/* <GrievanceTreatmentConsulting /> */}
          </Windmill>
        </SelectedGrievanceProvider>
      </SelectedComplaintProvider>
    </AuthProvider>
  )
}
export default MyApp
