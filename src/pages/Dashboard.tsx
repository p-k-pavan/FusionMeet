import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import dashboard1 from "../assets/dashboard1.png"
import dashboard2 from "../assets/dashboard2.png"
import dashboard3 from "../assets/dashboard3.png"
import Header from '../components/Header';

const Dashboard = () => {

  useAuth();
  const navigate = useNavigate();

  return (
    <div style={{
      display:"flex",
      height:"100vh",
      flexDirection:"column"
    }}>
      <Header/>
      <EuiFlexGroup justifyContent='center' alignItems='center' 
      style={{margin:"5vh 10vw"}}
      >
        <EuiFlexItem>
          <EuiCard
          icon={<EuiImage size="5rem" alt='icon' src={dashboard1} />}
          title={"Create Meeting"}
          description="Create a new meeting and invite people."
          onClick={() => navigate('/create')}
          paddingSize='xl'
          style={{minHeight:"280px"}}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
          icon={<EuiImage size="100%" alt='icon' src={dashboard2} />}
          title={"My Meetings"}
          description="View your created meetings."
          onClick={() => navigate('/mymeetings')}
          paddingSize='xl'
          style={{minHeight:"300px"}}

          />
        </EuiFlexItem>
        <EuiFlexItem >
          <EuiCard
          icon={<EuiImage size="5rem" alt='icon' src={dashboard3} />}
          title={"Meeting"}
          description="View meeting that your are invite to."
          onClick={() => navigate('/meetings')}
          paddingSize='xl'
          style={{minHeight:"280px"}}

          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}

export default Dashboard
