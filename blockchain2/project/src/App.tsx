import React, { useState } from 'react';
import { AlertTriangle, Heart, Activity, Info } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    hypertension: false,
    heartDisease: false,
    bmi: '',
    glucoseLevel: '',
    smokingStatus: false
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate blockchain interaction
    setTimeout(() => {
      const riskScore = calculateRisk();
      setPrediction({
        score: riskScore,
        level: getRiskLevel(riskScore),
        recommendations: getRecommendations(riskScore)
      });
      setLoading(false);
    }, 1500);
  };

  const calculateRisk = () => {
    let score = 0;
    if (parseInt(formData.age) > 65) score += 20;
    if (formData.hypertension) score += 15;
    if (formData.heartDisease) score += 15;
    if (parseInt(formData.bmi) > 30) score += 10;
    if (parseInt(formData.glucoseLevel) > 126) score += 10;
    if (formData.smokingStatus) score += 10;
    return score;
  };

  const getRiskLevel = (score: number) => {
    if (score >= 50) return 'High';
    if (score >= 30) return 'Moderate';
    return 'Low';
  };

  const getRecommendations = (score: number) => {
    if (score >= 50) {
      return [
        'Seek immediate medical consultation',
        'Monitor blood pressure regularly',
        'Take prescribed medications consistently',
        'Make lifestyle changes immediately'
      ];
    } else if (score >= 30) {
      return [
        'Schedule regular check-ups',
        'Maintain a healthy diet',
        'Exercise regularly',
        'Monitor vital signs'
      ];
    } else {
      return [
        'Maintain a healthy lifestyle',
        'Regular exercise',
        'Balanced diet',
        'Regular health check-ups'
      ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Stroke Risk Assessment System
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Early detection and prevention through blockchain-powered health monitoring
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Activity className="mr-2 text-blue-600" />
              Risk Assessment Form
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={formData.hypertension}
                    onChange={(e) => setFormData({...formData, hypertension: e.target.checked})}
                  />
                  <label className="ml-2 text-sm text-gray-700">Hypertension</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={formData.heartDisease}
                    onChange={(e) => setFormData({...formData, heartDisease: e.target.checked})}
                  />
                  <label className="ml-2 text-sm text-gray-700">Heart Disease</label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">BMI</label>
                  <input
                    type="number"
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.bmi}
                    onChange={(e) => setFormData({...formData, bmi: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Glucose Level (mg/dL)</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.glucoseLevel}
                    onChange={(e) => setFormData({...formData, glucoseLevel: e.target.value})}
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={formData.smokingStatus}
                    onChange={(e) => setFormData({...formData, smokingStatus: e.target.checked})}
                  />
                  <label className="ml-2 text-sm text-gray-700">Smoking Status</label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Assess Risk'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Heart className="mr-2 text-red-600" />
              Assessment Results
            </h2>
            
            {prediction ? (
              <div className="space-y-6">
                <div className={`p-4 rounded-lg ${
                  prediction.level === 'High' ? 'bg-red-100' :
                  prediction.level === 'Moderate' ? 'bg-yellow-100' :
                  'bg-green-100'
                }`}>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <AlertTriangle className={`mr-2 ${
                      prediction.level === 'High' ? 'text-red-600' :
                      prediction.level === 'Moderate' ? 'text-yellow-600' :
                      'text-green-600'
                    }`} />
                    {prediction.level} Risk
                  </h3>
                  <p className="text-gray-700">Risk Score: {prediction.score}/80</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Info className="mr-2 text-blue-600" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-2"></span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Activity className="w-16 h-16 mx-auto mb-4" />
                <p>Complete the assessment form to see your results</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">How This Helps Healthcare Organizations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Early Detection</h3>
              <p className="text-gray-600">Enables proactive identification of high-risk patients through blockchain-verified data.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Secure Data Management</h3>
              <p className="text-gray-600">Ensures patient data privacy and integrity through blockchain technology.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Improved Patient Care</h3>
              <p className="text-gray-600">Facilitates better resource allocation and personalized treatment plans.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;