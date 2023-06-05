import React, { useState } from 'react';
// Icons
import {
  RiEdit2Line,
  RiShieldCheckLine,
  RiErrorWarningLine,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import { urls } from '../../../assets/urls/urls';
const InactivedCount = () => {
  return (
    <div className="bg-secondary-100 p-8 rounded-xl mb-8">
      <h1 className="text-xl text-gray-100">Eliminar cuenta</h1>
      <hr className="my-8 border-gray-500/30" />
      <div className="flex flex-col md:flex-row items-center gap-4 bg-yellow-600/10 p-4 rounded-lg border border-dashed border-yellow-600 mb-8">
        <div className="flex justify-center">
          <RiErrorWarningLine className="text-5xl text-yellow-600" />
        </div>
        <div className="flex-1">
          <h5 className="text-gray-100 text-xl mb-2">
            Ten en cuenta que vas a eliminar tu cuenta
          </h5>
          <p className="text-gray-500">
            Esto eliminara tu cuenta de forma permanente, así que solo hazlo si realmente lo ves necesario
          </p>
        </div>
      </div>
      <form className="flex items-center gap-4">
        <input type="checkbox" className="accent-primary" id="idInactive" />
        <label htmlFor="idInactive" className="text-gray-500">
          I confirm my account deactivation
        </label>
      </form>
      <hr className="my-8 border-gray-500/30" />
      <div className="flex justify-end">
        <button className="bg-red-500/80 text-gray-100 py-2 px-4 rounded-lg hover:bg-red-500 transition-colors">
          Desactivate account
        </button>
      </div>
    </div>
  );
};

export default InactivedCount;
