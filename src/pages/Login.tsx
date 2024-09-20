import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from "@elastic/eui"
import animation from "../assets/animation.gif"
import logo from "../assets/logo.png"

const Login = () => {
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
          <EuiImage src={logo} alt="logo" size="230px" />
          <EuiSpacer size="xs" />
          <EuiText textAlign="center" grow={false}>
            <h3>
              <EuiTextColor>One PlatForm</EuiTextColor>
              <EuiTextColor color="#0b5cff">Connect</EuiTextColor>
            </h3>
          </EuiText>
          <EuiSpacer size="l" />
          <EuiButton fill>
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
