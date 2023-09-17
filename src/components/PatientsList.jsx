import PropTypes from 'prop-types'
import { faUpLong } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Patient from './Patient'

const PatientsList = ({ patients, setPatients, setPatient }) => {
  const [showScrollButton, setShowScrollButton] = useState(false)

  const scrollToTop = () => {
    const parentElementId = 'patientsList'

    scroll.scrollToTop({
      duration: 500,
      smooth: 'easeInOutQuad',
      containerId: parentElementId,
    })
  }
  const handleScroll = () => {
    const parentElement = document.getElementById('patientsList')

    if (parentElement) {
      const scrollPercentage =
        (parentElement.scrollTop / (parentElement.scrollHeight - parentElement.clientHeight)) * 100
      setShowScrollButton(scrollPercentage >= 20)
    }
  }
  useEffect(() => {
    const parentElement = document.getElementById('patientsList')
    if (parentElement) {
      parentElement.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (parentElement) {
        parentElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className='sm:w-1.5/3 md:w-1/2 lg:3/5'>
      {patients && patients.length ? (
        <>
          <h2 className='font-black text-3xl text-center'>Lista Pacientes</h2>
          <p className='text-lg mt-5 mb-10 text-center'>
            Administra tus {''}
            <span className='text-indigo-600 font-bold'>Pacientes y Citas</span>
          </p>
          <div id='patientsList' className='overflow-y-scroll h-[650px] mb-10'>
            {patients.map((patient) => (
              <Patient
                key={patient.id}
                patient={patient}
                patients={patients}
                setPatients={setPatients}
                setPatient={setPatient}
              />
            ))}

            <div className='text-center sticky bottom-0'>
              {showScrollButton && (
                <button
                  className='bg-indigo-600 text-white rounded-full w-14 h-14 hover:bg-indigo-700 cursor-pointer'
                  onClick={scrollToTop}>
                  <FontAwesomeIcon className='h-9' icon={faUpLong} />
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className='font-black text-3xl text-center'>No hay pacientes</h2>
          <p className='text-lg mt-5 mb-10 text-center'>
            Comienza agregando pacientes {''}
            <span className='text-indigo-600 font-bold'>y apareceran aquí</span>
          </p>
        </>
      )}
    </div>
  )
}

PatientsList.propTypes = {
  patients: PropTypes.array.isRequired,
  setPatients: PropTypes.func.isRequired,
  setPatient: PropTypes.func.isRequired,
}

export default PatientsList
