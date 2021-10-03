import Pweet from '../components/Pweet';
import { dbService } from '../fbInstance';
import React, { useEffect, useState } from 'react';
import PweetFactory from '../components/PweetFactory';
const Home = ({ userObj }) => {
    const [pweets, setPweets] = useState([])

    useEffect(() => {
        let mounted = true;
        if (mounted === true) {
            const q = dbService.query(dbService.collection(dbService.getFirestore(), "pweet3"), dbService.orderBy("createdAt", "desc"))
            dbService.onSnapshot(q, asdf => {
                setPweets(asdf.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })))
            })
        }
        return () => { mounted = false }
    }, [])


    return (
        <div>
            나는 Home component야 트위터 입력하게 해줄께
            <PweetFactory userObj={userObj} />
            {
                pweets.map((pweetObj, i) =>
                    <Pweet key={i} pweetObj={pweetObj} />
                )
            }

        </div >
    );
};

export default Home;