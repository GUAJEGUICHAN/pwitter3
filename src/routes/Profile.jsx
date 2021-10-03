import React, { useEffect, useRef, useState } from 'react';
import Pweet from '../components/Pweet';
import { authService, dbService } from '../fbInstance';

const Profile = ({ userObj, refreshName }) => {
    // const [newName, setNewName] = useState(userObj.displayName)
    const nameRef = useRef(authService.getAuth().currentUser.displayName)//displayname이 없다고 한다.
    const [myPweets, setMyPweets] = useState([]);
    //mount할때 자신이 쓴 트윗  보여주기
    useEffect(() => {
        let mount = true;
        if (mount) {
            const q = dbService.query(dbService.collection(dbService.getFirestore(), "pweet3"), dbService.where("uid", "==", userObj.uid), dbService.orderBy("createdAt", "desc"))
            dbService.onSnapshot(q, asdf => (
                setMyPweets(asdf.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            ))
        }
        return () => (mount = false)
    }, [userObj])

    //유저 이름 수정 제출 함수
    const onSubmit = async (event) => {
        event.preventDefault();
        await authService.updateProfile(authService.getAuth().currentUser, {
            displayName: nameRef.current.value
        }).then(e => console.log("updateProfile가 then에 뱉는 값", e)).catch(e => console.log(e));
        refreshName()

    }


    return (
        <div>
            나는 Profile Component야
            <form onSubmit={onSubmit}>
                <input type="text" required ref={nameRef} />
                <input type="submit" value="이름 수정" />
                {myPweets && myPweets.map((pweet, i) => <Pweet key={i} pweetObj={pweet} />)}
                {console.log("myPweets", myPweets)}
            </form>
        </div>
    );
};

export default Profile;