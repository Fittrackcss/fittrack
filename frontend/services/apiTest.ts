import { apiClient } from './apiClient';

export const testApiConnection = async () => {
  try {
    console.log('🧪 Testing API connection...');
    
    // Test basic connectivity
    const response = await fetch('http://localhost:8080/actuator/health');
    console.log('✅ Backend is reachable');
    
    return true;
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return false;
  }
};

export const testAuthEndpoints = async () => {
  try {
    console.log('🧪 Testing auth endpoints...');
    
    // Test signup
    const signupData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      height: 180,
      weight: 75,
      dateOfBirth: "2000-01-01T00:00:00.000+00:00",
      sex: "MALE",
      country: "USA",
      activityLevel: "MODERATE",
      goalWeight: 70,
      weeklyGoal: "LOSE",
      goals: ["LOSE"],
      goalReasons: ["Health"],
      healthBenefits: ["Energy"],
      referralSource: "Test"
    };
    
    const signupResponse = await apiClient.signup(signupData);
    console.log('✅ Signup test successful:', signupResponse);
    
    // Test login
    const loginResponse = await apiClient.login("test@example.com", "password123");
    console.log('✅ Login test successful:', loginResponse);
    
    return true;
  } catch (error) {
    console.error('❌ Auth endpoint test failed:', error);
    return false;
  }
}; 