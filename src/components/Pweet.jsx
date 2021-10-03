import React, { useState } from 'react';
import { dbService, storageService } from '../fbInstance';

const Pweet = ({ pweetObj }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newPweet, setNewPweet] = useState(pweetObj.text);
    const onDelete = () => {
        const ok = window.confirm("진짜 삭제?")
        if (ok) {
            dbService.deleteDoc(dbService.doc(dbService.getFirestore(), `pweet3/${pweetObj.id}`))
            pweetObj.imgURL && storageService.deleteObject(storageService.ref(storageService.getStorage(), pweetObj.imgURL))
        }

    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewPweet(value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        const ok = window.confirm("정말로 수정하시겠습니까?")
        if (ok) {
            dbService.updateDoc(dbService.doc(dbService.getFirestore(), `pweet3/${pweetObj.id}`), {
                text: newPweet
            })
        }
        setIsEditing(false)
    }

    return (
        <>
            <div>{
                isEditing ?
                    <form onSubmit={onSubmit}>
                        <input type="text" value={newPweet} onChange={onChange} required />
                        <input type="submit" />
                    </form>
                    :
                    <div>
                        <span>{pweetObj.text}</span>
                        {pweetObj.imgURL && <img src={pweetObj.imgURL} height="200px" alt="img" />}
                    </div>
            }</div>
            <button onClick={onDelete}>Delete</button>
            <button onClick={() => { setIsEditing(!isEditing) }} value={newPweet} >Edit</button>
        </>

    );
};

export default Pweet;