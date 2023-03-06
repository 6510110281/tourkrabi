import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthContext } from "../context/AuthContext";
import { API } from "../constant";
import { setToken } from "../helpers";

import './loginform.css';

interface LoginPopupProps {
    onClose: () => void;
    onSignupLinkClick: () => void;
}

const initialUser = { identifier: "", password: "" };

function LoginPopup(props: LoginPopupProps) {

    const [userInfo, setUserInfo] = useState(initialUser)
    const { setUser } = useAuthContext();

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setUserInfo((currentUser) => ({
            ...currentUser,
            [name]: value,
        }));
    }

    const isValidEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validateInputs = () => {
        const emailValue = userInfo.identifier.trim();
        const passwordValue = userInfo.password.trim();

        let errorMessage: string = "";

        if (emailValue === '') {
            errorMessage += 'Email is required.\n';
        } else if (isValidEmail(emailValue)) {
            errorMessage += 'Provide a valid email address.\n'
        }

        if (passwordValue === '') {
            errorMessage += 'Password is required.\n'
        }
        return errorMessage
    };

    const handleLoggin = async () => {
        try {
            if (userInfo.identifier && userInfo.password) {
                if (isValidEmail(userInfo.identifier)) {
                    const response = await fetch(`${API}/auth/local`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userInfo),
                    });

                    const data = await response.json();
                    if (data?.error) {
                        alert('Incorrect email or password. Please try again.');
                    } else {
                        await setToken(data.jwt);
                        await setUser(data.user);
                        await props.onClose();
                        await Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `ลงชื่อเข้าใช้สำเร็จ!\nสวัสดี ${data.user.username}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        window.location.reload();
                    }
                } else {
                    alert('Provide a valid email address.\n')
                }
            } else if (!userInfo.identifier && !userInfo.password) {
                alert('Please complete the information.')
            } else {
                alert(validateInputs());
            }
        } catch (error: any) {
            if (error.response) {
                const { data } = error.response;
                if (data.error.message) {
                    const errorMessage = data.error.message.toLowerCase();
                    alert(errorMessage)
                }
            } else {
                console.log(error);
            }
        }
    };

    return (
        <div className="popup-layout-login">
            <div className="popup-overlay-login" onClick={props.onClose} />
            <div className="image-login" />
            <div className="popup-container-login">
                <div className="box-container-login">
                    <div className="header-box-login">
                        <h2>ลงชื่อเข้าใช้</h2>
                        <p>ลงชื่อเข้าใช้เพื่อประสบการณ์ที่ดีขึ้น และการจองที่รวดเร็ว</p>
                    </div>
                    <div className="email-box-login">
                        <h4>อีเมล</h4>
                        <input type="email" id="identifier" name="identifier" placeholder="อีเมลของคุณ" className='input-box-login' value={userInfo.identifier} onChange={handleChange} />
                    </div>
                    <div className="password-box-login">
                        <h4>รหัสผ่าน</h4>
                        <input type="password" id="password" name="password" placeholder="รหัสผ่านของคุณ" className='input-box-login' value={userInfo.password} onChange={handleChange} />
                    </div>
                    <div className="form-element-login">
                        <input type="checkbox" id='remember-me' />
                        <label> จดจำฉันไว้</label>
                    </div>
                    <button type="submit" className="submit-button-login" onClick={handleLoggin}>เข้าสู่ระบบ</button>
                    <label>ยังไม่มีบัญชีผู้ใช้? <a href='#register' onClick={props.onSignupLinkClick} >สมัครสมาชิก</a></label>
                    <div className="google-login">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPopup;
