import React, { useRef, useState } from 'react';
import { authService } from '../fbInstance';

const Auth = () => {
    const [toggle, setToggle] = useState(false)
    const emailRef = useRef("");
    const psRef = useRef("");

    const quickLogin = (e) => {
        let provider
        if (e.target.innerHTML === "Google") { provider = new authService.GoogleAuthProvider() }
        else if (e.target.innerHTML === "Github") { provider = new authService.GithubAuthProvider() }
        else { console.log("에러다 에러") }
        authService.signInWithPopup(authService.getAuth(), provider);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        toggle ? authService.signInWithEmailAndPassword(authService.getAuth(), emailRef.current.value, psRef.current.value).then(r => console.log("로그인 성공", r)).catch(e => console.log("에러", e)) : authService.createUserWithEmailAndPassword(authService.getAuth(), emailRef.current.value, psRef.current.value).then(r => console.log("가입성공", r)).catch(e => console.log("에러", e))
    }
    return (
        <div>
            나는 Auth Component 지금 로그인 안되어 있음
            <form onSubmit={onSubmit} >
                <input type="text" placeholder="이메일!" required ref={emailRef} />
                <input type="password" placeholder="비번!" required ref={psRef} />
                <input type="submit" value={toggle ? "Create Account" : "Log In"} />
                <div onClick={() => setToggle(!toggle)} >{toggle ? "Log In" : "Create Account"}</div>
            </form>
            <div>간편 로그인
                <button onClick={quickLogin}>Google</button>
                <button onClick={quickLogin}>Github</button>
            </div>
        </div>
    );
};

export default Auth;