import React from 'react'
import { useParams } from 'react-router'

function UserProfile() {
  const params = useParams()
  console.log(params)
  return (
    <>
    <div>UserProfile</div>
    <div>UserProfile</div>
    <div>UserProfile</div>
    <div>UserProfile</div>
    </>
  )
}

export default UserProfile