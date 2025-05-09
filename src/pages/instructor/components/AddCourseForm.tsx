import React, { useState, useRef } from 'react';
import { BookOpen, Plus, CheckCircle, XCircle, Upload, File } from 'lucide-react';
import Button from '../../../components/ui/Button';

interface AddCourseFormProps {
  onClose: () => void;
}

type FormState = {
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
};

const INITIAL_FORM: FormState = {
  title: '',
  description: '',
  category: '',
  duration: '',
  level: 'beginner',
};

const AddCourseForm: React.FC<AddCourseFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Course description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    }
    
    if (!file) {
      newErrors.duration = 'Course material file is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement | HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, file: 'Only PDF and Word documents are allowed' }));
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB
      setErrors(prev => ({ ...prev, file: 'File size cannot exceed 10MB' }));
      return;
    }
    
    setFile(file);
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
  
    setIsSubmitting(true);
  
    try {
      const payload = {
        id: crypto.randomUUID(),
        title: formData.title,
        description: formData.description,
        teacher_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // replace with dynamic value if needed
        thumbnail: file?.name || 'default-thumbnail.png',
        category: formData.category,
        duration: parseInt(formData.duration),
      };
  
      const response = await fetch('https://localhost:7130/api/Courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) throw new Error('Failed to create course');
  
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BookOpen className="h-6 w-6 text-blue-700" />
          <h2 className="ml-2 text-lg font-semibold text-gray-900">Add New Course</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <XCircle className="h-6 w-6" />
        </button>
      </div>
      
      {isSuccess ? (
        <div className="bg-green-50 p-4 rounded-md flex items-center space-x-2 mb-6 animate-fade-in">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <p className="text-green-700">Course created successfully!</p>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit} onDragEnter={handleDrag} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 ${
              errors.title ? 'border-red-300' : ''
            }`}
            placeholder="e.g., Introduction to Machine Learning"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 ${
              errors.description ? 'border-red-300' : ''
            }`}
            placeholder="Provide a detailed description of your course"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 ${
                errors.category ? 'border-red-300' : ''
              }`}
            >
              <option value="" disabled>Select a category</option>
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
              <option value="science">Science</option>
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (in weeks)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              min="1"
              max="52"
              value={formData.duration}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 ${
                errors.duration ? 'border-red-300' : ''
              }`}
              placeholder="e.g., 8"
            />
            {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">
            Difficulty Level
          </label>
          <div className="mt-1 flex space-x-4">
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <label key={level} className="inline-flex items-center">
                <input
                  type="radio"
                  name="level"
                  value={level}
                  checked={formData.level === level}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Course Material
          </label>
          
          {!file ? (
            <div 
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={onButtonClick}
            >
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports PDF, DOC, DOCX up to 10MB
              </p>
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="border rounded-lg p-4 flex items-center justify-between bg-gray-50">
              <div className="flex items-center">
                <File className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          )}
          
          {/* {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>} */}
        </div>
        
        <div className="pt-3">
          <Button
            type="submit"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Course...' : 'Create Course'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseForm;