import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import axios from 'axios';
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  // Simulated quiz data - in production, this would come from an API
  const quizData = {
    title: "React Components Quiz",
    description: "Test your knowledge of React components and their lifecycle.",
    questions: [
      {
        id: 1,
        question: "What is the correct way to update state in React?",
        options: [
          "this.state.count = 5",
          "setState({ count: 5 })",
          "state.count = 5",
          "updateState(count: 5)"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which hook is used for side effects in React?",
        options: [
          "useEffect",
          "useState",
          "useContext",
          "useReducer"
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "What is the purpose of keys in React lists?",
        options: [
          "To style list items",
          "To make lists look better",
          "To help React identify which items have changed",
          "To count list items"
        ],
        correctAnswer: 2
      }
    ] as Question[]
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (isSubmitted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizData.questions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quizData.questions.length) * 100);
  };

  const handleSubmit = async () => {
  setIsSubmitted(true);

  const resultPayload = {
    userId: 'user123', // Replace with actual user ID from context or auth
    quizId: id, // From useParams
    submittedAt: new Date().toISOString(),
    score: calculateScore(),
    answers: selectedAnswers.map((answer, index) => ({
      questionId: quizData.questions[index].id,
      selectedOption: answer,
    })),
  };

  try {
    const response = await axios.post('https://localhost:7130/api/Results', resultPayload);
    console.log('Result submitted and saved:', response.data);
    // You can optionally use response.data.score to show updated score if backend modifies it
  } catch (error) {
    console.error('Failed to submit quiz result', error);
  }
};

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Quiz Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{quizData.title}</h1>
            <p className="text-gray-600 mt-1">{quizData.description}</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-600">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {quizData.questions.map((question, questionIndex) => (
            <div 
              key={question.id} 
              className={`bg-gray-50 rounded-lg p-6 ${
                currentQuestion === questionIndex ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {questionIndex + 1}. {question.question}
              </h3>
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedAnswers[questionIndex] === optionIndex
                        ? 'bg-blue-100 border-blue-200'
                        : 'bg-white border-gray-200'
                    } border hover:bg-blue-50 ${
                      isSubmitted && optionIndex === question.correctAnswer
                        ? 'bg-green-100 border-green-200'
                        : isSubmitted && selectedAnswers[questionIndex] === optionIndex && optionIndex !== question.correctAnswer
                        ? 'bg-red-100 border-red-200'
                        : ''
                    }`}
                    disabled={isSubmitted}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isSubmitted && (
                        optionIndex === question.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : selectedAnswers[questionIndex] === optionIndex ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : null
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => navigate('/student/dashboard')}
          >
            Exit Quiz
          </Button>
          
          {!isSubmitted ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswers.length !== quizData.questions.length}
            >
              Submit Quiz
            </Button>
          ) : (
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                Score: {calculateScore()}%
              </div>
              <Button onClick={() => navigate('/student/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;