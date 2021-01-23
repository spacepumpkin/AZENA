import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Loader ({ setLoader }) {

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setLoader(false));
    }
  }, [])

  return (
    <div id="loader-wrapper">
      <div id="loader"></div>
    </div>
  )
}