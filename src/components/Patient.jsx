import PropTypes from 'prop-types'

const Patient = ({ patient, patients, setPatients, setPatient }) => {
  const { id, petName, owner, email, date, symptoms } = patient

  const handleDelete = () => {
    const isDeleteConfirmed = window.confirm(`Estas seguro/a que deseas eliminar este paciente?`)
    if (isDeleteConfirmed) {
      const index = patients.findIndex((patient) => patient.id === id)
      const newPatientsList = [...patients]
      newPatientsList.splice(index, 1)
      setPatients(newPatientsList)
    }
  }

  return (
    <div className='mx-5 mb-3 bg-white shadow-md px-5 py-10 rounded-xl'>
      <p className='font-bold mb-3 text-gray-700 uppercase'>
        Nombre: {''}
        <span className='font-normal normal-case'>{petName}</span>
      </p>

      <p className='font-bold mb-3 text-gray-700 uppercase'>
        Propietario: {''}
        <span className='font-normal normal-case'>{owner}</span>
      </p>

      <p className='font-bold mb-3 text-gray-700 uppercase'>
        Email: {''}
        <span className='font-normal normal-case'>{email}</span>
      </p>

      <p className='font-bold mb-3 text-gray-700 uppercase'>
        Fecha Alta: {''}
        <span className='font-normal normal-case'>{date}</span>
      </p>

      <p className='font-bold mb-3 text-gray-700 uppercase'>
        Sintomas: {''}
        <span className='font-normal normal-case'>{symptoms}</span>
      </p>

      <div className='flex justify-between mt-10'>
        <button
          type='button'
          className='py-2 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg
                    sm:px-6 md:px-5 lg:px-10'
          onClick={() => setPatient(patient)}>
          Editar
        </button>
        <button
          type='button'
          className='py-2 px-5 bg-red-800 hover:bg-red-700 text-white font-bold uppercase rounded-lg
                    sm:px-7 md:px-8 lg:px-10'
          onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  )
}

Patient.propTypes = {
  patient: PropTypes.object.isRequired,
  patients: PropTypes.array.isRequired,
  setPatients: PropTypes.func.isRequired,
  setPatient: PropTypes.func.isRequired,
}

export default Patient
