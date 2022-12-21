import ResultCandidate from './ResultCandidate';

const VoteResult = (voteList: any) => {
  console.log(voteList);
  return (
    <div>
      <div>
        {Object.values(voteList)
          .sort((a: any, b: any) => b.vote_count - a.vote_count)
          .map((cand: any) => (
            <ResultCandidate key={cand.id} {...cand} />
          ))}
      </div>
    </div>
  );
};

export default VoteResult;
