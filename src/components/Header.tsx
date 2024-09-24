import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiText, EuiTextColor } from '@elastic/eui';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/FireBase';
import { changeTheme } from '../redux/slices/AuthSlice';
import { getBreadCrums, getOneOnOneMeetingBreadCrumbs } from '../utils/breadCrums';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const username = useAppSelector((zoom) => zoom.auth.userInfo?.name);
    const dispatch = useDispatch();
    const [breadCrumbs,setBreadCrumbs] = useState([{text:"Dashboard"}]);
    const [isResponsive,setIsResponsive] = useState(false);
    const isDarkTheme = useAppSelector((meet) => meet.auth.isDarkTheme);

    const logout = ()=>{
      signOut(firebaseAuth);
    };

    useEffect(()=>{
      const {pathname} = location;
      if(pathname==="/create")
        setBreadCrumbs(getBreadCrums(navigate))
      else if(pathname=="/create1on1")
        setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate))
    },[location,navigate])

    const invertTheme = () => {
      const theme = localStorage.getItem("fusionmeet-theme");
      localStorage.setItem("fusionmeet-theme",theme==="light"?"dark":"light")
      dispatch(changeTheme({isDarkTheme:!isDarkTheme}))
    }
    const section = [
        {
          items: [
            <Link to="/">
              <EuiText>
                <h2 style={{ padding: "0 1vw" }}>
                  <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
                </h2>
              </EuiText>
            </Link>,
          ],
        },
        {
          items: [
            <>
              {username ? (
                <EuiText>
                  <h3>
                    <EuiTextColor color="white">Hello, </EuiTextColor>
                    <EuiTextColor color="#0b5cff">{username}</EuiTextColor>
                  </h3>
                </EuiText>
              ) : null}
            </>,
          ],
        },
        {
          items: [
            <EuiFlexGroup
              justifyContent="center"
              alignItems="center"
              direction="row"
              style={{ gap: "2vw" }}
            >
              <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
                {isDarkTheme ? (
                  <EuiButtonIcon
                    onClick={invertTheme}
                    iconType="sun"
                    display="fill"
                    size="s"
                    color="warning"
                    aria-label="theme-button-light"
                  />
                ) : (
                  <EuiButtonIcon
                    onClick={invertTheme}
                    iconType="moon"
                    display="fill"
                    size="s"
                    color="text"
                    aria-label="theme-button-dark"
                  />
                )}
              </EuiFlexItem>
              <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
                <EuiButtonIcon
                  onClick={logout}
                  iconType="lock"
                  display="fill"
                  size="s"
                  aria-label="logout-button"
                />
              </EuiFlexItem>
            </EuiFlexGroup>,
          ],
        },
      ];
    
      const responsiveSection = [
        {
          items: [
            <Link to="/">
              <EuiText>
                <h2 style={{ padding: "0 1vw" }}>
                  <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
                </h2>
              </EuiText>
            </Link>,
          ],
        },
        {
          items: [
            <EuiFlexGroup
              justifyContent="center"
              alignItems="center"
              direction="row"
              style={{ gap: "2vw" }}
            >
              <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
                {isDarkTheme ? (
                  <EuiButtonIcon
                    onClick={invertTheme}
                    iconType="sun"
                    display="fill"
                    size="s"
                    color="warning"
                    aria-label="theme-button-light"
                  />
                ) : (
                  <EuiButtonIcon
                    onClick={invertTheme}
                    iconType="moon"
                    display="fill"
                    size="s"
                    color="text"
                    aria-label="theme-button-dark"
                  />
                )}
              </EuiFlexItem>
              <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
                <EuiButtonIcon
                  onClick={logout}
                  iconType="lock"
                  display="fill"
                  size="s"
                  aria-label="logout-button"
                />
              </EuiFlexItem>
            </EuiFlexGroup>,
          ],
        },
      ];

    useEffect(()=>{
        if(window.innerHeight < 480) setIsResponsive(true);
    },[])
  return (
   <>
 <EuiHeader
        style={{ minHeight: "8vh" }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />

<EuiHeader
        style={{ minHeight: "8vh" }}
        sections={[
          {
            breadcrumbs: breadCrumbs,
          },
        ]} />
   </>
  )
}

export default Header
