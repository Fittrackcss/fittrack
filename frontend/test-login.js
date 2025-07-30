// Test login functionality with backend
const API_BASE_URL = 'http://localhost:8080';

async function testLoginFlow() {
  console.log('🧪 Testing Login Flow with Backend...\n');

  try {
    // Step 1: Create a test user
    console.log('1️⃣ Creating test user...');
    const signupData = {
      name: "Test Login User",
      email: "login-test@example.com",
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

    const signupResponse = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData)
    });

    if (!signupResponse.ok) {
      console.log('❌ Signup failed:', signupResponse.status);
      return;
    }
    console.log('✅ Test user created successfully');

    // Step 2: Test login
    console.log('\n2️⃣ Testing login...');
    const loginData = {
      email: "login-test@example.com",
      password: "password123"
    };

    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    if (loginResponse.ok) {
      const loginResult = await loginResponse.json();
      console.log('✅ Login successful:', loginResult);
      
      // Step 3: Test getting user profile
      console.log('\n3️⃣ Testing get user profile...');
      const userResponse = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${loginResult.token}`,
          'Content-Type': 'application/json',
        }
      });

      if (userResponse.ok) {
        const userResult = await userResponse.json();
        console.log('✅ Get user profile successful:', userResult);
        console.log('\n🎉 All tests passed! Login flow is working correctly.');
      } else {
        const errorText = await userResponse.text();
        console.log('❌ Get user profile failed:', userResponse.status, errorText);
      }
    } else {
      const errorText = await loginResponse.text();
      console.log('❌ Login failed:', loginResponse.status, errorText);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testLoginFlow(); 