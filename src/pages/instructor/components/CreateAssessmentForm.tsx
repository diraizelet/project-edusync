import React, { useState, useRef } from 'react';
import { FileUp, Upload, File, XCircle, CheckCircle } from 'lucide-react';
import Button from '../../../components/ui/Button';

interface CreateAssessmentFormProps {
  onClose: () => void;
}

const CreateAssessmentForm: React.FC<CreateAssessmentFormProps> = ({ onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Assessment title is required';
    }
    
    if (!type) {
      newErrors.type = 'Assessment type is required';
    }
    
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (!file) {
      newErrors.file = 'Please upload an assessment file';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) return;

  setIsSubmitting(true);

  try {
    // Step 1: Upload file to backend
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }

    const fileUploadRes = await fetch('https://localhost:7130/api/FileUpload/course-assessment', {
      method: 'POST',
      body: formData,
    });

    if (!fileUploadRes.ok) {
      throw new Error(`File upload failed: ${fileUploadRes.statusText}`);
    }

    const uploadedFileUrl = await fileUploadRes.text(); // Or JSON if you return it that way

    // Step 2: Send assessment metadata
    const payload = {
      id: crypto.randomUUID(),
      title,
      description: "Assessment description",
      course_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      questions: "Default questions text",
      time_limit: 60,
      pass_score: 40,
      fileUrl: uploadedFileUrl // <-- Save the blob URL in DB if needed
    };

    const response = await fetch('https://localhost:7130/api/Assessments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  } catch (error) {
    console.error('Error creating assessment:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileUp className="h-6 w-6 text-purple-700" />
          <h2 className="ml-2 text-lg font-semibold text-gray-900">Create New Assessment</h2>
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
          <p className="text-green-700">Assessment created successfully!</p>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit} onDragEnter={handleDrag} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Assessment Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
            }}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-300 ${
              errors.title ? 'border-red-300' : ''
            }`}
            placeholder="e.g., Midterm Exam"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Assessment Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                if (errors.type) setErrors(prev => ({ ...prev, type: '' }));
              }}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-300 ${
                errors.type ? 'border-red-300' : ''
              }`}
            >
              <option value="" disabled>Select type</option>
              <option value="quiz">Quiz</option>
              <option value="midterm">Midterm Exam</option>
              <option value="final">Final Exam</option>
              <option value="assignment">Assignment</option>
              <option value="project">Project</option>
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
                if (errors.dueDate) setErrors(prev => ({ ...prev, dueDate: '' }));
              }}
              min={new Date().toISOString().split('T')[0]}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-300 ${
                errors.dueDate ? 'border-red-300' : ''
              }`}
            />
            {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Assessment File
          </label>
          
          {!file ? (
            <div 
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-gray-400'
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
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className="border rounded-lg p-4 flex items-center justify-between bg-gray-50">
              <div className="flex items-center">
                <File className="h-8 w-8 text-purple-600 mr-3" />
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
          
          {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
        </div>
        
        <div className="pt-3">
          <Button
            type="submit"
            variant="secondary"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Assessment...' : 'Create Assessment'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssessmentForm;