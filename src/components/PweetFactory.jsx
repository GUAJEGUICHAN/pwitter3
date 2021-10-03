import React, { useRef, useState } from 'react';
import { authService, dbService, storageService } from '../fbInstance';
import { v4 as uud4 } from "uuid"


const PweetFactory = ({ userObj }) => {
    const [text, setText] = useState("")
    const [imgURL, setImageURL] = useState("");
    const image = useRef("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let currentAttachment = imgURL;
        if (imgURL) {
            const storageRef = storageService.ref(storageService.getStorage(), `${userObj.uid} / ${uud4()}`)//이름 만들어주자
            const response = await storageService.uploadString(storageRef, currentAttachment, `data_url`)
            await storageService.getDownloadURL(response.ref).then(URL => {
                currentAttachment = URL;
            })
            onFileChange(null);
        }

        await dbService.addDoc(dbService.collection(dbService.getFirestore(), "pweet3"), {
            text: text,
            createdAt: Date.now(),
            uid: authService.getAuth().currentUser.uid,
            imgURL: currentAttachment
        })
        setText("")
    }
    const onChange = (event) => {//입력값 동기화  
        const { target: { value } } = event;
        setText(value);
        console.log(text);
    }
    const onFileChange = (event) => {
        if (event === null) {
            image.current.value = ""
            setImageURL("")
            return;
        }
        const theFile = event.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(theFile)
        reader.onloadend = e => setImageURL(e.target.result)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="" onChange={onChange} value={text} required />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" />
                {imgURL && <img src={imgURL} alt="imgPreview" height="200px" ref={image} />}
            </form>
        </div>
    );
};

export default PweetFactory;