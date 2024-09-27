import React, { useEffect, useState,useCallback } from 'react';
import { MeetingType } from '../utils/Types';
import { useAppSelector } from '../redux/hooks';
import { getDocs, query, where } from 'firebase/firestore';
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
import EditFlyout from '../components/EditFlyout';

const MyMeetings = () => {
  useAuth();
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
  const uid = useAppSelector((meet) => meet.auth.userInfo?.uid);
  const [showEditFlyout, setShowEditFlyout] = useState(false);
  const [editMeeting, setEditMeeting] = useState<MeetingType>();
  
  const getMyMeetings = useCallback(async () => {
    const firestoreQuery = query(
      meetingsRef,
      where("createdBy", "==", uid)
    );
    const fetchedMeetings = await getDocs(firestoreQuery);
    if (fetchedMeetings.docs.length) {
      const myMeetings: Array<MeetingType> = [];
      fetchedMeetings.forEach((meeting) => {
        myMeetings.push({
          docId: meeting.id,
          ...(meeting.data() as MeetingType),
        });
      });
      setMeetings(myMeetings);
    }
  }, [uid]);
  useEffect(() => {
    if (uid) getMyMeetings();
  }, [uid, getMyMeetings]);


  const openEditFlyout = (meeting: MeetingType) => {
    setEditMeeting(meeting);
    setShowEditFlyout(true);
  };

  const closeEditFlyout = (dataChanged = false) => {
    setShowEditFlyout(false);
    setEditMeeting(undefined);
    if (dataChanged) getMyMeetings();
  };

  console.log({ meetings });

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
      field: "",
      name: "Edit",
      width: "5%",
      render: (meeting: MeetingType) => {
        return (
          <EuiButtonIcon
            aria-label="meeting-edit"
            iconType="indexEdit"
            color="danger"
            display="base"
            isDisabled={
              moment(meeting.meetingDate).isBefore(moment().format("L")) ||
              !meeting.status
            }
            onClick={() => openEditFlyout(meeting)}
          />
        );
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
      {showEditFlyout && editMeeting && (
  <EditFlyout closeFlyout={closeEditFlyout} meeting={editMeeting} />
)}


    
    </div>
  );
};

export default MyMeetings;
