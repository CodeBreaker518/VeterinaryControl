import { useState, useEffect } from 'react'
import Formulary from './components/Formulary'
import Header from './components/Header'
import PatientsList from './components/PatientsList'

function App() {
  const initialPatients = JSON.parse(localStorage.getItem('patients')) ?? []
  const [patients, setPatients] = useState(initialPatients)
  const [patient, setPatient] = useState({})

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients))
  }, [patients])

  return (
    <div className='container mx-auto mt-10 '>
      <Header />

      <div className='mt-12 md:flex justify-center'>
        <Formulary patients={patients} setPatients={setPatients} patient={patient} setPatient={setPatient} />
        <PatientsList patients={patients} setPatients={setPatients} setPatient={setPatient} />
      </div>
    </div>
  )
}

export default App
