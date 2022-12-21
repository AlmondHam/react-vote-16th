import VoteResult from '../../components/VoteResult';
import { withRouter } from 'next/router';

const BEResult = ({ router: { query } }: any) => {
  const voteList = JSON.parse(query.vote_list);
  return <VoteResult {...voteList} />;
};

export default withRouter(BEResult);
