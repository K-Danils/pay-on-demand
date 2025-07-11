import { useState, useCallback } from 'react';
import type { CompanyFormData, CompanyDetails } from '../../../../types';

interface ValidationErrors {
  [key: string]: string;
}

interface UseCompanyFormProps {
  initialData?: CompanyDetails | null;
  onSubmit: (data: CompanyFormData) => Promise<void>;
}

export const useCompanyForm = ({ initialData, onSubmit }: UseCompanyFormProps) => {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: initialData?.name || '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((field: string, value: any): string => {
    switch (field) {
      case 'name':
        if (!value || value.trim().length < 2) {
          return 'Company name must be at least 2 characters long';
        }
        if (value.length > 100) {
          return 'Company name cannot exceed 100 characters';
        }
        break;

      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (value && !/^\+?[\d\s\-\(\)]+$/.test(value)) {
          return 'Please enter a valid phone number';
        }
        break;

      case 'website':
        if (value && !/^https?:\/\/[^\s]+$/.test(value)) {
          return 'Please enter a valid website URL (starting with http:// or https://)';
        }
        break;

      case 'employeeCount':
        if (value && (value < 0 || value > 100000)) {
          return 'Employee count must be between 0 and 100,000';
        }
        break;

      case 'description':
        if (value && value.length > 500) {
          return 'Description cannot exceed 500 characters';
        }
        break;

      case 'address':
        if (value && value.length > 200) {
          return 'Address cannot exceed 200 characters';
        }
        break;

      default:
        break;
    }
    return '';
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field as keyof CompanyFormData]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const updateField = useCallback(
    (field: keyof CompanyFormData, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error for this field if it exists
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit(formData);
      } catch (error) {
        // Error handling is done by the parent component
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, onSubmit],
  );

  const resetForm = useCallback(() => {
    setFormData({
      name: initialData?.name || '',
    });
    setErrors({});
  }, [initialData]);

  const isDirty = useCallback(() => {
    if (!initialData) {
      return Object.values(formData).some((value) => value !== '' && value !== 0);
    }

    return Object.keys(formData).some((key) => {
      const formValue = formData[key as keyof CompanyFormData];
      const initialValue = initialData[key as keyof CompanyDetails];
      return formValue !== initialValue;
    });
  }, [formData, initialData]);

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
    resetForm,
    validateForm,
    isDirty: isDirty(),
  };
};
