import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../utils/FireBase';
import { setUser } from '../redux/slices/AuthSlice';

const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubsucribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) navigate("/login");
            else {
                dispatch(
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        name: currentUser.displayName
                    })
                )
            }
        })
        return () => unsubsucribe();
    }, [dispatch, navigate])
}

export default useAuth
