import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { signUpDb } from '../reducer/joinUser';
import styled from 'styled-components';
import { useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';

export default function JoinPage(){
    const dispatch = useDispatch<ThunkDispatch<any,any,any>>();
    const data = useSelector((state:any)=>state.joinSlice.joinData);
    const [error,setError] =useState(data);
   
    
    //초기값
    const initialState={
        email:"",
        password:"",
        username:"",
        name:"",
        part:"",
        team:"",
    };

    const [joinToggle,setJoinToggle]=useState(true);
    const [form,setForm]=useState(initialState);
    const {email,
    password,
    username,
    name,
    part,
    team} = form;
    const [alertB, setAlert] = useState("");

    const onChange = (e:any) =>{
    const REGID = /^(?=.*[a-z0-9])[a-z0-9]{3,10}$/;
    const REGPW =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,12}/;
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
    if (form.email === "" || !REGID.test(email)) {
      setAlert("아이디는 영문 또는 숫자 4-10자입니다");
    } else if (password === "" || !REGPW.test(password)) {
      setAlert("비밀번호는 대소문자,숫자,특수기호 포함 6-12자 입니다");
    } else if (part === "" ) {
      setAlert("파트를 입력해주세요");
    }else if (team === "" ) {
        setAlert("팀을 입력해주세요");
      } 
      else if (name === "" ) {
        setAlert("이름을 입력해주세요");
      } 
     else if (username === "" || username.length > 7) {
      setAlert("닉네임을 확인해주세요");
    } else {
      setAlert("");
      //버튼 활성화 토글
      setJoinToggle(false);
    }
    console.log(form);
    console.log(selectedPart);
  };
    
const joinData= {email,password,username, name,part, team};

const onClick=(e:any)=>{
e.preventDefault();
    if(
        email ===""||
        password===""||
        team===""||
        part===""||
        username===""||
        name===""
    ){
        alert("내용을 모두 입력해주세요");
    }else{
        dispatch(signUpDb({joinData}));
    }
}

const selectPartList = ["파트를 선택하세요","Frontend","Backend"];
const [selectedPart, setPart] =useState("");

const handleSelect = (e:any)=>{
    setPart(e.target.value);
    onChange(e);
    
}

const selectTeamList = ["팀을 선택하세요", "Recipeasy",'Forgetmenot','Prefolio','Diametes','Teample']
const [selectedTeam,setTeam]=useState("");

const handleTeamSelect=(e:any)=>{
    setTeam(e.target.value);
    onChange(e);
}


return(
    <>
    
    <Link href='/blank'>home</Link>
    <Form >
    <h1>회원가입</h1>
        <Input
            required
            name="email"
            value={email}
            onChange={onChange}
            placeholder="이메일을 입력하세요"
        />
        <Input
            required
            name="password"
            value={password}
            onChange={onChange}
            placeholder="비밀번호를 입력하세요"
        />
        <Input
            required
            name="username"
            value={username}
            onChange={onChange}
            placeholder="닉네임을 입력하세요"
        />

        <Select name="part" onChange={handleSelect} value={selectedPart}>
            {selectPartList.map((item)=>(
                <option value ={item} key={item}>{item}</option>
            ))}
        </Select>
        
        <Input
            required
            name="name"
            value={name}
            onChange={onChange}
            placeholder="이름을 입력하세요"
        />
        <Select name="team" onChange={handleTeamSelect} value={selectedTeam}>
            {selectTeamList.map((item)=>(
                <option value ={item} key={item}>{item}</option>
            ))}
        </Select>
        <Button
        onClick={onClick}
       // variant="dark"
        //disabled={joinToggle}
        >완료</Button>
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
const Input = styled.input`
  margin: 5px;
  padding: 3px;
  border: 1px solid gainsboro;
  width: 30rem;
  height: 3rem;
  border-radius: 10px;
  margin: 10px 0px 10px 0px;
`;

const Select = styled.select`
  margin: 5px;
  padding: 3px;
  border: 1px solid gainsboro;
  width: 30rem;
  height: 3rem;
  border-radius: 10px;
  margin: 10px 0px 10px 0px;
`;

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