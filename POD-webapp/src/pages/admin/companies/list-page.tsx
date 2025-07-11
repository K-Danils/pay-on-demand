import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Space, Typography, message } from 'antd';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { CompanyTable, CompanyFilters } from './components';
import { useCompanies, useCompany } from './hooks';
import { exportCompaniesData } from './utils';
import type { Company } from '../../../types';

const { Title } = Typography;

const CompaniesListPage: React.FC = () => {
  const {
    companies,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    updatePagination,
    toggleCompanyStatus,
    refetch,
  } = useCompanies();

  const { deleteCompany, updateCompany } = useCompany();

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteCompany(id);
      if (success) {
        message.success('Company deleted successfully');
      } else {
        message.error('Failed to delete company');
      }
    } catch (err) {
      message.error('An error occurred while deleting the company');
    }
  };

  const handleToggleStatus = async (company: Company) => {
    try {
      const success = await updateCompany({ ...company });
      if (success) {
        const newStatus = company.active ? 'deactivated' : 'activated';
        message.success(`Company ${newStatus} successfully`);
      } else {
        message.error('Failed to update company status');
      }
    } catch (err) {
      message.error('An error occurred while updating the company status');
    }
  };

  const handleExport = () => {
    try {
      const csvData = exportCompaniesData(companies);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `companies_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      message.success('Companies exported successfully');
    } catch (err) {
      message.error('Failed to export companies');
    }
  };

  const handleFiltersReset = () => {
    updateFilters({
      search: '',
      status: 'all',
      industry: undefined,
      sortBy: 'name',
      sortOrder: 'asc',
    });
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    updatePagination({ page, limit: pageSize });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title level={2} style={{ margin: 0 }}>
              Companies
            </Title>
            <Space>
              <Button type="default" icon={<ExportOutlined />} onClick={handleExport} disabled={companies.length === 0}>
                Export
              </Button>
              <Button type="primary" icon={<PlusOutlined />}>
                <Link to="/admin/companies/create">Add Company</Link>
              </Button>
            </Space>
          </div>

          <CompanyFilters filters={filters} onFiltersChange={updateFilters} onReset={handleFiltersReset} />
        </div>

        <CompanyTable
          companies={companies}
          loading={loading}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          pagination={{
            current: pagination.page + 1,
            pageSize: pagination.limit,
            total: pagination.total || 0,
            onChange: handlePaginationChange,
          }}
        />
      </Card>
    </div>
  );
};

export default CompaniesListPage;
