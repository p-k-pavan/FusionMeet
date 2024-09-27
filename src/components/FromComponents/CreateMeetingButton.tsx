import { EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateMeetingButton = (
    { createMeeting, isEdit = false,closeFlyout }: 
    { createMeeting: () => void; 
        isEdit: boolean;
        closeFlyout?: () => {};
    }) => {
    const navigate = useNavigate();
    return (
        <EuiFlexGroup>
            <EuiFlexItem grow={false}>
                <EuiButton color='danger' fill
                    onClick={() => (isEdit ? closeFlyout!() : navigate("/"))}
                >
                    Cancel
                </EuiButton>

            </EuiFlexItem>
            <EuiFlexItem grow={false}>
                <EuiButton fill
                    onClick={createMeeting}
                >
                    Submit
                </EuiButton>

            </EuiFlexItem>
        </EuiFlexGroup>
    )
}

export default CreateMeetingButton