import React, { useState } from 'react'

function useUserName() {
    const [ userName, setUserName ] = useState('');
  return { userName, setUserName }
}

export default useUserName