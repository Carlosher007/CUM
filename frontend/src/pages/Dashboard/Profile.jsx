import React, { useEffect, useState } from 'react';
import { usersData } from '../../assets/data/usersData';
import MiPerfil from '../../components/Dashboard/UI/MiPerfil';
// import InactivedCount from '../../components/Dashboard/UI/InactivedCount';
// import ChangePasswordEmail from '../../components/Dashboard/UI/ChangePasswordEmail';

const Profile = () => {
  const idUser = '1';
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = usersData.find((userData) => userData.id === idUser);
    setUser(userData);
  }, []);

  return (
    <>
      {/* Profile */}
      {user && <MiPerfil user={user} />}

      {/* Change password and email*/}
      {/* {user && <ChangePasswordEmail user={user} />} */}

      {/* Inactive account */}
      {/* {user && <InactivedCount user={user} />} */}
    </>
  );
};

//  IMAGEN
//  {
//    /* <div className="flex items-center mb-8">
//             <div className="w-1/4">
//               <p>Avatar</p>
//             </div>
//             <div className="flex-1">
//               <div className="relative mb-2">
//                 <img
//                   src="https://img.freepik.com/foto-gratis/negocios-finanzas-empleo-concepto-mujeres-emprendedoras-exitosas-joven-empresaria-segura-anteojos-mostrando-gesto-pulgar-arriba-sostenga-computadora-portatil-garantice-mejor-calidad-servicio_1258-59118.jpg"
//                   className="w-28 h-28 object-cover rounded-lg"
//                 />
//                 <label
//                   htmlFor="avatar"
//                   className="absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer -top-2 left-24"
//                 >
//                   <RiEdit2Line />
//                 </label>
//                 <input type="file" id="avatar" className="hidden" />
//               </div>
//               <p className="text-gray-500 text-sm">
//                 Allowed file types: png, jpg, jpeg.
//               </p>
//             </div>
//           </div> */
//  }

export default Profile;
