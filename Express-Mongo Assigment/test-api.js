const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test data
const testTask = {
    title: 'Test Task',
    description: 'This is a test task',
    priority: 'high',
    status: 'pending'
};

async function testAPI() {
    try {
        console.log('🧪 Testing Task Manager API...\n');

        // Test 1: Create a new task
        console.log('1. Creating a new task...');
        const createResponse = await axios.post(`${BASE_URL}/tasks`, testTask);
        console.log('✅ Task created:', createResponse.data.title);
        const taskId = createResponse.data._id;

        // Test 2: Get all tasks
        console.log('\n2. Getting all tasks...');
        const getAllResponse = await axios.get(`${BASE_URL}/tasks`);
        console.log(`✅ Found ${getAllResponse.data.length} task(s)`);

        // Test 3: Get single task
        console.log('\n3. Getting single task...');
        const getSingleResponse = await axios.get(`${BASE_URL}/tasks/${taskId}`);
        console.log('✅ Task retrieved:', getSingleResponse.data.title);

        // Test 4: Update task
        console.log('\n4. Updating task...');
        const updateResponse = await axios.put(`${BASE_URL}/tasks/${taskId}`, {
            status: 'in-progress'
        });
        console.log('✅ Task updated:', updateResponse.data.status);

        // Test 5: Delete task
        console.log('\n5. Deleting task...');
        await axios.delete(`${BASE_URL}/tasks/${taskId}`);
        console.log('✅ Task deleted successfully');

        // Test 6: Verify deletion
        console.log('\n6. Verifying deletion...');
        try {
            await axios.get(`${BASE_URL}/tasks/${taskId}`);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('✅ Task successfully deleted (404 received)');
            }
        }

        console.log('\n🎉 All tests passed! API is working correctly.');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

// Check if axios is installed
try {
    require('axios');
    testAPI();
} catch (error) {
    console.log('📦 Installing axios for testing...');
    const { execSync } = require('child_process');
    try {
        execSync('npm install axios', { stdio: 'inherit' });
        console.log('✅ Axios installed successfully!');
        testAPI();
    } catch (installError) {
        console.error('❌ Failed to install axios:', installError.message);
        console.log('\nTo test the API manually, you can use:');
        console.log('1. Start the server: npm run dev');
        console.log('2. Use Postman, curl, or any HTTP client to test the endpoints');
    }
}
