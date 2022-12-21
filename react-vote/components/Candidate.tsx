const Candidate = (candidate: any) => {
  return (
    <div onClick={() => (candidate.vote_count += 1)}>
      <div>{candidate.name}</div>
      <div>{candidate.vote_count}</div>
      <style jsx>{``}</style>
    </div>
  );
};

export default Candidate;
