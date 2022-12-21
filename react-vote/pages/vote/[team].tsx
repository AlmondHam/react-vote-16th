import { withRouter } from 'next/router';

import Candidate from '../../components/Candidate';

const Vote = ({ router: { query } }: any) => {
  const voteList = JSON.parse(query.vote_list);
  console.log(voteList);
  return (
    <div className="candidate">
      {voteList.map((cand: any) => (
        <Candidate key={cand.id} {...cand} />
      ))}
      <style jsx>{`
        .candidate {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
};

export default withRouter(Vote);
