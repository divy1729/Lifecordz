$BASE_URL = "http://localhost:8081/api/auth"
$EMAIL = "test@example.com"

Write-Host "Testing Registration..."
$REGISTER_BODY = @{
    firstName = "Test"
    lastName = "User"
    email = $EMAIL
    password = "password123"
    phone = "1234567890"
} | ConvertTo-Json

$REGISTER_RESPONSE = Invoke-RestMethod -Uri "$BASE_URL/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body $REGISTER_BODY

Write-Host "Register Response: $($REGISTER_RESPONSE | ConvertTo-Json)"

Write-Host "`nTesting OTP Verification..."
$OTP = Read-Host "Enter the OTP received"
$VERIFY_RESPONSE = Invoke-RestMethod -Uri "$BASE_URL/verify-otp?email=$EMAIL&otp=$OTP" -Method Post
Write-Host "Verify Response: $($VERIFY_RESPONSE | ConvertTo-Json)"

Write-Host "`nTesting Login..."
$LOGIN_BODY = @{
    email = $EMAIL
    password = "password123"
} | ConvertTo-Json

$LOGIN_RESPONSE = Invoke-RestMethod -Uri "$BASE_URL/login" `
    -Method Post `
    -ContentType "application/json" `
    -Body $LOGIN_BODY

Write-Host "Login Response: $($LOGIN_RESPONSE | ConvertTo-Json)"

if ($LOGIN_RESPONSE.token) {
    Write-Host "`nTesting Protected Endpoint..."
    $PROTECTED_RESPONSE = Invoke-RestMethod -Uri "$BASE_URL/protected" `
        -Method Get `
        -Headers @{Authorization = "Bearer $($LOGIN_RESPONSE.token)"}
    Write-Host "Protected Response: $($PROTECTED_RESPONSE | ConvertTo-Json)"
} 