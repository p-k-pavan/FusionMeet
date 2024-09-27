import React, { useState } from 'react'
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { EuiFlexGroup, EuiForm, EuiSpacer } from '@elastic/eui';
import MeetingNameField from '../components/FromComponents/MeetingNameField';
import MeetingUsersField from '../components/FromComponents/MeetingUsersField';
import { useSelector } from 'react-redux';
import useFetchUsers from '../hooks/useFetchUsers';
import MeetingDateField from '../components/FromComponents/MeetingDateField';
import moment from 'moment';
import CreateMeetingButton from '../components/FromComponents/CreateMeetingButton';
import { FieldErrorType, UserType } from '../utils/Types';
import { addDoc } from 'firebase/firestore';
import { useAppSelector } from '../redux/hooks';
import { meetingsRef } from '../utils/FireBase';
import { generateMeetingId } from '../utils/generateMeetingID';
import useToast from '../hooks/UseToast';

const OneOnOneMeeting = () => {
  const navigate = useNavigate();
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const uid = useAppSelector((meet) => meet.auth.userInfo?.uid)
  useAuth();

  const [meetingName, setMeetingName] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([])
  const [startDate, setStartDate] = useState(moment());
  const [showErrors, setShowErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    }
  });

  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions)
  }

  const validateForm = () => {
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message=["Meeting name is required"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUsers.length) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  }

  const createMeeting = async() => {
    if (!validateForm()) {
      const meetingId = generateMeetingId();
      await addDoc(meetingsRef,{
        createdBy:uid,
        meetingName,
        meetingId,
        meetingType:"1-on-1",
        invitedUsers:[selectedUsers[0].uid],
        meetingDate: startDate.format("L"),
        maxUsers:1,
        status:true,
      });
      createToast({
        title: "Meeting Created",
        type:"success"
      });
      navigate("/")
    }
  }


  return (
    <div style={{
      display: "flex",
      height: "100vh",
      flexDirection: "column"
    }}>
      <Header />
      <EuiFlexGroup justifyContent='center'
        alignItems='center'>
        <EuiForm>
          <MeetingNameField
            label="Meeting Name"
            placeHolder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          <MeetingUsersField
            label='Invite User'
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder='select a user'
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
          />
          <MeetingDateField
            selected={startDate}
            setStartDate={setStartDate}
          />
          <EuiSpacer />
          <CreateMeetingButton
            createMeeting={createMeeting}
            isEdit={false}

          />
        </EuiForm>

      </EuiFlexGroup>
    </div>
  )
}

export default OneOnOneMeeting