import React from 'react';

import {GoogleLoginButton} from 'react-social-login-buttons';
import {ROOT_URL} from '../../redux/actions/remote';

const GOOGLE_OAUTH_URL = `${ROOT_URL}/auth/google`;
export default function SocialLogin() {
  return <GoogleLoginButton onClick={() => window.location = GOOGLE_OAUTH_URL}/>;
}
