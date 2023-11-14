import React, { useCallback, useEffect, useState } from 'react'
import { logo2Icon } from '../../../assets/icons/png/toolbar1/data'
import Lottie from 'react-lottie-player'
import { checkMarkGif, crossMarkGif } from '../../../assets/icons/json/data'
import { newMailImg } from '../../../assets/icons/img/Illistrations/data'
import { LinearProgress } from '@mui/material'
import { Navigate, useLocation } from 'react-router'
import { tokenUserInfo, verifyEmail } from '../../../service/AuthenticateServices'
import { Link } from 'react-router-dom'
import { data } from 'autoprefixer'

const VerifyEmail = () => {
    const [isPending, setIsPending] = useState(false);
    const [response,setResponse] = useState("");
    const [userInfo,setUserInfo] = useState();
    const [VerifyTokenBtn,setVerifyTokenBtn] = useState(false);



    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('token');
    useEffect(() => {
        async function fetchData() {
            const data = await tokenUserInfo(status);
            setResponse(data?.message)
            setUserInfo(data?.response?.data);
        }
        fetchData();
    }
    , [])

    useEffect(() => {
        async function fetchData() {
            setIsPending(true);
            const data = await verifyEmail(status);
            setResponse(data?.message)
            setIsPending(false);
        }
        if(VerifyTokenBtn){
            fetchData();
        }

    }
    , [VerifyTokenBtn])
   
        const element = useCallback(() => {
            switch (response) {
                case 'Success':
                    return <VerifyToken data={userInfo} VerifyTokenBtn={setVerifyTokenBtn} isPending={isPending}/>
                case 'INVALID_TOKEN':
                    return <InvalidToken/>
                case 'TOKEN_EXPIRED':
                    return <TokenExpired/>
                case 'TOKEN_VERIFIED':
                    return <TokenVerified/>
                case 'USER_ALREADY_VERIFIED':
                    return <UserAlreadyVerified/>
                default:
                    return <SomethingWentWrong/>
            }
        }
        ,[response])
        

console.log(response)


    return (
        <>
            <div className="w-full h-[100vh] py-5 bg-main-bg flex justify-center items-center ">
                <div className=' bg-white rounded-xl shadow-xl'>
                    {   isPending &&
                        <LinearProgress />

                    }
                    <div className="login-main-cntr w-[500px] py-8 px-3 bg-white space-y-5 justify-center items-center rounded-xl  z-50 " style={{ display: 'flex', flexDirection: 'column' }} >

                        <div>
                            <img src={logo2Icon} className=' h-8' />
                        </div>

                        <div>
                            <img src={newMailImg} className='h-40' />
                        </div>
                       {element()}
                    </div>
                </div>
            </div>
        </>
    )
}

const VerificationSuccess = () => {
    return (

        <Lottie
            animationData={checkMarkGif}
            play
            style={{ width: 150, height: 80 }}
            loop={false}
        />
    )
}

const VerificationFailed = ({ message }) => {
    return (
        <Lottie
            animationData={crossMarkGif}
            play
            style={{ width: 50, height: 50 }}
            loop={false}
        />
    )
}

const VerifyToken = ({data,VerifyTokenBtn,isPending}) => {
    return (
        <>
            <span className=' font-semibold text-2xl'>Verify Your Email</span>
            <p className=' text-center font-normal'>You have Entered <span className='font-semibold text-lg'>{data}</span> As The Email Address For Your Account
                ,And It Needs To Be Verifed Before Granted Full Access</p>
            <button className='Btn3' disabled={isPending} onClick={()=>{VerifyTokenBtn(true)}}>Verify, Your Email </button>
        </>
    )
}

const InvalidToken = () => {
    return (
        <>
            <span className=' font-semibold text-2xl'>Invalid Token</span>
            <p className=' text-center font-normal'>Invalid verification Token Try with Another Link if you are trying to Verify</p>
            <VerificationFailed />
            <p className=' font-semibold'>You May close The Window Now</p>
        </>
    )
}

const TokenExpired = () => {
    return (
        <>
            <span className=' font-semibold text-2xl'>Token Expired</span>
            <p className=' text-center font-normal'>Your Token Has Expired Try with Another <br /> Link if you are trying to Verify</p>
            <VerificationFailed />
            <p className='text-slate-500'>Want a new Link?<button><span className='text-black font-semibold underline'>Resend</span></button></p>
        </>
    )
}

const TokenVerified = () => {
    return (
        <>
        {
            setTimeout(() => {
                <Navigate to={'/'} />
            }, 4000)
        }
            <span className=' font-semibold text-2xl'>Token Verified</span>
            <p className=' text-center font-normal'>Your Email is Verified Continue To Login</p>
            <VerificationSuccess />
            <Link to='/login'>
                <button className='Btn3 w-40'>Login</button>
            </Link>
        </>
    )
}

const SomethingWentWrong = () => {
    return (
        <>
            <span className=' font-semibold text-2xl'>Something Went Wrong</span>
            <p className=' text-center font-normal'>Something Went Wrong Please Try Again Later</p>
            <VerificationFailed />
            <p className=' font-semibold'>You May close The Window Now</p>
        </>
    )
}

const UserAlreadyVerified = () => {
    return (
        <>
            <span className=' font-semibold text-2xl'>User Already Verified</span>
            <p className=' text-center font-normal'>Your Email is Already Verified Continue To Login</p>
            <VerificationSuccess />
            <Link to='/login'>
                <button className='Btn3 w-40'>Login</button>
            </Link>
        </>
    )
}
export default VerifyEmail 