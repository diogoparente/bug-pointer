import prisma from "@/database/client";

const getAllContests = async () => {
  const allContests = await prisma.contest.findMany();
  return allContests;
};

const getContestByAddress = async (address: string) => {
  const contests = await prisma.contest.findUnique({
    where: {
      contestAddress: address,
    },
  });
  return contests;
};

const getContestsBySponsor = async (sponsor: string) => {
  const contests = await prisma.contest.findMany({
    where: {
      sponsor,
    },
  });
  return contests;
};

const insertContest = async (contest: Contest) => {
  const insertedContest = await prisma.contest.create({
    data: contest,
  });
  return insertedContest;
};

export { getAllContests, getContestByAddress, getContestsBySponsor, insertContest };
