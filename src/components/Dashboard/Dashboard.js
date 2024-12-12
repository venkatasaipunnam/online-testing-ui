import React from 'react';

const Dashboard = () => {
  const examActions = [
    { label: 'Take Exam', primary: true },
    { label: 'Create Exam', primary: false },
    { label: 'View Exam', primary: false },
    { label: 'Grade Exam', primary: false },
    { label: 'Analyze Exam', primary: false }
  ];

  const upcomingExams = [
    { exam: 'Midterm 1', course: 'Biology', date: 'Oct 15', time: '9:00am - 10:00am', status: 'Upcoming' },
    { exam: 'Midterm 2', course: 'Biology', date: 'Oct 20', time: '9:00am - 10:00am', status: 'Upcoming' },
    { exam: 'Final', course: 'Biology', date: 'Dec 3', time: '9:00am - 10:00am', status: 'Upcoming' },
    { exam: 'Midterm 1', course: 'Chemistry', date: 'Oct 12', time: '1:00pm - 2:00pm', status: 'Completed' },
    { exam: 'Final', course: 'Chemistry', date: 'Dec 7', time: '1:00pm - 2:00pm', status: 'Upcoming' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl">Academic Testing</span>
            </div>
            
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Exams</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Grades</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Analytics</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Question Bank</a>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Help
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <img 
                  src="/api/placeholder/32/32" 
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, Jackie</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">What would you like to do?</h2>
          <div className="flex space-x-4">
            {examActions.map((action, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md transition-colors ${
                  action.primary 
                    ? "bg-blue-500 hover:bg-blue-600 text-white" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Your Upcoming Exams</h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Exam</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Course</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Time</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {upcomingExams.map((exam, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900">{exam.exam}</td>
                    <td className="px-6 py-4 text-sm text-blue-600">{exam.course}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{exam.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{exam.time}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${exam.status === 'Completed' 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-gray-100 text-gray-800'}`}>
                        {exam.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;