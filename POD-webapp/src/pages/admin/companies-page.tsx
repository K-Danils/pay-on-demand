import { useEffect, useState } from 'react';
import api from '../../services/api';

const CompaniesPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/companies').then((res) => setData(res.data));
  }, []);

  console.log('company data', data);

  return (
    <div>
      <h1>Manage Companies</h1>
      {/* Company management interface will be implemented here */}
    </div>
  );
};

export default CompaniesPage;
