import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';

import api from '../../api';
import { useSelector } from 'react-redux';
import { getCookie, removeCookie } from '../../util/cookie';

const Vote = () => {
  interface CandidateProps {
    id: Number;
    name: String;
    vote_count: Number;
    position: String;
  }
  const [cand, setCand] = useState<CandidateProps[] | null>(null);
  const [teams, setTeams] = useState([]);

  const fetchCandidates = async () => {
    try {
      const response = await api.get('/candidates/');
      setCand(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await api.get('/teams/');
      setTeams(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getCookie('is_login') === undefined) {
      alert('로그인 후 접속');
      Router.push('/');
    } else {
      fetchCandidates();
      fetchTeams();
    }
  }, []);

  const LogOut = () => {
    removeCookie('is_login');
    Router.push('/');
  };

  const team = 'FE';

  return (
    <div className="container">
      <Link
        href={{
          pathname: `/vote/[team]`,
          query: {
            vote_list: JSON.stringify(
              cand?.filter((cand) => cand.position === team)
            ),
          },
        }}
        as={`/vote/${team}`}
      >
        <button className="vote-btn" disabled={team !== 'FE'}>
          FE 투표하기
        </button>
      </Link>
      <Link
        href={{
          pathname: `/result/FE`,
          query: {
            vote_list: JSON.stringify(
              cand?.filter((cand) => cand.position === 'FE')
            ),
          },
        }}
        as={`/result/FE`}
      >
        <button className="vote-btn">FE 결과보기</button>
      </Link>

      <Link
        href={{
          pathname: `/vote/[team]`,
          query: {
            vote_list: JSON.stringify(
              cand?.filter((cand) => cand.position === 'BE')
            ),
          },
        }}
        as={`/vote/BE`}
      >
        <button className="vote-btn" disabled={team !== 'BE'}>
          BE 투표하기
        </button>
      </Link>
      <Link
        href={{
          pathname: `/result/BE`,
          query: {
            vote_list: JSON.stringify(
              cand?.filter((cand) => cand.position === 'BE')
            ),
          },
        }}
        as={`/result/BE`}
      >
        <button className="vote-btn">BE 결과보기</button>
      </Link>
      <Link
        href={{
          pathname: `/vote/final`,
          query: {
            vote_list: JSON.stringify(teams),
          },
        }}
        as={`/vote/final`}
      >
        <button className="vote-btn">
          데모데이
          <br />
          투표하기
        </button>
      </Link>
      <Link
        href={{
          pathname: `/result/final`,
          query: {
            vote_list: JSON.stringify(teams),
          },
        }}
        as={`/result/final`}
      >
        <button className="vote-btn">
          데모데이 <br /> 결과보기
        </button>
      </Link>
      <button onClick={LogOut}>logOut</button>
      <style jsx>{`
        .vote-btn {
          width: 12em;
          height: 10rem;
          padding: 2rem;
          border: 1px solid white;
          border-radius: 1rem;

          line-height: 140%;

          font-weight: 600;
        }

        .vote-btn:hover {
          background: white;
          color: black;
        }

        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem 1rem;
        }
      `}</style>
    </div>
  );
};

export default Vote;
