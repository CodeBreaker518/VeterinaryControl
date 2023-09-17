// Validate props
import PropTypes from 'prop-types'
// Hooks
import { useState, useEffect } from 'react'
// Components
import Error from './Error'

const Formulary = ({ patients, setPatients, patient, setPatient }) => {
  const [petName, setPetName] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [symptoms, setSymptoms] = useState('')

  const [errorValidate, setErrorValidate] = useState(false)

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      setPetName(patient.petName)
      setOwner(patient.owner)
      setEmail(patient.email)
      setDate(patient.date)
      setSymptoms(patient.symptoms)
    }
  }, [patient])

  const generateId = () => {
    const random = Math.random().toString(36).substr(2)
    const date = Date.now().toString(36)
    return random + date
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // validating form
    if (![petName, owner, email, date, symptoms].includes('')) {
      setErrorValidate(false)
      // build patient object
      const newPatient = {
        petName,
        owner,
        email,
        date,
        symptoms,
      }

      if (patient.id) {
        // editin register
        newPatient.id = patient.id
        const patientsUpdated = patients.map((patientState) =>
          patientState.id === patient.id ? newPatient : patientState
        )
        setPatients(patientsUpdated)
        setPatient({})
      } else {
        // new register
        newPatient.id = generateId()
        setPatients([...patients, newPatient])
      }

      //reset form inputs
      setPetName('')
      setOwner('')
      setEmail('')
      setDate('')
      setSymptoms('')
    } else {
      // error in form
      setErrorValidate(true)
    }
  }
  return (
    <div className='sm:w-0.5/2  md:w-1/2 lg:w-2/5 h-auto mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
      <p className='text-lg mt-5 text-center'>
        Agregar pacientes y {''}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form className='bg-white shadow-md rounded-lg py-10 px-5 mt-10 mb-10' onSubmit={handleSubmit}>
        {errorValidate && <Error message='Todos los campos son obligatorios' />}
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='petName'>
            Nombre Mascota
          </label>
          <input
            id='petName'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='text'
            name='petName'
            placeholder='Nombre de la Mascota'
            value={petName}
            onChange={(e) => {
              setPetName(e.target.value)
            }}
          />
        </div>
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='owner'>
            Nombre Propietario
          </label>
          <input
            id='owner'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='text'
            name='owner'
            placeholder='Nombre del Propietario'
            value={owner}
            onChange={(e) => {
              setOwner(e.target.value)
            }}
          />
        </div>
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='email'
            name='email'
            placeholder='Email contacto'
            autoComplete='on'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='date'>
            Alta
          </label>
          <input
            id='date'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='date'
            name='date'
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
            }}
          />
        </div>
        <div className='mb-5'>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='symptoms'>
            Síntomas
          </label>
          <textarea
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            name='symptoms'
            id='symptoms'
            cols='0'
            rows='3'
            placeholder='Describe los sintomas'
            value={symptoms}
            onChange={(e) => {
              setSymptoms(e.target.value)
            }}
          />
        </div>
        <input
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
          value={patient.id ? 'Confirmar edición' : 'Agregar paciente'}
        />
      </form>
    </div>
  )
}

Formulary.propTypes = {
  patients: PropTypes.array.isRequired,
  setPatients: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
  setPatient: PropTypes.func.isRequired,
}

export default Formulary
