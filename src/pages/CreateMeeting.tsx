import React from 'react'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import { useNavigate } from 'react-router-dom';
import meeting1 from "../assets/meeting1.png"
import meeting2 from "../assets/meeting2.png"


const CreateMeeting = () => {
    const navigate = useNavigate();
    useAuth();
  return (
    <div style={{
        display:"flex",
        height:"100vh",
        flexDirection:"column"
      }}>
        <Header />
        <EuiFlexGroup justifyContent='center' alignItems='center' 
      style={{margin:"5vh 10vw"}} >
        <EuiFlexItem>
            <EuiCard 
                icon={<EuiImage size="100%" alt='icon' src={meeting1} />}
                title={"Create 1 on 1 Meeting"}
                description="Create a personal meeting."
                onClick={() => navigate('/create10n1')}
                paddingSize='xl'
                style={{minHeight:"280px"}}
            />
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiCard 
                icon={<EuiImage size="100%" alt='icon' src={meeting2} />}
                title={"Video Conference"}
                description="Invite multiple person to the meeting"
                onClick={() => navigate('/videoconference')}
                paddingSize='xl'
                style={{minHeight:"280px"}}
            />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}

export default CreateMeeting