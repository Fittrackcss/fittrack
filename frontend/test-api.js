// Simple API test script
const API_BASE_URL = 'http://localhost:8080';

async function testAPI() {
  console.log('🧪 Testing FitTrack API...\n');

  try {
    // Test 1: Basic connectivity
    console.log('1️⃣ Testing basic connectivity...');
    const healthResponse = await fetch(`${API_BASE_URL}/actuator/health`);
    console.log('Health response status:', healthResponse.status);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Backend is reachable:', healthData);
    } else {
      console.log('❌ Backend health check failed');
    }

    // Test 2: Signup endpoint
    console.log('\n2️⃣ Testing signup endpoint...');
    const signupData = {
      name: "Test User",
      email: "test4@example.com", // Changed email to avoid duplicate
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

    console.log('Sending signup data:', JSON.stringify(signupData, null, 2));
    const signupResponse = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData)
    });

    console.log('Signup response status:', signupResponse.status);
    if (signupResponse.ok) {
      const signupResult = await signupResponse.json();
      console.log('✅ Signup successful:', signupResult);
    } else {
      const errorText = await signupResponse.text();
      console.log('❌ Signup failed:', signupResponse.status, errorText);
    }

    // Test 3: Login endpoint
    console.log('\n3️⃣ Testing login endpoint...');
    const loginData = {
      email: "test4@example.com",
      password: "password123"
    };

    console.log('Sending login data:', JSON.stringify(loginData, null, 2));
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    console.log('Login response status:', loginResponse.status);
    if (loginResponse.ok) {
      const loginResult = await loginResponse.json();
      console.log('✅ Login successful:', loginResult);
      
      // Test 4: Get current user with token
      console.log('\n4️⃣ Testing get current user...');
      const userResponse = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${loginResult.token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('User response status:', userResponse.status);
      if (userResponse.ok) {
        const userResult = await userResponse.json();
        console.log('✅ Get user successful:', userResult);
      } else {
        const errorText = await userResponse.text();
        console.log('❌ Get user failed:', userResponse.status, errorText);
      }
    } else {
      const errorText = await loginResponse.text();
      console.log('❌ Login failed:', loginResponse.status, errorText);
    }

  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testAPI(); 