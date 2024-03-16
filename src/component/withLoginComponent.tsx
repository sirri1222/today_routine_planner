import emailStore from '@/emailStore'
import React from 'react'


function withLoginComponent  (ChildComponent:) {
  return function(){
const { useremail } = emailStore()
    if(useremail){
        return <ChildComponent />
    }
    return <>로그인이 필요합니다.</>
  }

  
}
export default withLoginComponent