import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {connect} from 'react-redux';
import { SetIsRoomHost } from '../store/actions';
import JoinRoomTitle from './JoinRoomTitle';
import JoinRoomContent from './JoinRoomContent';

import './JoinRoomPage.css';


const JoinRoomPage = (props) => {
  const {SetIsRoomHostAction, isRoomHost} = props;

  const search = useLocation().search;

  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get('host');
    if (isRoomHost) {
        SetIsRoomHostAction(true);
    }
  }, []);

  return (
    <div className='join_room_page_container'>
      <div className='join_room_page_panel'>
          <JoinRoomTitle isRoomHost={isRoomHost}/>
          <JoinRoomContent />
      </div>
    </div>
  );
};

const mapStoreStateToProps = (state) => {
   return {
       ...state,
   };
};

const mapActionsToProps = (dispatch) => {
   return {
      SetIsRoomHostAction: (isRoomHost) => dispatch(SetIsRoomHost(isRoomHost)),
   };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage);