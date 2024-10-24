import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from "@elastic/eui"
import animation from "../assets/animation.gif"
import logo from "../assets/logo.png"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { firebaseAuth, userRef } from "../utils/FireBase"
import { addDoc, getDocs, query, where } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../redux/slices/AuthSlice"

const Login = () => {

  const navigate = useNavigate();
  const dispathch = useDispatch();

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/")
  })

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {user:{displayName,email,uid}} = await signInWithPopup(firebaseAuth,provider);
    const firestoreQuery = query(userRef,where("uid","==",uid));
    const fetchedUsers = await getDocs(firestoreQuery);
    if(fetchedUsers.docs.length === 0){
      await addDoc(userRef,{
        uid,
        name:displayName,
        email
      })
    }
    dispathch(setUser({uid,name:displayName,email}))
    navigate("/");
  }


  return (
    <EuiProvider colorMode="dark">
      <EuiFlexGroup
      alignItems="center"
      justifyContent="center"
      style={{width:"100vw",height:"100vh"}}>
       <EuiFlexItem grow={false}>
        <EuiPanel paddingSize="xl" >
          <EuiFlexGroup justifyContent="center" alignItems="center">
          <EuiFlexItem>
          <EuiImage src={animation} alt="logo" /> 
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText textAlign="center">
            <h1>FUSIONMEET</h1>
          </EuiText>
          <EuiSpacer size="xs" />
          <EuiText textAlign="center" grow={false}>
            <h3>
              <EuiTextColor>One PlatForm</EuiTextColor>
              <EuiTextColor color="#0b5cff">Connect</EuiTextColor>
            </h3>
          </EuiText>
          <EuiSpacer size="l" />
          <EuiButton fill onClick={login}>
            Login with google
          </EuiButton>

        </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
       </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  )
}

export default Login
