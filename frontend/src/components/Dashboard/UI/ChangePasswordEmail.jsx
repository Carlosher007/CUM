import React from 'react'

const ChangePasswordEmail = ({user}) => {
  return (
    <div className="bg-secondary-100 p-8 rounded-xl mb-8">
      <h1 className="text-xl text-gray-100">Usuario y contraseña</h1>
      <hr className="my-8 border-gray-500/30" />
      <form className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
          <div>
            <h5 className="text-gray-100 text-xl mb-1">Correo electrónico</h5>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
          <div>
            <button className="w-full md:w-auto bg-secondary-900/50 py-3 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors">
              Cambiar email
            </button>
          </div>
        </div>
        <hr className="my-8 border-gray-500/30 border-dashed" />
        <div className="flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
          <div>
            <h5 className="text-gray-100 text-xl mb-1">Contraseña</h5>
            <p className="text-gray-500 text-sm">****************</p>
          </div>
          <div>
            <button className="w-full md:auto bg-secondary-900/50 py-3 px-4 rounded-lg hover:bg-secondary-900 hover:text-gray-100 transition-colors">
              Cambiar contraseña
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordEmail