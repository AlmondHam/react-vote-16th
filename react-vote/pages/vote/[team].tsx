import { withRouter } from 'next/router';

import Candidate from '../../components/Candidate';

const Vote = ({ router: { query } }: any) => {
  const voteList = JSON.parse(query.vote_list);
  console.log(voteList);
  return (
    <div>
      {voteList.map((cand: any) => (
        <Candidate key={cand.id} {...cand} />
      ))}
    </div>
  );
};

export default withRouter(Vote);
