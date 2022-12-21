import { useState, useEffect } from 'react';
import api from '../api';

const Team = (team: any) => {
  const postCandidates = async (name: any) => {
    try {
      const response = await api.post('/teams/', {
        team_name: name,
      });
    } catch (error) {
      console.log(error);
      alert('이미 투표하셨습니다!');
    }
  };

  const handleClickVoteCount = (name: any) => {
    postCandidates(name);
  };

  return (
    <div
      className="candidate"
      onClick={() => handleClickVoteCount(team.team_name)}
    >
      <div>{team.team_name}</div>
      <div>{team.vote_count}</div>
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

export default Team;
