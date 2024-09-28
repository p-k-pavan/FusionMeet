import React, { useEffect, useState } from 'react';
import { MeetingType } from '../utils/Types';
import { useAppSelector } from '../redux/hooks';
import { getDocs, query } from 'firebase/firestore';
import { meetingsRef } from '../utils/FireBase';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from '@elastic/eui';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Meeting = () => {
  useAuth();
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
  const uid = useAppSelector((meet) => meet.auth.userInfo?.uid);
  
  
  useEffect(() => {
    const getMyMeetings = async () => {
        const firestoreQuery = query(meetingsRef);
        const fetchedMeetings = await getDocs(firestoreQuery);
        if (fetchedMeetings.docs.length) {
          const myMeetings: Array<MeetingType> = [];
          fetchedMeetings.forEach((meeting) => {
            const data = meeting.data() as MeetingType;
            if (data.createdBy === uid)
              myMeetings.push(meeting.data() as MeetingType);
            else if (data.meetingType === "anyone-can-join")
              myMeetings.push(meeting.data() as MeetingType);
            else {
              const index = data.invitedUsers.findIndex(
                (user: string) => user === uid
              );
              if (index !== -1) {
                myMeetings.push(meeting.data() as MeetingType);
              }
            }
          });
  
          setMeetings(myMeetings);
        }
      };
      if(uid) getMyMeetings();
  }, [uid]);

  const meetingColumns = [
    {
      field: "meetingName",
      name: "Meeting Name",
    },
    {
      field: "meetingType",
      name: "Meeting Type",
    },
    {
      field: "meetingDate",
      name: "Meeting Date",
    },
    {
      field: "",
      name: "Status",
      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return (
              <EuiBadge color="success">
                <Link
                  to={`/join/${meeting.meetingId}`}
                  style={{ color: "black" }}
                >
                  Join Now
                </Link>
              </EuiBadge>
            );
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ) {
            return <EuiBadge color="default">Ended</EuiBadge>;
          } else if (moment(meeting.meetingDate).isAfter()) {
            return <EuiBadge color="primary">Upcoming</EuiBadge>;
          }
        } else return <EuiBadge color="danger">Cancelled</EuiBadge>;
      },
    },
   
    {
      field: "meetingId",
      name: "Copy Link",
      width: "5%",
      render: (meetingId: string) => {
        return (
          <EuiCopy
            textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
          >
            {(copy: any) => (
              <EuiButtonIcon
              iconType="copy"
              onClick={copy}
              display="base"
              aria-label="meeting-copy"
            />
            )}
          </EuiCopy>
        );
      },
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent='center' alignItems='center' style={{ margin: '1rem' }}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable
              items={meetings}
              columns={meetingColumns}
            />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      
    
    </div>
  );
};

export default Meeting;
