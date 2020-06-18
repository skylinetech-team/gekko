const api = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/user/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/user/verification',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  ValidateSms: '/user/validate',
  ResetPassword: '/user/resetpassword'
}
export default api
