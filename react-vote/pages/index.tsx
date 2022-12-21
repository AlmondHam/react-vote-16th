import { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {loginDb} from '../reducer/user'
import {useDispatch } from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit'
import useNavigate from 'next/router';



const emailCheck = (email:string) =>{
  let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;

  return _reg.test(email); 
}


export default function Home() {
  const navigate =useNavigate;
  //const [user,setUser]= useState<User>({id: "",password: ""});
  const [id,setId] =useState("");
  const [pw,setPw]=useState("");
  const dispatch = useDispatch<ThunkDispatch<any,any,any>>();

  useEffect(()=>{
    console.log("a");
  },[])

  const login = (e:any)=>{
    
    e.preventDefault();

    if( id === "" || pw === "")
    {
      window.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    else if(!emailCheck(id))
    {
      window.alert("이메일형식에 맞춰주세요.");
      return;
    }
    else
    {
      let email =id;
      let password = pw;
      
      const data = {email, password};
      console.log(data);
      dispatch(loginDb({navigate, data}));
    }
    
  }

  
  
  
  return (
    <>
      <Link href={'/joinPage'}>회원가입페이지</Link>
      <Form >
        <h1>로그인</h1>
      <IdInput 
      name="email"
      value={id}
            onChange={(e)=>{
              setId(e.target.value);
            }}
            placeholder="id를 입력하시오"
        />
        <PwInput
        name="password"
        value={pw}
          onChange={(e)=>{
            setPw(e.target.value);
          }}
          placeholder="pw를 입력하시오"
          />
          <Button onClick={login}>로그인</Button>
          </Form>
    </>
  )
}
const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
  height: 50rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid gainsboro;
  margin-left:480px;
`;

const IdInput = styled.input`
margin: 5px;
  padding: 3px;
  border: 1px solid gainsboro;
  width: 30rem;
  height: 3rem;
  border-radius: 10px;
  margin: 10px 0px 10px 0px;
`

const PwInput = styled.input`
margin: 5px;
  padding: 3px;
  border: 1px solid gainsboro;
  width: 30rem;
  height: 3rem;
  border-radius: 10px;
  margin: 10px 0px 10px 0px;
`

const Button =styled.button`
    margin: 5px;
  padding: 3px;
  border: 1px solid gainsboro;
  width: 30rem;
  height: 3rem;
  border-radius: 10px;
  margin: 10px 0px 10px 0px;
  background-color:white;
  color:black;
  &:hover{
        background: grey;
    }
    &:active{
        background: grey;
    }
`