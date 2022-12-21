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
    <div>
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
        FE 투표하기
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
        FE 결과보기
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
        BE 투표하기
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
        BE 결과보기
      </Link>
      <style jsx>{``}</style>
    </div>
  );
};

export default Vote;
