import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usersData } from '../../assets/data/usersData';
import { urls } from '../../assets/urls/urls';
import UsersTable from '../../components/Dashboard/UI/UsersTable';
const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(usersData);
  }, []);

  return (
    <div>
      <div>
        <UsersTable data={users} />
      </div>
      <div className="flex justify-end mt-5">
        <Link to={urls.newUser}>
          <button
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            onClick={() => {}}
          >
            Crear Usuario
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AllUsers;
