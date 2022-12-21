import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

import Candidate from '../../components/Candidate';

import api from '../../api';

const Vote = () => {
  interface CandidateProps {
    id: Number;
    name: String;
    vote_count: Number;
    position: String;
  }
  const [cand, setCand] = useState<CandidateProps[] | null>(null);

  const fetchCandidates = async () => {
    try {
      const response = await api.get('/candidates/');
      setCand(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  console.log(cand);

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
        <div className="vote-btn">FE 투표하기</div>
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
        <div className="vote-btn">FE 결과보기</div>
      </Link>

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
        <div className="vote-btn">BE 투표하기</div>
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
        <div className="vote-btn">BE 결과보기</div>
      </Link>

      <style jsx>{`
        .vote-btn {
          width: 10em;
          height: 10rem;
          padding: 2rem;
          border: 1px solid white;
          border-radius: 1rem;
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
