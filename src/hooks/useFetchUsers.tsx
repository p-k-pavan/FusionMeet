import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks'
import { userRef } from '../utils/FireBase';
import { getDocs, query, where } from 'firebase/firestore';
import { UserType } from '../utils/Types';

const useFetchUsers = () => {
 const [users, setusers] = useState<Array<UserType>>([])
 const uid = useAppSelector((meet)=> meet.auth.userInfo?.uid);

 useEffect(() => {
    if(uid){
        const fetchUsers = async () => {
            const firestoreQuery = query(userRef,where("uid","!=",uid));
            const data = await getDocs(firestoreQuery);
            const firebaseUers : Array<UserType> = []
            data.forEach((user) => {
                const userData = user.data() as UserType;
                firebaseUers.push({
                    ...userData,
                    label:userData.name,
                })
            })
            setusers(firebaseUers)
        }
        fetchUsers();
    }
 },[uid]);
 return [users]
}

export default useFetchUsers