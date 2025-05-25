import React from "react";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton";
import { connect } from "react-redux";
import CopyRoomIdButton from "./CopyRoomIdButton";

const VideoButtons = (props) => {
const {connectOnlyWithAudio} = props;

    return (
        <div className="video_buttons_container">
            <MicButton />
            {!connectOnlyWithAudio && <CameraButton />}
            <LeaveRoomButton />
            {!connectOnlyWithAudio && <SwitchToScreenSharingButton />}
            <CopyRoomIdButton roomId={props.roomId} />
        </div>
    );
};


const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}

export default connect(mapStoreStateToProps)(VideoButtons);
