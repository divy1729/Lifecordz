#!/bin/bash

BASE_URL="http://localhost:8080/api/auth"
EMAIL="test@example.com"

echo "Testing Registration..."
REGISTER_RESPONSE=$(curl -s -X POST "${BASE_URL}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "'${EMAIL}'",
    "password": "password123",
    "phone": "1234567890"
  }')
echo "Register Response: ${REGISTER_RESPONSE}"

echo -e "\nTesting OTP Verification..."
read -p "Enter the OTP received: " OTP
VERIFY_RESPONSE=$(curl -s -X POST "${BASE_URL}/verify-otp?email=${EMAIL}&otp=${OTP}")
echo "Verify Response: ${VERIFY_RESPONSE}"

echo -e "\nTesting Login..."
LOGIN_RESPONSE=$(curl -s -X POST "${BASE_URL}/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'${EMAIL}'",
    "password": "password123"
  }')
echo "Login Response: ${LOGIN_RESPONSE}"

# Extract token from login response
TOKEN=$(echo ${LOGIN_RESPONSE} | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ ! -z "$TOKEN" ]; then
  echo -e "\nTesting Protected Endpoint..."
  PROTECTED_RESPONSE=$(curl -s -X GET "${BASE_URL}/protected" \
    -H "Authorization: Bearer ${TOKEN}")
  echo "Protected Response: ${PROTECTED_RESPONSE}"
fi 