import React, { useEffect } from 'react';
import FacebookIcon from "../assets/Facebook.png";

const FacebookLoginComponent = () => {
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '1413752532673284',
      xfbml      : true,
      version    : 'v20.0'
      });

      window.FB.AppEvents.logPageView();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const checkLoginState = () => {
    window.FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };

  const statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      // Người dùng đã đăng nhập và đã ủy quyền
      console.log('Logged in:', response);
      window.FB.api('/me', { fields: 'name,email,picture' }, function(userResponse) {
        console.log('User data:', userResponse);
        localStorage.setItem('user', JSON.stringify(userResponse));
      });
    } else {
      // Người dùng chưa đăng nhập hoặc chưa ủy quyền
      console.log('Not logged in');
    }
  };

  const handleFBLogin = () => {
    window.FB.login(checkLoginState, { scope: 'public_profile,email' });
  };

  return (
    <div className=' flex max-w-[220px] mt-2 mx-auto items-center justify-center p-2 text-sm bg-white cursor-pointer text-[#0194f3] rounded-md border border-[#0194f3] font-bold'>
      <img
                      className="w-6 p-1 "
                      src={FacebookIcon}
                      alt="Facebook Icon"
                    />
      <button onClick={handleFBLogin}>Đăng nhập bằng Facebook</button>
    </div>
  );
};

export default FacebookLoginComponent;
