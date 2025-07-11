import React, { useState } from 'react';
import { Modal, Card, Descriptions, Tag, Button, Space, Spin, Alert, Input, Form, Typography, Row, Col } from 'antd';
import {
  DollarOutlined,
  UserOutlined,
  BankOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { PayRequestDetails } from '../../../../types';

const { Text } = Typography;
const { TextArea } = Input;

interface PaymentRequestDetailModalProps {
  visible: boolean;
  onClose: () => void;
  paymentRequest: PayRequestDetails | null;
  loading: boolean;
  onApprove?: (id: string, notes?: string) => Promise<void>;
  onDeny?: (id: string, notes?: string) => Promise<void>;
  processingAction?: boolean;
}

export const PaymentRequestDetailModal: React.FC<PaymentRequestDetailModalProps> = ({
  visible,
  onClose,
  paymentRequest,
  loading,
  onApprove,
  onDeny,
  processingAction = false,
}) => {
  const [form] = Form.useForm();
  const [showNotesInput, setShowNotesInput] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'deny' | null>(null);

  const handleAction = async (action: 'approve' | 'deny') => {
    if (!paymentRequest) return;

    setActionType(action);
    setShowNotesInput(true);
  };

  const handleSubmitAction = async () => {
    if (!paymentRequest || !actionType) return;

    try {
      const values = await form.validateFields();
      const notes = values.notes?.trim();

      if (actionType === 'approve' && onApprove) {
        await onApprove(paymentRequest.id, notes);
      } else if (actionType === 'deny' && onDeny) {
        await onDeny(paymentRequest.id, notes);
      }

      setShowNotesInput(false);
      setActionType(null);
      form.resetFields();
    } catch (error) {
      // Form validation failed
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'approved':
        return 'green';
      case 'denied':
        return 'red';
      default:
        return 'default';
    }
  };

  if (!paymentRequest) return null;

  return (
    <Modal
      title={
        <Space>
          <DollarOutlined />
          <span>Payment Request Details</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        ...(paymentRequest.status === 'pending' && !showNotesInput
          ? [
              <Button key="deny" danger icon={<CloseOutlined />} onClick={() => handleAction('deny')}>
                Deny
              </Button>,
              <Button key="approve" type="primary" icon={<CheckOutlined />} onClick={() => handleAction('approve')}>
                Approve
              </Button>,
            ]
          : []),
        ...(showNotesInput
          ? [
              <Button key="cancel" onClick={() => setShowNotesInput(false)}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" loading={processingAction} onClick={handleSubmitAction}>
                {actionType === 'approve' ? 'Approve Request' : 'Deny Request'}
              </Button>,
            ]
          : []),
      ]}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Request Overview */}
          <Card size="small">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Space direction="vertical">
                  <Text strong>Request Amount</Text>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <DollarOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                      ${paymentRequest.amount.toLocaleString()}
                    </Text>
                  </div>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical">
                  <Text strong>Status</Text>
                  <Tag color={getStatusColor(paymentRequest.status)} style={{ fontSize: '14px' }}>
                    {paymentRequest.status.charAt(0).toUpperCase() + paymentRequest.status.slice(1)}
                  </Tag>
                </Space>
              </Col>
            </Row>
          </Card>

          {/* Employee Information */}
          <Card
            title={
              <>
                <UserOutlined /> Employee Information
              </>
            }
            size="small"
          >
            <Descriptions column={2} size="small">
              <Descriptions.Item label="Name">
                {`${paymentRequest.user.name} ${paymentRequest.user.surname}`}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{paymentRequest.user.email}</Descriptions.Item>
              <Descriptions.Item label="ID Number">{paymentRequest.user.identificationNumber}</Descriptions.Item>
              <Descriptions.Item label="Monthly Wage">
                {paymentRequest.user.monthlyWage ? `$${paymentRequest.user.monthlyWage.toLocaleString()}` : 'Not set'}
              </Descriptions.Item>
              <Descriptions.Item label="Company">{paymentRequest.company.name}</Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Occupations */}
          <Card
            title={
              <>
                <BankOutlined /> Occupations
              </>
            }
            size="small"
          >
            <Space wrap>
              {paymentRequest.occupations.map((occupation) => (
                <Tag key={occupation.id} color="blue">
                  {occupation.name} - ${occupation.baseWage.toLocaleString()}
                </Tag>
              ))}
            </Space>
          </Card>

          {/* Request Details */}
          <Card
            title={
              <>
                <ClockCircleOutlined /> Request Details
              </>
            }
            size="small"
          >
            <Descriptions column={2} size="small">
              <Descriptions.Item label="Hours Worked">
                {paymentRequest.hoursWorked ? `${paymentRequest.hoursWorked} hours` : 'Not specified'}
              </Descriptions.Item>
              <Descriptions.Item label="Wage Accumulated">
                {paymentRequest.wageAccumulated
                  ? `$${paymentRequest.wageAccumulated.toLocaleString()}`
                  : 'Not specified'}
              </Descriptions.Item>
              <Descriptions.Item label="Request Date">
                <Space>
                  <CalendarOutlined />
                  {new Date(paymentRequest.requestDate).toLocaleDateString()}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Created">
                <Space>
                  <CalendarOutlined />
                  {new Date(paymentRequest.createdAt).toLocaleDateString()}
                </Space>
              </Descriptions.Item>
            </Descriptions>

            {paymentRequest.notes && (
              <div style={{ marginTop: '16px' }}>
                <Text strong>Notes:</Text>
                <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                  {paymentRequest.notes}
                </div>
              </div>
            )}
          </Card>

          {/* Action Notes Input */}
          {showNotesInput && (
            <Card title={`${actionType === 'approve' ? 'Approve' : 'Deny'} Request`} size="small">
              <Alert
                message={`${actionType === 'approve' ? 'Approving' : 'Denying'} Payment Request`}
                description={`You are about to ${actionType} this payment request for $${paymentRequest.amount.toLocaleString()}.`}
                type={actionType === 'approve' ? 'success' : 'warning'}
                showIcon
                style={{ marginBottom: 16 }}
              />
              <Form form={form} layout="vertical">
                <Form.Item
                  label="Notes (Optional)"
                  name="notes"
                  rules={[{ max: 500, message: 'Notes cannot exceed 500 characters' }]}
                >
                  <TextArea
                    rows={4}
                    placeholder={`Add notes for ${actionType === 'approve' ? 'approving' : 'denying'} this payment request...`}
                    showCount
                    maxLength={500}
                  />
                </Form.Item>
              </Form>
            </Card>
          )}
        </Space>
      )}
    </Modal>
  );
};
