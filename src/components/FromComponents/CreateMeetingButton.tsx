import { EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateMeetingButton = ({createMeeting}:{createMeeting:()=>void}) => {
    const navigate = useNavigate();
    return (
        <EuiFlexGroup>
            <EuiFlexItem grow={false}>
                <EuiButton color='danger' fill
                    onClick={() => {
                        const confirmCancel = window.confirm("Are you sure you want to cancel?");
                        if (confirmCancel) {
                          navigate("/");
                        }
                      }}
                >
                    Cancel
                </EuiButton>

            </EuiFlexItem>
            <EuiFlexItem grow={false}>
                <EuiButton  fill
                    onClick={createMeeting}
                >
                    Submit
                </EuiButton>

            </EuiFlexItem>
        </EuiFlexGroup>
    )
}

export default CreateMeetingButton