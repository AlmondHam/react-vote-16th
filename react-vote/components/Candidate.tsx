import { useState, useEffect } from 'react';
import api from '../api';

const Candidate = (candidate: any) => {
  const postCandidates = async (id: any, name: any) => {
    const result = confirm(`${name}님께 투표하시겠습니까?`);
    if (result) {
      try {
        const response = await api.post('/candidates/', {
          id: id,
        });
      } catch (error) {
        console.log(error);
        alert('이미 투표하셨습니다!');
      }
    }
  };

  const handleClickVoteCount = (id: any, name: any) => {
    postCandidates(id, name);
  };

  return (
    <div
      className="candidate"
      onClick={() => handleClickVoteCount(candidate.id, candidate.name)}
    >
      <div>{candidate.name}</div>
      <div>{candidate.vote_count}</div>
      <style jsx>{`
        .candidate {
          display: flex;
          gap: 1rem;

          width: 30rem;
          padding: 1.5rem;

          cursor: pointer;
          border: 1px solid white;
          border-radius: 1rem;
        }

        .candidate:hover {
          background: white;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default Candidate;
