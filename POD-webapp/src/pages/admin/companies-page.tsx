import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

const CompaniesPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new companies list page
    navigate('/admin/companies', { replace: true });
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
      <Spin size="large" />
    </div>
  );
};

export default CompaniesPage;
